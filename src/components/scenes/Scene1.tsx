'use client';

import { motion } from 'framer-motion';
import AmbientField from '@/components/AmbientField';

const text =
  'Noe, todo empezó un primero de diciembre de 2023. Aún recuerdo cómo estabas vestida de negro. Desde el primer instante llamaste mi atención; me pareciste una niña preciosa. En ese momento de mi vida, yo no estaba buscando nada ni a nadie, y las circunstancias en las que nos cruzamos fueron, por decirlo menos, un tanto extrañas. Pero el destino tiene sus formas, y nuestra primera conexión fue empezar a hablar de derecho.';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.085,
      delayChildren: 4.2,
    },
  },
};

const wordVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 0.82,
    transition: { duration: 1.2, ease: 'easeInOut' as const },
  },
};

export default function Scene1() {
  const words = text.split(' ');

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Dim center light: a single soft, slow-breathing pool of warmth */}
      <AmbientField
        baseColor="#050410"
        colors={[
          { color: '#1a1230', size: 140, opacity: 0.5, blur: 110, duration: 90 },
          { color: '#2a1a0a', size: 80,  opacity: 0.55, blur: 90,  duration: 70, startX: '20%', startY: '25%' },
          { color: '#3a2410', size: 60,  opacity: 0.4,  blur: 80,  duration: 100, startX: '40%', startY: '35%' },
        ]}
      />

      {/* Very subtle pulsing central halo — the "candle" the memory is forming around */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(212,160,23,0.10) 0%, rgba(212,160,23,0.04) 18%, transparent 45%)',
        }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Text — appears like a shadow projected on the fabric, low opacity, wide tracking */}
      <div className="absolute inset-0 flex items-center justify-center px-8">
        <motion.p
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="text-center max-w-xl mx-auto"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontWeight: 300,
            fontSize: 'clamp(0.95rem, 2.4vw, 1.2rem)',
            color: '#e6dccb',
            letterSpacing: '0.06em',
            lineHeight: 2.05,
            textShadow:
              '0 1px 14px rgba(0,0,0,0.95), 0 0 30px rgba(0,0,0,0.7)',
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
