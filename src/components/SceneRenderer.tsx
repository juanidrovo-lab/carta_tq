'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Scene1 from './scenes/Scene1';
import Scene2 from './scenes/Scene2';
import Scene3 from './scenes/Scene3';
import Scene4 from './scenes/Scene4';
import Scene5 from './scenes/Scene5';
import Scene6 from './scenes/Scene6';
import { SCENE_LABELS } from '@/lib/sceneConfig';

interface SceneRendererProps {
  currentScene: number;
  currentTime: number;
}

const sceneTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.9, ease: 'easeInOut' },
};

const sceneComponents: Record<number, React.ComponentType> = {
  1: Scene1,
  2: Scene2,
  3: Scene3,
  4: Scene4,
  5: Scene5,
  6: Scene6,
};

export default function SceneRenderer({ currentScene, currentTime }: SceneRendererProps) {
  const SceneComponent = sceneComponents[currentScene] || Scene1;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0a0f]">
      {/* Scene label indicator */}
      <motion.div
        key={`label-${currentScene}`}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 0.5, x: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-5 left-5 z-50 flex items-center gap-2"
      >
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: '#d4a017' }}
        />
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: '#d4a017', fontFamily: 'var(--font-playfair)', letterSpacing: '0.15em' }}
        >
          {SCENE_LABELS[currentScene]}
        </span>
      </motion.div>

      {/* Scene number */}
      <motion.div
        key={`num-${currentScene}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 0.6 }}
        className="absolute top-5 right-5 z-50"
      >
        <span
          className="text-xs"
          style={{ color: '#6b7280', fontFamily: 'var(--font-playfair)' }}
        >
          {currentScene} / 6
        </span>
      </motion.div>

      {/* Scene content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          initial={sceneTransition.initial}
          animate={sceneTransition.animate}
          exit={sceneTransition.exit}
          transition={sceneTransition.transition}
          className="w-full h-full"
        >
          <SceneComponent />
        </motion.div>
      </AnimatePresence>

      {/* Time debug (hidden in production – remove if unwanted) */}
      <div className="absolute bottom-2 right-3 z-50 opacity-20 text-[10px] tabular-nums" style={{ color: '#6b7280' }}>
        {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}
      </div>
    </div>
  );
}
