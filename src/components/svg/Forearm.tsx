'use client';

import { motion } from 'framer-motion';

interface ForearmProps {
  className?: string;
}

export default function Forearm({ className = '' }: ForearmProps) {
  // The letter "N" path on the forearm
  // Drawn in golden thread style
  const nLetterPath = 'M 170 115 L 170 155 L 200 115 L 200 155';

  return (
    <motion.svg
      viewBox="0 0 380 280"
      className={className}
      initial="hidden"
      animate="visible"
    >
      <defs>
        <filter id="forearm-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="skin-texture">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
        </filter>
        <linearGradient id="skin-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8b6b4a" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#7a5c3a" stopOpacity="1" />
          <stop offset="100%" stopColor="#6b4f2e" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Forearm shape - from wrist to elbow */}
      {/* Left edge */}
      <motion.path
        d="M 60 240 Q 58 200 62 165 Q 65 130 70 90 Q 75 60 85 40"
        fill="none"
        stroke="#8b6b4a"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 2, delay: 0, ease: 'easeOut' }}
      />
      {/* Right edge */}
      <motion.path
        d="M 310 240 Q 315 200 312 165 Q 308 130 302 90 Q 296 60 285 40"
        fill="none"
        stroke="#8b6b4a"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 2, delay: 0.2, ease: 'easeOut' }}
      />
      {/* Wrist bottom */}
      <motion.path
        d="M 60 240 Q 185 260 310 240"
        fill="none"
        stroke="#8b6b4a"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
      />
      {/* Top (elbow region) */}
      <motion.path
        d="M 85 40 Q 185 25 285 40"
        fill="none"
        stroke="#8b6b4a"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
      />

      {/* Forearm fill */}
      <motion.path
        d="M 60 240 Q 58 200 62 165 Q 65 130 70 90 Q 75 60 85 40 Q 185 25 285 40 Q 296 60 302 90 Q 308 130 312 165 Q 315 200 310 240 Q 185 260 60 240 Z"
        fill="url(#skin-grad)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 1.5, delay: 0.7 }}
      />

      {/* Subtle vein lines */}
      <motion.path
        d="M 140 200 Q 145 160 148 120 Q 150 85 152 60"
        fill="none"
        stroke="#6b4f2e"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.25 }}
        transition={{ duration: 2, delay: 1.5 }}
      />
      <motion.path
        d="M 220 195 Q 223 155 222 115 Q 221 80 220 60"
        fill="none"
        stroke="#6b4f2e"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.2 }}
        transition={{ duration: 2, delay: 1.7 }}
      />

      {/* Existing small tattoo marks (faint, already there) */}
      <motion.path
        d="M 245 170 Q 250 165 255 170 Q 260 175 255 180 Q 250 185 245 180 Q 240 175 245 170"
        fill="none"
        stroke="#8b6b4a"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 1.2 }}
      />
      <motion.path
        d="M 120 160 L 125 155 L 130 160 L 125 165 Z"
        fill="none"
        stroke="#8b6b4a"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 1, delay: 1.4 }}
      />

      {/* ——— THE GOLDEN "N" TATTOO ——— */}
      {/* Glow halo under the letter */}
      <motion.ellipse
        cx="185"
        cy="135"
        rx="30"
        ry="28"
        fill="rgba(212, 160, 23, 0.08)"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 2.2 }}
      />

      {/* Left vertical stroke of N */}
      <motion.path
        d="M 170 115 L 170 155"
        fill="none"
        stroke="#d4a017"
        strokeWidth="3.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 2.5, ease: 'easeOut' }}
        filter="url(#forearm-glow)"
      />
      {/* Diagonal stroke of N */}
      <motion.path
        d="M 170 115 L 200 155"
        fill="none"
        stroke="#d4a017"
        strokeWidth="3.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 3.1, ease: 'easeOut' }}
        filter="url(#forearm-glow)"
      />
      {/* Right vertical stroke of N */}
      <motion.path
        d="M 200 115 L 200 155"
        fill="none"
        stroke="#d4a017"
        strokeWidth="3.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 3.7, ease: 'easeOut' }}
        filter="url(#forearm-glow)"
      />

      {/* Thread needle effect – tiny dot moving along path */}
      <motion.circle
        cx="170"
        cy="115"
        r="3"
        fill="#f0c040"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 1, 0],
          cx: [170, 170, 200, 200, 200],
          cy: [115, 155, 115, 155, 155],
        }}
        transition={{
          duration: 1.8,
          delay: 2.5,
          times: [0, 0.25, 0.5, 0.75, 1],
          ease: 'easeInOut',
        }}
        filter="url(#forearm-glow)"
      />

      {/* Subtle thread coming from right side */}
      <motion.path
        d="M 380 120 Q 320 125 280 130 Q 240 132 200 135"
        fill="none"
        stroke="#d4a017"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="4 3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.4 }}
        transition={{ duration: 2, delay: 2.0 }}
      />
    </motion.svg>
  );
}
