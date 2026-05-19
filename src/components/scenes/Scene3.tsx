'use client';

import { motion } from 'framer-motion';
import VanGoghBackground from '@/components/svg/VanGoghBackground';
import SilhouetteCouple from '@/components/svg/SilhouetteCouple';

const text =
  'Desde ese primer momento me encantó tu forma de ser. Eres alegre, ocurrida, risueña y, además, absolutamente hermosa. Poco a poco te fuiste ganando mi corazón. Es cierto que tuvimos nuestros altos y bajos, idas y venidas constantes, y un par de problemas con terceros, pero hace ya casi un año todo cambió. Ya no solo me gustabas y me parecías linda; me enamoré profundamente de ti. Me enamoré de esos ojos preciosos y de la forma en que alegras mis mañanas, mis noches, mis días y mi vida en general.';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 1.8,
    },
  },
};

const wordVariant = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' as const },
  },
};

export default function Scene3() {
  const words = text.split(' ');

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between overflow-hidden bg-[#06080f]">
      {/* Van Gogh swirling background */}
      <div className="absolute inset-0">
        <VanGoghBackground className="w-full h-full" />
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

      {/* Silhouette couple in center */}
      <div className="relative z-10 w-full max-w-sm mx-auto px-4 mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <SilhouetteCouple className="w-full" />
        </motion.div>
      </div>

      {/* Glassmorphism text container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-lg mx-auto px-4 pb-6"
        style={{
          background: 'rgba(6, 8, 15, 0.65)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderTop: '1px solid rgba(212, 160, 23, 0.2)',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '12px 12px 0 0',
          padding: '16px 20px 20px',
        }}
      >
        {/* Decorative top bar */}
        <div className="flex items-center gap-2 mb-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4a017]/40 to-transparent" />
          <span className="text-[10px] tracking-widest uppercase" style={{ color: '#d4a017', opacity: 0.7 }}>
            El Impresionismo
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#d4a017]/40 to-transparent" />
        </div>

        <motion.p
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="text-sm md:text-base leading-relaxed text-center"
          style={{
            color: '#e8e0d0',
            fontFamily: 'var(--font-playfair)',
            textShadow: '0 2px 6px rgba(0,0,0,0.9)',
            lineHeight: '1.8',
          }}
        >
          {words.map((word, i) => (
            <motion.span key={i} variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.28em' }}>
              {word}
            </motion.span>
          ))}
        </motion.p>
      </motion.div>
    </div>
  );
}
