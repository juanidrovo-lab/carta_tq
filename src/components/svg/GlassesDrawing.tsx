'use client';

import { motion } from 'framer-motion';

interface GlassesDrawingProps {
  className?: string;
  color?: string;
  strokeWidth?: number;
}

export default function GlassesDrawing({
  className = '',
  color = '#e8b84b',
  strokeWidth = 2.5,
}: GlassesDrawingProps) {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 2.5, ease: 'easeInOut' as const },
    },
  };

  const delayedPathVariants = (delay: number) => ({
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 2, ease: 'easeInOut' as const, delay },
    },
  });

  return (
    <motion.svg
      viewBox="0 0 240 80"
      className={className}
      initial="hidden"
      animate="visible"
      style={{ filter: `drop-shadow(0 0 8px ${color}66)` }}
    >
      {/* Left lens - outer circle */}
      <motion.circle
        cx="70"
        cy="40"
        r="28"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        variants={pathVariants}
      />
      {/* Left lens - inner highlight */}
      <motion.path
        d="M 55 28 Q 60 24 68 26"
        fill="none"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
        opacity={0.5}
        variants={delayedPathVariants(2.2)}
      />

      {/* Right lens - outer circle */}
      <motion.circle
        cx="170"
        cy="40"
        r="28"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        variants={delayedPathVariants(0.4)}
      />
      {/* Right lens - inner highlight */}
      <motion.path
        d="M 155 28 Q 160 24 168 26"
        fill="none"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
        opacity={0.5}
        variants={delayedPathVariants(2.5)}
      />

      {/* Bridge */}
      <motion.path
        d="M 98 40 Q 120 34 142 40"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        variants={delayedPathVariants(1.0)}
      />

      {/* Left temple arm */}
      <motion.path
        d="M 42 38 Q 20 36 8 30"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth * 0.8}
        strokeLinecap="round"
        variants={delayedPathVariants(1.5)}
      />

      {/* Right temple arm */}
      <motion.path
        d="M 198 38 Q 220 36 232 30"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth * 0.8}
        strokeLinecap="round"
        variants={delayedPathVariants(1.5)}
      />
    </motion.svg>
  );
}
