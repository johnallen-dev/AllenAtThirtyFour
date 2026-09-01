export type Sponsor = {
  id: string;
  name: string;
  logo: string;
  url: string;
};

// Add a sponsor here to have it appear automatically on every form page.
export const SPONSORS: Sponsor[] = [
  {
    id: "homies",
    name: "Homies Clothing",
    logo: "/Homies.png",
    url: "https://www.facebook.com/p/Homies-Clothing-61577514410406/",
  },
  {
    id: "gee-j",
    name: "Gee-J Apparel",
    logo: "/Gee J.jpg",
    url: "https://www.tiktok.com/@gjapparelstore?_r=1&_t=ZS-99JKc3fuJ7Y",
  },
];
