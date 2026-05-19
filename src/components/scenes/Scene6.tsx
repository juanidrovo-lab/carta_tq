'use client';

import { motion } from 'framer-motion';

const lines = [
  { text: 'Gracias por existir, Noe.',     delay: 3.5,  cursive: false },
  { text: 'Nuevamente, gracias.',          delay: 7.5,  cursive: false },
  { text: 'Te amo mucho, mi bichito.',     delay: 12,   cursive: true  },
];

/**
 * Scene 6 — El Aliento.
 * The whole image breathes once: a single slow inhale and a long exhale.
 * Three lines rise from below like smoke from the extinguished candle.
 * The final line, in handwriting, stays glowing — what remains.
 */
export default function Scene6() {
  return (
    <motion.div
      className="relative w-full h-full overflow-hidden bg-[#040208]"
      // Full-frame breath — one inhale, one exhale, stretched across the scene
      animate={{ scale: [1, 1.025, 1.01, 1.0], filter: ['brightness(1)', 'brightness(1.08)', 'brightness(0.96)', 'brightness(1)'] }}
      transition={{ duration: 18, ease: 'easeInOut', times: [0, 0.35, 0.75, 1] }}
    >
      {/* Warm enclosing glow — the room after */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 55%, rgba(180,120,40,0.22) 0%, rgba(60,30,10,0.12) 40%, transparent 75%)',
        }}
        animate={{ opacity: [0.7, 1, 0.85] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Central halo — the residual flame */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        animate={{ opacity: [0.5, 0.75, 0.5], scale: [1, 1.04, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        style={{ mixBlendMode: 'screen' }}
      >
        <div
          style={{
            width: '38vmin',
            height: '38vmin',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(232,184,75,0.28) 0%, transparent 65%)',
            filter: 'blur(55px)',
          }}
        />
      </motion.div>

      {/* Rising smoke particles — drifting upward and dissolving */}
      {[
        { x: 38, delay: 0,   dur: 14 },
        { x: 52, delay: 2.5, dur: 16 },
        { x: 46, delay: 5,   dur: 13 },
        { x: 60, delay: 7.5, dur: 18 },
        { x: 42, delay: 10,  dur: 15 },
      ].map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 3,
            height: 3,
            background:
              'radial-gradient(circle, rgba(232,184,75,0.6) 0%, transparent 70%)',
            filter: 'blur(2px)',
            left: `${p.x}%`,
            top: '60%',
            translate: '-50% 0',
          }}
          animate={{
            top: ['60%', '40%', '20%', '5%'],
            opacity: [0, 0.6, 0.4, 0],
            left: [
              `${p.x}%`,
              `${p.x - 1}%`,
              `${p.x + 1}%`,
              `${p.x}%`,
            ],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* The lines — each rises slowly from below */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 md:gap-14 px-8">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: line.cursive ? 0.95 : 0.8, y: 0 }}
            transition={{
              duration: line.cursive ? 4 : 3,
              delay: line.delay,
              ease: 'easeOut',
            }}
            className="text-center"
            style={
              line.cursive
                ? {
                    fontFamily: 'var(--font-dancing)',
                    fontWeight: 500,
                    fontSize: 'clamp(1.9rem, 6.5vw, 2.8rem)',
                    color: '#f0d088',
                    letterSpacing: '0.01em',
                    lineHeight: 1.4,
                    textShadow:
                      '0 0 35px rgba(212,160,23,0.6), 0 0 70px rgba(212,160,23,0.3)',
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
                      '0 1px 14px rgba(0,0,0,1), 0 0 30px rgba(0,0,0,0.85)',
                  }
            }
          >
            {line.text}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}
