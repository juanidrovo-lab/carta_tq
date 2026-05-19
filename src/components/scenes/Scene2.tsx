'use client';

import { motion } from 'framer-motion';
import ThreadWeave from '@/components/svg/ThreadWeave';

const text =
  'Me quedé con tantas ganas de seguir hablando contigo que te seguí en Instagram. Cuando aceptaste la solicitud, todo empezó a darse de una manera increíble. Fue como si el universo se alineara: nuestros apellidos, nuestros signos zodiacales, nuestras carreras y hasta ciertos detalles de nuestra historia coincidían demasiado. Para mí, no podía ser solo una casualidad; sentí que la vida trataba de decirme algo muy claro.';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 2.2,
    },
  },
};

const wordVariant = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

// Zodiac constellation dots
const constellationDots = [
  { cx: 30, cy: 60 },
  { cx: 55, cy: 40 },
  { cx: 80, cy: 55 },
  { cx: 105, cy: 35 },
  { cx: 130, cy: 50 },
  { cx: 155, cy: 30 },
  { cx: 180, cy: 48 },
  { cx: 200, cy: 25 },
];

const constellationLines = [
  { x1: 30, y1: 60, x2: 55, y2: 40 },
  { x1: 55, y1: 40, x2: 80, y2: 55 },
  { x1: 80, y1: 55, x2: 105, y2: 35 },
  { x1: 105, y1: 35, x2: 130, y2: 50 },
  { x1: 130, y1: 50, x2: 155, y2: 30 },
  { x1: 155, y1: 30, x2: 180, y2: 48 },
  { x1: 180, y1: 48, x2: 200, y2: 25 },
];

export default function Scene2() {
  const words = text.split(' ');

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#080c18] overflow-hidden">
      {/* Deep blue background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 30%, rgba(58,107,200,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(212,160,23,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Constellation SVG */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute top-6 left-1/2"
        style={{ transform: 'translateX(-50%)' }}
      >
        <svg viewBox="0 0 230 80" width="230" height="80">
          {/* Lines */}
          {constellationLines.map((line, i) => (
            <motion.line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="#3a6bc8"
              strokeWidth="0.8"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
            />
          ))}
          {/* Dots */}
          {constellationDots.map((dot, i) => (
            <motion.circle
              key={i}
              cx={dot.cx}
              cy={dot.cy}
              r={i === 0 || i === 7 ? 3.5 : 2}
              fill={i === 0 || i === 7 ? '#f0c040' : '#6b9ee8'}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.4, 1], opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.12 }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Thread weave SVG */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="w-full max-w-sm mx-auto"
        style={{ height: '80px' }}
      >
        <ThreadWeave width={320} height={80} className="w-full h-full" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-lg mx-auto px-6 w-full mt-2">
        {/* Universe alignment label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center gap-3"
        >
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4a017]" />
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: '#d4a017', letterSpacing: '0.22em', fontFamily: 'var(--font-playfair)' }}
          >
            El universo habló
          </span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#d4a017]" />
        </motion.div>

        {/* Word-by-word text */}
        <motion.p
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="text-base md:text-lg leading-relaxed text-center"
          style={{
            color: '#e8e0d0',
            fontFamily: 'var(--font-playfair)',
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            lineHeight: '1.85',
          }}
        >
          {words.map((word, i) => (
            <motion.span key={i} variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.28em' }}>
              {word}
            </motion.span>
          ))}
        </motion.p>

        {/* Floating zodiac sparkles */}
        {['♈', '♒', '⭐', '✦', '✧'].map((sym, i) => (
          <motion.span
            key={i}
            className="absolute pointer-events-none select-none text-xs"
            style={{
              color: i % 2 === 0 ? '#d4a017' : '#6b9ee8',
              left: `${5 + i * 20}%`,
              bottom: `${10 + (i * 8) % 25}%`,
              opacity: 0,
            }}
            animate={{
              opacity: [0, 0.5, 0],
              y: [-5, -20, -35],
            }}
            transition={{
              duration: 3,
              delay: 3 + i * 0.8,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          >
            {sym}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
