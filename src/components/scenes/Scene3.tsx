'use client';

import { motion } from 'framer-motion';
import AmbientField from '@/components/AmbientField';

const text =
  'Desde ese primer momento me encantó tu forma de ser. Eres alegre, ocurrida, risueña y, además, absolutamente hermosa. Poco a poco te fuiste ganando mi corazón. Tuvimos altos y bajos, idas y venidas constantes, y un par de problemas con terceros, pero hace ya casi un año todo cambió. Ya no solo me gustabas; me enamoré profundamente de ti. Me enamoré de esos ojos preciosos y de la forma en que alegras mis mañanas, mis noches, mis días y mi vida en general.';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 2.8,
    },
  },
};

const wordVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 0.85,
    transition: { duration: 1.3, ease: 'easeInOut' as const },
  },
};

/**
 * Scene 3 — "El Impresionismo".
 * No drawings, no figures, no defined shapes.
 * Just a slow-rotating field of four color points blended via mix-blend-mode: screen.
 * Night blue, dark violet, antique gold, burnt orange — a moving mass of color.
 */
export default function Scene3() {
  const words = text.split(' ');

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AmbientField
        baseColor="#03020a"
        colors={[
          // Night blue
          { color: '#15225c', size: 140, opacity: 0.78, blur: 100, duration: 75,  startX: '-10%', startY: '-10%' },
          // Dark violet
          { color: '#3a155a', size: 130, opacity: 0.75, blur: 95,  duration: 95,  startX: '40%',  startY: '0%'   },
          // Antique gold
          { color: '#8a5e10', size: 110, opacity: 0.55, blur: 100, duration: 110, startX: '10%',  startY: '45%'  },
          // Burnt orange
          { color: '#7a2a08', size: 100, opacity: 0.5,  blur: 110, duration: 130, startX: '55%',  startY: '50%'  },
        ]}
      />

      {/* A second, slow counter-rotating layer for depth — uses gentle rotation transform */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 65%, rgba(180,90,20,0.18) 0%, transparent 55%), radial-gradient(ellipse at 75% 30%, rgba(70,30,120,0.20) 0%, transparent 55%)',
          mixBlendMode: 'screen',
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 220, repeat: Infinity, ease: 'linear' }}
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
            color: '#efe5cd',
            letterSpacing: '0.07em',
            lineHeight: 2.05,
            textShadow:
              '0 1px 16px rgba(0,0,0,0.98), 0 0 36px rgba(0,0,0,0.85)',
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
