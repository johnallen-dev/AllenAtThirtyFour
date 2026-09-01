import CharityForm from "@/components/CharityForm";
import DonationCategoryCard from "@/components/DonationItemCard";
import SendItemInfo from "@/components/SendItemInfo";
import QrCodeCard from "@/components/QrCodeCard";
import SponsorsSection from "@/components/SponsorsSection";
import { CRIBS_FOUNDATION, DONATION_ITEMS_NEEDED } from "@/lib/charity";

export const metadata = {
  title: "Give from the Heart — For Charity — Allen's 34th Birthday",
};

export default function CharityPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-10 sm:py-14 space-y-8">
      <div className="text-center">
        <span className="text-4xl" aria-hidden>
          🤲
        </span>
        <h1 className="mt-3 font-display text-2xl font-bold text-purple-900">
          Give from the Heart
        </h1>
        <p className="mt-3 text-purple-700/80 leading-relaxed">
          As part of my birthday celebration this year, I&apos;d love to turn
          some of that love outward. If you feel called to share your
          blessings, this is a chance to give to a cause close to my heart —
          no gesture is too small, and every bit helps.
        </p>
      </div>

      <section className="rounded-2xl bg-white shadow-md shadow-purple-100 p-6 sm:p-7">
        <span className="text-3xl" aria-hidden>
          🏡
        </span>
        <h2 className="mt-2 font-display text-lg font-semibold text-purple-900">
          This Year&apos;s Beneficiary
        </h2>
        <p className="mt-1 font-semibold text-purple-700">
          {CRIBS_FOUNDATION.name}
        </p>
        <p className="mt-2 text-sm text-purple-700/80 leading-relaxed">
          {CRIBS_FOUNDATION.description}
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-purple-900 mb-3">
          Donation Items Needed
        </h2>
        {DONATION_ITEMS_NEEDED.length === 0 ? (
          <div className="rounded-2xl bg-white shadow-sm shadow-purple-100 p-6 text-center text-sm text-purple-500">
            The specific list of items needed is coming soon. Check back
            here, or choose a monetary donation in the meantime. 💜
          </div>
        ) : (
          <div className="space-y-3">
            {DONATION_ITEMS_NEEDED.map((category) => (
              <DonationCategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </section>

      <SendItemInfo
        title="📦 Sending an In-Kind Donation?"
        note="If you'd like to drop off or send the item yourself, here's where you can reach me:"
        deliveryNote="We'll be visiting CRIBS Foundation, Inc. on September 16, 2026 (9:00AM–11:00AM) to bring in all the donations gathered — please send your item before then."
      />

      <section className="rounded-2xl bg-white shadow-md shadow-purple-100 p-6 sm:p-7 text-center">
        <h2 className="font-display text-lg font-semibold text-purple-900">
          Want to Give a Monetary Donation?
        </h2>
        <p className="mt-2 text-sm text-purple-700/80 leading-relaxed">
          You may send your monetary donation directly through either QR
          code below.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-4 max-w-xs mx-auto">
          <QrCodeCard
            src="/qr-gcash.jpg"
            alt="GCash QR code"
            label="GCash"
            downloadName="Allen-GCash-QR.jpg"
          />
          <QrCodeCard
            src="/qr-bpi.jpg"
            alt="BPI QR code"
            label="BPI"
            downloadName="Allen-BPI-QR.jpg"
          />
        </div>
        <p className="mt-3 text-[11px] text-purple-400">
          Tap a QR code to view it larger or save it.
        </p>
      </section>

      <CharityForm />
      <SponsorsSection />
    </div>
  );
}
