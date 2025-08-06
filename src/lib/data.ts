
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
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1579033471374-2197a2911efa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    aiHint: "headphones",
    reviews: [
      { id: "rev1", userName: "Arjun", rating: 5, comment: "Amazing sound quality and very comfortable!" },
      { id: "rev2", userName: "Priya", rating: 4, comment: "Great headphones, but the noise cancellation could be a bit better." },
    ],
  },
  {
    id: "2",
    name: "Quantum Smartwatch",
    description:
      "Stay connected on the go. Track your fitness, receive notifications, and control your music right from your wrist. Water-resistant and stylish.",
    price: 18320.00,
    rating: 4.6,
    category: "Electronics",
    images: ["https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1579586337278-35d9addb017d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    aiHint: "smartwatch",
    reviews: [
        { id: "rev3", userName: "Rohan", rating: 5, comment: "Does everything I need it to. The battery life is impressive." },
        { id: "rev4", userName: "Sneha", rating: 4, comment: "Stylish and functional, but the screen is a bit small for my liking." },
    ],
  },
  {
    id: "3",
    name: "The Silent Forest",
    description:
      "A thrilling mystery novel by acclaimed author Jane Doe. A detective must unravel a conspiracy in a remote, eerie town where no one speaks.",
    price: 1279.00,
    rating: 4.9,
    category: "Books",
    images: ["https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    aiHint: "book cover",
    reviews: [
        { id: "rev5", userName: "Vikram", rating: 5, comment: "Couldn't put it down! A masterpiece of suspense." },
    ],
  },
  {
    id: "4",
    name: "Culinary Masterclass",
    description:
      "A comprehensive cookbook with over 200 recipes from world-renowned chefs. Perfect for both beginners and experienced cooks.",
    price: 2760.00,
    rating: 4.7,
    category: "Books",
    images: ["https://images.unsplash.com/photo-1540420773420-2850a26b685a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
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
    images: ["https://images.unsplash.com/photo-1620858368848-8545b0a5015d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
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
    images: ["https://images.unsplash.com/photo-1616627561954-c4826bd17b6a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1542345339-b1e67b147d3d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
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
    images: ["https://images.unsplash.com/photo-1591953901594-55536a2871b6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1618244979848-68708d38e235?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
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
    images: ["https://images.unsplash.com/photo-1553062407-98eeb68c6a62?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1587397845856-e6cf491761e2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
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
    images: ["https://images.unsplash.com/photo-1533000523153-73c38a1643c7?q=80&w=1978&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
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
    images: ["https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1589188057212-4c23393019e3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
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
    images: ["https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
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
    images: ["https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    aiHint: "sci-fi book",
  },
  {
    id: "13",
    name: "Zenith Portable Charger",
    description: "A high-capacity 20,000mAh portable charger that can charge your devices multiple times. Features dual USB-C ports and fast charging.",
    price: 3679.00,
    rating: 4.9,
    category: "Electronics",
    images: ["https://images.unsplash.com/photo-1588855140131-4c3a4f6a1e5c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    aiHint: "power bank",
  },
  {
    id: "14",
    name: "The Dragon's Heirloom",
    description: "A captivating fantasy saga of ancient magic, mythical creatures, and a young hero's quest to reclaim their birthright.",
    price: 1800.00,
    rating: 4.7,
    category: "Books",
    images: ["https://images.unsplash.com/photo-1533560696583-644a434b931f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    aiHint: "fantasy book",
  },
  {
    id: "15",
    name: "Chef's Precision Knife Set",
    description: "A 5-piece set of high-carbon stainless steel knives. Ergonomically designed for balance and control. Includes a chef's knife, paring knife, and more.",
    price: 12799.00,
    rating: 4.8,
    category: "Home Goods",
    images: ["https://images.unsplash.com/photo-1618684617721-a0c7418a0e8d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    aiHint: "knife set",
  },
  {
    id: "16",
    name: "Azure Organic Cotton Tee",
    description: "A premium, soft-touch t-shirt made from 100% organic cotton. Ethically sourced and built for everyday comfort and style.",
    price: 2399.00,
    rating: 4.6,
    category: "Apparel",
    images: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    aiHint: "t-shirt",
  },
  {
    id: "17",
    name: "Gourmet Spice Rack",
    description: "A 16-jar rotating spice rack with common herbs and spices included. Keeps your kitchen organized and your flavors accessible.",
    price: 3500.00,
    rating: 4.8,
    category: "Home Goods",
    images: ["https://images.unsplash.com/photo-1556910110-a5a63dfd9904?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    aiHint: "spice rack"
  },
  {
    id: "18",
    name: "Yoga & Pilates Mat",
    description: "A thick, non-slip mat perfect for yoga, pilates, and floor exercises. Made from eco-friendly TPE material.",
    price: 2800.00,
    rating: 4.7,
    category: "Home Goods",
    images: ["https://images.unsplash.com/photo-1591291621226-9d2b273b544a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    aiHint: "yoga mat"
  },
  {
    id: "19",
    name: "Vintage Canvas Messenger Bag",
    description: "A durable and stylish messenger bag for everyday use. Features multiple compartments and an adjustable shoulder strap.",
    price: 4500.00,
    rating: 4.5,
    category: "Apparel",
    images: ["https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    aiHint: "messenger bag"
  },
  {
    id: "20",
    name: "4K Action Camera",
    description: "Capture your adventures in stunning 4K. Waterproof up to 30 meters and includes a variety of mounting accessories.",
    price: 9999.00,
    rating: 4.6,
    category: "Electronics",
    images: ["https://images.unsplash.com/photo-1517411262332-9c9849344933?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    aiHint: "action camera"
  },
  {
    id: "21",
    name: "Scented Soy Candle",
    description: "A hand-poured soy wax candle with a calming lavender scent. Provides up to 40 hours of burn time.",
    price: 899.00,
    rating: 4.7,
    category: "Home Goods",
    images: ["https://images.unsplash.com/photo-1612293428567-2b12a84a6c6d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    aiHint: "scented candle"
  },
  {
    id: "22",
    name: "Classic Crew Socks (3-Pack)",
    description: "A pack of three comfortable and durable crew socks, made from a breathable cotton blend.",
    price: 499.00,
    rating: 4.5,
    category: "Apparel",
    images: ["https://images.unsplash.com/photo-1611082538419-8def33578e7f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    aiHint: "socks pack"
  },
  {
    id: "23",
    name: "Stainless Steel Water Bottle",
    description: "A 750ml double-walled insulated water bottle. Keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 1299.00,
    rating: 4.8,
    category: "Home Goods",
    images: ["https://images.unsplash.com/photo-1610399122820-a619d77a0664?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    aiHint: "water bottle"
  },
  {
    id: "24",
    name: "USB-C to USB-A Cable",
    description: "A durable, braided 1-meter cable for charging and data sync. Compatible with all modern devices.",
    price: 399.00,
    rating: 4.6,
    category: "Electronics",
    images: ["https://images.unsplash.com/photo-1592424002842-5e4c62c26b9a?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    aiHint: "usb cable"
  },
  {
    id: "25",
    name: "The Art of Tidying Up",
    description: "A bestselling guide to decluttering your home and life, leading to a more organized and peaceful mindset.",
    price: 799.00,
    rating: 4.9,
    category: "Books",
    images: ["https://images.unsplash.com/photo-1519791883288-dc81395b3641?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    aiHint: "self-help book"
  },
  {
    id: "26",
    name: "Canvas Tote Bag",
    description: "A stylish and sturdy canvas tote bag, perfect for shopping, errands, or a day at the beach.",
    price: 649.00,
    rating: 4.4,
    category: "Apparel",
    images: ["https://images.unsplash.com/photo-1579401729352-616d0asan1d8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    aiHint: "tote bag"
  },
  {
    id: "27",
    name: "Ceramic Mug Set (Set of 2)",
    description: "Two beautifully crafted ceramic mugs with a modern design. Microwave and dishwasher safe.",
    price: 1199.00,
    rating: 4.7,
    category: "Home Goods",
    images: ["https://images.unsplash.com/photo-1605384904383-04b6de75d272?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    aiHint: "mug set"
  },
  {
    id: "28",
    name: "Portable Bluetooth Speaker",
    description: "A compact yet powerful Bluetooth speaker with rich sound and deep bass. 10-hour battery life and water-resistant design.",
    price: 2499.00,
    rating: 4.6,
    category: "Electronics",
    images: ["https://images.unsplash.com/photo-1589100782635-992329380f99?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    aiHint: "bluetooth speaker"
  }
];



    