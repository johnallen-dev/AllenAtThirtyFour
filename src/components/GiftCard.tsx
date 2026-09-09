import type { Gift } from "@/lib/gifts";

export default function GiftCard({
  gift,
  selected,
  onToggle,
}: {
  gift: Gift;
  selected: boolean;
  onToggle: () => void;
}) {
  const available = gift.available !== false;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={`relative rounded-2xl p-4 text-left transition-all duration-150 min-h-[110px] flex flex-col justify-between border-2 ${
        !available
          ? "border-transparent bg-purple-50/60 opacity-50 grayscale cursor-not-allowed"
          : selected
          ? "border-purple-400 bg-purple-50"
          : "border-transparent bg-white shadow-sm shadow-purple-100 hover:border-purple-200"
      }`}
    >
      {available && selected && (
        <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center">
          ✓
        </span>
      )}
      {!available && (
        <span className="absolute top-2 right-2 rounded-full bg-purple-200 text-purple-700 text-[10px] font-semibold px-2 py-0.5">
          Unavailable
        </span>
      )}
      <span className="text-3xl" aria-hidden>
        {gift.icon}
      </span>
      <div>
        <p className="text-sm font-semibold text-purple-900 leading-tight">
          {gift.label}
        </p>
        <p className="text-xs text-purple-500 mt-0.5">{gift.blurb}</p>
      </div>
    </button>
  );
}
