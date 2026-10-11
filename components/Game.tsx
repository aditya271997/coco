"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useReducer } from "react";
import { questions, story } from "@/data/content";
import ApologyLetter from "./ApologyLetter";
import Celebration from "./Celebration";
import FinalQuestion from "./FinalQuestion";
import FloatingHearts from "./FloatingHearts";
import Landing from "./Landing";
import MusicToggle from "./MusicToggle";
import ProgressHearts from "./ProgressHearts";
import Proposal from "./Proposal";
import QuestionCard from "./QuestionCard";
import StoryMessage from "./StoryMessage";

// ---------------------------------------------------------------------------
// State machine
//
//   landing → story 0 → … → story N → proposal ─(yes)→ question 0 → … → question N
//      ↑                                                                    │
//      │              celebration ←─(yes)─ final ←── letter ←───────────────┘
//      └──── restart ─────┘
// ---------------------------------------------------------------------------

type Step =
  | { screen: "landing" }
  | { screen: "story"; index: number }
  | { screen: "proposal" }
  /** `solved` flips to true once she picks a right answer (fills the progress heart). */
  | { screen: "question"; index: number; solved: boolean }
  | { screen: "letter" }
  | { screen: "final" }
  | { screen: "celebration" };

type Action =
  | { type: "start" }
  | { type: "accept" }
  | { type: "solve" }
  | { type: "next" }
  | { type: "forgive" }
  | { type: "restart" };

const firstStory = (): Step =>
  story.length > 0 ? { screen: "story", index: 0 } : { screen: "proposal" };

const firstQuestion = (): Step =>
  questions.length > 0 ? { screen: "question", index: 0, solved: false } : { screen: "letter" };

function reducer(step: Step, action: Action): Step {
  switch (action.type) {
    case "start":
      return step.screen === "landing" ? firstStory() : step;

    case "accept":
      return step.screen === "proposal" ? firstQuestion() : step;

    case "solve":
      return step.screen === "question" ? { ...step, solved: true } : step;

    case "next":
      if (step.screen === "story") {
        const index = step.index + 1;
        return index < story.length ? { screen: "story", index } : { screen: "proposal" };
      }
      if (step.screen === "question") {
        const index = step.index + 1;
        return index < questions.length
          ? { screen: "question", index, solved: false }
          : { screen: "letter" };
      }
      if (step.screen === "letter") return { screen: "final" };
      return step;

    case "forgive":
      return step.screen === "final" ? { screen: "celebration" } : step;

    case "restart":
      return { screen: "landing" };
  }
}

/** A unique key per screen, so AnimatePresence animates between them. */
function screenKey(step: Step) {
  return "index" in step ? `${step.screen}-${step.index}` : step.screen;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Game() {
  const [step, dispatch] = useReducer(reducer, { screen: "landing" });

  function renderScreen() {
    switch (step.screen) {
      case "landing":
        return <Landing onStart={() => dispatch({ type: "start" })} />;
      case "story":
        return (
          <StoryMessage
            step={story[step.index]}
            index={step.index}
            total={story.length}
            onNext={() => dispatch({ type: "next" })}
          />
        );
      case "proposal":
        return <Proposal onYes={() => dispatch({ type: "accept" })} />;
      case "question":
        return (
          <QuestionCard
            question={questions[step.index]}
            number={step.index + 1}
            total={questions.length}
            isLast={step.index === questions.length - 1}
            onSolved={() => dispatch({ type: "solve" })}
            onNext={() => dispatch({ type: "next" })}
          />
        );
      case "letter":
        return <ApologyLetter onDone={() => dispatch({ type: "next" })} />;
      case "final":
        return <FinalQuestion onYes={() => dispatch({ type: "forgive" })} />;
      case "celebration":
        return <Celebration onRestart={() => dispatch({ type: "restart" })} />;
    }
  }

  return (
    // Respect the phone's "reduce motion" setting for every animation.
    <MotionConfig reducedMotion="user">
      <FloatingHearts />
      <MusicToggle />

      <main className="relative z-10 mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center overflow-x-clip px-4 py-12">
        {/* Progress hearts sit outside the screen transition so they don't flicker between questions. */}
        <AnimatePresence>
          {step.screen === "question" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <ProgressHearts
                total={questions.length}
                filled={step.index + (step.solved ? 1 : 0)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0 })}>
          <motion.div
            key={screenKey(step)}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>
    </MotionConfig>
  );
}
