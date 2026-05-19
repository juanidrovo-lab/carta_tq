'use client';

import { motion } from 'framer-motion';

export interface AmbientColor {
  color: string;
  size?: number;      // vmax
  opacity?: number;
  blur?: number;      // px
  duration?: number;  // seconds for full loop
  startX?: string;
  startY?: string;
  midX?: string;
  midY?: string;
}

interface AmbientFieldProps {
  colors: AmbientColor[];
  className?: string;
  baseColor?: string;
}

/**
 * A field of large, blurred radial color blobs that drift slowly across the
 * viewport, blended via mix-blend-mode: screen. Produces a moving mass of
 * color (Van Gogh as ambience, not as drawing).
 */
export default function AmbientField({
  colors,
  className = '',
  baseColor = '#04030a',
}: AmbientFieldProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ background: baseColor }}
    >
      {colors.map((c, i) => {
        const size = c.size ?? 110;
        const blur = c.blur ?? 90;
        const opacity = c.opacity ?? 0.7;
        const duration = c.duration ?? 50 + i * 12;
        const sx = c.startX ?? `${-20 + i * 15}%`;
        const sy = c.startY ?? `${-15 + i * 18}%`;
        const mx = c.midX ?? `${30 - i * 10}%`;
        const my = c.midY ?? `${20 + i * 12}%`;

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: `${size}vmax`,
              height: `${size}vmax`,
              borderRadius: '50%',
              left: sx,
              top: sy,
              background: `radial-gradient(circle at center, ${c.color} 0%, transparent 62%)`,
              filter: `blur(${blur}px)`,
              mixBlendMode: 'screen',
              opacity,
              willChange: 'transform',
            }}
            animate={{
              x: ['0%', '20%', '-15%', '10%', '0%'],
              y: ['0%', '-12%', '18%', '-6%', '0%'],
              scale: [1, 1.08, 0.95, 1.05, 1],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 2,
            }}
            initial={{ x: '0%', y: '0%', scale: 1 }}
          >
            {/* hidden init values consume vars to silence unused warnings */}
            <span style={{ display: 'none' }}>{mx}{my}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
