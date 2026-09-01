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
];
