"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { music } from "@/data/content";
import { useAssetExists } from "@/lib/useAssetExists";

/** Interactions that browsers accept as a gesture for starting audio. */
const UNLOCK_EVENTS = ["click", "touchend", "keydown"] as const;

/**
 * Background music that starts on its own, plus a floating 🎵/🔇 button to
 * turn it off. Browsers block sound until the visitor interacts with the page,
 * so if autoplay is refused it starts on her first tap or key press instead.
 * Hidden entirely if /public/music.mp3 doesn't exist.
 */
export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [playing, setPlaying] = useState(false);
  const available = useAssetExists(music.src);

  useEffect(() => {
    const audio = audioRef.current;
    if (!available || !audio) return;
    let cancelled = false;

    function removeListeners() {
      for (const type of UNLOCK_EVENTS) document.removeEventListener(type, unlock);
    }

    function unlock(event: Event) {
      removeListeners();
      // A tap on the button itself is handled by toggle().
      if (buttonRef.current?.contains(event.target as Node)) return;
      audio!.play().catch(() => {});
    }

    audio.volume = 0.4;
    audio.play().catch(() => {
      if (cancelled) return;
      for (const type of UNLOCK_EVENTS) document.addEventListener(type, unlock);
    });

    return () => {
      cancelled = true;
      removeListeners();
    };
  }, [available]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }

  if (!music.src || !available) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={music.src}
        loop
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={playing ? "Turn music off" : "Turn music on"}
        aria-pressed={playing}
        className="fixed top-[max(1rem,env(safe-area-inset-top))] right-4 z-20 grid size-11 cursor-pointer place-items-center rounded-full bg-white/70 text-xl shadow-soft ring-1 ring-crimson-400/40 backdrop-blur"
      >
        {playing ? "🎵" : "🔇"}
      </motion.button>
    </>
  );
}
