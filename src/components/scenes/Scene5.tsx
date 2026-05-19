'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

const text1 =
  'Feliz cumpleaños, niña hermosa. Espero de todo corazón que cumplas todas tus metas, todos tus objetivos y todo lo que alguna vez anhelaste.';

const text2 =
  'Aún no hemos definido si seguiremos juntos o si nos vamos a distanciar. Pero quiero que sepas algo con absoluta certeza: eres el amor de mi vida. Eres aquello que no quisiera perder jamás. Sea cual sea el resultado, siempre vas a estar en mi corazón, y serás la primera mujer con la que quise, no solo formar una familia, sino construir una vida entera juntos.';

function CinematicParagraph({
  textBody,
  delay,
  size = 'base',
}: {
  textBody: string;
  delay: number;
  size?: 'base' | 'small';
}) {
  const words = textBody.split(' ');
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: delay } },
  };
  const word = {
    hidden: { opacity: 0 },
    show: {
      opacity: 0.85,
      transition: { duration: 1.1, ease: 'easeInOut' as const },
    },
  };
  return (
    <motion.p
      variants={container}
      initial="hidden"
      animate="show"
      className="text-center max-w-xl mx-auto"
      style={{
        fontFamily: 'var(--font-playfair)',
        fontWeight: 300,
        fontSize:
          size === 'small'
            ? 'clamp(0.85rem, 2.1vw, 1.05rem)'
            : 'clamp(0.95rem, 2.4vw, 1.15rem)',
        color: '#f0e2c8',
        letterSpacing: '0.06em',
        lineHeight: 2,
        textShadow:
          '0 1px 16px rgba(0,0,0,1), 0 0 36px rgba(0,0,0,0.9)',
      }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={word}
          style={{ display: 'inline-block', marginRight: '0.32em' }}
        >
          {w}
        </motion.span>
      ))}
    </motion.p>
  );
}

/**
 * Scene 5 — La Vela.
 * A single candle flame burns at the center, gently flickering — the birthday wish.
 * After the wish is read, the world around it slowly divides: warm and cold
 * color masses pull apart toward the edges. The flame remains lit, unmoved,
 * at the exact center. The love that endures regardless of outcome.
 */
export default function Scene5() {
  // Birthday spark particles rising from the flame
  const sparks = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        x: 48 + ((i * 37) % 100) / 100 * 4 - 2, // around center
        delay: 1.5 + i * 1.3,
        duration: 6 + (i % 3) * 1.5,
        size: 2 + (i % 3),
      })),
    []
  );

  const DIVISION_DELAY = 14; // when the second text starts ~text2

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#040208]">
      {/* WARM MASS (right) — pulls right as uncertainty appears */}
      <motion.div
        className="absolute"
        style={{
          width: '120vmax',
          height: '120vmax',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(180,40,30,0.6) 0%, rgba(120,20,30,0.25) 40%, transparent 70%)',
          filter: 'blur(95px)',
          mixBlendMode: 'screen',
          left: '50%',
          top: '50%',
          translate: '-50% -50%',
        }}
        animate={{
          translateX: ['-50%', '-50%', '-20%'],
          opacity: [0.5, 0.6, 0.7],
        }}
        transition={{
          duration: 30,
          times: [0, DIVISION_DELAY / 30, 1],
          ease: 'easeInOut',
        }}
      />

      {/* COLD MASS (left) — pulls left as uncertainty appears */}
      <motion.div
        className="absolute"
        style={{
          width: '120vmax',
          height: '120vmax',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(30,40,120,0.55) 0%, rgba(20,30,80,0.25) 40%, transparent 70%)',
          filter: 'blur(95px)',
          mixBlendMode: 'screen',
          left: '50%',
          top: '50%',
          translate: '-50% -50%',
        }}
        animate={{
          translateX: ['-50%', '-50%', '-80%'],
          opacity: [0.5, 0.6, 0.7],
        }}
        transition={{
          duration: 30,
          times: [0, DIVISION_DELAY / 30, 1],
          ease: 'easeInOut',
        }}
      />

      {/* THE FLAME — drawn in SVG with subtle morphing/flicker, unmoved by the division */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.svg
          width="120"
          height="180"
          viewBox="0 0 120 180"
          style={{ overflow: 'visible' }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
        >
          <defs>
            <radialGradient id="flame-grad" cx="50%" cy="65%" r="55%">
              <stop offset="0%"   stopColor="#fff8dc" stopOpacity="1" />
              <stop offset="35%"  stopColor="#ffd068" stopOpacity="0.95" />
              <stop offset="65%"  stopColor="#e87820" stopOpacity="0.7" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="flame-core" cx="50%" cy="70%" r="40%">
              <stop offset="0%"   stopColor="#ffffff" stopOpacity="1" />
              <stop offset="50%"  stopColor="#fff0b0" stopOpacity="0.9" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <filter id="flame-glow">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* Outer flame — morphs slightly to flicker */}
          <motion.path
            fill="url(#flame-grad)"
            filter="url(#flame-glow)"
            initial={{ d: 'M 60 30 C 30 70 25 110 60 140 C 95 110 90 70 60 30 Z' }}
            animate={{
              d: [
                'M 60 30 C 30 70 25 110 60 140 C 95 110 90 70 60 30 Z',
                'M 60 26 C 28 68 22 112 60 142 C 96 112 92 68 60 26 Z',
                'M 60 32 C 32 72 28 108 60 138 C 92 108 88 72 60 32 Z',
                'M 60 28 C 26 70 24 110 60 140 C 94 110 92 70 60 28 Z',
                'M 60 30 C 30 70 25 110 60 140 C 95 110 90 70 60 30 Z',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Hot core */}
          <motion.ellipse
            cx="60"
            cy="105"
            rx="14"
            ry="22"
            fill="url(#flame-core)"
            animate={{
              ry: [22, 24, 21, 23, 22],
              opacity: [0.95, 1, 0.9, 1, 0.95],
            }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.svg>
      </div>

      {/* Halo around the flame */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        animate={{ opacity: [0.55, 0.85, 0.55], scale: [1, 1.06, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ mixBlendMode: 'screen' }}
      >
        <div
          style={{
            width: '36vmin',
            height: '36vmin',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255,205,110,0.4) 0%, rgba(212,120,40,0.15) 40%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </motion.div>

      {/* Rising sparks — birthday embers */}
      {sparks.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: s.size,
            height: s.size,
            background:
              'radial-gradient(circle, rgba(255,230,150,1) 0%, rgba(240,180,80,0.5) 50%, transparent 80%)',
            boxShadow: '0 0 8px rgba(240,180,80,0.6)',
            left: `${s.x}%`,
            top: '52%',
            translate: '-50% -50%',
          }}
          animate={{
            top: ['52%', '50%', '40%', '25%', '12%'],
            opacity: [0, 0.9, 0.8, 0.4, 0],
            scale: [0.5, 1, 1, 0.8, 0.4],
            left: [
              `${s.x}%`,
              `${s.x + 0.5}%`,
              `${s.x - 0.6}%`,
              `${s.x + 0.7}%`,
              `${s.x}%`,
            ],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Birthday wish — upper */}
      <div className="absolute inset-x-0 top-[6%] px-8 flex justify-center">
        <CinematicParagraph textBody={text1} delay={2.5} />
      </div>

      {/* Uncertainty + certainty — lower */}
      <div className="absolute inset-x-0 bottom-[5%] px-8 flex justify-center">
        <CinematicParagraph textBody={text2} delay={DIVISION_DELAY} size="small" />
      </div>
    </div>
  );
}
