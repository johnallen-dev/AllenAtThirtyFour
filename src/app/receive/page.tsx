import ReceiverForm from "@/components/ReceiverForm";
import SponsorsSection from "@/components/SponsorsSection";

export const metadata = {
  title: "Receive with a Grateful Heart — Allen's 34th Birthday",
};

export default function ReceivePage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-10 sm:py-14 space-y-6">
      <div className="text-center mb-2">
        <span className="text-4xl" aria-hidden>
          🎁
        </span>
        <h1 className="mt-3 font-display text-2xl font-bold text-purple-900">
          Receive with a Grateful Heart
        </h1>
        <p className="mt-3 text-purple-700/80 leading-relaxed">
          Take a moment to check in with your heart. What have you truly been
          needing or wishing. You deserve to ask for it. Choose up to two
          gifts below that speak to what you genuinely desire, and share how
          we can reach you.
        </p>
      </div>
      <ReceiverForm />
      <SponsorsSection />
    </div>
  );
}
