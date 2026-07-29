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
  category: string;
  tags?: string[];
  sizes?: { label: string; oz: string; priceAdd: number }[];
  milkTypes?: string[];
  sugarLevels?: string[];
  addons?: Addon[];
  allergens?: string[];
};

export const ORDER_CATEGORIES = [
  "All", 
  "Chef's Recommended",
  "Coffee", 
  "Shakes", 
  "Mocktail", 
  "Starters", 
  "Main Course", 
  "Siders",
  "Dessert"
];

export const ORDER_MENU: OrderItem[] = [
  {
    id: "oat-milk-latte",
    name: "Oat Milk Latte",
    description: "Our signature smooth espresso blended with creamy oat milk and a touch of organic honey.",
    price: 280,
    image: IMG.latte,
    category: "Coffee",
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
    allergens: ["Contains Gluten (Oat Milk)"],
  },
  {
    id: "avocado-toast",
    name: "Avocado Toast",
    description: "Smashed avocado, microgreens, and chili flakes on artisanal sourdough.",
    price: 520,
    image: IMG.brunchPlate,
    category: "Starters",
    tags: ["Vegan"],
    addons: [
      { id: "poached-egg", name: "Poached Egg", price: 60 },
      { id: "bacon", name: "Crispy Bacon", price: 90 },
    ],
    allergens: ["Contains Gluten (Sourdough).", "May contain traces of tree nuts and sesame."],
  },
  {
    id: "artisan-cappuccino",
    name: "Artisan Cappuccino",
    description: "Rich espresso balanced with steamed milk and a light layer of foam.",
    price: 240,
    image: IMG.drinks,
    category: "Coffee",
    tags: ["Top Seller"],
    sizes: [
      { label: "Regular", oz: "8 oz", priceAdd: 0 },
      { label: "Large", oz: "12 oz", priceAdd: 40 },
    ],
    milkTypes: ["Whole", "Oat", "Almond", "Soy"],
    sugarLevels: ["No Sugar", "Regular"],
    allergens: ["Contains Dairy (unless a milk alternative is chosen)."],
  },
  {
    id: "cold-brew-classic",
    name: "Cold Brew Classic",
    description: "Steeped 24 hours for a smooth, bold finish over ice.",
    price: 280,
    image: IMG.matcha,
    category: "Coffee",
    tags: ["Vegan", "Dairy-Free"],
    sizes: [
      { label: "Regular", oz: "12 oz", priceAdd: 0 },
      { label: "Large", oz: "16 oz", priceAdd: 40 },
    ],
    sugarLevels: ["No Sugar", "Regular", "Extra Sweet"],
    allergens: ["No known allergens. Prepared in a facility that handles dairy and nuts."],
  },
  {
    id: "ethiopian-yirgacheffe",
    name: "Hand-Poured V60 (Ethiopia Yirgacheffe)",
    description: "Bright floral notes with a hint of citrus. Hand-poured over a V60 filter.",
    price: 340,
    image: IMG.drinks,
    category: "Coffee",
    tags: ["Single Origin"],
    allergens: ["No known allergens.", "Prepared in a facility that handles dairy and nuts."],
  },
  {
    id: "almond-croissant",
    name: "Almond Croissant",
    description: "Twice-baked flaky pastry filled with sweet almond frangipane.",
    price: 220,
    image: IMG.dessert,
    category: "Dessert",
    tags: ["Fresh Baked"],
    allergens: ["Contains Gluten.", "Contains Tree Nuts (Almonds).", "Contains Dairy (Butter).", "Contains Eggs."],
  },
  {
    id: "truffle-fries",
    name: "Truffle Parmesan Fries",
    description: "Crispy shoestring fries tossed in white truffle oil and aged parmesan.",
    price: 290,
    image: IMG.pizzaCocktails,
    category: "Siders",
    tags: ["Popular"],
    allergens: ["Contains Dairy (Parmesan)."],
  },
  {
    id: "wood-fired-margherita",
    name: "Wood-Fired Margherita",
    description: "San Marzano tomatoes, fresh buffalo mozzarella, and basil on a 48-hour sourdough base.",
    price: 550,
    image: IMG.margherita,
    category: "Main Course",
    tags: ["Chef's Pick"],
    allergens: ["Contains Gluten.", "Contains Dairy."],
  },
  {
    id: "virgin-mojito",
    name: "Classic Virgin Mojito",
    description: "Refreshing blend of muddled mint, fresh lime, and sparkling soda.",
    price: 220,
    image: IMG.drinks,
    category: "Mocktail",
    tags: ["Refreshing"],
    allergens: ["No known allergens."],
  },
  {
    id: "belgian-chocolate-shake",
    name: "Belgian Chocolate Shake",
    description: "Rich, thick shake made with premium Belgian dark chocolate and whole milk.",
    price: 320,
    image: IMG.matcha, // Using matcha image as fallback
    category: "Shakes",
    tags: ["Sweet Tooth"],
    allergens: ["Contains Dairy."],
  },
  {
    id: "chef-special-pasta",
    name: "Chef's Truffle Mushroom Pasta",
    description: "Handmade fettuccine in a creamy wild mushroom and black truffle sauce.",
    price: 650,
    image: IMG.brunchPlate,
    category: "Chef's Recommended",
    tags: ["Signature"],
    allergens: ["Contains Gluten.", "Contains Dairy."],
  }
];
