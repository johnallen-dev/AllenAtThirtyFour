export type DonationCategory = {
  id: string;
  title: string;
  icon: string;
  items: string[];
};

// The list of items currently needed by CRIBS Foundation, Inc. Add or edit
// categories/items here — the Charity page renders them automatically, and
// shows a "coming soon" message while this array is empty.
export const DONATION_ITEMS_NEEDED: DonationCategory[] = [
  {
    id: "personal-care",
    title: "Personal Care",
    icon: "🧴",
    items: [
      "Baby Bath Soap",
      "Baby Lotion",
      "Baby Oil",
      "Adult Shampoo",
      "Repellant Lotion",
      "Toothpaste (Kids & Adult)",
    ],
  },
  {
    id: "school-office-supplies",
    title: "School / Office Supplies",
    icon: "📚",
    items: [
      "Vellum Paper A4",
      "Certificate Holders",
      "Rubber Shoes (for Aftercare Girls)",
    ],
  },
  {
    id: "food-nutrition",
    title: "Food & Nutrition",
    icon: "🍽️",
    items: [
      "Fruits",
      "Pork",
      "Ground Pork",
      "Chicken",
      "Vegetables",
      "Hotdogs",
      "Longganisa",
      "Dried Fish",
      "All-Purpose Cream",
      "Evaporated Milk",
      "Condensed Milk",
      "Soy Sauce",
      "Monggo Beans",
      "Milo",
      "Cereal",
      "Cheese",
      "Biscuits",
      "Sugar / Salt",
      "Liver Spread",
      "Honey",
      "Canned Tuna",
      "Luncheon Meat",
      "Corned Beef",
      "Canned Sausage",
      "Hotcake Mix",
    ],
  },
  {
    id: "milk",
    title: "Milk",
    icon: "🍼",
    items: [
      "Bonna (0–6 months)",
      "Bonamil (6–12 months)",
      "Similac (6–12 months)",
      "Bonakid (1–3 yrs old)",
      "Bonakid 3+ (Pre-School)",
      "Bearbrand Fortified Milk",
    ],
  },
];

export const CRIBS_FOUNDATION = {
  name: "CRIBS FOUNDATION, INC.",
  description:
    "CRIBS Foundation, Inc. is a non-profit organization licensed by the Department of Social Welfare and Development (DSWD). It provides a loving and safe environment for abandoned, neglected, and surrendered babies, as well as female minor survivors of sexual abuse. Every contribution, big or small, helps sustain their mission of giving these children safety, comfort, and a real chance at a brighter future.",
};
