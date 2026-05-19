'use client';

/**
 * Global woven texture overlay.
 * Two perpendicular fractalNoise turbulences combined into a displacement map
 * simulate the warp/weft of a crochet weave. A grain layer adds rugosity.
 * Mounted once at the top level of the experience, fixed to the viewport.
 */
export default function CrochetOverlay() {
  return (
    <>
      {/* Woven displacement layer */}
      <svg
        aria-hidden
        className="fixed inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        style={{ zIndex: 40, mixBlendMode: 'overlay', opacity: 0.55 }}
      >
        <defs>
          <filter id="crochet-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1.8"
              numOctaves="2"
              seed="4"
              stitchTiles="stitch"
            />
            <feColorMatrix
              type="matrix"
              values="
                0 0 0 0 0.62
                0 0 0 0 0.48
                0 0 0 0 0.28
                0 0 0 0.5 0"
            />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#crochet-grain)" />
      </svg>

      {/* Weave / fabric layer — directional fractal noise simulating threads */}
      <svg
        aria-hidden
        className="fixed inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        style={{ zIndex: 41, mixBlendMode: 'soft-light', opacity: 0.7 }}
      >
        <defs>
          <filter id="crochet-weave" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.55"
              numOctaves="2"
              seed="3"
              result="weft"
              stitchTiles="stitch"
            />
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.55 0.012"
              numOctaves="2"
              seed="7"
              result="warp"
              stitchTiles="stitch"
            />
            <feBlend in="weft" in2="warp" mode="multiply" result="cloth" />
            <feColorMatrix
              in="cloth"
              type="matrix"
              values="
                0 0 0 0 0.55
                0 0 0 0 0.40
                0 0 0 0 0.20
                0 0 0 0.7 0"
            />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#crochet-weave)" />
      </svg>

      {/* Vignette to deepen edges (light-box feel) */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 42,
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 100%)',
        }}
      />
    </>
  );
}
