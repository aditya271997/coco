"use client";

import { motion } from "framer-motion";
import { useRef, useState, type PointerEvent } from "react";

type Props = {
  yesLabel: string;
  /** The No button's label before each dodge (cycles if there's no `giveUpLabel`). */
  noLabels: string[];
  /**
   * If set, the No button gives up after `noLabels.length` dodges, shows this
   * label and counts as a Yes. If not set, No can never be clicked.
   */
  giveUpLabel?: string;
  onYes: () => void;
};

type Offset = { x: number; y: number };

/** One tap can fire both pointerdown and click; ignore repeats within this window (ms). */
const TAP_GUARD_MS = 400;

/**
 * A Yes button and a No button that runs away (and shrinks) every time she
 * tries it, while Yes gets a little bigger.
 */
export default function YesNoChoice({ yesLabel, noLabels, giveUpLabel, onYes }: Props) {
  const arenaRef = useRef<HTMLDivElement>(null);
  const yesRef = useRef<HTMLButtonElement>(null);
  const noRef = useRef<HTMLButtonElement>(null);
  const lastDodgeAt = useRef(0);

  const [dodges, setDodges] = useState(0);
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });

  const canGiveUp = giveUpLabel !== undefined;
  const gaveUp = canGiveUp && dodges >= noLabels.length;
  const noLabel = gaveUp && giveUpLabel ? giveUpLabel : noLabels[dodges % noLabels.length];

  function dodge() {
    const now = performance.now();
    if (now - lastDodgeAt.current < TAP_GUARD_MS) return;
    lastDodgeAt.current = now;

    const nextDodges = dodges + 1;
    setDodges(nextDodges);

    // When it gives up, it slides back next to Yes.
    if (canGiveUp && nextDodges >= noLabels.length) {
      setOffset({ x: 0, y: 0 });
      return;
    }

    const arena = arenaRef.current;
    const noButton = noRef.current;
    const yesButton = yesRef.current;
    if (arena && noButton && yesButton) {
      setOffset(pickNewSpot(arena, noButton, yesButton, offset));
    }
  }

  // Mouse: dodge as soon as the cursor gets close.
  function handlePointerEnter(e: PointerEvent) {
    if (!gaveUp && e.pointerType === "mouse") dodge();
  }

  // Touch/pen: dodge the moment a finger lands on it.
  function handlePointerDown(e: PointerEvent) {
    if (!gaveUp && e.pointerType !== "mouse") {
      e.preventDefault();
      dodge();
    }
  }

  // Keyboard (or a lucky click): dodge, or accept once it has given up.
  function handleNoClick() {
    if (performance.now() - lastDodgeAt.current < TAP_GUARD_MS) return;
    if (gaveUp) onYes();
    else dodge();
  }

  return (
    // The area the No button is allowed to run around in. Stacked so the
    // No label changing width never shifts the Yes button.
    <div ref={arenaRef} className="relative flex h-72 flex-col items-center justify-center gap-6">
      <motion.button
        ref={yesRef}
        type="button"
        onClick={onYes}
        className="btn-primary relative z-10"
        animate={{ scale: 1 + Math.min(dodges, 5) * 0.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        {yesLabel}
      </motion.button>

      <motion.button
        ref={noRef}
        type="button"
        onPointerEnter={handlePointerEnter}
        onPointerDown={handlePointerDown}
        onClick={handleNoClick}
        className={`${gaveUp ? "btn-primary" : "btn-outline"} relative z-20 touch-manipulation whitespace-nowrap`}
        animate={{
          x: offset.x,
          y: offset.y,
          scale: gaveUp ? 1 : Math.max(0.65, 1 - dodges * 0.08),
        }}
        transition={{ type: "spring", stiffness: 420, damping: 24 }}
      >
        {noLabel}
      </motion.button>
    </div>
  );
}

// ---------------------------------------------------------------------------

/**
 * Picks a random spot for the No button inside the arena that is a decent
 * distance from where it is now and doesn't cover the Yes button.
 * Uses offsetLeft/offsetTop, which ignore the current transform.
 */
function pickNewSpot(
  arena: HTMLElement,
  noButton: HTMLElement,
  yesButton: HTMLElement,
  current: Offset,
): Offset {
  const pad = 8;
  const minX = -noButton.offsetLeft + pad;
  const maxX = arena.clientWidth - noButton.offsetLeft - noButton.offsetWidth - pad;
  const minY = -noButton.offsetTop + pad;
  const maxY = arena.clientHeight - noButton.offsetTop - noButton.offsetHeight - pad;

  // Yes grows as she tries No, so give it a bit of extra room.
  const yesBox = {
    left: yesButton.offsetLeft - 24,
    right: yesButton.offsetLeft + yesButton.offsetWidth + 24,
    top: yesButton.offsetTop - 16,
    bottom: yesButton.offsetTop + yesButton.offsetHeight + 16,
  };

  const random = (min: number, max: number) => min + Math.random() * Math.max(0, max - min);

  let fallback = current;
  for (let attempt = 0; attempt < 40; attempt++) {
    const x = random(minX, maxX);
    const y = random(minY, maxY);
    fallback = { x, y };

    const left = noButton.offsetLeft + x;
    const top = noButton.offsetTop + y;
    const coversYes =
      left < yesBox.right &&
      left + noButton.offsetWidth > yesBox.left &&
      top < yesBox.bottom &&
      top + noButton.offsetHeight > yesBox.top;
    const farEnough = Math.hypot(x - current.x, y - current.y) > 80;

    if (!coversYes && farEnough) return { x, y };
  }
  return fallback;
}
