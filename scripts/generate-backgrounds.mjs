/**
 * Generates the 6 scene background images using Pollinations.ai (free, no key needed)
 * or optionally xAI Grok if GROK_API_KEY is set in .env.local.
 *
 * Run: node scripts/generate-backgrounds.mjs
 * Output: public/scenes/scene-{1-6}.jpg
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env.local if present
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const [k, ...v] = line.split('=');
    if (k?.trim() && v.length && !process.env[k.trim()]) {
      process.env[k.trim()] = v.join('=').trim().replace(/^["']|["']$/g, '');
    }
  }
}

const GROK_KEY = process.env.GROK_API_KEY;
const HF_KEY   = process.env.HF_TOKEN;

const PROVIDER = GROK_KEY ? 'grok' : HF_KEY ? 'huggingface' : 'pollinations';

const PROVIDER_LABEL = {
  grok:         'xAI Grok  (grok-2-image-1212)',
  huggingface:  'Hugging Face  (FLUX.1-schnell — free)',
  pollinations: 'Pollinations.ai  (free, no key — run locally)',
};
console.log(`🎨  Provider: ${PROVIDER_LABEL[PROVIDER]}`);

// ─── Scene prompts ────────────────────────────────────────────────────────────
const SCENES = [
  {
    id: 1,
    name: 'El Cruce',
    prompt: 'Cinematic crochet textile art Van Gogh style, two streams of knitted wool threads crossing in deep midnight darkness, one cool silver-blue stream from upper-left, one warm amber-gold stream from lower-right, soft golden burst of light at intersection, loose yarn threads, swirling brushstroke texture, photorealistic crochet stitches, deep navy black background, emotional atmospheric dramatic low lighting, 4K wide cinematic',
  },
  {
    id: 2,
    name: 'La Alineación',
    prompt: 'Abstract cosmic crochet art Van Gogh style, dozens of scattered golden stitches and wool knots floating across deep navy indigo textured fabric aligning onto a single luminous horizontal axis, star-like flecks of light, destiny order emerging from chaos, rich swirling yarn clouds loose threads catching amber light against midnight blue background, ethereal mystical photorealistic knitting texture 4K',
  },
  {
    id: 3,
    name: 'El Amanecer',
    prompt: 'Crochet dawn seascape Van Gogh swirling style, lower half turbulent dark indigo violet knitted waves chaotic restless, upper half warm golden sunrise with swirling crochet clouds in amber and orange, thin glowing horizon dividing dark sea from golden sky, emotional hopeful love settling after turbulence, photorealistic crochet wool texture deep shadows warm sunrise glow 4K wide cinematic',
  },
  {
    id: 4,
    name: 'La Cristalización',
    prompt: 'Dark crochet art Van Gogh style, dozens of tiny golden light particles and loose yarn threads drifting through near-black deep space all converging toward center, italic letter P glowing in warm gold thread and tight stitches crystallizing from accumulated yarn particles, sacred permanent memory materializing, deep navy-black crochet background warm amber gold center light, photorealistic fiber texture 4K',
  },
  {
    id: 5,
    name: 'La Vela',
    prompt: 'Single candle flame of glowing golden crochet stitches burning at exact center of rich dark textile, right side warm crimson deep red knitted wool waves pulling away, left side cool indigo midnight blue crochet fabric pulling away, flame at center unchanged unwavering, Van Gogh swirling style birthday hope love persisting through uncertainty, photorealistic crochet texture dramatic chiaroscuro 4K wide cinematic extremely detailed',
  },
  {
    id: 6,
    name: 'El Aliento',
    prompt: 'Closing crochet art Van Gogh style, deep dark navy indigo tapestry background with single warm amber-gold glow radiating softly from center, loose golden yarn threads and wool wisps floating upward like smoke from extinguished candle, small points of warm light scattered through dark fabric, peaceful melancholic love remaining final breath, cinematic sunflower gold against deep night blue photorealistic crochet texture soft atmospheric glow 4K',
  },
];

// ─── Hugging Face generator (free tier — needs HF_TOKEN in .env.local) ───────
async function generateWithHuggingFace(scene, outPath) {
  // FLUX.1-schnell: fast, free on HF inference API
  const endpoint = 'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell';
  console.log(`    Requesting from Hugging Face (FLUX.1-schnell)…`);

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${HF_KEY}`,
      'Content-Type': 'application/json',
      'x-wait-for-model': 'true',
    },
    body: JSON.stringify({
      inputs: scene.prompt,
      parameters: { width: 1344, height: 768, num_inference_steps: 4 },
    }),
    signal: AbortSignal.timeout(120_000),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`HF ${res.status}: ${msg.slice(0, 200)}`);
  }

  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outPath, buf);
}

// ─── Pollinations.ai generator (free, works locally) ─────────────────────────
async function generateWithPollinations(scene, outPath) {
  const encoded = encodeURIComponent(scene.prompt);
  // Use flux-realism model, landscape 1792×1024, deterministic seed per scene
  const url = `https://image.pollinations.ai/prompt/${encoded}?width=1792&height=1024&model=flux-realism&seed=${scene.id * 42}&nologo=true&enhance=true`;

  console.log(`    Requesting from Pollinations.ai…`);
  const res = await fetch(url, {
    signal: AbortSignal.timeout(120_000),
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'Referer': 'https://pollinations.ai/',
      'Origin': 'https://pollinations.ai',
      'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
    },
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outPath, buf);
}

// ─── Grok generator (requires API key + credits) ─────────────────────────────
async function generateWithGrok(scene, outPath) {
  const res = await fetch('https://api.x.ai/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GROK_KEY}`,
    },
    body: JSON.stringify({ model: 'grok-2-image-1212', prompt: scene.prompt, n: 1 }),
    signal: AbortSignal.timeout(120_000),
  });

  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);

  const json = await res.json();
  const item = json.data?.[0];
  if (!item) throw new Error('No image data in response');

  if (item.b64_json) {
    fs.writeFileSync(outPath, Buffer.from(item.b64_json, 'base64'));
  } else if (item.url) {
    const img = await fetch(item.url);
    fs.writeFileSync(outPath, Buffer.from(await img.arrayBuffer()));
  } else {
    throw new Error(`Unknown response: ${JSON.stringify(item)}`);
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const OUT_DIR = path.join(__dirname, '..', 'public', 'scenes');
fs.mkdirSync(OUT_DIR, { recursive: true });

const results = [];

for (const scene of SCENES) {
  const outPath = path.join(OUT_DIR, `scene-${scene.id}.jpg`);

  // Skip if already generated
  if (fs.existsSync(outPath)) {
    console.log(`\n⏭️   Scene ${scene.id} — ${scene.name} already exists, skipping.`);
    results.push({ id: scene.id, ok: true });
    continue;
  }

  console.log(`\n🧶  Scene ${scene.id} — ${scene.name}`);

  try {
    if (PROVIDER === 'grok') {
      await generateWithGrok(scene, outPath);
    } else if (PROVIDER === 'huggingface') {
      await generateWithHuggingFace(scene, outPath);
    } else {
      await generateWithPollinations(scene, outPath);
    }
    const kb = Math.round(fs.statSync(outPath).size / 1024);
    console.log(`    ✅  Saved → scene-${scene.id}.jpg (${kb} KB)`);
    results.push({ id: scene.id, ok: true });
  } catch (err) {
    console.error(`    ❌  Failed: ${err.message}`);
    results.push({ id: scene.id, ok: false, error: err.message });
  }

  // Pause between requests (Pollinations rate-limits aggressively)
  if (scene.id < SCENES.length) {
    console.log(`    ⏳  Waiting 4s before next request…`);
    await new Promise(r => setTimeout(r, 4000));
  }
}

// ─── Summary ──────────────────────────────────────────────────────────────────
console.log('\n── Summary ──────────────────────');
for (const r of results) {
  console.log(r.ok ? `  ✅  scene-${r.id}.jpg` : `  ❌  scene-${r.id}: ${r.error}`);
}

const failed = results.filter(r => !r.ok);
if (failed.length) {
  console.log(`\n⚠️   ${failed.length} scene(s) failed. Re-run to retry (existing files are skipped).`);
  process.exit(1);
}

console.log('\n🎉  Done. Run: npm run dev\n');
