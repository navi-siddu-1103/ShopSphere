
export type Review = {
  id: string;
  userName: string;
  rating: number;
  comment: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  images: string[];
  reviews?: Review[];
  aiHint?: string;
};

export const categories = [
  "Smartphones & Accessories",
  "Electronics",
  "Books",
  "Home Goods",
  "Apparel",
];

export const products: Product[] = [
  {
    id: "iphone-15-pro-max-256",
    name: "Apple iPhone 15 Pro Max (256GB)",
    description: "The ultimate iPhone. A17 Pro chip. A design forged in titanium. And the most powerful iPhone camera system ever.",
    price: 159900.00,
    rating: 4.9,
    category: "Smartphones & Accessories",
    images: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
    aiHint: "iphone pro",
    reviews: [
      { id: "rev1", userName: "Aisha", rating: 5, comment: "Titanium feels amazing and the camera is mind-blowing." },
    ],
  },
  {
    id: "iphone-15-pro-max-512",
    name: "Apple iPhone 15 Pro Max (512GB)",
    description: "The ultimate iPhone with more storage for your photos, videos, and apps. A17 Pro chip and a design forged in titanium.",
    price: 179900.00,
    rating: 4.9,
    category: "Smartphones & Accessories",
    images: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
    aiHint: "iphone pro"
  },
  {
    id: "samsung-s24-ultra-256",
    name: "Samsung Galaxy S24 Ultra (256GB)",
    description: "Galaxy AI is here. Search like never before, get real-time translation on a call, and edit your photos with AI.",
    price: 129999.00,
    rating: 4.8,
    category: "Smartphones & Accessories",
    images: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
    aiHint: "samsung galaxy",
    reviews: [
      { id: "rev2", userName: "Rohan", rating: 5, comment: "The AI features are a game changer! The S Pen is better than ever." },
    ],
  },
  {
    id: "samsung-s24-ultra-512",
    name: "Samsung Galaxy S24 Ultra (512GB)",
    description: "Experience the power of Galaxy AI with expanded storage. The new standard of mobile AI is here.",
    price: 139999.00,
    rating: 4.8,
    category: "Smartphones & Accessories",
    images: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
    aiHint: "samsung galaxy"
  },
  {
    id: "pixel-8-pro-128",
    name: "Google Pixel 8 Pro (128GB)",
    description: "The most advanced Pixel camera yet, with a pro-level main camera for better low-light photos, a sharper ultrawide lens, and a 5x telephoto lens.",
    price: 106999.00,
    rating: 4.7,
    category: "Smartphones & Accessories",
    images: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
    aiHint: "google pixel",
  },
  {
    id: "pixel-8-pro-256",
    name: "Google Pixel 8 Pro (256GB)",
    description: "Google's smartest phone with more storage. Pro-level cameras, the powerful Google Tensor G3 chip, and an immersive 6.7-inch display.",
    price: 113999.00,
    rating: 4.7,
    category: "Smartphones & Accessories",
    images: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
    aiHint: "google pixel"
  },
  {
    id: "oneplus-12-256",
    name: "OnePlus 12 (256GB)",
    description: "Shaped by time, the new OnePlus 12 is a masterful blend of luxury and performance. Powered by Snapdragon® 8 Gen 3 with a ProXDR Display.",
    price: 64999.00,
    rating: 4.6,
    category: "Smartphones & Accessories",
    images: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
    aiHint: "oneplus phone",
  },
    {
    id: "xiaomi-14-pro-256",
    name: "Xiaomi 14 Pro (256GB)",
    description: "Lens to legend. The Xiaomi 14 Pro features a Leica Summilux optical lens, delivering stunning clarity and performance in all lighting conditions.",
    price: 74999.00,
    rating: 4.5,
    category: "Smartphones & Accessories",
    images: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
    aiHint: "xiaomi phone",
  },
  {
    id: "iphone-14-128",
    name: "Apple iPhone 14 (128GB)",
    description: "A huge leap in battery life and a new, more advanced dual-camera system. All in a durable design with Ceramic Shield, tougher than any smartphone glass.",
    price: 69900.00,
    rating: 4.6,
    category: "Smartphones & Accessories",
    images: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
    aiHint: "iphone 14",
  },
  {
    id: "samsung-a55-128",
    name: "Samsung Galaxy A55 (128GB)",
    description: "Awesome is for everyone. The Galaxy A55 5G features a premium metal frame, an immersive 6.6-inch Super AMOLED display, and a versatile camera.",
    price: 39999.00,
    rating: 4.4,
    category: "Smartphones & Accessories",
    images: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
    aiHint: "samsung phone",
  },
  {
    id: "realme-gt-6-pro-256",
    name: "Realme GT 6 Pro (256GB)",
    description: "Flagship killer re-defined. Experience top-tier performance with the latest Snapdragon processor and a super-smooth 120Hz display.",
    price: 49999.00,
    rating: 4.5,
    category: "Smartphones & Accessories",
    images: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
    aiHint: "realme phone"
  },
];
