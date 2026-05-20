'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface SceneBackgroundProps {
  sceneId: number;
  /** How dark the overlay is: 0 = none, 1 = full black. Default 0.45 */
  darkness?: number;
}

/**
 * Full-bleed background for a scene.
 * Shows /public/scenes/scene-{id}.jpg with:
 *  1. Slow Ken Burns drift (subtle scale + position shift, ~40s cycle)
 *  2. A dark overlay for text legibility
 *  3. A fallback gradient when the image hasn't been generated yet
 */
const fallbackGradients: Record<number, string> = {
  1: 'radial-gradient(ellipse at 30% 40%, #1a1235 0%, #0c0818 50%, #04030a 100%)',
  2: 'radial-gradient(ellipse at 65% 35%, #0e1a45 0%, #080d28 50%, #03040e 100%)',
  3: 'radial-gradient(ellipse at 50% 80%, #6a3a10 0%, #2a1540 50%, #04020a 100%)',
  4: 'radial-gradient(ellipse at 50% 35%, #3a1a08 0%, #160820 50%, #03020a 100%)',
  5: 'radial-gradient(ellipse at 50% 50%, #2a0a10 0%, #0a0520 50%, #030208 100%)',
  6: 'radial-gradient(ellipse at 50% 55%, #3a2008 0%, #180c20 50%, #040208 100%)',
};

export default function SceneBackground({
  sceneId,
  darkness = 0.45,
}: SceneBackgroundProps) {
  const [imageError, setImageError] = useState(false);
  const src = `/scenes/scene-${sceneId}.jpg`;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Ken Burns container — slow drift */}
      <motion.div
        className="absolute inset-[-5%]" // slightly oversized so drift doesn't reveal edges
        animate={{
          scale: [1, 1.04, 1.02, 1.05, 1],
          x: ['0%', '1.5%', '-1%', '1%', '0%'],
          y: ['0%', '-1%', '1.5%', '-0.5%', '0%'],
        }}
        transition={{
          duration: 40,
          ease: 'easeInOut',
          repeat: Infinity,
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
      >
        {!imageError ? (
          <img
            src={src}
            alt=""
            aria-hidden
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          /* Fallback gradient when image doesn't exist yet */
          <div
            className="w-full h-full"
            style={{ background: fallbackGradients[sceneId] ?? fallbackGradients[1] }}
          />
        )}
      </motion.div>

      {/* Dark overlay for text legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `rgba(0,0,0,${darkness})` }}
      />
    </div>
  );
}
