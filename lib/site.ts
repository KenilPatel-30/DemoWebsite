const basePath = process.env.NODE_ENV === "production" ? "/DemoWebsite" : "";

/**
 * Central source of truth for all Demo Cafe business & content data.
 */
export const SITE = {
  // Business Info
  name: "Demo Cafe",
  shortName: "Demo",
  tagline: "Premium Coffee & Cuisine Template",
  url: "https://democafe.com",
  description:
    "Visit Demo Cafe for handcrafted coffee, brunch, desserts, lunch, dinner and catering. A premium modern cafe template.",
  phone: "+1 234 567 8900",
  whatsapp: "12345678900",
  email: "hello@democafe.com",
  rating: 4.8,
  reviews: 150,
  priceRange: "$$",
  
  // Location
  address: {
    line1: "123 Coffee Street",
    line2: "Downtown District",
    city: "Metropolis",
    state: "NY",
    country: "US",
    postalCode: "12345",
  },
  geo: {
    lat: 40.7128,
    lng: -74.0060,
  },

  social: {
    instagram: "https://instagram.com/democafe",
    facebook: "https://facebook.com/democafe",
  },

  // Navigation Links
  mapsUrl:
    "https://www.google.com/maps",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=",
  
  hours: [
    { day: "Monday – Thursday", time: "8:00 AM – 11:00 PM" },
    { day: "Friday – Sunday", time: "8:00 AM – 12:00 AM" },
  ],
  
  nav: [
    { label: "About", href: "#about" },
    { label: "Menu", href: "#menu" },
    { label: "Why Us", href: "#why" },
    { label: "Reviews", href: "#reviews" },
    { label: "Visit", href: "#contact" },
  ],
} as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Why Us", href: "#why" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit", href: "#contact" },
] as const;

/** Curated, cleaned photographs of the real Belluno Cafe (in /public/venue). */
export const IMG = {
  heroNight: `${basePath}/venue/venue-03.jpg`,
  signInterior: `${basePath}/venue/venue-04.jpg`,
  latte: `${basePath}/venue/venue-08.jpg`,
  drinks: `${basePath}/venue/venue-09.jpg`,
  archDining: `${basePath}/venue/venue-10.jpg`,
  courtyardTables: `${basePath}/venue/venue-17.jpg`,
  brunchPlate: `${basePath}/venue/venue-18.jpg`,
  pizzaCocktails: `${basePath}/venue/venue-23.jpg`,
  fountainWall: `${basePath}/venue/venue-28.jpg`,
  dessert: `${basePath}/venue/venue-33.jpg`,
  skylightSign: `${basePath}/venue/venue-38.jpg`,
  redCarpet: `${basePath}/venue/venue-41.jpg`,
  pizzaOven: `${basePath}/venue/venue-44.jpg`,
  matcha: `${basePath}/venue/venue-32.jpg`,
  spiralStair: `${basePath}/venue/venue-27.jpg`,
  ceilingChandelier: `${basePath}/venue/venue-35.jpg`,
  loungeArt: `${basePath}/venue/venue-19.jpg`,
  eveningWalk: `${basePath}/venue/venue-11.jpg`,
  blueSignNight: `${basePath}/venue/venue-07.jpg`,
  margherita: `${basePath}/venue/venue-02.jpg`,
  warmInterior: `${basePath}/venue/venue-24.jpg`,
} as const;

export const STATS = [
  { value: "4.7", label: "Google Rating", suffix: "★" },
  { value: "427", label: "Happy Reviews", suffix: "+" },
  { value: "35", label: "Signature Drinks", suffix: "" },
  { value: "5", label: "Years of Craft", suffix: "" },
] as const;

export type MenuItem = {
  name: string;
  price: string;
  note: string;
  ingredients: string[];
};

export type MenuCategory = {
  id: string;
  title: string;
  kicker: string;
  description: string;
  object: "cup" | "croissant" | "plate" | "pastry";
  image: string;
  items: MenuItem[];
};

