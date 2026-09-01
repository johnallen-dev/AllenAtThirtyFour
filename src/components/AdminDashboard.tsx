"use client";

import { useState } from "react";
import StatTile from "@/components/StatTile";
import { getGiftLabel } from "@/lib/gifts";

export type GiverRow = {
  id: number;
  name: string;
  contact_number: string;
  item: string;
  quantity: number;
  message: string | null;
  created_at: string;
};

export type ReceiverRow = {
  id: number;
  name: string;
  contact_number: string;
  gift_1: string;
  gift_2: string | null;
  message: string | null;
  created_at: string;
};

export type CharityRow = {
  id: number;
  giving_method: "secret" | "open";
  name: string | null;
  code_name: string | null;
  contact_number: string | null;
  donation_type: "monetary" | "in-kind";
  item: string | null;
  quantity: number | null;
  message: string | null;
  proof_of_payment: string | null;
  created_at: string;
};

export type AdminData = {
  givers: GiverRow[];
  receivers: ReceiverRow[];
  charity: CharityRow[];
  totals: {
    totalGivers: number;
    totalReceivers: number;
    totalQuantity: number;
    totalCharityDonations: number;
    totalVisits: number;
  };
};

function formatDate(iso: string): string {
  try {
    return new Date(iso + "Z").toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

function donationTypeLabel(type: CharityRow["donation_type"]): string {
  return type === "monetary" ? "Monetary" : "In-Kind";
}

function charityDisplayName(c: CharityRow): { label: string; anonymous: boolean } {
  if (c.giving_method === "secret") {
    return { label: c.code_name || "Anonymous", anonymous: true };
  }
  return { label: c.name || "—", anonymous: false };
}

export type EntryType = "giver" | "receiver" | "charity";

function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Delete entry"
      className="text-rose-400 hover:text-rose-600 transition-colors"
    >
      🗑️
    </button>
  );
}

function ProofThumbnail({
  src,
  onClick,
}: {
  src: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="View proof of payment"
      className="w-10 h-10 rounded-lg overflow-hidden border border-purple-100 hover:border-purple-300 transition-colors"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="Proof of payment" className="w-full h-full object-cover" />
    </button>
  );
}

