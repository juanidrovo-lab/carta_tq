'use client';

import { motion } from 'framer-motion';

const lines = [
  'Gracias por existir, Noe.',
  'Nuevamente, gracias.',
  '',
  'Te amo mucho, mi bichito.',
];

export default function Scene6() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#06070c] overflow-hidden">
      {/* Very subtle background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 55%, rgba(212,160,23,0.04) 0%, transparent 60%)',
        }}
      />

      {/* Faint floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 1.5 + (i % 2),
            height: 1.5 + (i % 2),
            backgroundColor: '#d4a017',
            left: `${20 + i * 12}%`,
            top: `${25 + (i * 9) % 50}%`,
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 5 + i * 0.8,
            delay: i * 0.7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center gap-3 max-w-sm mx-auto px-6 w-full text-center">
        {/* Decorative top element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="mb-4"
        >
          <svg viewBox="0 0 80 20" width="80" height="20">
            <motion.path
              d="M 5 10 Q 20 3 40 10 Q 60 17 75 10"
              fill="none"
              stroke="#d4a017"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>

        {/* Lines floating up */}
        {lines.map((line, i) => {
          if (!line) {
            return <div key={i} className="h-3" />;
          }
          const isSignature = line.startsWith('Te amo');
          return (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.6 + i * 0.7,
                ease: 'easeOut',
              }}
              className={isSignature ? 'text-2xl md:text-3xl mt-2' : 'text-lg md:text-xl'}
              style={
                isSignature
                  ? {
                      fontFamily: 'var(--font-dancing)',
                      color: '#e8b84b',
                      textShadow:
                        '0 0 20px rgba(212, 160, 23, 0.5), 0 0 40px rgba(212, 160, 23, 0.25)',
                      lineHeight: '1.4',
                    }
                  : {
                      fontFamily: 'var(--font-playfair)',
                      color: '#d4d0c8',
                      textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                      lineHeight: '1.6',
                      fontStyle: 'italic',
                    }
              }
            >
              {line}
            </motion.p>
          );
        })}

        {/* Decorative bottom element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2, delay: 3.5 }}
          className="mt-6"
        >
          <svg viewBox="0 0 100 30" width="100" height="30">
            {/* Heart */}
            <motion.path
              d="M 50 22 C 50 22 30 12 30 6 C 30 2 34 0 38 3 C 42 6 46 10 50 14 C 54 10 58 6 62 3 C 66 0 70 2 70 6 C 70 12 50 22 50 22 Z"
              fill="none"
              stroke="#d4a017"
              strokeWidth="1.2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 1.5, delay: 3.5 }}
            />
          </svg>
        </motion.div>

        {/* Final gold thread line at bottom */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.4 }}
          transition={{ duration: 2, delay: 4.0, ease: 'easeOut' }}
          className="mt-2"
          style={{
            width: '120px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, #d4a017, transparent)',
            transformOrigin: 'center',
          }}
        />
      </div>
    </div>
  );
}
