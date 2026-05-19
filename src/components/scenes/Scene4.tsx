'use client';

import { motion } from 'framer-motion';
import Forearm from '@/components/svg/Forearm';

const text =
  'Hemos vivido muchísimas cosas que están guardadas en mi memoria. Tal vez no todas fueron buenas por diversas razones, pero créeme que lo bueno pesa muchísimo más. Hoy quiero decirte que me hizo muy feliz el haberte conocido y el haber compartido mi tiempo contigo. Cada beso, cada abrazo y cada lugar que visitamos se quedará para siempre en mí, tanto que llevaré esta letra tatuada en mi brazo por lo que me queda de vida.';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 3.0,
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
      {/* Subtle ambient radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 55%, rgba(212,160,23,0.05) 0%, transparent 60%)',
        }}
      />

      {/* ── DARKNESS VIGNETTE that deepens when the tattoo is drawn ── */}
      {/* Fades in after the forearm appears, making the gold letter the sole focus */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 45%, transparent 28%, rgba(0,0,0,0.96) 72%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, delay: 2.2, ease: 'easeInOut' }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-lg mx-auto px-6 w-full">
        {/* Scene label — fades away as the vignette closes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0] }}
          transition={{ duration: 4, delay: 0.3, times: [0, 0.3, 1] }}
          className="flex items-center gap-3"
        >
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#d4a017]/50" />
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: '#d4a017', letterSpacing: '0.22em', fontFamily: 'var(--font-playfair)' }}
          >
            La Huella Permanente
          </span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#d4a017]/50" />
        </motion.div>

        {/* Forearm — slides in, then the vignette spotlights it */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
          className="w-full max-w-xs md:max-w-sm mx-auto"
        >
          <Forearm className="w-full" />
        </motion.div>

        {/* Golden letter label — appears after the P is drawn */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ duration: 1.5, delay: 4.5 }}
          className="text-sm text-center tracking-widest"
          style={{ color: '#d4a017', fontFamily: 'var(--font-playfair)', letterSpacing: '0.25em' }}
        >
          — P —
        </motion.p>

        {/* Word-by-word narrative */}
        <motion.p
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="text-base md:text-lg leading-relaxed text-center"
          style={{
            color: '#e8e0d0',
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
