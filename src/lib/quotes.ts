export const KINDNESS_QUOTES: string[] = [
  "No act of kindness, no matter how small, is ever wasted. — Aesop",
  "We rise by lifting others. — Robert Ingersoll",
  "Kindness is a language which the deaf can hear and the blind can see. — Mark Twain",
  "Gratitude turns what we have into enough. — Anonymous",
  "A small act of caring creates an endless ripple. — Anonymous",
  "The smallest act of kindness is worth more than the grandest intention. — Oscar Wilde",
  "How far you go in life depends on your being tender with the young, compassionate with the aged, sympathetic with the striving, and tolerant of the weak. — George Washington Carver",
  "Sharing is the essence of love. — Anonymous",
  "Wherever there is a human being, there is an opportunity for kindness. — Seneca",
  "Gratitude is the fairest blossom which springs from the soul. — Henry Ward Beecher",
  "Kind words can be short and easy to speak, but their echoes are truly endless. — Mother Teresa",
  "No one has ever become poor by giving. — Anne Frank",
  "Do small things with great love. — Mother Teresa",
  "A candle loses nothing by lighting another candle. — James Keller",
  "Friendship is born at that moment when one person says to another, 'What! You too? I thought I was the only one.' — C.S. Lewis",
  "Generosity is giving more than you can, and pride is taking less than you need. — Khalil Gibran",
  "The best way to find yourself is to lose yourself in the service of others. — Mahatma Gandhi",
  "To the world you may be one person, but to one person you may be the world. — Dr. Seuss",
  "We make a living by what we get, but we make a life by what we give. — Winston Churchill",
  "Every act of kindness, however small, is seed sown in the hearts of others.",
];

export function getRandomQuote(): string {
  return KINDNESS_QUOTES[Math.floor(Math.random() * KINDNESS_QUOTES.length)];
}
