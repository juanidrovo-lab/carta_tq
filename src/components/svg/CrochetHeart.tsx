'use client';

import { motion } from 'framer-motion';

interface CrochetHeartProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function CrochetHeart({ className = '', size = 120, color = '#c0392b' }: CrochetHeartProps) {
  // Heart outline path
  const heartPath =
    'M 60 80 C 60 80 10 55 10 30 C 10 10 30 5 45 15 C 50 18 55 24 60 30 C 65 24 70 18 75 15 C 90 5 110 10 110 30 C 110 55 60 80 60 80 Z';

  // Crochet stitch lines inside the heart (horizontal "yarn" lines)
  const stitchLines = [
    { y: 35, x1: 28, x2: 92 },
    { y: 43, x1: 20, x2: 100 },
    { y: 51, x1: 15, x2: 105 },
    { y: 59, x1: 18, x2: 102 },
    { y: 67, x1: 25, x2: 95 },
    { y: 74, x1: 35, x2: 85 },
  ];

  return (
    <motion.svg
      viewBox="0 0 120 90"
      width={size}
      height={size * 0.75}
      className={className}
      animate={{ scale: [1, 1.12, 1, 1.08, 1] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <defs>
        <filter id="heart-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="heart-clip">
          <path d={heartPath} />
        </clipPath>
      </defs>

      {/* Heart glow background */}
      <motion.path
        d={heartPath}
        fill={color}
        opacity={0.12}
        filter="url(#heart-glow)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Crochet stitch fill lines */}
      <g clipPath="url(#heart-clip)">
        {stitchLines.map((line, i) => (
          <motion.path
            key={i}
            d={`M ${line.x1} ${line.y} ${Array.from({ length: Math.floor((line.x2 - line.x1) / 8) }, (_, j) => {
              const x = line.x1 + j * 8;
              return `Q ${x + 2} ${line.y - 3} ${x + 4} ${line.y} Q ${x + 6} ${line.y + 3} ${x + 8} ${line.y}`;
            }).join(' ')}`}
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
          />
        ))}

        {/* Vertical chain stitches */}
        {[30, 45, 60, 75, 90].map((x, i) => (
          <motion.path
            key={`v${i}`}
            d={`M ${x} 30 ${Array.from({ length: 8 }, (_, j) => {
              const y = 30 + j * 6;
              return `Q ${x + 3} ${y + 2} ${x} ${y + 6}`;
            }).join(' ')}`}
            fill="none"
            stroke={color}
            strokeWidth="1"
            strokeLinecap="round"
            opacity={0.3}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.8 + i * 0.08 }}
          />
        ))}
      </g>

      {/* Heart outline – drawn last on top */}
      <motion.path
        d={heartPath}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#heart-glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      {/* Yarn thread tail from bottom of heart */}
      <motion.path
        d="M 60 80 Q 65 85 60 88 Q 55 91 60 94"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      />
    </motion.svg>
  );
}
