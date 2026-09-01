import GiverForm from "@/components/GiverForm";
import SendItemInfo from "@/components/SendItemInfo";
import SponsorsSection from "@/components/SponsorsSection";

export const metadata = {
  title: "Give from the Heart — Allen's 34th Birthday",
};

export default function GivePage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-10 sm:py-14 space-y-6">
      <div className="text-center">
        <span className="text-4xl" aria-hidden>
          🤲
        </span>
        <h1 className="mt-3 font-display text-2xl font-bold text-purple-900">
          Give from the Heart
        </h1>
        <p className="mt-3 text-purple-700/80 leading-relaxed">
          Would you like to donate or sponsor a special gift for another
          friend? Share what you&apos;d like to give below — no gesture is too
          small, and every bit helps make someone&apos;s birthday brighter.
        </p>
      </div>

      <SendItemInfo
        title="📦 Sending an Item?"
        note="If you'd like to send or drop off the gift yourself, here's where you can reach me:"
      />

      <GiverForm />
      <SponsorsSection />
    </div>
  );
}
