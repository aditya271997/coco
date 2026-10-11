"use client";

import { motion } from "framer-motion";
import { landing } from "@/data/content";
import Divider from "./Divider";

type Props = {
  onStart: () => void;
};

/** Hero screen: her name in big script, a sweet hello and a Start button. */
export default function Landing({ onStart }: Props) {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.p
        className="font-serif text-sm tracking-[0.4em] text-crimson-400 uppercase sm:text-base"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        — {landing.eyebrow} —
      </motion.p>

      <motion.h1
        className="mt-2 font-script text-8xl leading-[1.15] text-crimson-500 sm:text-9xl"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25, duration: 0.7, ease: "easeOut" }}
      >
        {landing.name}
      </motion.h1>

      <Divider className="mt-2" />

      <motion.p
        className="mt-6 text-3xl leading-snug font-medium text-balance"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {landing.title}
      </motion.p>
      <motion.p
        className="mt-3 font-sans text-sm tracking-wide text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
      >
        {landing.subtitle}
      </motion.p>

      <motion.button
        type="button"
        onClick={onStart}
        className="btn-outline mt-10 min-w-48"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
      >
        {landing.startButton}
      </motion.button>

      {/* Little bobbing diamond, like the "scroll" hint */}
      <motion.span
        aria-hidden
        className="mt-10 block size-3 rotate-45 bg-gold-300"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
