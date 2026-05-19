'use client';

import { motion } from 'framer-motion';

const text =
  'Noe, todo empezó un primero de diciembre de 2023. Aún recuerdo cómo estabas vestida de negro. Desde el primer instante llamaste mi atención; me pareciste una niña preciosa. La verdad es que, en ese momento de mi vida, yo no estaba buscando nada ni a nadie, y las circunstancias en las que nos cruzamos fueron, por decirlo menos, un tanto extrañas. Pero el destino tiene sus formas, y nuestra primera conexión fue empezar a hablar de derecho.';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 3.6,
    },
  },
};

const wordVariant = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

// Each thread segment: a cubic Bézier that picks up where the last ended
const threadSegments = [
  { d: 'M 220 180 C 200 160, 160 175, 150 155', delay: 0.1, color: '#c8a84b' },
  { d: 'M 150 155 C 140 135, 170 120, 185 100', delay: 0.9, color: '#b89030' },
  { d: 'M 185 100 C 200 80, 240 90, 255 110', delay: 1.7, color: '#d4a017' },
  { d: 'M 255 110 C 270 130, 260 155, 240 165', delay: 2.5, color: '#c8a84b' },
  { d: 'M 240 165 C 220 175, 195 170, 185 188', delay: 3.2, color: '#a07820' },
  { d: 'M 185 188 C 175 205, 190 220, 210 215', delay: 3.9, color: '#d4a017' },
];

export default function Scene1() {
  const words = text.split(' ');

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#06060e] overflow-hidden">
      {/* Very subtle texture layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 35%, rgba(20,18,40,0.7) 0%, transparent 68%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-10 max-w-lg mx-auto px-6 w-full">
        {/* Abstract weaving thread – SVG canvas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          className="w-full"
          style={{ maxWidth: 320 }}
        >
          <svg
            viewBox="0 0 440 320"
            style={{ width: '100%', overflow: 'visible' }}
          >
            <defs>
              <filter id="thread-glow-s1">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {threadSegments.map((seg, i) => (
              <motion.path
                key={i}
                d={seg.d}
                fill="none"
                stroke={seg.color}
                strokeWidth={i % 2 === 0 ? 2.2 : 1.6}
                strokeLinecap="round"
                filter="url(#thread-glow-s1)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.85 }}
                transition={{
                  pathLength: { duration: 0.9, delay: seg.delay, ease: 'easeInOut' },
                  opacity: { duration: 0.4, delay: seg.delay },
                }}
              />
            ))}

            {/* Glowing origin dot */}
            <motion.circle
              cx="220"
              cy="180"
              r="3"
              fill="#f0c040"
              filter="url(#thread-glow-s1)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0.6], scale: [0, 1.4, 1] }}
              transition={{ duration: 1.2, delay: 0, ease: 'easeOut' }}
            />

            {/* Subtle second thread — blue accent */}
            <motion.path
              d="M 220 180 C 250 200, 280 185, 295 165"
              fill="none"
              stroke="#3a5ca8"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeDasharray="5 4"
              filter="url(#thread-glow-s1)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ pathLength: { duration: 1.2, delay: 0.5, ease: 'easeInOut' }, opacity: { duration: 0.4, delay: 0.5 } }}
            />
            <motion.path
              d="M 295 165 C 310 145, 300 120, 280 115"
              fill="none"
              stroke="#3a5ca8"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeDasharray="5 4"
              filter="url(#thread-glow-s1)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ pathLength: { duration: 1, delay: 1.6, ease: 'easeInOut' }, opacity: { duration: 0.4, delay: 1.6 } }}
            />
          </svg>
        </motion.div>

        {/* Date label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.2, delay: 2.0 }}
          style={{
            color: '#d4a017',
            letterSpacing: '0.22em',
            fontFamily: 'var(--font-playfair)',
            fontSize: '0.68rem',
            textTransform: 'uppercase',
            marginTop: '-1.5rem',
          }}
        >
          1 de diciembre · 2023
        </motion.p>

        {/* Word-by-word narrative */}
        <motion.p
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="text-base md:text-lg text-center"
          style={{
            color: '#ddd6c8',
            fontFamily: 'var(--font-playfair)',
            textShadow: '0 2px 10px rgba(0,0,0,0.9)',
            lineHeight: '1.9',
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariant}
              style={{ display: 'inline-block', marginRight: '0.28em' }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
      </div>
    </div>
  );
}
