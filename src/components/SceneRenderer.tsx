'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Scene1 from './scenes/Scene1';
import Scene2 from './scenes/Scene2';
import Scene3 from './scenes/Scene3';
import Scene4 from './scenes/Scene4';
import Scene5 from './scenes/Scene5';
import Scene6 from './scenes/Scene6';
import CrochetOverlay from './CrochetOverlay';

interface SceneRendererProps {
  currentScene: number;
  currentTime: number;
}

const sceneComponents: Record<number, React.ComponentType> = {
  1: Scene1,
  2: Scene2,
  3: Scene3,
  4: Scene4,
  5: Scene5,
  6: Scene6,
};

export default function SceneRenderer({ currentScene }: SceneRendererProps) {
  const SceneComponent = sceneComponents[currentScene] || Scene1;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#04030a]">
      {/* 3-second crossfade between scenes — both render simultaneously */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentScene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full"
        >
          <SceneComponent />
        </motion.div>
      </AnimatePresence>

      {/* Global woven texture overlay — persists across crossfades */}
      <CrochetOverlay />
    </div>
  );
}
