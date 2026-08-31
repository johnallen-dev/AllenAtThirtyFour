import HeartCard from "@/components/HeartCard";
import HomeDecor from "@/components/HomeDecor";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <HomeDecor />

      <div className="relative max-w-4xl mx-auto px-4 py-10 sm:py-16">
        <div className="text-center max-w-xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-purple-200 px-4 py-1.5 text-xs sm:text-sm font-semibold text-purple-600 shadow-sm shadow-purple-100">
            🎉 6th Annual Season of Giving
          </span>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl font-bold text-purple-900 tracking-tight">
            Allen&apos;s 34th Birthday
          </h1>
          <p className="mt-2 font-display italic text-2xl sm:text-3xl font-semibold text-purple-600">
            Give a Little, Care a Lot.
          </p>
          <p className="mt-5 text-purple-700/80 leading-relaxed">
            For the 6th year in a row, I&apos;m celebrating my birthday by turning
            it into a little season of giving. Whether it&apos;s a small gift, a
            kind gesture, or a wish shared, every bit of kindness helps make
            someone&apos;s day a little brighter. Thank you for being part of it. 💜
          </p>
        </div>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          <HeartCard
            href="/charity"
            icon="💜"
            title="For Charity"
            description="Feel called to share your blessings? This year, part of my birthday celebration is dedicated to a cause close to my heart. Join me in giving back to those who need it most."
            cta="For Charity"
          />
          <HeartCard
            href="/gifting"
            icon="🎁"
            title="For Gifting"
            description="Want to give or receive a special gift on Allen's birthday? This is where friends can share a gift for another friend, or let me know what you'd love to receive on my special day."
            cta="For Gifting"
          />
        </div>
      </div>
    </div>
  );
}
