'use client';

import { useEffect, useRef, useState } from 'react';
import { getSceneFromTime } from '@/lib/sceneConfig';
import StartScreen from './StartScreen';
import SceneRenderer from './SceneRenderer';

// Place your audio file at /public/sone-zoe.mp3

export default function AudioController() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [started, setStarted] = useState(false);
  const [currentScene, setCurrentScene] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const t = audio.currentTime;
      setCurrentTime(t);
      setCurrentScene(getSceneFromTime(t));
    };

    const handleEnded = () => {
      // Stay on last scene when song ends
      setCurrentScene(6);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handleStart = async () => {
    setStarted(true);
    try {
      await audioRef.current?.play();
    } catch (err) {
      // Autoplay might be blocked; still show scenes
      console.warn('Audio play blocked:', err);
    }
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src="/sone-zoe.mp3" preload="auto" />
      {!started ? (
        <StartScreen onStart={handleStart} />
      ) : (
        <SceneRenderer currentScene={currentScene} currentTime={currentTime} />
      )}
    </>
  );
}
