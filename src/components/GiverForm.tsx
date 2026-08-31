"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function GiverForm() {
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const canSubmit =
    name.trim() && contactNumber.trim() && item.trim() && Number(quantity) >= 1;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit || status === "submitting") return;

    setStatus("submitting");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/give", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          contactNumber,
          item,
          quantity: Number(quantity),
          message,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
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
          💜
        </span>
        <p className="mt-4 text-purple-900 font-medium leading-relaxed">
          Thank you for your beautiful heart! 💜 Your kindness means so much
          and will help make someone&apos;s day extra special.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white shadow-md shadow-purple-100 p-6 sm:p-8 space-y-5"
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
        <label htmlFor="item" className="block text-sm font-medium text-purple-900 mb-1.5">
          Item / Gift You&apos;d Like to Share
        </label>
        <input
          id="item"
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          required
          className="w-full rounded-xl border border-purple-200 px-4 py-3 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="e.g. Groceries, a shirt, cash sponsorship..."
        />
      </div>

      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-purple-900 mb-1.5">
          Quantity
        </label>
        <input
          id="quantity"
          type="number"
          inputMode="numeric"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          className="w-full rounded-xl border border-purple-200 px-4 py-3 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-purple-900 mb-1.5">
          A Message from Your Heart (optional)
        </label>
        <p className="text-xs text-purple-500/80 mb-2 leading-relaxed">
          I&apos;m so glad you&apos;re joining me in this activity! Feel free
          to drop a message here — to me, to the friend who might receive
          this gift, or just whatever your heart wants to say.
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
        {status === "submitting" ? "Sending..." : "Submit with Love 💜"}
      </button>
    </form>
  );
}
