'use client';

import { motion } from 'framer-motion';
import AmbientField from '@/components/AmbientField';

const text =
  'Hemos vivido muchísimas cosas que están guardadas en mi memoria. Tal vez no todas fueron buenas, pero lo bueno pesa muchísimo más. Hoy quiero decirte que me hizo muy feliz el haberte conocido y el haber compartido mi tiempo contigo. Cada beso, cada abrazo y cada lugar que visitamos se quedará para siempre en mí, tanto que llevaré esta letra tatuada en mi brazo por lo que me queda de vida.';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 6.5, // Text begins after the P has been revealed
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

/**
 * Scene 4 — "La Huella Permanente".
 * The letter "P" is the ONLY sharp element in the experience. It is revealed
 * via SVG mask: a dark layer covers the screen, and the silhouette of the
 * letter is cut out so a glowing gold light shines through it.
 * No strokes, no linear drawings. Pure mask reveal over moving ambient light.
 */
export default function Scene4() {
  const words = text.split(' ');

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Warm gold ambient field behind the mask */}
      <AmbientField
        baseColor="#0a0604"
        colors={[
          { color: '#d4a017', size: 90,  opacity: 0.7,  blur: 80,  duration: 50, startX: '30%', startY: '15%' },
          { color: '#a05810', size: 110, opacity: 0.55, blur: 100, duration: 80, startX: '40%', startY: '25%' },
          { color: '#5a2008', size: 100, opacity: 0.4,  blur: 110, duration: 110, startX: '55%', startY: '40%' },
        ]}
      />

      {/* Deep darkening over the field, EXCEPT through the "P" silhouette */}
      <motion.svg
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1000 1000"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3.5, delay: 1.2, ease: 'easeInOut' }}
      >
        <defs>
          <mask id="p-letter-cutout" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1000">
            <rect width="1000" height="1000" fill="white" />
            {/*
              The P silhouette — white = visible, black = masked.
              In a mask, "black" hides the source. Here we make the P black so
              the dark overlay does NOT cover it, letting the gold field shine.
            */}
            <text
              x="500"
              y="540"
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-playfair), Playfair Display, Georgia, serif"
              fontSize="640"
              fontStyle="italic"
              fontWeight="500"
              fill="black"
            >
              P
            </text>
          </mask>
        </defs>

        {/* Dark layer with the P cut out */}
        <rect
          width="1000"
          height="1000"
          fill="rgba(2, 2, 8, 0.96)"
          mask="url(#p-letter-cutout)"
        />
      </motion.svg>

      {/* A second, brighter gold burst that animates inside the cutout — */}
      {/* gives the impression of light "filtering" through the fabric */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0.65] }}
        transition={{ duration: 5, delay: 2.5, ease: 'easeInOut', times: [0, 0.55, 1] }}
        style={{ mixBlendMode: 'screen' }}
      >
        <div
          style={{
            width: '50vmin',
            height: '50vmin',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(240,216,120,0.45) 0%, rgba(212,160,23,0.20) 35%, transparent 65%)',
            filter: 'blur(40px)',
          }}
        />
      </motion.div>

      {/* Slow heartbeat-like breathing of the P glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        initial={{ opacity: 0.4 }}
        animate={{ opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        style={{ mixBlendMode: 'screen' }}
      >
        <div
          style={{
            width: '30vmin',
            height: '30vmin',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255,225,140,0.35) 0%, transparent 60%)',
            filter: 'blur(30px)',
          }}
        />
      </motion.div>

      {/* Text — positioned in the lower band, away from the P spotlight */}
      <div className="absolute inset-x-0 bottom-0 px-8 pb-10 md:pb-16 flex justify-center">
        <motion.p
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="text-center max-w-xl mx-auto"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontWeight: 300,
            fontSize: 'clamp(0.85rem, 2.2vw, 1.1rem)',
            color: '#ebd9b0',
            letterSpacing: '0.07em',
            lineHeight: 1.95,
            textShadow:
              '0 1px 18px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,0.9)',
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
