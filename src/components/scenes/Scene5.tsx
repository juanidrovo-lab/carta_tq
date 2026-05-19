'use client';

import { motion } from 'framer-motion';
import AmbientField from '@/components/AmbientField';

const text1 =
  'Feliz cumpleaños, niña hermosa. Espero de todo corazón que cumplas todas tus metas, todos tus objetivos y todo lo que alguna vez anhelaste.';

const text2 =
  'Aún no hemos definido si seguiremos juntos o si nos vamos a distanciar. Pero quiero que sepas algo con absoluta certeza: eres el amor de mi vida. Eres aquello que no quisiera perder jamás. Sea cual sea el resultado, siempre vas a estar en mi corazón, y serás la primera mujer con la que quise, no solo formar una familia, sino construir una vida entera juntos.';

function CinematicParagraph({
  text,
  delay,
  size = 'base',
}: {
  text: string;
  delay: number;
  size?: 'base' | 'small';
}) {
  const words = text.split(' ');
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: delay } },
  };
  const word = {
    hidden: { opacity: 0 },
    show: {
      opacity: 0.82,
      transition: { duration: 1.2, ease: 'easeInOut' as const },
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
        color: '#ecd9c0',
        letterSpacing: '0.06em',
        lineHeight: 2.0,
        textShadow:
          '0 1px 14px rgba(0,0,0,0.98), 0 0 30px rgba(0,0,0,0.85)',
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

export default function Scene5() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Two color masses pulling apart — warm crimson and cool indigo */}
      <AmbientField
        baseColor="#04030a"
        colors={[
          { color: '#5a0a18', size: 130, opacity: 0.7,  blur: 110, duration: 95,  startX: '-15%', startY: '10%' },
          { color: '#0d1a4a', size: 130, opacity: 0.65, blur: 110, duration: 110, startX: '55%',  startY: '15%' },
          { color: '#3a0820', size: 90,  opacity: 0.5,  blur: 100, duration: 85,  startX: '20%',  startY: '55%' },
          { color: '#1a2055', size: 90,  opacity: 0.45, blur: 100, duration: 100, startX: '45%',  startY: '60%' },
        ]}
      />

      {/* Slow heart-pulse — a faint warm presence at center, breathing */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ mixBlendMode: 'screen' }}
      >
        <div
          style={{
            width: '24vmin',
            height: '24vmin',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(220,80,70,0.30) 0%, rgba(140,30,40,0.15) 40%, transparent 70%)',
            filter: 'blur(35px)',
          }}
        />
      </motion.div>

      {/* Two stacked paragraphs separated by a soft breathing pause */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 gap-8 md:gap-10">
        <CinematicParagraph text={text1} delay={2.5} />
        <CinematicParagraph text={text2} delay={11} size="small" />
      </div>
    </div>
  );
}