export default function AdminDashboard({
  data,
  onDelete,
}: {
  data: AdminData;
  onDelete: (type: EntryType, id: number) => void | Promise<void>;
}) {
  const [summary, setSummary] = useState<"charity" | "gifting">("gifting");
  const [viewProof, setViewProof] = useState<string | null>(null);

  function confirmDelete(type: EntryType, id: number) {
    if (window.confirm("Delete this entry? This cannot be undone.")) {
      onDelete(type, id);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-purple-900">Admin Dashboard</h1>
        <p className="text-sm text-purple-500 mt-1">
          Give a Little, Care a Lot — submissions overview
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <StatTile label="Total Page Visits" value={data.totals.totalVisits} />
        <StatTile label="Total Givers" value={data.totals.totalGivers} />
        <StatTile label="Total Receivers" value={data.totals.totalReceivers} />
        <StatTile label="Total Gift Quantity" value={data.totals.totalQuantity} />
        <StatTile label="Total Charity Donations" value={data.totals.totalCharityDonations} />
      </div>

      <div>
        <p className="text-sm font-medium text-purple-900 mb-2">Summary</p>
        <div className="inline-flex flex-wrap rounded-full bg-purple-50 p-1 gap-1">
          <button
            type="button"
            onClick={() => setSummary("charity")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              summary === "charity"
                ? "bg-purple-500 text-white shadow-sm"
                : "text-purple-600 hover:bg-purple-100"
            }`}
          >
            💜 For Charity
          </button>
          <button
            type="button"
            onClick={() => setSummary("gifting")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              summary === "gifting"
                ? "bg-purple-500 text-white shadow-sm"
                : "text-purple-600 hover:bg-purple-100"
            }`}
          >
            🎁 For Gifting
          </button>
        </div>
      </div>

      {summary === "charity" ? (
        <section>
          <h2 className="font-display text-lg font-semibold text-purple-900 mb-3">
            Charity
          </h2>
          <div className="rounded-2xl bg-white shadow-md shadow-purple-100 overflow-hidden">
            <table className="hidden sm:table w-full text-sm">
              <thead>
                <tr className="bg-purple-50 text-purple-700 text-left">
                  <th className="px-4 py-3 font-medium">Method</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Contact</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Item / Donation</th>
                  <th className="px-4 py-3 font-medium">Qty</th>
                  <th className="px-4 py-3 font-medium">Message</th>
                  <th className="px-4 py-3 font-medium">Proof</th>
                  <th className="px-4 py-3 font-medium">Submitted</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {data.charity.map((c) => {
                  const { label, anonymous } = charityDisplayName(c);
                  return (
                    <tr key={c.id} className="border-t border-purple-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        {c.giving_method === "secret" ? "🤫 Secret" : "💜 Open"}
                      </td>
                      <td className="px-4 py-3">
                        {anonymous ? (
                          <span className="text-purple-400 italic">{label}</span>
                        ) : (
                          label
                        )}
                      </td>
                      <td className="px-4 py-3">{c.contact_number || "—"}</td>
                      <td className="px-4 py-3">{donationTypeLabel(c.donation_type)}</td>
                      <td className="px-4 py-3">{c.item || "—"}</td>
                      <td className="px-4 py-3">{c.quantity ?? "—"}</td>
                      <td className="px-4 py-3 max-w-[220px] truncate" title={c.message ?? undefined}>
                        {c.message || "—"}
                      </td>
                      <td className="px-4 py-3">
                        {c.proof_of_payment ? (
                          <ProofThumbnail
                            src={c.proof_of_payment}
                            onClick={() => setViewProof(c.proof_of_payment)}
                          />
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-3 text-purple-500">
                        {formatDate(c.created_at)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DeleteButton onClick={() => confirmDelete("charity", c.id)} />
                      </td>
                    </tr>
                  );
                })}
                {data.charity.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-4 py-6 text-center text-purple-400">
                      No charity submissions yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="sm:hidden divide-y divide-purple-50">
              {data.charity.map((c) => {
                const { label, anonymous } = charityDisplayName(c);
                return (
                  <div key={c.id} className="p-4 space-y-1 relative">
                    <div className="absolute top-3 right-3">
                      <DeleteButton onClick={() => confirmDelete("charity", c.id)} />
                    </div>
                    <p className="font-medium text-purple-900 pr-6">
                      {c.giving_method === "secret" ? "🤫 " : "💜 "}
                      {anonymous ? (
                        <span className="italic text-purple-400">{label}</span>
                      ) : (
                        label
                      )}
                    </p>
                    {c.contact_number && (
                      <p className="text-sm text-purple-600">{c.contact_number}</p>
                    )}
                    <p className="text-sm text-purple-700">
                      {donationTypeLabel(c.donation_type)}
                      {c.item ? ` — ${c.item}` : ""}
                      {c.quantity ? ` × ${c.quantity}` : ""}
                    </p>
                    {c.message && (
                      <p className="text-xs text-purple-600 italic">
                        &ldquo;{c.message}&rdquo;
                      </p>
                    )}
                    {c.proof_of_payment && (
                      <div className="pt-1">
                        <ProofThumbnail
                          src={c.proof_of_payment}
                          onClick={() => setViewProof(c.proof_of_payment)}
                        />
                      </div>
                    )}
                    <p className="text-xs text-purple-400">{formatDate(c.created_at)}</p>
                  </div>
                );
              })}
              {data.charity.length === 0 && (
                <p className="px-4 py-6 text-center text-purple-400">
                  No charity submissions yet.
                </p>
              )}
            </div>
          </div>
        </section>
      ) : (
        <>
          <section>
            <h2 className="font-display text-lg font-semibold text-purple-900 mb-3">Giver</h2>
            <div className="rounded-2xl bg-white shadow-md shadow-purple-100 overflow-hidden">
              <table className="hidden sm:table w-full text-sm">
                <thead>
                  <tr className="bg-purple-50 text-purple-700 text-left">
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Contact</th>
                    <th className="px-4 py-3 font-medium">Item / Gift</th>
                    <th className="px-4 py-3 font-medium">Qty</th>
                    <th className="px-4 py-3 font-medium">Message</th>
                    <th className="px-4 py-3 font-medium">Submitted</th>
                    <th className="px-4 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.givers.map((g) => (
                    <tr key={g.id} className="border-t border-purple-50">
                      <td className="px-4 py-3">{g.name}</td>
                      <td className="px-4 py-3">{g.contact_number}</td>
                      <td className="px-4 py-3">{g.item}</td>
                      <td className="px-4 py-3">{g.quantity}</td>
                      <td className="px-4 py-3 max-w-[220px] truncate" title={g.message ?? undefined}>
                        {g.message || "—"}
                      </td>
                      <td className="px-4 py-3 text-purple-500">
                        {formatDate(g.created_at)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DeleteButton onClick={() => confirmDelete("giver", g.id)} />
                      </td>
                    </tr>
                  ))}
                  {data.givers.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-6 text-center text-purple-400">
                        No giver submissions yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="sm:hidden divide-y divide-purple-50">
                {data.givers.map((g) => (
                  <div key={g.id} className="p-4 space-y-1 relative">
                    <div className="absolute top-3 right-3">
                      <DeleteButton onClick={() => confirmDelete("giver", g.id)} />
                    </div>
                    <p className="font-medium text-purple-900 pr-6">{g.name}</p>
                    <p className="text-sm text-purple-600">{g.contact_number}</p>
                    <p className="text-sm text-purple-700">
                      {g.item} × {g.quantity}
                    </p>
                    {g.message && (
                      <p className="text-xs text-purple-600 italic">
                        &ldquo;{g.message}&rdquo;
                      </p>
                    )}
                    <p className="text-xs text-purple-400">{formatDate(g.created_at)}</p>
                  </div>
                ))}
                {data.givers.length === 0 && (
                  <p className="px-4 py-6 text-center text-purple-400">
                    No giver submissions yet.
                  </p>
                )}
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-purple-900 mb-3">Receiver</h2>
            <div className="rounded-2xl bg-white shadow-md shadow-purple-100 overflow-hidden">
              <table className="hidden sm:table w-full text-sm">
                <thead>
                  <tr className="bg-purple-50 text-purple-700 text-left">
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Contact</th>
                    <th className="px-4 py-3 font-medium">Gift 1</th>
                    <th className="px-4 py-3 font-medium">Gift 2</th>
                    <th className="px-4 py-3 font-medium">Message</th>
                    <th className="px-4 py-3 font-medium">Submitted</th>
                    <th className="px-4 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.receivers.map((r) => (
                    <tr key={r.id} className="border-t border-purple-50">
                      <td className="px-4 py-3">{r.name}</td>
                      <td className="px-4 py-3">{r.contact_number}</td>
                      <td className="px-4 py-3">{getGiftLabel(r.gift_1)}</td>
                      <td className="px-4 py-3">
                        {r.gift_2 ? getGiftLabel(r.gift_2) : "—"}
                      </td>
                      <td className="px-4 py-3 max-w-[220px] truncate" title={r.message ?? undefined}>
                        {r.message || "—"}
                      </td>
                      <td className="px-4 py-3 text-purple-500">
                        {formatDate(r.created_at)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DeleteButton onClick={() => confirmDelete("receiver", r.id)} />
                      </td>
                    </tr>
                  ))}
                  {data.receivers.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-6 text-center text-purple-400">
                        No receiver submissions yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="sm:hidden divide-y divide-purple-50">
                {data.receivers.map((r) => (
                  <div key={r.id} className="p-4 space-y-1 relative">
                    <div className="absolute top-3 right-3">
                      <DeleteButton onClick={() => confirmDelete("receiver", r.id)} />
                    </div>
                    <p className="font-medium text-purple-900 pr-6">{r.name}</p>
                    <p className="text-sm text-purple-600">{r.contact_number}</p>
                    <p className="text-sm text-purple-700">
                      {getGiftLabel(r.gift_1)}
                      {r.gift_2 ? `, ${getGiftLabel(r.gift_2)}` : ""}
                    </p>
                    {r.message && (
                      <p className="text-xs text-purple-600 italic">
                        &ldquo;{r.message}&rdquo;
                      </p>
                    )}
                    <p className="text-xs text-purple-400">{formatDate(r.created_at)}</p>
                  </div>
                ))}
                {data.receivers.length === 0 && (
                  <p className="px-4 py-6 text-center text-purple-400">
                    No receiver submissions yet.
                  </p>
                )}
              </div>
            </div>
          </section>
        </>
      )}

      {viewProof && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-purple-950/70 backdrop-blur-sm px-4 py-8"
          onClick={() => setViewProof(null)}
        >
          <div
            className="bg-white rounded-3xl p-4 sm:p-5 max-w-md w-full text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={viewProof}
              alt="Proof of payment"
              className="w-full h-auto max-h-[70vh] object-contain rounded-2xl"
            />
            <button
              type="button"
              onClick={() => setViewProof(null)}
              className="mt-4 rounded-full border border-purple-200 text-purple-600 px-5 py-2.5 text-sm font-medium hover:bg-purple-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
