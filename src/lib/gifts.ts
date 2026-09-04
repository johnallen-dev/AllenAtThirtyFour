export type ScheduleOption = {
  date: string;
  flow: string;
};

export type GiftDetails = {
  eventTitle?: string;
  meta?: string[];
  theme?: string;
  scheduleOptions?: ScheduleOption[];
  paragraphs: string[];
  note?: string;
};

export type Gift = {
  id: string;
  label: string;
  icon: string;
  blurb: string;
  limit: number;
  details: GiftDetails;
};

export const GIFTS: Gift[] = [
  {
    id: "mini-retreat",
    label: "Mini Retreat Session",
    icon: "🧍‍♀️🧍",
    blurb: "A little pause just for you",
    limit: 1,
    details: {
      eventTitle: "OM Sweet OM Club",
      meta: [
        "Date: September 19, 2026",
        "Time: 09:00AM – 12:00NN",
        "Location: Ahon Coffee Taytay",
      ],
      theme:
        "Postcards from the Future: Quantum Visualization and Soul Alignment",
      paragraphs: [
        "Om Sweet Om is not an art club or an art workshop. It is a sacred space co-created by beautiful souls for each and every single person stepping into the space.",
        "On September 19, 2026, we gather to step outside linear time and anchor into quantum visualization. Through a unique, hands-on soul activity, we will open ourselves to divine synchronicity, receive downloads from our future selves, and align with the timelines meant for us.",
        "No two seats in the room will receive the same experience.",
        "Come ready to play, trust, and collapse the distance between who you are today and who you are becoming. 🧘🏽‍♀️",
      ],
      note: "Make sure you're available on the said date and time when selecting this gift.",
    },
  },
  {
    id: "yoga",
    label: "Yoga Session",
    icon: "🧘",
    blurb: "Stretch, breathe, unwind",
    limit: 1,
    details: {
      meta: [
        "Time: 08:30AM – 09:30AM",
        "Location: Ahon Coffee Taytay",
      ],
      scheduleOptions: [
        { date: "September 17, 2026", flow: "Core Flow" },
        { date: "September 24, 2026", flow: "Restore Balance Flow" },
        { date: "September 27, 2026", flow: "Full Body Flow" },
      ],
      paragraphs: [],
      note: "Make sure you're available on your chosen date and time when selecting this gift.",
    },
  },
  {
    id: "scrapbook",
    label: "Mini Scrapbook",
    icon: "📔",
    blurb: "A keepsake made with love",
    limit: 3,
    details: {
      paragraphs: [
        "You'll share 20 pictures that I will print, and I'll also provide the DIY materials needed for the scrapbook on September 15. You must be ready with your pictures!",
      ],
    },
  },
  {
    id: "groceries",
    label: "Groceries",
    icon: "🛒",
    blurb: "A little help for the pantry",
    limit: 3,
    details: {
      paragraphs: [
        "A mix of grocery items which will most likely help you prepare my favorite food, Spaghetti!",
      ],
    },
  },
  {
    id: "shirt",
    label: "Shirt",
    icon: "👕",
    blurb: "Something comfy and new",
    limit: 6,
    details: {
      paragraphs: [
        "A random brand-new t-shirt, sizes ranging from Medium to Large, from my friend's shirt brand — proven quality!",
      ],
    },
  },
  {
    id: "cap",
    label: "Cap",
    icon: "🧢",
    blurb: "Cute, casual, and cozy",
    limit: 1,
    details: {
      paragraphs: [
        "A trucker cap from my friend's brand, Homies. White and black in color with a red logo.",
      ],
    },
  },
];

export const GIFT_IDS = new Set(GIFTS.map((g) => g.id));

export function getGiftLabel(id: string): string {
  return GIFTS.find((g) => g.id === id)?.label ?? id;
}
