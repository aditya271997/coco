"use client";

import { motion } from "framer-motion";
import { finalQuestion } from "@/data/content";
import Divider from "./Divider";
import YesNoChoice from "./YesNoChoice";

type Props = {
  onYes: () => void;
};

/**
 * "Will you forgive me?" The No button runs away a few times, then gives up
 * and turns into a second Yes.
 */
export default function FinalQuestion({ onYes }: Props) {
  return (
    <section className="text-center">
      <p className="eyebrow">{finalQuestion.eyebrow}</p>
      <h2 className="mt-3 font-script text-6xl leading-tight text-balance text-crimson-500 sm:text-7xl">
        {finalQuestion.question}
      </h2>
      <Divider center="heart" className="mt-2" />
      <motion.div
        aria-hidden
        className="mt-5 text-5xl"
        animate={{ rotate: [0, -6, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {finalQuestion.emoji}
      </motion.div>

      <YesNoChoice
        yesLabel={finalQuestion.yesButton}
        noLabels={finalQuestion.noButtonLabels}
        giveUpLabel={finalQuestion.giveUpLabel}
        onYes={onYes}
      />
    </section>
  );
}
