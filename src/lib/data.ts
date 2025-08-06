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
    price: 11999.00,
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
    price: 18320.00,
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
    price: 1279.00,
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
    price: 2760.00,
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
    price: 3196.00,
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
    price: 3999.00,
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
    price: 15120.00,
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
    price: 7199.00,
    rating: 4.6,
    category: "Electronics", // This was Apparel, but a backpack with a laptop compartment fits better in Electronics or a new "Accessories" category. Let's keep it consistent with existing categories.
    image: "https://placehold.co/600x400.png",
    aiHint: "backpack",
  },
  {
    id: "9",
    name: "Echo Smart Speaker",
    description:
      "Your voice-controlled assistant. Play music, get news, set alarms, and control smart home devices with just your voice.",
    price: 7999.00,
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
    price: 9600.00,
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
    price: 4799.00,
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
    price: 1500.00,
    rating: 4.8,
    category: "Books",
    image: "https://placehold.co/600x400.png",
    aiHint: "sci-fi book",
  },
  {
    id: "13",
    name: "Zenith Portable Charger",
    description: "A high-capacity 20,000mAh portable charger that can charge your devices multiple times. Features dual USB-C ports and fast charging.",
    price: 3679.00,
    rating: 4.9,
    category: "Electronics",
    image: "https://placehold.co/600x400.png",
    aiHint: "power bank",
  },
  {
    id: "14",
    name: "The Dragon's Heirloom",
    description: "A captivating fantasy saga of ancient magic, mythical creatures, and a young hero's quest to reclaim their birthright.",
    price: 1800.00,
    rating: 4.7,
    category: "Books",
    image: "https://placehold.co/600x400.png",
    aiHint: "fantasy book",
  },
  {
    id: "15",
    name: "Chef's Precision Knife Set",
    description: "A 5-piece set of high-carbon stainless steel knives. Ergonomically designed for balance and control. Includes a chef's knife, paring knife, and more.",
    price: 12799.00,
    rating: 4.8,
    category: "Home Goods",
    image: "https://placehold.co/600x400.png",
    aiHint: "knife set",
  },
  {
    id: "16",
    name: "Azure Organic Cotton Tee",
    description: "A premium, soft-touch t-shirt made from 100% organic cotton. Ethically sourced and built for everyday comfort and style.",
    price: 2399.00,
    rating: 4.6,
    category: "Apparel",
    image: "https://placehold.co/600x400.png",
    aiHint: "t-shirt",
  },
  {
    id: "17",
    name: "Gourmet Spice Rack",
    description: "A 16-jar rotating spice rack with common herbs and spices included. Keeps your kitchen organized and your flavors accessible.",
    price: 3500.00,
    rating: 4.8,
    category: "Home Goods",
    image: "https://placehold.co/600x400.png",
    aiHint: "spice rack"
  },
  {
    id: "18",
    name: "Yoga & Pilates Mat",
    description: "A thick, non-slip mat perfect for yoga, pilates, and floor exercises. Made from eco-friendly TPE material.",
    price: 2800.00,
    rating: 4.7,
    category: "Home Goods",
    image: "https://placehold.co/600x400.png",
    aiHint: "yoga mat"
  },
  {
    id: "19",
    name: "Vintage Canvas Messenger Bag",
    description: "A durable and stylish messenger bag for everyday use. Features multiple compartments and an adjustable shoulder strap.",
    price: 4500.00,
    rating: 4.5,
    category: "Apparel",
    image: "https://placehold.co/600x400.png",
    aiHint: "messenger bag"
  },
  {
    id: "20",
    name: "4K Action Camera",
    description: "Capture your adventures in stunning 4K. Waterproof up to 30 meters and includes a variety of mounting accessories.",
    price: 9999.00,
    rating: 4.6,
    category: "Electronics",
    image: "https://placehold.co/600x400.png",
    aiHint: "action camera"
  }
];
