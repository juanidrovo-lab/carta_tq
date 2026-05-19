'use client';

import { motion } from 'framer-motion';

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-[#06060e] overflow-hidden">
      {/* Single faint radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(212,160,23,0.04) 0%, transparent 65%)',
        }}
      />

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.2, ease: 'easeInOut' }}
        onClick={onStart}
        className="relative cursor-pointer select-none"
        style={{ background: 'none', border: 'none', padding: '0' }}
        whileHover={{ opacity: 0.75 }}
        whileTap={{ opacity: 0.5 }}
      >
        <span
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
            fontWeight: 300,
            letterSpacing: '0.35em',
            color: '#c8bfb0',
            textTransform: 'uppercase',
          }}
        >
          Presiona para comenzar
        </span>
      </motion.button>
    </div>
  );
}
