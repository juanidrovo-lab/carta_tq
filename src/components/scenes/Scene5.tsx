'use client';

import { motion } from 'framer-motion';
import CrochetHeart from '@/components/svg/CrochetHeart';

const text1 =
  'Feliz cumpleaños, niña hermosa. Espero de todo corazón que cumplas todas tus metas, todos tus objetivos y todo lo que alguna vez anhelaste.';

const text2 =
  'Al momento de escribirte esto, aún no hemos definido si es que vamos a seguir juntos o nos vamos a distanciar. Pero quiero que sepas algo con absoluta certeza: eres el amor de mi vida. Eres aquello que no quisiera perder jamás. Sea cual sea el resultado de nuestras conversaciones, siempre vas a estar en mi corazón, y serás la primera mujer con la que quise, no solo formar una familia, sino construir una vida entera juntos.';

function WordByWord({ text, delay }: { text: string; delay: number }) {
  const words = text.split(' ');
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: delay } },
  };
  const wordVariant = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
  };
  return (
    <motion.p
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="text-base md:text-lg leading-relaxed text-center"
      style={{
        color: '#e8e0d0',
        fontFamily: 'var(--font-playfair)',
        textShadow: '0 2px 8px rgba(0,0,0,0.8)',
        lineHeight: '1.9',
      }}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.28em' }}>
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

// Crochet tapestry unraveling SVG
function CrochetTapestry() {
  const rows = 6;
  const cols = 12;
  return (
    <svg viewBox="0 0 300 90" className="w-full opacity-40">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: cols }).map((_, col) => {
          const x = 12 + col * 24;
          const y = 8 + row * 14;
          return (
            <motion.path
              key={`${row}-${col}`}
              d={`M ${x} ${y} Q ${x + 5} ${y - 5} ${x + 10} ${y} Q ${x + 15} ${y + 5} ${x + 20} ${y}`}
              fill="none"
              stroke={row % 2 === 0 ? '#d4a017' : '#3a6bc8'}
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: row < 4 ? 1 : [1, 0],
                opacity: row < 4 ? 0.6 : [0.6, 0],
              }}
              transition={{
                duration: row < 4 ? 0.4 : 1.5,
                delay: 0.3 + row * 0.12 + col * 0.04,
                ease: 'easeOut',
              }}
            />
          );
        })
      )}
    </svg>
  );
}

// Diverging paths SVG
function DivergingPaths() {
  return (
    <svg viewBox="0 0 200 60" className="w-48 mx-auto opacity-60">
      {/* Left path */}
      <motion.path
        d="M 100 10 Q 75 25 50 45 Q 35 55 20 58"
        fill="none"
        stroke="#d4a017"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 1.5, delay: 1.0 }}
      />
      {/* Right path */}
      <motion.path
        d="M 100 10 Q 125 25 150 45 Q 165 55 180 58"
        fill="none"
        stroke="#3a6bc8"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 1.5, delay: 1.2 }}
      />
      {/* Origin dot */}
      <motion.circle
        cx="100"
        cy="10"
        r="3.5"
        fill="#e8b84b"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />
    </svg>
  );
}

export default function Scene5() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start bg-[#070810] overflow-y-auto overflow-x-hidden">
      {/* Dense crochet tapestry at top */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-4 pt-6">
        <CrochetTapestry />
      </div>

      {/* Dark background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(192,57,43,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-5 max-w-lg mx-auto px-6 w-full py-2">
        {/* Birthday greeting first */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex items-center gap-3"
        >
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#c0392b]/60" />
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: '#c0392b', letterSpacing: '0.2em', fontFamily: 'var(--font-playfair)' }}
          >
            La Encrucijada
          </span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#c0392b]/60" />
        </motion.div>

        <WordByWord text={text1} delay={0.8} />

        {/* Beating crochet heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2.5, ease: 'easeOut' }}
          className="flex justify-center"
        >
          <CrochetHeart size={100} color="#c0392b" />
        </motion.div>

        {/* Diverging paths */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3.0 }}
          className="w-full"
        >
          <DivergingPaths />
        </motion.div>

        <WordByWord text={text2} delay={3.5} />
      </div>
    </div>
  );
}
