'use client';

import { motion } from 'framer-motion';

const text =
  'Desde ese primer momento me encantó tu forma de ser. Eres alegre, ocurrida, risueña y, además, absolutamente hermosa. Poco a poco te fuiste ganando mi corazón. Tuvimos altos y bajos, idas y venidas constantes, y un par de problemas con terceros, pero hace ya casi un año todo cambió. Ya no solo me gustabas; me enamoré profundamente de ti. Me enamoré de esos ojos preciosos y de la forma en que alegras mis mañanas, mis noches, mis días y mi vida en general.';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 4,
    },
  },
};

const wordVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 0.88,
    transition: { duration: 1.2, ease: 'easeInOut' as const },
  },
};

/**
 * Scene 3 — El Amanecer.
 * A horizon line that rocks violently at first (the ups and downs, the
 * comings and goings) and progressively smoothes into a calm sea. The sky
 * shifts hue from cold violet/blue to warm gold/orange. A sun rises slowly
 * from below the horizon — love that consolidates after turbulence.
 */
export default function Scene3() {
  const words = text.split(' ');

  // Sequence of horizon paths — first chaotic, then progressively flatter.
  // Each path is a wave drawn from x=0 to x=1000, centered around y=600.
  // Last paths approach a near-flat horizon.
  const horizonPaths = [
    // turbulent (early)
    'M 0 600 Q 100 480 200 620 Q 300 740 400 540 Q 500 460 600 660 Q 700 760 800 540 Q 900 460 1000 620 L 1000 1000 L 0 1000 Z',
    'M 0 600 Q 100 520 200 630 Q 300 720 400 560 Q 500 480 600 650 Q 700 730 800 560 Q 900 490 1000 620 L 1000 1000 L 0 1000 Z',
    // medium
    'M 0 605 Q 100 560 200 615 Q 300 670 400 580 Q 500 540 600 625 Q 700 670 800 580 Q 900 540 1000 610 L 1000 1000 L 0 1000 Z',
    // calmer
    'M 0 610 Q 100 590 200 615 Q 300 640 400 600 Q 500 585 600 615 Q 700 640 800 600 Q 900 585 1000 610 L 1000 1000 L 0 1000 Z',
    // almost flat — the sea has settled
    'M 0 615 Q 100 608 200 615 Q 300 622 400 612 Q 500 608 600 615 Q 700 622 800 612 Q 900 608 1000 615 L 1000 1000 L 0 1000 Z',
  ];

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Sky — color shifts from cold violet/blue to warm gold/orange */}
      <motion.div
        className="absolute inset-0"
        initial={{
          background:
            'linear-gradient(to bottom, #1a0f3a 0%, #221545 35%, #1a1530 70%, #0a0820 100%)',
        }}
        animate={{
          background: [
            'linear-gradient(to bottom, #1a0f3a 0%, #221545 35%, #1a1530 70%, #0a0820 100%)',
            'linear-gradient(to bottom, #2a1240 0%, #3a1a48 35%, #2a1a30 70%, #0c0820 100%)',
            'linear-gradient(to bottom, #3d1840 0%, #5a2440 35%, #3a1a30 70%, #100820 100%)',
            'linear-gradient(to bottom, #4a2440 0%, #803a30 35%, #6a2a20 70%, #1a0810 100%)',
            'linear-gradient(to bottom, #5e3020 0%, #b0601a 35%, #803a18 70%, #2a0a08 100%)',
            'linear-gradient(to bottom, #6a3a10 0%, #d4a017 35%, #a06820 70%, #3a1a08 100%)',
          ],
        }}
        transition={{
          duration: 34,
          ease: 'easeInOut',
          times: [0, 0.18, 0.36, 0.55, 0.78, 1],
        }}
      />

      {/* Diffuse atmospheric glow that strengthens as dawn arrives */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.1, 0.3, 0.55] }}
        transition={{ duration: 34, times: [0, 0.4, 0.7, 1], ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(ellipse at 50% 70%, rgba(240,180,80,0.5) 0%, transparent 55%)',
        }}
      />

      {/* The sun — rises slowly from below the horizon */}
      <motion.div
        className="absolute left-1/2 pointer-events-none"
        style={{
          width: '34vmin',
          height: '34vmin',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,235,160,1) 0%, rgba(240,180,80,0.85) 30%, rgba(200,110,40,0.4) 60%, transparent 80%)',
          filter: 'blur(8px)',
          translate: '-50% 0',
          mixBlendMode: 'screen',
        }}
        initial={{ top: '110%', opacity: 0 }}
        animate={{
          top: ['110%', '100%', '88%', '72%', '58%'],
          opacity: [0, 0.4, 0.75, 0.95, 1],
        }}
        transition={{
          duration: 34,
          ease: 'easeOut',
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
      />

      {/* Horizon line / sea — morphs from chaotic to calm */}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="sea-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#08060c" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        <motion.path
          fill="url(#sea-grad)"
          initial={{ d: horizonPaths[0] }}
          animate={{ d: horizonPaths }}
          transition={{
            duration: 34,
            ease: 'easeInOut',
            times: [0, 0.18, 0.42, 0.7, 1],
          }}
        />

        {/* Reflection thread on the water — appears as the sea calms */}
        <motion.path
          d="M 350 700 Q 500 690 650 700"
          fill="none"
          stroke="#f0c860"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: [0, 0, 0.5, 0.7], pathLength: [0, 0, 1, 1] }}
          transition={{
            duration: 34,
            ease: 'easeInOut',
            times: [0, 0.55, 0.85, 1],
          }}
        />
      </svg>

      {/* Text — sits in the upper third, above the rising sun */}
      <div className="absolute inset-x-0 top-[7%] px-8 flex justify-center">
        <motion.p
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="text-center max-w-xl mx-auto"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontWeight: 300,
            fontSize: 'clamp(0.9rem, 2.3vw, 1.15rem)',
            color: '#f4eadb',
            letterSpacing: '0.06em',
            lineHeight: 2,
            textShadow:
              '0 1px 18px rgba(0,0,0,1), 0 0 36px rgba(0,0,0,0.9)',
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariant}
              style={{ display: 'inline-block', marginRight: '0.32em' }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
      </div>
    </div>
  );
}
