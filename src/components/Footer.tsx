"use client";

import { useEffect, useState } from "react";
import { getRandomQuote } from "@/lib/quotes";

export default function Footer() {
  const [quote, setQuote] = useState<string | null>(null);

  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  return (
    <footer className="text-center px-4 py-10">
      <p
        className={`italic text-sm text-purple-500/90 max-w-md mx-auto transition-opacity duration-300 ${
          quote ? "opacity-100" : "opacity-0"
        }`}
      >
        <span aria-hidden>✨ </span>
        {quote ?? "placeholder"}
      </p>
      <p className="mt-3 text-xs font-medium tracking-wide text-purple-300">
        Give a Little, Care a Lot 💜
      </p>
    </footer>
  );
}
