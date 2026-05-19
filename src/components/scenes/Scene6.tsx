'use client';

import { motion } from 'framer-motion';
import AmbientField from '@/components/AmbientField';

const lines = [
  { text: 'Gracias por existir, Noe.',     delay: 2.5,  cursive: false },
  { text: 'Nuevamente, gracias.',          delay: 5.0,  cursive: false },
  { text: 'Te amo mucho, mi bichito.',     delay: 8.5,  cursive: true  },
];

export default function Scene6() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Warm gold closing light */}
      <AmbientField
        baseColor="#050308"
        colors={[
          { color: '#6a3a08', size: 130, opacity: 0.55, blur: 110, duration: 120, startX: '15%', startY: '10%' },
          { color: '#9a6a18', size: 100, opacity: 0.5,  blur: 100, duration: 140, startX: '40%', startY: '25%' },
          { color: '#3a1a0a', size: 90,  opacity: 0.45, blur: 100, duration: 160, startX: '50%', startY: '50%' },
        ]}
      />

      {/* Final breathing halo */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        animate={{ opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{ mixBlendMode: 'screen' }}
      >
        <div
          style={{
            width: '40vmin',
            height: '40vmin',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(232,184,75,0.18) 0%, transparent 65%)',
            filter: 'blur(50px)',
          }}
        />
      </motion.div>

      {/* Lines float up slowly, one by one */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 md:gap-14 px-8">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: line.cursive ? 0.95 : 0.78, y: 0 }}
            transition={{
              duration: line.cursive ? 3.5 : 2.6,
              delay: line.delay,
              ease: 'easeInOut',
            }}
            className="text-center"
            style={
              line.cursive
                ? {
                    fontFamily: 'var(--font-dancing)',
                    fontWeight: 500,
                    fontSize: 'clamp(1.8rem, 6vw, 2.6rem)',
                    color: '#f0d088',
                    letterSpacing: '0.01em',
                    lineHeight: 1.4,
                    textShadow:
                      '0 0 30px rgba(212,160,23,0.55), 0 0 60px rgba(212,160,23,0.25)',
                  }
                : {
                    fontFamily: 'var(--font-playfair)',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    fontSize: 'clamp(1rem, 2.8vw, 1.3rem)',
                    color: '#e0d2b8',
                    letterSpacing: '0.12em',
                    lineHeight: 1.6,
                    textShadow:
                      '0 1px 14px rgba(0,0,0,0.95), 0 0 30px rgba(0,0,0,0.7)',
                  }
            }
          >
            {line.text}
          </motion.p>
        ))}
      </div>
    </div>
  );
}
