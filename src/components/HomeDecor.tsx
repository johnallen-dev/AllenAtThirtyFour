import type { CSSProperties } from "react";

function Balloon({
  className,
  color,
  style,
}: {
  className?: string;
  color: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 60 96"
      className={className}
      style={style}
      aria-hidden
    >
      <ellipse cx="30" cy="30" rx="27" ry="30" fill={color} />
      <ellipse cx="21" cy="20" rx="7" ry="10" fill="white" opacity="0.25" />
      <path d="M30 60 L25 65 L30 70 L35 65 Z" fill={color} opacity="0.7" />
      <path
        d="M30 70 Q34 78 30 84 Q26 90 30 96"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity="0.45"
      />
    </svg>
  );
}

function Confetti({ className, style }: { className?: string; style?: CSSProperties }) {
  return <span className={className} style={style} aria-hidden />;
}

export default function HomeDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* soft glow blobs */}
      <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-purple-200/40 blur-3xl" />
      <div className="absolute -top-10 -right-20 w-80 h-80 rounded-full bg-pink-200/30 blur-3xl" />
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-96 h-72 rounded-full bg-amber-100/30 blur-3xl" />

      {/* dot pattern */}
      <div className="absolute inset-0 bg-confetti-dots [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)] opacity-70" />

      {/* balloons */}
      <Balloon
        color="#c4b5fd"
        className="absolute w-10 sm:w-14 top-6 left-4 sm:left-10 animate-gentle-float"
        style={{ ["--tilt" as string]: "-6deg", animationDelay: "0.2s" }}
      />
      <Balloon
        color="#f9a8d4"
        className="absolute w-8 sm:w-11 top-16 right-6 sm:right-16 animate-gentle-float"
        style={{ ["--tilt" as string]: "5deg", animationDelay: "1.1s" }}
      />
      <Balloon
        color="#fde68a"
        className="hidden sm:block absolute w-9 top-4 right-1/3 animate-gentle-float"
        style={{ ["--tilt" as string]: "-4deg", animationDelay: "0.6s" }}
      />

      {/* confetti bits */}
      <Confetti className="absolute top-10 left-1/4 w-2 h-2 rounded-sm bg-purple-300/70 rotate-45" />
      <Confetti className="absolute top-24 left-[15%] w-1.5 h-1.5 rounded-full bg-pink-300/70" />
      <Confetti className="absolute top-8 right-1/4 w-2 h-2 rounded-sm bg-amber-300/70 rotate-12" />
      <Confetti className="absolute top-32 right-[18%] w-1.5 h-1.5 rounded-full bg-purple-400/60" />
      <Confetti className="hidden sm:block absolute top-20 left-1/3 w-2 h-2 rounded-sm bg-pink-200/80 -rotate-12" />

      {/* sparkles */}
      <span
        className="absolute top-12 left-[38%] text-lg text-purple-300 animate-twinkle"
        style={{ animationDelay: "0.3s" }}
        aria-hidden
      >
        ✨
      </span>
      <span
        className="absolute top-6 right-[30%] text-base text-amber-300 animate-twinkle"
        style={{ animationDelay: "1.4s" }}
        aria-hidden
      >
        ✨
      </span>
      <span
        className="hidden sm:inline absolute top-28 left-[10%] text-sm text-pink-300 animate-twinkle"
        style={{ animationDelay: "0.9s" }}
        aria-hidden
      >
        ✨
      </span>
    </div>
  );
}
