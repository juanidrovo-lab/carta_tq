'use client';

import { motion } from 'framer-motion';
import SceneBackground from '@/components/SceneBackground';

const text =
  'Noe, todo empezó un primero de diciembre de 2023. Aún recuerdo cómo estabas vestida de negro. Desde el primer instante llamaste mi atención; me pareciste una niña preciosa. En ese momento de mi vida, yo no estaba buscando nada ni a nadie, y las circunstancias en las que nos cruzamos fueron, por decirlo menos, un tanto extrañas. Pero el destino tiene sus formas, y nuestra primera conexión fue empezar a hablar de derecho.';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 13, // text starts well after the crossing happens
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
 * Scene 1 — El Cruce.
 * Two lights (souls) drift on independent curved trajectories through the
 * dark. At ~8s they meet at the center: a soft golden bloom expands. They
 * continue on their paths, but a thread of light now connects them — the
 * spark of attention that became destiny.
 */
export default function Scene1() {
  const words = text.split(' ');

  // Crossing happens at t = 8s into the scene
  const CROSS_T = 8;
  const TOTAL = 32;

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#04030a]">
      <SceneBackground sceneId={1} darkness={0.38} />
      {/* Faint cosmic depth — almost imperceptible drift */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(20,15,40,0.3) 0%, transparent 60%)',
        }}
      />

      {/* The two souls + bloom — rendered inside one SVG so positions are unified */}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="soul-cool" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d8e0ff" stopOpacity="1" />
            <stop offset="25%" stopColor="#7a90c8" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#3a4878" stopOpacity="0.25" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="soul-warm" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff0c4" stopOpacity="1" />
            <stop offset="25%" stopColor="#e8b84b" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#a07820" stopOpacity="0.25" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="bloom" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff4d0" stopOpacity="1" />
            <stop offset="35%" stopColor="#f0c860" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#a06820" stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="soft-blur">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        {/* SOUL A — comes from upper-left, curves through center, exits lower-right */}
        <motion.circle
          r="120"
          fill="url(#soul-cool)"
          filter="url(#soft-blur)"
          initial={{ cx: 80, cy: 200, opacity: 0 }}
          animate={{
            cx:      [80,  300, 500, 700, 920],
            cy:      [200, 350, 500, 650, 800],
            opacity: [0,   0.9, 1,   0.9, 0.5],
          }}
          transition={{
            duration: TOTAL,
            ease: 'easeInOut',
            times: [0, 0.2, CROSS_T / TOTAL, 0.7, 1],
          }}
        />

        {/* SOUL B — comes from lower-right, curves through center, exits upper-left */}
        <motion.circle
          r="120"
          fill="url(#soul-warm)"
          filter="url(#soft-blur)"
          initial={{ cx: 920, cy: 800, opacity: 0 }}
          animate={{
            cx:      [920, 700, 500, 300, 80],
            cy:      [800, 650, 500, 350, 200],
            opacity: [0,   0.9, 1,   0.9, 0.5],
          }}
          transition={{
            duration: TOTAL,
            ease: 'easeInOut',
            times: [0, 0.2, CROSS_T / TOTAL, 0.7, 1],
          }}
        />

        {/* BLOOM at the moment of crossing — appears at t=CROSS_T, expands and fades */}
        <motion.circle
          cx="500"
          cy="500"
          r="200"
          fill="url(#bloom)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.4, 2.6], opacity: [0, 1, 0] }}
          transition={{
            duration: 4.5,
            delay: CROSS_T - 0.4,
            ease: 'easeOut',
            times: [0, 0.35, 1],
          }}
          style={{ transformOrigin: '500px 500px' }}
        />

        {/* THREAD that remains — drawn after the crossing, follows both souls' trajectories */}
        {/* It appears at t=CROSS_T and stretches as the souls separate */}
        <motion.line
          x1="500"
          y1="500"
          x2="500"
          y2="500"
          stroke="#d4a017"
          strokeWidth="1.4"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.6, 0.55, 0.45, 0.35],
            x1: [500, 580, 660, 740, 920],
            y1: [500, 580, 640, 720, 800],
            x2: [500, 420, 340, 260, 80],
            y2: [500, 420, 360, 280, 200],
          }}
          transition={{
            duration: TOTAL - CROSS_T,
            delay: CROSS_T,
            ease: 'easeInOut',
            times: [0, 0.15, 0.4, 0.7, 1],
          }}
        />

        {/* A few drifting particles for cosmic depth */}
        {[
          { cx: 150, cy: 700, r: 2, delay: 0 },
          { cx: 820, cy: 250, r: 1.5, delay: 1.2 },
          { cx: 400, cy: 150, r: 1.8, delay: 2.5 },
          { cx: 700, cy: 880, r: 2, delay: 3.5 },
          { cx: 250, cy: 450, r: 1.5, delay: 4.8 },
        ].map((p, i) => (
          <motion.circle
            key={i}
            cx={p.cx}
            cy={p.cy}
            r={p.r}
            fill="#d4a017"
            animate={{ opacity: [0, 0.5, 0.2, 0.5, 0] }}
            transition={{
              duration: 8,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>

      {/* Text — appears AFTER the crossing, low in the frame */}
      <div className="absolute inset-x-0 bottom-0 px-8 pb-12 md:pb-20 flex justify-center">
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
