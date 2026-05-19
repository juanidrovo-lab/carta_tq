'use client';

import { motion } from 'framer-motion';

interface ThreadWeaveProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function ThreadWeave({ className = '', width = 300, height = 200 }: ThreadWeaveProps) {
  const goldThreads = [
    { id: 'g1', d: 'M -20 60 C 50 40, 100 80, 150 55 S 220 30, 320 50', delay: 0 },
    { id: 'g2', d: 'M -20 100 C 60 75, 120 120, 170 95 S 240 70, 320 90', delay: 0.3 },
    { id: 'g3', d: 'M -20 140 C 55 115, 110 155, 160 130 S 235 105, 320 125', delay: 0.6 },
  ];

  const blueThreads = [
    { id: 'b1', d: 'M 320 55 C 250 80, 190 40, 140 65 S 70 95, -20 75', delay: 0.15 },
    { id: 'b2', d: 'M 320 100 C 255 120, 195 80, 145 105 S 75 135, -20 115', delay: 0.45 },
    { id: 'b3', d: 'M 320 145 C 252 160, 192 120, 142 145 S 72 175, -20 155', delay: 0.75 },
  ];

  const knotPath = 'M 148 90 C 140 75, 155 65, 160 80 S 145 105, 148 90 Z';

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="thread-glow-gold">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="thread-glow-blue">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Gold threads */}
      {goldThreads.map((t) => (
        <motion.path
          key={t.id}
          d={t.d}
          fill="none"
          stroke="#d4a017"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#thread-glow-gold)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.85 }}
          transition={{ duration: 1.8, delay: t.delay, ease: 'easeOut' }}
        />
      ))}

      {/* Blue threads */}
      {blueThreads.map((t) => (
        <motion.path
          key={t.id}
          d={t.d}
          fill="none"
          stroke="#3a6bc8"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#thread-glow-blue)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.85 }}
          transition={{ duration: 1.8, delay: t.delay, ease: 'easeOut' }}
        />
      ))}

      {/* Center knot / interlace indicator */}
      <motion.path
        d={knotPath}
        fill="none"
        stroke="#e8b84b"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 1.5, ease: 'easeOut' }}
        filter="url(#thread-glow-gold)"
      />

      {/* Intersection sparkle dots */}
      {[
        { cx: 75, cy: 72 },
        { cx: 148, cy: 90 },
        { cx: 223, cy: 70 },
        { cx: 100, cy: 110 },
        { cx: 200, cy: 105 },
      ].map((dot, i) => (
        <motion.circle
          key={i}
          cx={dot.cx}
          cy={dot.cy}
          r="3"
          fill="#f0c040"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0.7] }}
          transition={{ duration: 0.6, delay: 1.8 + i * 0.15, ease: 'easeOut' }}
          filter="url(#thread-glow-gold)"
        />
      ))}
    </svg>
  );
}
