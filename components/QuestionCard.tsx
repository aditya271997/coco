"use client";

import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useState } from "react";
import { quizUi, type Answer, type Question } from "@/data/content";

type Props = {
  question: Question;
  number: number;
  total: number;
  isLast: boolean;
  /** Called once, when she picks a right answer. */
  onSolved: () => void;
  /** Called when she taps "Next". */
  onNext: () => void;
};

type PickResult = "correct" | "wrong";

type Feedback = {
  tone: "happy" | "hint";
  text: string;
  /** Changes on every pick so the bubble re-animates even if the text repeats. */
  id: number;
};

/** Pastel header gradients (mint, sky, butter, pink), cycled per question. */
const HEADER_GRADIENTS = [
  "from-[#c6f6dc] to-[#a6eee3]",
  "from-[#c7ddff] to-[#b3f0ff]",
  "from-[#fde68a] to-[#fff4c7]",
  "from-[#fbcfe8] to-[#f1d6ff]",
];

/**
 * One question with its answer cards, styled like an event card.
 * Right answer → bounce + reaction. Wrong answer → wiggle + hint, try again.
 */
export default function QuestionCard({ question, number, total, isLast, onSolved, onNext }: Props) {
  const [solvedIndex, setSolvedIndex] = useState<number | null>(null);
  const [wrongPicks, setWrongPicks] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const solved = solvedIndex !== null;
  const gradient = HEADER_GRADIENTS[(number - 1) % HEADER_GRADIENTS.length];

  function handlePick(index: number): PickResult {
    const answer = question.answers[index];
    const id = (feedback?.id ?? 0) + 1;

    if (answer.correct) {
      setSolvedIndex(index);
      setFeedback({ tone: "happy", text: answer.reaction ?? question.reaction, id });
      onSolved();
      return "correct";
    }

    setWrongPicks((picks) => (picks.includes(index) ? picks : [...picks, index]));
    setFeedback({
      tone: "hint",
      text: answer.hint ?? question.hint ?? "Not quite… try again 🙈",
      id,
    });
    return "wrong";
  }

  return (
    <article className="overflow-hidden rounded-3xl border border-gold-200 bg-white shadow-card">
      {/* Pastel header */}
      <header className={`bg-linear-135 ${gradient} px-6 pt-6 pb-5`}>
        <div className="flex items-start justify-between">
          <motion.span
            aria-hidden
            className="text-5xl"
            initial={{ scale: 0.4, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 14 }}
          >
            {question.emoji}
          </motion.span>
          <span className="pt-2 font-sans text-xs font-medium tracking-[0.25em] text-gold-700">
            {number} / {total}
          </span>
        </div>
        <h2 className="mt-4 text-[1.75rem] leading-tight font-semibold text-balance">
          {question.question}
        </h2>
      </header>

      <div className="px-5 pt-5 pb-6">
        {/* Answers */}
        <ul className="flex flex-col gap-3">
          {question.answers.map((answer, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.07 }}
            >
              <AnswerOption
                answer={answer}
                index={i}
                state={
                  solvedIndex === i
                    ? "correct"
                    : solved
                      ? "faded"
                      : wrongPicks.includes(i)
                        ? "wrong"
                        : "idle"
                }
                disabled={solved}
                onPick={handlePick}
              />
            </motion.li>
          ))}
        </ul>

        {/* Reaction / hint bubble (announced to screen readers) */}
        <div aria-live="polite" className="mt-5 min-h-12">
          <AnimatePresence mode="wait">
            {feedback && (
              <motion.p
                key={feedback.id}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, transition: { duration: 0.12 } }}
                className={`rounded-2xl px-4 py-3 text-center text-xl font-medium italic ${
                  feedback.tone === "happy"
                    ? "bg-blush-100 text-crimson-600"
                    : "bg-gold-100 text-gold-700"
                }`}
              >
                {feedback.text}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* "honest" questions reveal a sincere note once answered */}
        {solved && question.message && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-4 rounded-2xl bg-radial from-maroon-700 to-maroon-900 p-5 text-center shadow-soft"
          >
            <p className="font-sans text-xs font-medium tracking-[0.35em] text-gold-300 uppercase">
              {quizUi.noteFrom}
            </p>
            <p className="mt-3 text-xl leading-relaxed text-blush-100 italic">{question.message}</p>
          </motion.div>
        )}

        {/* Next button */}
        {solved && (
          <motion.div
            className="mt-6 flex justify-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: question.message ? 0.9 : 0.35 }}
          >
            <motion.button
              type="button"
              onClick={onNext}
              className="btn-primary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLast ? quizUi.finishButton : quizUi.nextButton}
            </motion.button>
          </motion.div>
        )}
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------

type OptionState = "idle" | "correct" | "wrong" | "faded";

const optionStyles: Record<OptionState, string> = {
  idle: "border-gold-200 bg-white hover:border-gold-300 hover:bg-cream",
  correct: "border-crimson-400 bg-blush-50 ring-2 ring-blush-200",
  wrong: "border-gold-100 bg-white opacity-60",
  faded: "border-gold-100 bg-white opacity-45",
};

const optionMarks: Record<OptionState, string> = {
  idle: "",
  correct: "💖",
  wrong: "🙈",
  faded: "",
};

type OptionProps = {
  answer: Answer;
  index: number;
  state: OptionState;
  disabled: boolean;
  onPick: (index: number) => PickResult;
};

/** A single answer card. Plays its own bounce/wiggle when tapped. */
function AnswerOption({ answer, index, state, disabled, onPick }: OptionProps) {
  const controls = useAnimationControls();

  function handleClick() {
    if (onPick(index) === "correct") {
      // Happy bounce
      controls.start({
        y: [0, -14, 0, -6, 0],
        scale: [1, 1.04, 1, 1.02, 1],
        transition: { duration: 0.6, ease: "easeOut" },
      });
    } else {
      // Gentle "nope" wiggle
      controls.start({
        x: [0, -10, 10, -7, 7, -3, 3, 0],
        transition: { duration: 0.5 },
      });
    }
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      animate={controls}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      className={`flex min-h-14 w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border px-5 py-3 text-left text-xl font-medium shadow-sm transition-[background-color,border-color,opacity,box-shadow] duration-300 focus-visible:ring-4 focus-visible:ring-gold-200 focus-visible:outline-none disabled:cursor-default ${optionStyles[state]}`}
    >
      <span>{answer.text}</span>
      <span aria-hidden className="shrink-0 text-xl not-italic">
        {optionMarks[state]}
      </span>
    </motion.button>
  );
}
