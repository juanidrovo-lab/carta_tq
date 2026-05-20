'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import SceneBackground from '@/components/SceneBackground';

const text =
  'Me quedé con tantas ganas de seguir hablando contigo que te seguí en Instagram. Cuando aceptaste la solicitud, todo empezó a darse de una manera increíble. Fue como si el universo se alineara: nuestros apellidos, nuestros signos zodiacales, nuestras carreras y hasta ciertos detalles de nuestra historia coincidían demasiado. Para mí, no podía ser solo una casualidad; sentí que la vida trataba de decirme algo muy claro.';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 3.0,
    },
  },
};

const wordVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 0.85,
    transition: { duration: 1.1, ease: 'easeInOut' as const },
  },
};

/**
 * Scene 2 — La Alineación.
 * Scattered points of light, each placed at a random position in dark space,
 * one by one migrate onto a single horizontal axis crossing the screen.
 * The coincidences settling into pattern. When all have arrived, the axis
 * pulses softly — the universe has spoken.
 */
export default function Scene2() {
  const words = text.split(' ');

  // 14 points: random start positions + ordered targets on a central axis
  const points = useMemo(() => {
    const seeded = [
      { sx: 12, sy: 22 }, { sx: 88, sy: 78 }, { sx: 35, sy: 88 },
      { sx: 72, sy: 14 }, { sx: 18, sy: 65 }, { sx: 92, sy: 38 },
      { sx: 50, sy: 8  }, { sx: 8,  sy: 50 }, { sx: 65, sy: 92 },
      { sx: 28, sy: 32 }, { sx: 82, sy: 60 }, { sx: 42, sy: 75 },
      { sx: 58, sy: 25 }, { sx: 22, sy: 82 },
    ];
    // Targets evenly spaced on the central horizontal axis (y = 50%)
    return seeded.map((p, i) => ({
      ...p,
      tx: 6 + (88 / (seeded.length - 1)) * i,
      ty: 50,
      delay: 3 + i * 1.4, // staggered arrival, last one ~22s
    }));
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#04050e]">
      <SceneBackground sceneId={2} darkness={0.42} />
      {/* Quiet cosmic backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(20,30,70,0.25) 0%, transparent 65%)',
        }}
      />

      {/* Migrating points */}
      {points.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 10,
            height: 10,
            background:
              'radial-gradient(circle, rgba(255,235,170,1) 0%, rgba(212,160,23,0.5) 40%, transparent 70%)',
            filter: 'blur(2px)',
            boxShadow: '0 0 14px rgba(212,160,23,0.6)',
            left: `${p.sx}%`,
            top: `${p.sy}%`,
            translate: '-50% -50%',
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: [0, 0.5, 0.5, 1, 0.85],
            scale: [0.6, 1, 1, 1.6, 1.1],
            left: [`${p.sx}%`, `${p.sx}%`, `${p.tx}%`, `${p.tx}%`, `${p.tx}%`],
            top:  [`${p.sy}%`, `${p.sy}%`, `${p.ty}%`, `${p.ty}%`, `${p.ty}%`],
          }}
          transition={{
            duration: 24,
            delay: 0,
            ease: 'easeInOut',
            times: [
              0,
              p.delay / 24 - 0.05,
              p.delay / 24,
              Math.min(p.delay / 24 + 0.02, 0.99),
              1,
            ],
          }}
        />
      ))}

      {/* The luminous axis — appears subtly once most points are aligned */}
      <motion.div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: '50%',
          height: 1,
          background:
            'linear-gradient(to right, transparent 0%, rgba(212,160,23,0.55) 50%, transparent 100%)',
          boxShadow: '0 0 18px rgba(212,160,23,0.4)',
          translate: '0 -50%',
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: [0, 0.4, 0.65] }}
        transition={{ duration: 8, delay: 18, ease: 'easeInOut' }}
      />

      {/* Final alignment pulse — when the constellation completes */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 4, delay: 23, ease: 'easeOut' }}
      >
        <div
          style={{
            width: '70vw',
            height: '6vh',
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse, rgba(240,200,90,0.5) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
      </motion.div>

      {/* Text */}
      <div className="absolute inset-x-0 top-[8%] px-8 flex justify-center">
        <motion.p
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="text-center max-w-xl mx-auto"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontWeight: 300,
            fontSize: 'clamp(0.9rem, 2.3vw, 1.15rem)',
            color: '#e6dccb',
            letterSpacing: '0.06em',
            lineHeight: 2,
            textShadow:
              '0 1px 16px rgba(0,0,0,0.98), 0 0 30px rgba(0,0,0,0.85)',
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
