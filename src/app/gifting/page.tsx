import HeartCard from "@/components/HeartCard";

export const metadata = {
  title: "For Gifting — Allen's 34th Birthday",
};

export default function GiftingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-4xl" aria-hidden>
          🎁
        </span>
        <h1 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-purple-900">
          For Gifting
        </h1>
        <p className="mt-3 text-purple-700/80 leading-relaxed">
          Want to give or receive a special birthday gift this season?
          Choose below — share a gift for another friend, or let me know
          what you&apos;d love to receive.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        <HeartCard
          href="/give"
          icon="🤲"
          title="Give from the Heart"
          description="Want to donate or sponsor a special gift for another friend? Share what you'd like to give, and it'll go toward making someone's day brighter."
          cta="Give from the Heart"
        />
        <HeartCard
          href="/receive"
          icon="🎁"
          title="Receive with a Grateful Heart"
          description="Would you like to receive a gift on my special day? Let me know what you would wish to receive — you can pick up to two options."
          cta="Receive with a Grateful Heart"
        />
      </div>
    </div>
  );
}
