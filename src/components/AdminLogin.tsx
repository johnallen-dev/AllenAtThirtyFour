"use client";

import { FormEvent, useState } from "react";

export default function AdminLogin({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError("Incorrect password.");
        setLoading(false);
        return;
      }

      onSuccess();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-16">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-white shadow-md shadow-purple-100 p-6 sm:p-8 space-y-5 text-center"
      >
        <span className="text-3xl" aria-hidden>
          🔒
        </span>
        <h1 className="font-display text-lg font-semibold text-purple-900">Admin Mode</h1>
        <div className="text-left">
          <label htmlFor="password" className="block text-sm font-medium text-purple-900 mb-1.5">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
            className="w-full rounded-xl border border-purple-200 px-4 py-3 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        {error && (
          <p className="rounded-xl bg-rose-50 text-rose-600 text-sm px-4 py-3">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={!password || loading}
          className="w-full rounded-full bg-purple-500 text-white px-6 py-3 min-h-[44px] font-medium transition-colors hover:bg-purple-600 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "Checking..." : "Enter"}
        </button>
      </form>
    </div>
  );
}
