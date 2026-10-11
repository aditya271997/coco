"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { letter } from "@/data/content";
import Divider from "./Divider";

type Props = {
  onDone: () => void;
};

const typedText = [letter.greeting, ...letter.paragraphs, letter.signOff].join("\n\n");

/** The apology letter on a deep maroon card, typed out one character at a time. */
export default function ApologyLetter({ onDone }: Props) {
  const reduceMotion = useReducedMotion();
  const { typed, rest, done, finish } = useTypewriter(typedText, !reduceMotion);

  return (
    <section className="relative overflow-hidden rounded-3xl bg-radial-[ellipse_at_50%_35%] from-maroon-700 via-maroon-800 to-maroon-900 px-6 pt-10 pb-8 text-center shadow-soft sm:px-10">
      {/* Faint ring, like the corners of the background */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full border border-blush-300/10"
      />

      <p className="font-sans text-xs font-medium tracking-[0.35em] text-gold-400 uppercase">
        {letter.eyebrow}
      </p>
      <h2 className="mt-2 font-script text-6xl leading-tight text-blush-300">{letter.title}</h2>
      <Divider center="heart" className="mt-2" />

      {/* Screen readers get the whole letter at once instead of a stream of letters. */}
      <p className="sr-only">
        {typedText} {letter.signature}
      </p>

      {/* The untyped remainder is rendered invisibly so the card doesn't grow as it types. */}
      <p
        aria-hidden
        className="mt-8 text-left text-[1.35rem] leading-relaxed whitespace-pre-line text-blush-100 italic"
      >
        {typed}
        {!done && (
          <span className="ml-0.5 inline-block h-[1em] w-0.5 animate-blink bg-gold-400 align-middle" />
        )}
        <span className="invisible">{rest}</span>
      </p>

      {/* Signature, written in script once the letter is finished */}
      <div aria-hidden className="mt-1 min-h-16 text-left">
        <AnimatePresence>
          {done && (
            <motion.p
              className="font-script text-5xl text-blush-300"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {letter.signature}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex min-h-12 justify-center">
        {done ? (
          <motion.button
            type="button"
            onClick={onDone}
            className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full border-2 border-gold-400 px-9 py-3 font-sans text-sm font-medium tracking-[0.25em] text-gold-300 uppercase transition-colors hover:bg-gold-400/10 focus-visible:ring-4 focus-visible:ring-gold-400/40 focus-visible:outline-none"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
          >
            {letter.continueButton}
          </motion.button>
        ) : (
          <button
            type="button"
            onClick={finish}
            className="cursor-pointer rounded-full px-4 py-2 font-sans text-xs tracking-[0.25em] text-blush-200/70 uppercase underline-offset-4 hover:underline"
          >
            {letter.skipButton}
          </button>
        )}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------

/** Splits text into characters without breaking emoji apart mid-type. */
function splitCharacters(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), (s) => s.segment);
  }
  return Array.from(text);
}

/** How long to wait after typing `char`, so it reads like someone writing. */
function pauseAfter(char: string | undefined): number {
  if (char === "\n") return 220;
  if (char && ".!?…".includes(char)) return 320;
  if (char && ",;:—".includes(char)) return 150;
  return 34;
}

/**
 * Reveals `text` one character at a time.
 * When `enabled` is false (e.g. "reduce motion" is on) the full text shows immediately.
 */
function useTypewriter(text: string, enabled: boolean) {
  const chars = useMemo(() => splitCharacters(text), [text]);
  const [count, setCount] = useState(0);

  const done = !enabled || count >= chars.length;

  useEffect(() => {
    if (done) return;
    const timer = setTimeout(() => setCount((c) => c + 1), pauseAfter(chars[count - 1]));
    return () => clearTimeout(timer);
  }, [done, count, chars]);

  const shown = done ? chars.length : count;
  return {
    typed: chars.slice(0, shown).join(""),
    rest: chars.slice(shown).join(""),
    done,
    finish: () => setCount(chars.length),
  };
}
