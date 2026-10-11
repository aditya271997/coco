"use client";

import { motion } from "framer-motion";
import { storyUi, type StoryStep } from "@/data/content";
import Divider from "./Divider";

type Props = {
  step: StoryStep;
  index: number;
  total: number;
  onNext: () => void;
};

/** One heartfelt message per screen, shown before the proposal. */
export default function StoryMessage({ step, index, total, onNext }: Props) {
  return (
    <section className="flex flex-col items-center text-center">
      {/* Gold diamonds showing how far along she is */}
      <div
        role="progressbar"
        aria-label="Progress"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={index + 1}
        className="flex items-center gap-2.5"
      >
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={`block size-2 rotate-45 transition-colors duration-500 ${
              i <= index ? "bg-gold-500" : "border border-gold-300"
            }`}
          />
        ))}
      </div>

      <motion.div
        aria-hidden
        className="mt-8 text-6xl"
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
      >
        {step.emoji}
      </motion.div>

      <motion.h2
        className="mt-4 font-script text-6xl leading-tight text-balance text-crimson-500"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6 }}
      >
        {step.title}
      </motion.h2>

      <Divider center="heart" className="mt-2" />

      <motion.p
        className="mt-6 max-w-sm text-[1.7rem] leading-snug font-medium text-balance"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {step.text}
      </motion.p>

      {/* The button waits a moment so she reads the message first */}
      <motion.button
        type="button"
        onClick={onNext}
        className="btn-outline mt-10 min-w-48"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
      >
        {step.button ?? storyUi.continueButton}
      </motion.button>
    </section>
  );
}
