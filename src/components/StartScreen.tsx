'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface StartScreenProps {
  onStart: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ['#d4a017', '#e8b84b', '#3a6bc8', '#6b9ee8', '#f0c040'];
    const generated: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 4,
      size: 2 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#0a0a0f] overflow-hidden">
      {/* Floating thread particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: 0.4,
          }}
          animate={{
            y: [0, -20, -10, 0],
            x: [0, 8, -5, 0],
            opacity: [0.3, 0.7, 0.5, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-[#1a1a2e]/40 via-transparent to-transparent" />

      {/* Crochet ring SVG */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="mb-10"
      >
        <CrochetRing />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
        className="text-center mb-8 px-6"
      >
        <h1
          className="text-3xl md:text-4xl font-serif font-semibold tracking-wide mb-2"
          style={{
            color: '#e8e0d0',
            textShadow: '0 0 30px rgba(212, 160, 23, 0.4)',
            fontFamily: 'var(--font-playfair)',
          }}
        >
          Una carta para ti
        </h1>
        <p
          className="text-sm tracking-widest uppercase"
          style={{ color: '#d4a017', opacity: 0.8, letterSpacing: '0.2em' }}
        >
          con amor sincronizado
        </p>
      </motion.div>

      {/* Start button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
        onClick={onStart}
        className="relative px-8 py-4 rounded-full text-base font-serif tracking-wide cursor-pointer
                   min-h-[52px] min-w-[240px] select-none"
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(212, 160, 23, 0.4)',
          color: '#e8b84b',
          fontFamily: 'var(--font-playfair)',
          boxShadow: '0 0 20px rgba(212, 160, 23, 0.15), inset 0 0 20px rgba(212, 160, 23, 0.05)',
        }}
        whileHover={{
          scale: 1.04,
          boxShadow: '0 0 30px rgba(212, 160, 23, 0.3), inset 0 0 20px rgba(212, 160, 23, 0.1)',
          borderColor: 'rgba(212, 160, 23, 0.8)',
        }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="flex items-center gap-3 justify-center">
          <HeadphonesIcon />
          Presiona para escuchar y leer
        </span>
      </motion.button>

      {/* Subtle instruction */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="mt-6 text-xs text-center px-4"
        style={{ color: '#6b7280', fontFamily: 'var(--font-playfair)' }}
      >
        Activa el sonido para una experiencia completa
      </motion.p>
    </div>
  );
}

function CrochetRing() {
  return (
    <div className="relative w-40 h-40 md:w-48 md:h-48">
      {/* Outer spinning ring */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {/* Outer decorative crochet ring */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i / 16) * Math.PI * 2;
          const r = 88;
          const x = 100 + r * Math.cos(angle);
          const y = 100 + r * Math.sin(angle);
          return (
            <ellipse
              key={i}
              cx={x}
              cy={y}
              rx="5"
              ry="8"
              fill="none"
              stroke="#d4a017"
              strokeWidth="1.5"
              opacity="0.6"
              transform={`rotate(${(i / 16) * 360}, ${x}, ${y})`}
            />
          );
        })}
        {/* Outer circle */}
        <circle cx="100" cy="100" r="88" fill="none" stroke="#d4a017" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4" />
      </motion.svg>

      {/* Middle reverse ring */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const r = 66;
          const x = 100 + r * Math.cos(angle);
          const y = 100 + r * Math.sin(angle);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="none"
              stroke="#3a6bc8"
              strokeWidth="1.5"
              opacity="0.7"
            />
          );
        })}
        <circle cx="100" cy="100" r="66" fill="none" stroke="#3a6bc8" strokeWidth="0.5" opacity="0.3" />
      </motion.svg>

      {/* Inner pulsing ring */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const r = 44;
          const x = 100 + r * Math.cos(angle);
          const y = 100 + r * Math.sin(angle);
          const nextAngle = ((i + 1) / 8) * Math.PI * 2;
          const nx = 100 + r * Math.cos(nextAngle);
          const ny = 100 + r * Math.sin(nextAngle);
          return (
            <path
              key={i}
              d={`M ${x} ${y} Q 100 100 ${nx} ${ny}`}
              fill="none"
              stroke="#e8b84b"
              strokeWidth="2"
              opacity="0.5"
            />
          );
        })}
      </motion.svg>

      {/* Center flower */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full"
      >
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          const x = 100 + 18 * Math.cos(angle);
          const y = 100 + 18 * Math.sin(angle);
          return (
            <ellipse
              key={i}
              cx={x}
              cy={y}
              rx="7"
              ry="12"
              fill="rgba(212,160,23,0.15)"
              stroke="#d4a017"
              strokeWidth="1"
              transform={`rotate(${(i / 6) * 360 + 90}, ${x}, ${y})`}
            />
          );
        })}
        <circle cx="100" cy="100" r="8" fill="rgba(212,160,23,0.3)" stroke="#d4a017" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function HeadphonesIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  );
}
