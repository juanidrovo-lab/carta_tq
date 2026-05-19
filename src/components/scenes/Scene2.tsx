'use client';

import { motion } from 'framer-motion';
import AmbientField from '@/components/AmbientField';

const text =
  'Me quedé con tantas ganas de seguir hablando contigo que te seguí en Instagram. Cuando aceptaste la solicitud, todo empezó a darse de una manera increíble. Fue como si el universo se alineara: nuestros apellidos, nuestros signos zodiacales, nuestras carreras y hasta ciertos detalles de nuestra historia coincidían demasiado. Para mí, no podía ser solo una casualidad; sentí que la vida trataba de decirme algo muy claro.';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 2.5,
    },
  },
};

const wordVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 0.82,
    transition: { duration: 1.1, ease: 'easeInOut' as const },
  },
};

export default function Scene2() {
  const words = text.split(' ');

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AmbientField
        baseColor="#040714"
        colors={[
          { color: '#102458', size: 130, opacity: 0.6, blur: 100, duration: 80 },
          { color: '#1e1245', size: 100, opacity: 0.55, blur: 90,  duration: 95,  startX: '35%', startY: '15%' },
          { color: '#2a1a08', size: 80,  opacity: 0.45, blur: 100, duration: 110, startX: '60%', startY: '50%' },
          { color: '#0a2040', size: 90,  opacity: 0.5,  blur: 90,  duration: 70,  startX: '10%', startY: '55%' },
        ]}
      />

      {/* Text */}
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
            color: '#e0dbc8',
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
