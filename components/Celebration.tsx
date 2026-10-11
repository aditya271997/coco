"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { celebration } from "@/data/content";
import { heartConfetti, resetConfetti } from "@/lib/confetti";
import { useAssetExists } from "@/lib/useAssetExists";
import Divider from "./Divider";

type Props = {
  onRestart: () => void;
};

/** Hearts that burst outward in a ring around the title. */
const BURST = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2;
  const distance = 120 + (i % 3) * 35;
  return {
    emoji: ["💖", "💕", "💗"][i % 3],
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    delay: (i % 4) * 0.05,
  };
});

/** She said yes! Confetti, hearts, a photo and a "Play again" button. */
export default function Celebration({ onRestart }: Props) {
  const hasPhoto = useAssetExists(celebration.photo);

  useEffect(() => {
    // One big burst from the middle…
    heartConfetti({ particleCount: 120, spread: 100, startVelocity: 45, origin: { y: 0.6 } });

    // …then a short, gentle stream from both sides.
    const end = Date.now() + 1800;
    let frame = 0;
    const stream = () => {
      heartConfetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: 0.7 } });
      heartConfetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: 0.7 } });
      if (Date.now() < end) frame = requestAnimationFrame(stream);
    };
    stream();

    return () => {
      cancelAnimationFrame(frame);
      resetConfetti();
    };
  }, []);

  return (
    <section className="flex flex-col items-center text-center">
      <div className="relative">
        {/* Heart burst */}
        <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
          {BURST.map((heart, i) => (
            <motion.span
              key={i}
              className="absolute text-2xl"
              initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
              animate={{ x: heart.x, y: heart.y, scale: [0, 1.3, 1], opacity: [1, 1, 0] }}
              transition={{ duration: 1.4, delay: heart.delay, ease: "easeOut" }}
            >
              {heart.emoji}
            </motion.span>
          ))}
        </div>

        <motion.div
          aria-hidden
          className="text-6xl"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.3, 1] }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          💖
        </motion.div>
      </div>

      <motion.p
        className="mt-6 font-serif text-sm tracking-[0.4em] text-crimson-400 uppercase sm:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        — {celebration.eyebrow} —
      </motion.p>
      <motion.h2
        className="mt-2 font-script text-6xl leading-tight text-balance text-crimson-500 sm:text-7xl"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {celebration.title}
      </motion.h2>
      <Divider center="heart" className="mt-2" />
      <motion.p
        className="mt-5 text-2xl leading-snug font-medium"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {celebration.message}
      </motion.p>

      {/* Polaroid-style photo; only shown if /public/us.jpg exists. */}
      {celebration.photo && hasPhoto && (
        <motion.figure
          className="mt-8 w-60 rounded-2xl border border-gold-200 bg-white p-3 pb-1 shadow-card"
          initial={{ opacity: 0, scale: 0.85, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: -3 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 200, damping: 14 }}
        >
          <Image
            src={celebration.photo}
            alt={celebration.photoAlt}
            width={480}
            height={480}
            sizes="240px"
            className="aspect-square w-full rounded-xl object-cover"
          />
          <figcaption className="font-script text-3xl text-crimson-500">
            {celebration.photoCaption}
          </figcaption>
        </motion.figure>
      )}

      <motion.button
        type="button"
        onClick={onRestart}
        className="btn-outline mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
      >
        {celebration.playAgainButton}
      </motion.button>
    </section>
  );
}
