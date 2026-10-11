import type { CSSProperties } from "react";

const EMOJIS = ["🌸", "💗", "🌷", "✨", "🌹", "💕", "💫"];

/**
 * Flowers and hearts drifting up the background, plus faint rings in the corners.
 *
 * Positions/speeds come from simple formulas instead of Math.random() so the
 * server and browser render identical markup (no hydration mismatch). Negative
 * delays mean they're already mid-flight when the page loads.
 */
const ITEMS = Array.from({ length: 14 }, (_, i) => ({
  emoji: EMOJIS[i % EMOJIS.length],
  left: (i * 61 + 7) % 100, // % across the screen
  size: 18 + ((i * 7) % 16), // px
  duration: 16 + ((i * 5) % 10), // seconds per trip
  delay: -((i * 17) % 26), // seconds
  drift: (i % 2 === 0 ? 1 : -1) * (12 + ((i * 3) % 24)), // px sideways
  opacity: 0.45 + ((i * 11) % 35) / 100,
}));

export default function FloatingHearts() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Thin decorative rings, top-left and bottom-right */}
      <span className="absolute -top-40 -left-40 size-96 rounded-full border border-crimson-400/15" />
      <span className="absolute -top-24 -left-24 size-64 rounded-full border border-crimson-400/10" />
      <span className="absolute -right-44 -bottom-44 size-[26rem] rounded-full border border-gold-400/25" />
      <span className="absolute -right-24 -bottom-24 size-72 rounded-full border border-gold-400/15" />

      {ITEMS.map((item, i) => (
        <span
          key={i}
          className="floating-item"
          style={
            {
              left: `${item.left}%`,
              fontSize: item.size,
              animationDuration: `${item.duration}s`,
              animationDelay: `${item.delay}s`,
              "--drift": `${item.drift}px`,
              "--float-opacity": item.opacity,
            } as CSSProperties
          }
        >
          {item.emoji}
        </span>
      ))}
    </div>
  );
}
