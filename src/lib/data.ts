export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  image: string;
  aiHint?: string;
};

export const categories = [
  "Electronics",
  "Books",
  "Home Goods",
  "Apparel",
];

export const products: Product[] = [
  {
    id: "1",
    name: "Aura Wireless Headphones",
    description:
      "Experience immersive sound with these noise-cancelling wireless headphones. Features a 30-hour battery life and a comfortable, lightweight design.",
    price: 149.99,
    rating: 4.8,
    category: "Electronics",
    image: "https://placehold.co/600x400.png",
    aiHint: "headphones",
  },
  {
    id: "2",
    name: "Quantum Smartwatch",
    description:
      "Stay connected on the go. Track your fitness, receive notifications, and control your music right from your wrist. Water-resistant and stylish.",
    price: 229.0,
    rating: 4.6,
    category: "Electronics",
    image: "https://placehold.co/600x400.png",
    aiHint: "smartwatch",
  },
  {
    id: "3",
    name: "The Silent Forest",
    description:
      "A thrilling mystery novel by acclaimed author Jane Doe. A detective must unravel a conspiracy in a remote, eerie town where no one speaks.",
    price: 15.99,
    rating: 4.9,
    category: "Books",
    image: "https://placehold.co/600x400.png",
    aiHint: "book cover",
  },
  {
    id: "4",
    name: "Culinary Masterclass",
    description:
      "A comprehensive cookbook with over 200 recipes from world-renowned chefs. Perfect for both beginners and experienced cooks.",
    price: 34.5,
    rating: 4.7,
    category: "Books",
    image: "https://placehold.co/600x400.png",
    aiHint: "cookbook",
  },
  {
    id: "5",
    name: "AeroPress Coffee Maker",
    description:
      "Brew rich, smooth coffee without bitterness in under a minute. Compact, durable, and perfect for home or travel.",
    price: 39.95,
    rating: 4.9,
    category: "Home Goods",
    image: "https://placehold.co/600x400.png",
    aiHint: "coffee maker",
  },
  {
    id: "6",
    name: "Plush Velvet Throw Blanket",
    description:
      "A luxuriously soft and cozy throw blanket. Adds a touch of elegance and warmth to any room. Machine washable.",
    price: 49.99,
    rating: 4.5,
    category: "Home Goods",
    image: "https://placehold.co/600x400.png",
    aiHint: "throw blanket",
  },
  {
    id: "7",
    name: "Nomad All-Weather Jacket",
    description:
      "A versatile and waterproof jacket designed for any adventure. Breathable fabric keeps you comfortable in changing conditions.",
    price: 189.0,
    rating: 4.7,
    category: "Apparel",
    image: "https://placehold.co/600x400.png",
    aiHint: "jacket",
  },
  {
    id: "8",
    name: "Urban Commuter Backpack",
    description:
      "A sleek, minimalist backpack with a padded laptop compartment and multiple pockets for organization. Built to withstand the daily grind.",
    price: 89.99,
    rating: 4.6,
    category: "Electronics",
    image: "https://placehold.co/600x400.png",
    aiHint: "backpack",
  },
  {
    id: "9",
    name: "Echo Smart Speaker",
    description:
      "Your voice-controlled assistant. Play music, get news, set alarms, and control smart home devices with just your voice.",
    price: 99.99,
    rating: 4.7,
    category: "Electronics",
    image: "https://placehold.co/600x400.png",
    aiHint: "smart speaker",
  },
  {
    id: "10",
    name: "Classic Leather Loafers",
    description:
      "Handcrafted from genuine leather, these loafers offer timeless style and exceptional comfort for any occasion.",
    price: 120.0,
    rating: 4.4,
    category: "Apparel",
    image: "https://placehold.co/600x400.png",
    aiHint: "leather shoes",
  },
  {
    id: "11",
    name: "Minimalist Desk Lamp",
    description:
      "An elegant LED desk lamp with adjustable brightness and color temperature. Provides flicker-free lighting that's easy on the eyes.",
    price: 59.99,
    rating: 4.8,
    category: "Home Goods",
    image: "https://placehold.co/600x400.png",
    aiHint: "desk lamp",
  },
  {
    id: "12",
    name: "Galaxy Navigator: A Sci-Fi Epic",
    description:
      "Embark on an interstellar journey in this Hugo Award-winning science fiction novel. A story of exploration, discovery, and the human spirit.",
    price: 18.75,
    rating: 4.8,
    category: "Books",
    image: "https://placehold.co/600x400.png",
    aiHint: "sci-fi book",
  },
];
