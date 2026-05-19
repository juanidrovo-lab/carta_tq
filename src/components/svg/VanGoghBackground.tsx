'use client';

import { motion } from 'framer-motion';

interface VanGoghBackgroundProps {
  className?: string;
}

export default function VanGoghBackground({ className = '' }: VanGoghBackgroundProps) {
  const stars = [
    { cx: 350, cy: 55, r: 3,   color: '#f0c040' },
    { cx: 60,  cy: 45, r: 2.5, color: '#f0c040' },
    { cx: 200, cy: 30, r: 2,   color: '#e8b84b' },
    { cx: 400, cy: 120,r: 2,   color: '#d4a017' },
    { cx: 30,  cy: 180,r: 1.8, color: '#f0c040' },
    { cx: 420, cy: 300,r: 2.2, color: '#e8b84b' },
    { cx: 170, cy: 290,r: 1.5, color: '#c8a0ff' },
    { cx: 300, cy: 280,r: 1.8, color: '#f0c040' },
    { cx: 80,  cy: 230,r: 1.6, color: '#c8a0ff' },
    { cx: 270, cy: 70, r: 2,   color: '#e8b84b' },
  ];

  // Swirl centers with deep night-blue + dark violet palette
  const swirlCenters = [
    { cx: 110, cy: 130, color: '#1a2a5e', duration: 18, size: 80 },
    { cx: 310, cy: 100, color: '#2d1b69', duration: 22, size: 75 }, // deep violet
    { cx: 210, cy: 230, color: '#1e1040', duration: 15, size: 70 }, // dark indigo
    { cx: 50,  cy: 280, color: '#1f4068', duration: 20, size: 60 },
    { cx: 380, cy: 260, color: '#3d1060', duration: 17, size: 65 }, // dark violet
    { cx: 230, cy: 155, color: '#0f1f50', duration: 25, size: 55 },
  ];

  // Thick streaks — blues, violets, deep golds
  const streakColors = [
    '#1a2a5e', '#2d1b69', '#1e1040',
    '#162447', '#3d1060', '#1a1a40',
    '#0f1f50',
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
        <filter id="violet-glow">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="vg-sky" cx="50%" cy="40%" r="70%">
          <stop offset="0%"   stopColor="#14103a" />
          <stop offset="40%"  stopColor="#0c0a28" />
          <stop offset="75%"  stopColor="#080612" />
          <stop offset="100%" stopColor="#04020a" />
        </radialGradient>
        {/* Violet nebula overlay */}
        <radialGradient id="vg-violet" cx="70%" cy="30%" r="50%">
          <stop offset="0%"   stopColor="#2d1b69" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#2d1b69" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="vg-gold" cx="30%" cy="65%" r="45%">
          <stop offset="0%"   stopColor="#d4a017" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#d4a017" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sky */}
      <rect width="440" height="340" fill="url(#vg-sky)" />

      {/* Violet nebula upper-right */}
      <rect width="440" height="340" fill="url(#vg-violet)" />

      {/* Gold nebula lower-left */}
      <rect width="440" height="340" fill="url(#vg-gold)" />

      {/* Swirl rings */}
      {swirlCenters.map((s, si) =>
        [s.size, s.size * 0.78, s.size * 0.56, s.size * 0.35].map((r, ri) => (
          <motion.ellipse
            key={`s${si}-r${ri}`}
            cx={s.cx}
            cy={s.cy}
            rx={r}
            ry={r * 0.82}
            fill="none"
            stroke={s.color}
            strokeWidth={7 - ri * 1.4}
            opacity={0.7 - ri * 0.1}
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

      {/* Violet accent swirl (larger, prominent) */}
      {[90, 70, 50].map((r, i) => (
        <motion.ellipse
          key={`vs-${i}`}
          cx={310}
          cy={100}
          rx={r}
          ry={r * 0.75}
          fill="none"
          stroke="#4a2080"
          strokeWidth={4 - i * 0.8}
          opacity={0.45}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          style={{ originX: '310px', originY: '100px' }}
          transition={{ duration: 28 + i * 5, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      {/* Thick brushstroke streaks */}
      {[40, 85, 130, 175, 220, 265, 310].map((y, i) => (
        <motion.path
          key={`streak-${i}`}
          d={`M 0 ${y} Q 150 ${y - 12 + (i % 3) * 7} 220 ${y + 5} Q 300 ${y + 16 - (i % 2) * 9} 440 ${y + 3}`}
          fill="none"
          stroke={streakColors[i % streakColors.length]}
          strokeWidth={6 + (i % 3)}
          strokeLinecap="round"
          opacity={0.45}
          animate={{ opacity: [0.38, 0.58, 0.38] }}
          transition={{ duration: 5 + i * 0.7, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Stars */}
      {stars.map((star, i) => (
        <motion.circle
          key={`star-${i}`}
          cx={star.cx}
          cy={star.cy}
          r={star.r}
          fill={star.color}
          filter={star.color === '#c8a0ff' ? 'url(#violet-glow)' : 'url(#star-glow)'}
          animate={{ opacity: [0.5, 1, 0.65, 1, 0.5], scale: [1, 1.35, 1] }}
          transition={{
            duration: 2.5 + i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Golden horizon glow */}
      <motion.path
        d="M 0 305 Q 220 280 440 305 L 440 340 L 0 340 Z"
        fill="rgba(212, 160, 23, 0.07)"
        animate={{ opacity: [0.07, 0.15, 0.07] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Violet horizon glow */}
      <motion.path
        d="M 0 50 Q 220 35 440 55 L 440 0 L 0 0 Z"
        fill="rgba(80, 30, 160, 0.08)"
        animate={{ opacity: [0.06, 0.14, 0.06] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </svg>
  );
}
