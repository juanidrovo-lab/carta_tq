'use client';

import { motion } from 'framer-motion';
import Forearm from '@/components/svg/Forearm';

const text =
  'Hemos vivido muchísimas cosas que están guardadas en mi memoria. Tal vez no todas fueron buenas por diversas razones, pero créeme que lo bueno pesa muchísimo más. Hoy quiero decirte que me hizo muy feliz el haberte conocido y el haber compartido mi tiempo contigo. Cada beso, cada abrazo y cada lugar que visitamos se quedará para siempre en mí, tanto que llevaré esta letra tatuada en mi brazo por lo que me queda de vida.';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 3.2,
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

export default function Scene4() {
  const words = text.split(' ');

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#080a10] overflow-hidden">
      {/* Background – calmed, darker */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 60%, rgba(212,160,23,0.06) 0%, transparent 65%)',
        }}
      />

      {/* Subtle horizontal gradient at top */}
      <div
        className="absolute top-0 left-0 right-0 h-24"
        style={{
          background: 'linear-gradient(to bottom, rgba(26,42,94,0.2), transparent)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-lg mx-auto px-6 w-full">
        {/* Tattoo scene label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex items-center gap-3"
        >
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#d4a017]/60" />
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: '#d4a017', letterSpacing: '0.22em', fontFamily: 'var(--font-playfair)' }}
          >
            La Huella Permanente
          </span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#d4a017]/60" />
        </motion.div>

        {/* Forearm SVG with tattoo */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
          className="w-full max-w-xs md:max-w-sm mx-auto"
        >
          <Forearm className="w-full" />
        </motion.div>

        {/* Golden letter highlight text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 4.2 }}
          className="text-xs text-center tracking-widest"
          style={{ color: '#d4a017', fontFamily: 'var(--font-playfair)', letterSpacing: '0.18em' }}
        >
          — N —
        </motion.p>

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
      </div>
    </div>
  );
}
