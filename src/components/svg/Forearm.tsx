'use client';

import { motion } from 'framer-motion';

interface ForearmProps {
  className?: string;
}

export default function Forearm({ className = '' }: ForearmProps) {
  // Letter "P":
  // 1. Left vertical stroke — M 168 112 L 168 162
  // 2. Top arc (right side of P bowl): M 168 112 C 205 112 205 138 168 138
  const tattooDelay = 2.2;

  return (
    <motion.svg
      viewBox="0 0 380 280"
      className={className}
      initial="hidden"
      animate="visible"
    >
      <defs>
        <filter id="forearm-glow">
          <feGaussianBlur stdDeviation="4.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="gold-intense">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="skin-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#8b6b4a" stopOpacity="0.9" />
          <stop offset="50%"  stopColor="#7a5c3a" stopOpacity="1" />
          <stop offset="100%" stopColor="#6b4f2e" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Forearm outline */}
      <motion.path
        d="M 60 240 Q 58 200 62 165 Q 65 130 70 90 Q 75 60 85 40"
        fill="none" stroke="#8b6b4a" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.65 }}
        transition={{ duration: 2, delay: 0, ease: 'easeOut' }}
      />
      <motion.path
        d="M 310 240 Q 315 200 312 165 Q 308 130 302 90 Q 296 60 285 40"
        fill="none" stroke="#8b6b4a" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.65 }}
        transition={{ duration: 2, delay: 0.2, ease: 'easeOut' }}
      />
      <motion.path
        d="M 60 240 Q 185 260 310 240"
        fill="none" stroke="#8b6b4a" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.65 }}
        transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
      />
      <motion.path
        d="M 85 40 Q 185 25 285 40"
        fill="none" stroke="#8b6b4a" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.65 }}
        transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
      />

      {/* Forearm fill */}
      <motion.path
        d="M 60 240 Q 58 200 62 165 Q 65 130 70 90 Q 75 60 85 40 Q 185 25 285 40 Q 296 60 302 90 Q 308 130 312 165 Q 315 200 310 240 Q 185 260 60 240 Z"
        fill="url(#skin-grad)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5, delay: 0.7 }}
      />

      {/* Subtle veins */}
      <motion.path
        d="M 140 200 Q 145 160 148 120 Q 150 85 152 60"
        fill="none" stroke="#6b4f2e" strokeWidth="1" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.2 }}
        transition={{ duration: 2, delay: 1.5 }}
      />
      <motion.path
        d="M 220 195 Q 223 155 222 115 Q 221 80 220 60"
        fill="none" stroke="#6b4f2e" strokeWidth="1" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.18 }}
        transition={{ duration: 2, delay: 1.7 }}
      />

      {/* Existing faint tattoos */}
      <motion.path
        d="M 245 170 Q 250 165 255 170 Q 260 175 255 180 Q 250 185 245 180 Q 240 175 245 170"
        fill="none" stroke="#8b6b4a" strokeWidth="1.5" strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 1, delay: 1.2 }}
      />
      <motion.path
        d="M 120 160 L 125 155 L 130 160 L 125 165 Z"
        fill="none" stroke="#8b6b4a" strokeWidth="1.5" strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 1.4 }}
      />

      {/* ─── THE GOLDEN "P" TATTOO ─── */}
      {/* Ambient glow halo */}
      <motion.ellipse
        cx="178" cy="135" rx="34" ry="32"
        fill="rgba(212, 160, 23, 0.07)"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: tattooDelay }}
      />

      {/* Vertical stroke of P */}
      <motion.path
        d="M 168 112 L 168 162"
        fill="none"
        stroke="#d4a017"
        strokeWidth="4"
        strokeLinecap="round"
        filter="url(#gold-intense)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.85, delay: tattooDelay, ease: 'easeInOut' }}
      />

      {/* Bowl arc of P — cubic Bézier closing back to mid-left */}
      <motion.path
        d="M 168 112 C 210 112 210 140 168 140"
        fill="none"
        stroke="#d4a017"
        strokeWidth="4"
        strokeLinecap="round"
        filter="url(#gold-intense)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.1, delay: tattooDelay + 0.8, ease: 'easeInOut' }}
      />

      {/* Thread coming in from the right (needle thread) */}
      <motion.path
        d="M 380 128 Q 320 130 280 133 Q 240 135 210 137"
        fill="none"
        stroke="#d4a017"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="4 3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.35 }}
        transition={{ duration: 2, delay: tattooDelay - 0.3 }}
      />

      {/* Moving needle dot */}
      <motion.circle
        r="3.5"
        fill="#f0e060"
        filter="url(#gold-intense)"
        initial={{ opacity: 0 }}
        animate={{
          opacity:  [0, 1, 1, 1, 0],
          cx: [168, 168, 195, 168, 168],
          cy: [112, 162, 126, 140, 140],
        }}
        transition={{
          duration: 2,
          delay: tattooDelay,
          times: [0, 0.3, 0.6, 0.85, 1],
          ease: 'easeInOut',
        }}
      />
    </motion.svg>
  );
}
