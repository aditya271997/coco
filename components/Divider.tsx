type Props = {
  /** "diamonds" = ◆◆◆, "heart" = ◆♥◆ */
  center?: "diamonds" | "heart";
  className?: string;
};

/** Gold ornament divider: a fading line, a small centrepiece, and a fading line. */
export default function Divider({ center = "diamonds", className = "" }: Props) {
  return (
    <div aria-hidden className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-20 bg-linear-to-r from-transparent to-gold-300 sm:w-32" />
      <span className="flex items-center gap-1.5">
        <Diamond size="small" />
        {center === "heart" ? (
          <svg viewBox="0 0 24 24" className="size-5 fill-blush-400">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ) : (
          <Diamond size="large" />
        )}
        <Diamond size="small" />
      </span>
      <span className="h-px w-20 bg-linear-to-l from-transparent to-gold-300 sm:w-32" />
    </div>
  );
}

function Diamond({ size }: { size: "small" | "large" }) {
  return (
    <span
      className={`block rotate-45 bg-gold-500 ${size === "large" ? "size-2.5" : "size-1.5"}`}
    />
  );
}
