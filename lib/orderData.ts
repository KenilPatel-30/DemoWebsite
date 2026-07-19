import { IMG } from "./site";

export type Addon = {
  id: string;
  name: string;
  price: number;
};

export type OrderItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tags?: string[];
  sizes?: { label: string; oz: string; priceAdd: number }[];
  milkTypes?: string[];
  sugarLevels?: string[];
  addons?: Addon[];
};

export const ORDER_CATEGORIES = ["All", "Coffee", "Tea", "Breakfast", "Lunch", "Dessert"];

export const ORDER_MENU: OrderItem[] = [
  {
    id: "oat-milk-latte",
    name: "Oat Milk Latte",
    description: "Our signature smooth espresso blended with creamy oat milk and a touch of organic honey.",
    price: 280,
    image: IMG.latte,
    tags: ["Top Seller"],
    sizes: [
      { label: "Small", oz: "8 oz", priceAdd: 0 },
      { label: "Medium", oz: "12 oz", priceAdd: 0 },
      { label: "Large", oz: "16 oz", priceAdd: 30 },
    ],
    milkTypes: ["Whole", "Oat", "Almond", "Soy"],
    sugarLevels: ["No Sugar", "Regular", "50% Sugar"],
    addons: [
      { id: "extra-shot", name: "Extra shot", price: 50 },
      { id: "whip", name: "Whipped cream", price: 40 },
      { id: "vanilla", name: "Vanilla syrup", price: 30 },
    ],
  },
  {
    id: "avocado-toast",
    name: "Avocado Toast",
    description: "Smashed avocado, microgreens, and chili flakes on artisanal sourdough.",
    price: 520,
    image: IMG.brunchPlate,
    tags: ["Vegan"],
    addons: [
      { id: "poached-egg", name: "Poached Egg", price: 60 },
      { id: "bacon", name: "Crispy Bacon", price: 90 },
    ],
  },
  {
    id: "artisan-cappuccino",
    name: "Artisan Cappuccino",
    description: "Rich espresso balanced with steamed milk and a light layer of foam.",
    price: 240,
    image: IMG.drinks, // use one of the premium coffee pics
    tags: ["Top Seller"],
    sizes: [
      { label: "Regular", oz: "8 oz", priceAdd: 0 },
      { label: "Large", oz: "12 oz", priceAdd: 40 },
    ],
    milkTypes: ["Whole", "Oat", "Almond", "Soy"],
    sugarLevels: ["No Sugar", "Regular"],
  },
  {
    id: "cold-brew-classic",
    name: "Cold Brew Classic",
    description: "Steeped 24 hours for a smooth, bold finish over ice.",
    price: 280,
    image: IMG.matcha, // fallback for cold drink
    tags: ["Vegan", "Dairy-Free"],
    sizes: [
      { label: "Regular", oz: "12 oz", priceAdd: 0 },
      { label: "Large", oz: "16 oz", priceAdd: 40 },
    ],
    sugarLevels: ["No Sugar", "Regular", "Extra Sweet"],
  },
  {
    id: "ethiopian-yirgacheffe",
    name: "Hand-Poured V60 (Ethiopia Yirgacheffe)",
    description: "Bright floral notes with a hint of citrus. Hand-poured over a V60 filter.",
    price: 340,
    image: IMG.drinks,
    tags: ["Single Origin"],
  },
  {
    id: "almond-croissant",
    name: "Almond Croissant",
    description: "Twice-baked flaky pastry filled with sweet almond frangipane.",
    price: 220,
    image: IMG.dessert,
    tags: ["Fresh Baked"],
  },
];
