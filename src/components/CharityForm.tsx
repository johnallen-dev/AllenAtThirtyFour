"use client";

import { ChangeEvent, FormEvent, useState } from "react";

type GivingMethod = "secret" | "open";
type DonationType = "monetary" | "in-kind";
type Status = "idle" | "submitting" | "success" | "error";

const MAX_PROOF_BYTES = 2 * 1024 * 1024; // 2MB

export default function CharityForm() {
  const [givingMethod, setGivingMethod] = useState<GivingMethod | null>(null);
  const [name, setName] = useState("");
  const [codeName, setCodeName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [message, setMessage] = useState("");
  const [donationType, setDonationType] = useState<DonationType | null>(null);
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [proofDataUrl, setProofDataUrl] = useState<string | null>(null);
  const [proofFileName, setProofFileName] = useState<string | null>(null);
  const [proofError, setProofError] = useState<string | null>(null);
  const [isCash, setIsCash] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const canSubmit =
    !!givingMethod &&
    !!donationType &&
    (givingMethod !== "open" ||
      (name.trim().length > 0 && contactNumber.trim().length > 0)) &&
    (donationType !== "in-kind" ||
      (item.trim().length > 0 && Number(quantity) >= 1)) &&
    (donationType !== "monetary" || isCash || !!proofDataUrl);

  function handleProofChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setProofError(null);

    if (!file.type.startsWith("image/")) {
      setProofError("Please upload an image file (screenshot or photo).");
      setProofDataUrl(null);
      setProofFileName(null);
      return;
    }
    if (file.size > MAX_PROOF_BYTES) {
      setProofError("That image is too large. Please keep it under 2MB.");
      setProofDataUrl(null);
      setProofFileName(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setProofDataUrl(reader.result as string);
      setProofFileName(file.name);
    };
    reader.onerror = () => {
      setProofError("Couldn't read that file. Please try another image.");
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit || status === "submitting") return;

    setStatus("submitting");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/charity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          givingMethod,
          name: givingMethod === "open" ? name : null,
          codeName: givingMethod === "secret" ? codeName : null,
          contactNumber: givingMethod === "open" ? contactNumber : null,
          donationType,
          item: donationType === "in-kind" ? item : null,
          quantity: donationType === "in-kind" ? Number(quantity) : null,
          message,
          isCash: donationType === "monetary" ? isCash : false,
          proofOfPayment:
            donationType === "monetary" && !isCash ? proofDataUrl : null,
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
          💜
        </span>
        <p className="mt-4 text-purple-900 font-medium leading-relaxed">
          Thank you for your beautiful heart. 💜 Whether you chose to give
          secretly or openly, your kindness can make a meaningful difference
          in someone&apos;s life.
        </p>
      </div>
    );
  }

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
        <span className="block text-sm font-medium text-purple-900 mb-2">
          How would you like to give?
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setGivingMethod("secret")}
            aria-pressed={givingMethod === "secret"}
            className={`text-left rounded-2xl p-4 border-2 transition-all duration-150 ${
              givingMethod === "secret"
                ? "border-purple-400 bg-purple-50"
                : "border-transparent bg-white shadow-sm shadow-purple-100 hover:border-purple-200"
            }`}
          >
            <span className="text-2xl" aria-hidden>
              🤫
            </span>
            <p className="mt-1.5 text-sm font-semibold text-purple-900">
              Give Secretly
            </p>
            <p className="mt-1 text-xs text-purple-500 leading-relaxed">
              We respect those who choose to hide their identity when giving.
              I may not be able to directly say thank you to you, but I
              believe the universe will find its own way to return your
              kindness.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setGivingMethod("open")}
            aria-pressed={givingMethod === "open"}
            className={`text-left rounded-2xl p-4 border-2 transition-all duration-150 ${
              givingMethod === "open"
                ? "border-purple-400 bg-purple-50"
                : "border-transparent bg-white shadow-sm shadow-purple-100 hover:border-purple-200"
            }`}
          >
            <span className="text-2xl" aria-hidden>
              💜
            </span>
            <p className="mt-1.5 text-sm font-semibold text-purple-900">
              Give Openly
            </p>
            <p className="mt-1 text-xs text-purple-500 leading-relaxed">
              I love being able to say thank you and acknowledge those who
              give from their hearts openly. Thank you for openly bringing
              joy and kindness into someone&apos;s heart.
            </p>
          </button>
        </div>
      </div>

      {givingMethod === "open" && (
        <>
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
        </>
      )}

      {givingMethod === "secret" && (
        <div>
          <label htmlFor="codeName" className="block text-sm font-medium text-purple-900 mb-1.5">
            Code Name (optional)
          </label>
          <input
            id="codeName"
            type="text"
            value={codeName}
            onChange={(e) => setCodeName(e.target.value)}
            className="w-full rounded-xl border border-purple-200 px-4 py-3 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="e.g. Kind Stranger, Secret Santa..."
          />
        </div>
      )}

      {givingMethod && (
        <div>
          <label htmlFor="charityMessage" className="block text-sm font-medium text-purple-900 mb-1.5">
            A Message from Your Heart (optional)
          </label>
          <p className="text-xs text-purple-500/80 mb-2 leading-relaxed">
            Feel free to share a few words — a reason for giving, a kind
            thought, or anything on your heart.
          </p>
          <textarea
            id="charityMessage"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-purple-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
            placeholder="Write your message here..."
          />
        </div>
      )}

      <div>
        <span className="block text-sm font-medium text-purple-900 mb-2">
          Type of Donation
        </span>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => setDonationType("monetary")}
            aria-pressed={donationType === "monetary"}
            className={`flex-1 rounded-xl px-4 py-3 text-sm font-medium border-2 transition-all duration-150 ${
              donationType === "monetary"
                ? "border-purple-400 bg-purple-50 text-purple-900"
                : "border-purple-100 bg-white text-purple-600 hover:border-purple-200"
            }`}
          >
            💵 Monetary Donation
          </button>
          <button
            type="button"
            onClick={() => setDonationType("in-kind")}
            aria-pressed={donationType === "in-kind"}
            className={`flex-1 rounded-xl px-4 py-3 text-sm font-medium border-2 transition-all duration-150 ${
              donationType === "in-kind"
                ? "border-purple-400 bg-purple-50 text-purple-900"
                : "border-purple-100 bg-white text-purple-600 hover:border-purple-200"
            }`}
          >
            📦 In-Kind / Item Donation
          </button>
        </div>
      </div>

      {donationType === "monetary" && (
        <>
          <p className="rounded-xl bg-purple-50 text-purple-600 text-sm px-4 py-3">
            Wonderful! Please use the QR code above to send your monetary
            donation. 💜
          </p>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="proof" className="text-sm font-medium text-purple-900">
                Proof of Transaction
              </label>
              <label className="flex items-center gap-1.5 text-sm text-purple-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isCash}
                  onChange={(e) => {
                    setIsCash(e.target.checked);
                    setProofError(null);
                  }}
                  className="w-4 h-4 rounded border-purple-300 text-purple-500 focus:ring-purple-400"
                />
                Cash
              </label>
            </div>

            {isCash ? (
              <p className="rounded-xl bg-purple-50 text-purple-600 text-sm px-4 py-3">
                Got it — no proof needed for a cash donation. 💜
              </p>
            ) : (
              <>
                <p className="text-xs text-purple-500/80 mb-2 leading-relaxed">
                  Please attach a screenshot or photo of your payment
                  confirmation (max 2MB).
                </p>

                {proofDataUrl ? (
                  <div className="flex items-center gap-3 rounded-xl border border-purple-200 px-4 py-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={proofDataUrl}
                      alt="Proof of transaction preview"
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <span className="flex-1 text-sm text-purple-700 truncate">
                      {proofFileName}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setProofDataUrl(null);
                        setProofFileName(null);
                      }}
                      className="text-xs font-medium text-rose-500 hover:text-rose-600 transition-colors flex-shrink-0"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <input
                    id="proof"
                    type="file"
                    accept="image/*"
                    onChange={handleProofChange}
                    required
                    className="w-full rounded-xl border border-purple-200 px-4 py-3 min-h-[44px] text-sm text-purple-600 file:mr-3 file:rounded-full file:border-0 file:bg-purple-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                )}
                {proofError && (
                  <p className="mt-1.5 text-xs text-rose-600">{proofError}</p>
                )}
              </>
            )}
          </div>
        </>
      )}

      {donationType === "in-kind" && (
        <>
          <div>
            <label htmlFor="item" className="block text-sm font-medium text-purple-900 mb-1.5">
              Item / Donation You&apos;d Like to Share
            </label>
            <input
              id="item"
              type="text"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              required
              className="w-full rounded-xl border border-purple-200 px-4 py-3 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="e.g. Diapers, milk formula, clothes..."
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
        </>
      )}

      <button
        type="submit"
        disabled={!canSubmit || status === "submitting"}
        className="w-full rounded-full bg-purple-500 text-white px-6 py-3 min-h-[44px] font-medium transition-colors hover:bg-purple-600 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending..." : "Submit My Donation 💜"}
      </button>
    </form>
  );
}
