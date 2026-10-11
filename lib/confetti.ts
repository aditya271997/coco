import confetti from "canvas-confetti";

const COLORS = ["#c2185b", "#e0457b", "#f9a8c0", "#f0a30a", "#f6c95c", "#fffaf3"];
const HEART_PATH =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

let shapes: confetti.Shape[] | null = null;

/** Heart-shaped confetti, with plain circles as a fallback for older browsers. */
function getShapes(): confetti.Shape[] {
  if (!shapes) {
    try {
      shapes = [confetti.shapeFromPath({ path: HEART_PATH }), "circle"];
    } catch {
      shapes = ["circle"];
    }
  }
  return shapes;
}

/** Fires a burst of crimson/blush/gold heart confetti. Skipped if "reduce motion" is on. */
export function heartConfetti(options: confetti.Options = {}) {
  return confetti({
    colors: COLORS,
    shapes: getShapes(),
    scalar: 1.2,
    disableForReducedMotion: true,
    ...options,
  });
}

/** Clears any confetti still on screen. */
export const resetConfetti = () => confetti.reset();