export const MENU: MenuCategory[] = [
  {
    id: "coffee",
    title: "Coffee",
    kicker: "01 — The Ritual",
    description:
      "Single-origin beans, roasted in small batches and pulled to perfection by hands that care.",
    object: "cup",
    image: `${basePath}/venue/venue-09.jpg`,
    items: [
      {
        name: "Belluno Signature Latte",
        price: "₹280",
        note: "House blend, silk micro-foam",
        ingredients: ["Double espresso", "Steamed milk", "Vanilla bean", "Caramel"],
      },
      {
        name: "Slow-Pour Filter",
        price: "₹240",
        note: "Bright, floral, single origin",
        ingredients: ["Ethiopian beans", "90°C water", "3 min bloom"],
      },
      {
        name: "Copper Cold Brew",
        price: "₹260",
        note: "18-hour steeped, velvet finish",
        ingredients: ["Dark roast", "Cold filtered water", "Orange peel"],
      },
    ],
  },
  {
    id: "breakfast",
    title: "Brunch",
    kicker: "02 — The Morning",
    description:
      "Sunlit plates and flaky pastries baked fresh at dawn — the reason mornings are worth waking for.",
    object: "croissant",
    image: `${basePath}/venue/venue-18.jpg`,
    items: [
      {
        name: "Almond Butter Croissant",
        price: "₹220",
        note: "72-hour laminated dough",
        ingredients: ["French butter", "Almond frangipane", "Powdered sugar"],
      },
      {
        name: "Truffle Eggs Benedict",
        price: "₹340",
        note: "Poached, hollandaise, sourdough",
        ingredients: ["Free-range eggs", "Black truffle", "Sourdough", "Chives"],
      },
      {
        name: "Belgian Waffle Stack",
        price: "₹290",
        note: "Maple, berries, mascarpone",
        ingredients: ["Buttermilk batter", "Maple syrup", "Fresh berries"],
      },
    ],
  },
  {
    id: "lunch",
    title: "Lunch",
    kicker: "03 — The Table",
    description:
      "Seasonal, honest cooking. Ingredients sourced close to home, plated with quiet precision.",
    object: "plate",
    image: `${basePath}/venue/venue-02.jpg`,
    items: [
      {
        name: "Charred Pesto Orzo",
        price: "₹360",
        note: "Basil, sun-gold tomato, parmesan",
        ingredients: ["Orzo", "House pesto", "Confit tomato", "Parmesan"],
      },
      {
        name: "Smoked Paneer Bowl",
        price: "₹330",
        note: "Grains, greens, tahini drizzle",
        ingredients: ["Smoked paneer", "Quinoa", "Rocket", "Tahini"],
      },
      {
        name: "Wood-Fired Margherita",
        price: "₹390",
        note: "San Marzano, buffalo mozzarella",
        ingredients: ["48h dough", "San Marzano", "Buffalo mozzarella", "Basil"],
      },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    kicker: "04 — The Finale",
    description:
      "The last, lingering note — patisserie built for the golden hour and the perfect photograph.",
    object: "pastry",
    image: `${basePath}/venue/venue-33.jpg`,
    items: [
      {
        name: "Burnt Basque Cheesecake",
        price: "₹280",
        note: "Caramelised top, creamy centre",
        ingredients: ["Cream cheese", "Vanilla", "Caramelised sugar"],
      },
      {
        name: "Belluno Tiramisu",
        price: "₹260",
        note: "Espresso-soaked, cocoa dusted",
        ingredients: ["Mascarpone", "Espresso", "Ladyfingers", "Cocoa"],
      },
      {
        name: "Molten Chocolate Sphere",
        price: "₹300",
        note: "Warm ganache, gold leaf",
        ingredients: ["70% dark chocolate", "Ganache", "Edible gold"],
      },
    ],
  },
];

export type Service = {
  title: string;
  description: string;
  icon: "coffee" | "croissant" | "utensils" | "cake" | "party";
};

export const SERVICES: Service[] = [
  {
    title: "Handcrafted Coffee",
    description: "Single-origin espresso, filter & cold brew pulled by trained baristas.",
    icon: "coffee",
  },
  {
    title: "All-Day Brunch",
    description: "Fresh pastries and sunlit plates served from open till close.",
    icon: "croissant",
  },
  {
    title: "Seasonal Lunch",
    description: "Wood-fired mains and grain bowls sourced from local farms.",
    icon: "utensils",
  },
  {
    title: "Patisserie & Desserts",
    description: "Small-batch cakes and plated desserts made in-house daily.",
    icon: "cake",
  },
  {
    title: "Private Catering",
    description: "Curated menus for events, celebrations and corporate gatherings.",
    icon: "party",
  },
];

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Aarohi Mehta",
    role: "Regular · Vesu",
    quote:
      "The signature latte is unreal and the space feels like a boutique hotel lobby. Easily the most beautiful cafe in Surat.",
    rating: 5,
  },
  {
    name: "Rishabh Shah",
    role: "Food Blogger",
    quote:
      "Every plate is styled like it belongs on a magazine cover — and it tastes even better than it looks. The truffle benedict is a must.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Catering Client",
    quote:
      "Belluno catered our launch event flawlessly. Warm hospitality, immaculate presentation, zero stress. We'll be back.",
    rating: 5,
  },
  {
    name: "Karan Desai",
    role: "Weekend Visitor",
    quote:
      "Cold brew, soft light, good music. I come to work and end up staying for hours. The ambience is genuinely calming.",
    rating: 4,
  },
  {
    name: "Sneha Patel",
    role: "Dessert Lover",
    quote:
      "That molten chocolate sphere with gold leaf? Pure theatre. Instagram-worthy doesn't even begin to cover it.",
    rating: 5,
  },
];
