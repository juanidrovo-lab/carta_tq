'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

const text =
  'Hemos vivido muchísimas cosas que están guardadas en mi memoria. Tal vez no todas fueron buenas, pero lo bueno pesa muchísimo más. Hoy quiero decirte que me hizo muy feliz el haberte conocido y el haber compartido mi tiempo contigo. Cada beso, cada abrazo y cada lugar que visitamos se quedará para siempre en mí, tanto que llevaré esta letra tatuada en mi brazo por lo que me queda de vida.';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 4.5,
    },
  },
};

const wordVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 0.85,
    transition: { duration: 1.2, ease: 'easeInOut' as const },
  },
};

/**
 * Scene 4 — La Cristalización.
 * Motes of light (memories) drift through dark space and are pulled toward
 * the center. They accumulate inside the silhouette of the letter P,
 * gradually causing it to crystallize as a permanent golden glow filtered
 * through the dark fabric.
 */
export default function Scene4() {
  const words = text.split(' ');

  // 28 memory motes — each has a random start position, a target inside
  // the P silhouette, and a staggered arrival time.
  // P bounds (in % of viewport): roughly x 38–58, y 22–58
  const motes = useMemo(() => {
    const seeded = [
      { sx: 5,  sy: 12, tx: 44, ty: 32 }, { sx: 92, sy: 18, tx: 48, ty: 28 },
      { sx: 18, sy: 88, tx: 42, ty: 42 }, { sx: 78, sy: 92, tx: 50, ty: 50 },
      { sx: 8,  sy: 50, tx: 46, ty: 38 }, { sx: 95, sy: 60, tx: 52, ty: 34 },
      { sx: 30, sy: 8,  tx: 40, ty: 50 }, { sx: 70, sy: 6,  tx: 54, ty: 30 },
      { sx: 22, sy: 75, tx: 38, ty: 28 }, { sx: 82, sy: 80, tx: 50, ty: 46 },
      { sx: 12, sy: 30, tx: 44, ty: 54 }, { sx: 88, sy: 35, tx: 46, ty: 25 },
      { sx: 50, sy: 95, tx: 42, ty: 36 }, { sx: 55, sy: 4,  tx: 52, ty: 42 },
      { sx: 15, sy: 62, tx: 48, ty: 50 }, { sx: 86, sy: 70, tx: 40, ty: 40 },
      { sx: 38, sy: 18, tx: 50, ty: 28 }, { sx: 65, sy: 88, tx: 46, ty: 30 },
      { sx: 26, sy: 42, tx: 42, ty: 48 }, { sx: 72, sy: 22, tx: 54, ty: 34 },
      { sx: 3,  sy: 78, tx: 44, ty: 40 }, { sx: 96, sy: 28, tx: 48, ty: 38 },
      { sx: 42, sy: 82, tx: 40, ty: 46 }, { sx: 58, sy: 12, tx: 50, ty: 56 },
      { sx: 33, sy: 60, tx: 46, ty: 28 }, { sx: 64, sy: 48, tx: 42, ty: 32 },
      { sx: 19, sy: 16, tx: 52, ty: 50 }, { sx: 80, sy: 50, tx: 44, ty: 38 },
    ];
    return seeded.map((m, i) => ({
      ...m,
      delay: 0.6 + i * 0.32, // last mote arrives around 9.5s
      size: 4 + (i % 3) * 1.2,
    }));
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#04030a]">
      {/* Deep ambient warmth — the memory-space */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 38%, rgba(80,40,10,0.4) 0%, rgba(20,8,20,0.6) 45%, transparent 80%)',
        }}
      />

      {/* Drifting memory motes — converge onto P */}
      {motes.map((m, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: m.size,
            height: m.size,
            background:
              'radial-gradient(circle, rgba(255,235,170,1) 0%, rgba(212,160,23,0.6) 50%, transparent 75%)',
            boxShadow: '0 0 10px rgba(212,160,23,0.6)',
            filter: 'blur(0.6px)',
            left: `${m.sx}%`,
            top: `${m.sy}%`,
            translate: '-50% -50%',
          }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{
            opacity: [0, 0.4, 0.9, 0.7, 0.3],
            scale: [0.4, 1, 1.2, 1, 0.7],
            left: [`${m.sx}%`, `${m.sx}%`, `${m.tx}%`, `${m.tx}%`, `${m.tx}%`],
            top: [`${m.sy}%`, `${m.sy}%`, `${m.ty}%`, `${m.ty}%`, `${m.ty}%`],
          }}
          transition={{
            duration: 18,
            delay: 0,
            ease: 'easeInOut',
            times: [
              0,
              Math.max(0.01, m.delay / 18 - 0.04),
              m.delay / 18,
              Math.min(0.99, m.delay / 18 + 0.18),
              1,
            ],
          }}
        />
      ))}

      {/* Dark layer with the P cut out — fades in just before motes finish gathering */}
      <motion.svg
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1000 1000"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0.95] }}
        transition={{ duration: 8, delay: 6, ease: 'easeInOut', times: [0, 0.4, 1] }}
      >
        <defs>
          <mask id="p-letter-cutout-s4" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1000">
            <rect width="1000" height="1000" fill="white" />
            <text
              x="500"
              y="430"
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-playfair), Playfair Display, Georgia, serif"
              fontSize="500"
              fontStyle="italic"
              fontWeight="500"
              fill="black"
            >
              P
            </text>
          </mask>
        </defs>
        <rect
          width="1000"
          height="1000"
          fill="rgba(2, 2, 8, 0.97)"
          mask="url(#p-letter-cutout-s4)"
        />
      </motion.svg>

      {/* The P solidifies — golden glow filtered through the cutout */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex justify-center"
        style={{ alignItems: 'flex-start', paddingTop: '10%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0.95] }}
        transition={{ duration: 6, delay: 9, ease: 'easeInOut', times: [0, 0.5, 1] }}
      >
        <div
          style={{
            width: '34vmin',
            height: '34vmin',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255,225,140,0.55) 0%, rgba(212,160,23,0.25) 45%, transparent 70%)',
            filter: 'blur(35px)',
            mixBlendMode: 'screen',
          }}
        />
      </motion.div>

      {/* Permanent heartbeat — the tattoo, alive */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex justify-center"
        style={{ alignItems: 'flex-start', paddingTop: '11%' }}
        animate={{ opacity: [0.6, 0.95, 0.6], scale: [1, 1.04, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 12 }}
      >
        <div
          style={{
            width: '22vmin',
            height: '22vmin',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255,210,110,0.4) 0%, transparent 65%)',
            filter: 'blur(28px)',
            mixBlendMode: 'screen',
          }}
        />
      </motion.div>

      {/* Text — lower band, clear of the P spotlight */}
      <div className="absolute inset-x-0 bottom-0 px-8 pb-10 md:pb-16 flex justify-center">
        <motion.p
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="text-center max-w-xl mx-auto"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontWeight: 300,
            fontSize: 'clamp(0.85rem, 2.2vw, 1.1rem)',
            color: '#ebd9b0',
            letterSpacing: '0.06em',
            lineHeight: 1.95,
            textShadow:
              '0 1px 18px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,0.92)',
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
