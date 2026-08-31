"use client";

import { FormEvent, useState } from "react";
import { GIFTS } from "@/lib/gifts";
import GiftCard from "@/components/GiftCard";
import GiftDetailsModal from "@/components/GiftDetailsModal";

type Status = "idle" | "submitting" | "success" | "error";

export default function ReceiverForm() {
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [blockedMsg, setBlockedMsg] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [detailGiftId, setDetailGiftId] = useState<string | null>(null);

  const canSubmit =
    name.trim() && contactNumber.trim() && selected.length > 0;

  function toggleGift(id: string) {
    setBlockedMsg(null);
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((g) => g !== id);
      }
      if (prev.length >= 2) {
        setBlockedMsg("You can only choose two gifts 💜");
        return prev;
      }
      setDetailGiftId(id);
      return [...prev, id];
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit || status === "submitting") return;

    setStatus("submitting");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/receive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          contactNumber,
          gift1: selected[0],
          gift2: selected[1] ?? null,
          message,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-white shadow-md shadow-purple-100 p-6 sm:p-8 text-center">
        <span className="text-4xl" aria-hidden>
          🎁
        </span>
        <p className="mt-4 text-purple-900 font-medium leading-relaxed">
          Your wish has been heard. 💜 May this little gift find its way to
          you and add a bit more joy!
        </p>
      </div>
    );
  }

  const detailGift = detailGiftId
    ? GIFTS.find((g) => g.id === detailGiftId) ?? null
    : null;

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white shadow-md shadow-purple-100 p-6 sm:p-8 space-y-6"
    >
      {errorMsg && (
        <p className="rounded-xl bg-rose-50 text-rose-600 text-sm px-4 py-3">
          {errorMsg}
        </p>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-purple-900 mb-1.5">
          Name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded-xl border border-purple-200 px-4 py-3 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="contactNumber" className="block text-sm font-medium text-purple-900 mb-1.5">
          Contact Number
        </label>
        <input
          id="contactNumber"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          required
          className="w-full rounded-xl border border-purple-200 px-4 py-3 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="09XX XXX XXXX"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="block text-sm font-medium text-purple-900">
            Gift Preferences
          </span>
          <span className="text-xs text-purple-400">
            {selected.length}/2 selected
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {GIFTS.map((gift) => (
            <GiftCard
              key={gift.id}
              gift={gift}
              selected={selected.includes(gift.id)}
              onToggle={() => toggleGift(gift.id)}
            />
          ))}
        </div>
        {blockedMsg && (
          <p className="mt-3 rounded-xl bg-purple-50 text-purple-600 text-sm px-4 py-3">
            {blockedMsg}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-purple-900 mb-1.5">
          A Message from Your Heart (optional)
        </label>
        <p className="text-xs text-purple-500/80 mb-2 leading-relaxed">
          It&apos;s not guaranteed that you&apos;ll be chosen — but the
          universe has a way of finding the perfect person for this gift.
          Feel free to share why it should be you.
        </p>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full rounded-xl border border-purple-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
          placeholder="Write your message here..."
        />
      </div>

      <button
        type="submit"
        disabled={!canSubmit || status === "submitting"}
        className="w-full rounded-full bg-purple-500 text-white px-6 py-3 min-h-[44px] font-medium transition-colors hover:bg-purple-600 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending..." : "Submit My Wish 🎁"}
      </button>

      {detailGift && (
        <GiftDetailsModal
          gift={detailGift}
          onClose={() => setDetailGiftId(null)}
        />
      )}
    </form>
  );
}
