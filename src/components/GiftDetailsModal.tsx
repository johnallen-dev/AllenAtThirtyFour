"use client";

import { useState } from "react";
import type { Gift } from "@/lib/gifts";

export default function GiftDetailsModal({
  gift,
  onClose,
  selectedVariant = null,
  onSelectVariant,
  variantCounts = {},
}: {
  gift: Gift;
  onClose: () => void;
  selectedVariant?: string | null;
  onSelectVariant?: (variantId: string) => void;
  variantCounts?: Record<string, number>;
}) {
  const { details } = gift;
  const hasVariants = !!gift.variants && gift.variants.length > 0;
  const canClose = !hasVariants || !!selectedVariant;
  const [variantMsg, setVariantMsg] = useState<string | null>(null);

  function handleBackdropClick() {
    if (canClose) onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-purple-950/70 backdrop-blur-sm px-4 py-8"
      onClick={handleBackdropClick}
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

        {details.scheduleOptions && details.scheduleOptions.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-semibold text-purple-800 text-center">
              Select date and flow of your choice
            </p>
            <ul className="mt-2 space-y-1.5">
              {details.scheduleOptions.map((opt) => (
                <li
                  key={opt.date}
                  className="rounded-xl bg-purple-50 px-3 py-2 text-sm text-purple-700 text-center"
                >
                  <span className="font-semibold">{opt.date}</span> —{" "}
                  {opt.flow}
                </li>
              ))}
            </ul>
          </div>
        )}

        {details.paragraphs.length > 0 && (
          <div className="mt-4 space-y-3 text-sm text-purple-700/90 leading-relaxed">
            {details.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}

        {hasVariants && (
          <div className="mt-4">
            <p className="text-sm font-semibold text-purple-800 text-center mb-2">
              Choose your preferred option
            </p>
            <div className="grid grid-cols-2 gap-2">
              {gift.variants!.map((v) => {
                const remaining = v.limit - (variantCounts[v.id] ?? 0);
                const soldOut = remaining <= 0;
                const isSelected = selectedVariant === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => {
                      if (soldOut) {
                        setVariantMsg("This option is no longer available.");
                        return;
                      }
                      setVariantMsg(null);
                      onSelectVariant?.(v.id);
                    }}
                    aria-pressed={isSelected}
                    className={`rounded-xl px-3 py-2.5 text-sm font-medium border-2 text-center transition-all duration-150 ${
                      soldOut
                        ? "border-transparent bg-purple-50/60 text-purple-300 grayscale cursor-not-allowed"
                        : isSelected
                        ? "border-purple-400 bg-purple-50 text-purple-900"
                        : "border-purple-100 bg-white text-purple-600 hover:border-purple-200"
                    }`}
                  >
                    {v.label}
                    {soldOut && (
                      <span className="block text-[10px] mt-0.5">Sold Out</span>
                    )}
                  </button>
                );
              })}
            </div>
            {variantMsg && (
              <p className="mt-2 rounded-xl bg-purple-50 text-purple-600 text-xs px-3 py-2 text-center">
                {variantMsg}
              </p>
            )}
          </div>
        )}

        {details.note && (
          <p className="mt-4 text-xs text-purple-500 italic border-t border-purple-100 pt-3">
            Note: {details.note}
          </p>
        )}

        <button
          type="button"
          onClick={() => canClose && onClose()}
          disabled={!canClose}
          className="mt-6 w-full rounded-full bg-purple-500 text-white px-6 py-3 min-h-[44px] font-medium hover:bg-purple-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Exit
        </button>
        {!canClose && (
          <p className="mt-2 text-xs text-purple-400 text-center">
            Please choose an option above first.
          </p>
        )}
      </div>
    </div>
  );
}
