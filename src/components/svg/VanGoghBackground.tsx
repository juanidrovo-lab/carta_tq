'use client';

import { motion } from 'framer-motion';

interface VanGoghBackgroundProps {
  className?: string;
}

export default function VanGoghBackground({ className = '' }: VanGoghBackgroundProps) {
  // Star/light point positions
  const stars = [
    { cx: 350, cy: 55, r: 3, color: '#f0c040' },
    { cx: 60, cy: 45, r: 2.5, color: '#f0c040' },
    { cx: 200, cy: 30, r: 2, color: '#e8b84b' },
    { cx: 400, cy: 120, r: 2, color: '#d4a017' },
    { cx: 30, cy: 180, r: 1.8, color: '#f0c040' },
    { cx: 420, cy: 300, r: 2.2, color: '#e8b84b' },
    { cx: 170, cy: 290, r: 1.5, color: '#d4a017' },
    { cx: 300, cy: 280, r: 1.8, color: '#f0c040' },
  ];

  const swirlCenters = [
    { cx: 110, cy: 130, color: '#1a2a5e', duration: 18, size: 80 },
    { cx: 310, cy: 100, color: '#0f3460', duration: 22, size: 75 },
    { cx: 210, cy: 230, color: '#162447', duration: 15, size: 70 },
    { cx: 50, cy: 280, color: '#1f4068', duration: 20, size: 60 },
    { cx: 380, cy: 260, color: '#1b2a4a', duration: 17, size: 65 },
  ];

  return (
    <svg
      viewBox="0 0 440 340"
      className={className}
      style={{ width: '100%', height: '100%' }}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id="star-glow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="vg-sky" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#1a2a5e" />
          <stop offset="60%" stopColor="#0f1a3a" />
          <stop offset="100%" stopColor="#060812" />
        </radialGradient>
      </defs>

      {/* Sky background */}
      <rect width="440" height="340" fill="url(#vg-sky)" />

      {/* Swirl rings - animated rotation */}
      {swirlCenters.map((s, si) =>
        [s.size, s.size * 0.8, s.size * 0.6, s.size * 0.4].map((r, ri) => (
          <motion.ellipse
            key={`s${si}-r${ri}`}
            cx={s.cx}
            cy={s.cy}
            rx={r}
            ry={r * 0.85}
            fill="none"
            stroke={s.color}
            strokeWidth={6 - ri * 1.2}
            opacity={0.65 - ri * 0.1}
            animate={{ rotate: ri % 2 === 0 ? 360 : -360 }}
            style={{ originX: `${s.cx}px`, originY: `${s.cy}px` }}
            transition={{
              duration: s.duration + ri * 4,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))
      )}

      {/* Thick horizontal brushstroke streaks */}
      {[40, 85, 130, 175, 220, 265, 310].map((y, i) => (
        <motion.path
          key={`streak-${i}`}
          d={`M 0 ${y} Q 150 ${y - 12 + (i % 3) * 6} 220 ${y + 4} Q 300 ${y + 15 - (i % 2) * 8} 440 ${y + 2}`}
          fill="none"
          stroke={i % 3 === 0 ? '#162447' : i % 3 === 1 ? '#1a3360' : '#0d2040'}
          strokeWidth={5 + (i % 3)}
          strokeLinecap="round"
          opacity={0.4}
          animate={{ opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 5 + i * 0.7, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Stars / light points */}
      {stars.map((star, i) => (
        <motion.circle
          key={`star-${i}`}
          cx={star.cx}
          cy={star.cy}
          r={star.r}
          fill={star.color}
          filter="url(#star-glow)"
          animate={{ opacity: [0.6, 1, 0.7, 1, 0.6], scale: [1, 1.3, 1] }}
          transition={{
            duration: 2.5 + i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Golden horizon glow near bottom */}
      <motion.path
        d="M 0 310 Q 220 285 440 310 L 440 340 L 0 340 Z"
        fill="rgba(212, 160, 23, 0.06)"
        animate={{ opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  );
}
