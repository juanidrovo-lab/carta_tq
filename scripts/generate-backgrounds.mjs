/**
 * Generates the 6 scene background images using the Grok image API.
 * Run once: node scripts/generate-backgrounds.mjs
 *
 * Requires: GROK_API_KEY in .env.local  (or exported in your shell)
 * Output:   public/scenes/scene-{1-6}.jpg
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// Load API key from .env.local or environment
// ---------------------------------------------------------------------------
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const [k, ...v] = line.split('=');
    if (k && v.length && !process.env[k.trim()]) {
      process.env[k.trim()] = v.join('=').trim().replace(/^["']|["']$/g, '');
    }
  }
}

const API_KEY = process.env.GROK_API_KEY;
if (!API_KEY) {
  console.error('❌  GROK_API_KEY not found. Add it to .env.local:\n   GROK_API_KEY=xai-xxxxxxxxxxxx');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Scene prompts — each is tuned to its narrative moment
// ---------------------------------------------------------------------------
const SCENES = [
  {
    id: 1,
    name: 'El Cruce',
    prompt:
      'Cinematic crochet textile art in Van Gogh painting style. Two streams of knitted wool threads drifting through deep midnight darkness: one cool silver-blue stream from upper-left, one warm amber-gold stream from lower-right. They cross at the center creating a soft golden burst of light. Loose yarn threads, swirling brushstroke texture, photorealistic crochet stitches, deep navy and near-black background, emotional, atmospheric, dramatic low lighting. 4K detail, wide cinematic aspect.',
  },
  {
    id: 2,
    name: 'La Alineación',
    prompt:
      'Abstract cosmic crochet art in Van Gogh style. Dozens of scattered golden stitches and wool knots floating across deep navy and indigo textured fabric — then aligning slowly onto a single luminous horizontal axis. Star-like flecks of light, universe, destiny, order emerging from chaos. Rich swirling yarn clouds, loose threads catching amber light against midnight blue background. Ethereal, mystical, photorealistic knitting texture, 4K detail.',
  },
  {
    id: 3,
    name: 'El Amanecer',
    prompt:
      'Crochet dawn seascape in Van Gogh swirling style. Lower half: turbulent dark indigo and violet knitted waves, chaotic and restless. Upper half: warm golden sunrise with swirling crochet clouds in amber and orange. A thin glowing horizon divides dark sea from golden sky. Gradual color transition from cold to warm. Emotional, hopeful, love settling after turbulence. Photorealistic crochet and wool texture, deep shadows, warm sunrise glow, 4K wide cinematic.',
  },
  {
    id: 4,
    name: 'La Cristalización',
    prompt:
      'Dark crochet art in Van Gogh style. Dozens of tiny golden light particles and loose yarn threads drifting through near-black deep space, all converging toward the center. In the center, the italic letter P glowing in warm gold thread and tight stitches, crystallizing from accumulated yarn particles. Sacred, permanent, memory materializing. Deep navy-black crochet background, warm amber and gold center light. Atmospheric, photorealistic fiber texture, 4K detail.',
  },
  {
    id: 5,
    name: 'La Vela',
    prompt:
      'Single candle flame of glowing golden crochet stitches burning at the exact center of a rich dark textile. On the right side: warm crimson and deep red knitted wool waves pull away. On the left side: cool indigo and midnight blue crochet fabric pulls away. The flame at center unchanged, unwavering. Van Gogh swirling style, birthday, hope, love persisting through uncertainty. Photorealistic crochet texture, dramatic chiaroscuro, 4K wide cinematic, extremely detailed yarn and stitch work.',
  },
  {
    id: 6,
    name: 'El Aliento',
    prompt:
      'Closing crochet art in Van Gogh style. Deep dark navy and indigo tapestry background with a single warm amber-gold glow radiating softly from the center. Loose golden yarn threads and wool wisps floating upward like smoke from a just-extinguished candle. Small points of warm light scattered through the dark fabric. Peaceful, melancholic, love remaining, final breath. Cinematic sunflower gold against deep night blue, photorealistic crochet texture, soft atmospheric glow, 4K.',
  },
];

// ---------------------------------------------------------------------------
// Generate each image via xAI Grok image API
// ---------------------------------------------------------------------------
const OUT_DIR = path.join(__dirname, '..', 'public', 'scenes');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function generateImage(scene) {
  console.log(`\n🎨  Scene ${scene.id} — ${scene.name}`);
  console.log(`    Prompt: ${scene.prompt.slice(0, 80)}…`);

  const res = await fetch('https://api.x.ai/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: 'grok-2-image-1212',
      prompt: scene.prompt,
      n: 1,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API error ${res.status}: ${err}`);
  }

  const json = await res.json();
  const item = json.data?.[0];
  if (!item) throw new Error('No image data in response');

  const outPath = path.join(OUT_DIR, `scene-${scene.id}.jpg`);

  if (item.b64_json) {
    // Base64 response
    const buf = Buffer.from(item.b64_json, 'base64');
    fs.writeFileSync(outPath, buf);
    console.log(`    ✅  Saved (base64) → ${outPath}`);
  } else if (item.url) {
    // URL response — fetch the image
    const imgRes = await fetch(item.url);
    if (!imgRes.ok) throw new Error(`Failed to download image: ${imgRes.status}`);
    const buf = Buffer.from(await imgRes.arrayBuffer());
    fs.writeFileSync(outPath, buf);
    console.log(`    ✅  Saved (url) → ${outPath}`);
  } else {
    throw new Error(`Unknown response format: ${JSON.stringify(item)}`);
  }

  return outPath;
}

// Run sequentially to avoid rate limits
async function main() {
  console.log('🧶  Carta TQ — Background Image Generation');
  console.log('    Using model: grok-2-image-1212');
  console.log(`    Output dir:  public/scenes/\n`);

  const results = [];
  for (const scene of SCENES) {
    try {
      const p = await generateImage(scene);
      results.push({ id: scene.id, ok: true, path: p });
      // Small pause between requests
      if (scene.id < SCENES.length) await new Promise(r => setTimeout(r, 1500));
    } catch (err) {
      console.error(`    ❌  Scene ${scene.id} failed: ${err.message}`);
      results.push({ id: scene.id, ok: false, error: err.message });
    }
  }

  console.log('\n── Summary ──');
  for (const r of results) {
    console.log(r.ok
      ? `  ✅  scene-${r.id}.jpg`
      : `  ❌  scene-${r.id}: ${r.error}`
    );
  }

  const failed = results.filter(r => !r.ok);
  if (failed.length) {
    console.log(`\n⚠️   ${failed.length} scene(s) failed. Re-run the script to retry them.`);
    process.exit(1);
  }

  console.log('\n🎉  All 6 backgrounds generated. Deploy or run npm run dev.\n');
}

main();
