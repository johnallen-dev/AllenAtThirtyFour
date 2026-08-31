"use client";

import type { Gift } from "@/lib/gifts";

export default function GiftDetailsModal({
  gift,
  onClose,
}: {
  gift: Gift;
  onClose: () => void;
}) {
  const { details } = gift;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-purple-950/70 backdrop-blur-sm px-4 py-8"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full max-h-[85vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <span className="text-4xl" aria-hidden>
            {gift.icon}
          </span>
          <h3 className="mt-2 font-display text-xl font-bold text-purple-900">
            {gift.label}
          </h3>
        </div>

        <div className="mt-4 rounded-xl bg-purple-50 text-purple-700 text-sm font-semibold text-center px-4 py-2.5">
          🎁 Gifting this for {gift.limit} {gift.limit === 1 ? "person" : "people"} only
        </div>

        {details.eventTitle && (
          <p className="mt-4 text-center font-semibold text-purple-800">
            {details.eventTitle}
          </p>
        )}

        {details.meta && details.meta.length > 0 && (
          <div className="mt-1.5 text-center text-sm text-purple-600 space-y-0.5">
            {details.meta.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        )}

        {details.theme && (
          <p className="mt-3 text-sm italic text-purple-500 text-center">
            &ldquo;{details.theme}&rdquo;
          </p>
        )}

        {details.paragraphs.length > 0 && (
          <div className="mt-4 space-y-3 text-sm text-purple-700/90 leading-relaxed">
            {details.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}

        {details.note && (
          <p className="mt-4 text-xs text-purple-500 italic border-t border-purple-100 pt-3">
            Note: {details.note}
          </p>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-purple-500 text-white px-6 py-3 min-h-[44px] font-medium hover:bg-purple-600 transition-colors"
        >
          Exit
        </button>
      </div>
    </div>
  );
}
