"use client";

import { motion } from "framer-motion";

type Props = {
  total: number;
  filled: number;
};

/** A row of little hearts that fill up (with a pop) as she answers. */
export default function ProgressHearts({ total, filled }: Props) {
  return (
    <div
      role="progressbar"
      aria-label="Quiz progress"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={filled}
      className="mb-6 flex flex-wrap justify-center gap-1.5"
    >
      {Array.from({ length: total }, (_, i) => (
        <Heart key={i} filled={i < filled} />
      ))}
    </div>
  );
}

function Heart({ filled }: { filled: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      aria-hidden
      className="size-7"
      animate={filled ? { scale: [1, 1.4, 1] } : { scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        strokeWidth={1.5}
        className={`transition-colors duration-300 ${
          filled ? "fill-crimson-400 stroke-crimson-400" : "fill-white/70 stroke-gold-300"
        }`}
      />
    </motion.svg>
  );
}
