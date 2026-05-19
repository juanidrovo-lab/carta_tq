'use client';

import { motion } from 'framer-motion';
import GlassesDrawing from '@/components/svg/GlassesDrawing';

const text =
  'Noe, todo empezó un primero de diciembre de 2023. Aún recuerdo cómo estabas vestida de negro y todavía usabas esos lentes. Desde el primer instante llamaste mi atención; me pareciste una niña preciosa. La verdad es que, en ese momento de mi vida, yo no estaba buscando nada ni a nadie, y las circunstancias en las que nos cruzamos fueron, por decirlo menos, un tanto extrañas. Pero el destino tiene sus formas, y nuestra primera conexión fue empezar a hablar de derecho.';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 2.8,
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

export default function Scene1() {
  const words = text.split(' ');

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#080810] overflow-hidden">
      {/* Subtle radial background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(26,26,46,0.8) 0%, transparent 70%)',
        }}
      />

      {/* Small floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 2 + (i % 3),
            height: 2 + (i % 3),
            backgroundColor: i % 2 === 0 ? '#d4a017' : '#3a6bc8',
            left: `${10 + i * 10}%`,
            top: `${15 + (i * 13) % 70}%`,
            opacity: 0.25,
          }}
          animate={{
            y: [0, -12, -6, 0],
            opacity: [0.2, 0.5, 0.3, 0.2],
          }}
          transition={{
            duration: 4 + i * 0.5,
            delay: i * 0.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-lg mx-auto px-6 w-full">
        {/* Glasses drawing SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="w-48 md:w-64"
        >
          <GlassesDrawing className="w-full" color="#e8b84b" strokeWidth={2.5} />
        </motion.div>

        {/* Scene label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xs tracking-widest uppercase"
          style={{ color: '#d4a017', letterSpacing: '0.2em', fontFamily: 'var(--font-playfair)' }}
        >
          1 de diciembre de 2023
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
