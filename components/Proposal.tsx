"use client";

import { motion } from "framer-motion";
import { proposal } from "@/data/content";
import { heartConfetti } from "@/lib/confetti";
import Divider from "./Divider";
import YesNoChoice from "./YesNoChoice";

type Props = {
  onYes: () => void;
};

/** "Will you marry me?" Yes leads to the quiz; No can never be clicked. */
export default function Proposal({ onYes }: Props) {
  function handleYes() {
    heartConfetti({ particleCount: 90, spread: 90, origin: { y: 0.55 } });
    onYes();
  }

  return (
    <section className="text-center">
      <p className="eyebrow">{proposal.eyebrow}</p>
      <motion.div
        aria-hidden
        className="mt-6 text-6xl"
        animate={{ scale: [1, 1.12, 1], rotate: [0, -4, 4, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        {proposal.emoji}
      </motion.div>
      <h2 className="mt-3 font-script text-6xl leading-tight text-balance text-crimson-500 sm:text-7xl">
        {proposal.question}
      </h2>
      <Divider center="heart" className="mt-2" />

      {/* No giveUpLabel, so the No button just keeps running away. */}
      <YesNoChoice
        yesLabel={proposal.yesButton}
        noLabels={proposal.noButtonLabels}
        onYes={handleYes}
      />
    </section>
  );
}
