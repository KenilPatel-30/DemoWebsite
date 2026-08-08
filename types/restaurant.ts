export type OrderStatus = "Pending" | "Accepted" | "Preparing" | "Ready" | "Delivered";

export interface Addon {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id?: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  availability: boolean;
  preparationTime?: string;
  isVeg: boolean;
  isArchived?: boolean;
  tags?: string[];
  sizes?: { label: string; oz: string; priceAdd: number }[];
  milkTypes?: string[];
  sugarLevels?: string[];
  addons?: Addon[];
  allergens?: string[];
}

export interface OrderItemData {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
  selections?: {
    size?: string;
    milkType?: string;
    sugarLevel?: string;
    addons?: string[];
  };
}

export interface Order {
  id?: string;
  orderId: string; // User-facing ID, e.g. ORD-1001
  customerName: string;
  tableNumber: string;
  items: OrderItemData[];
  subtotal: number;
  tax: number;
  total: number;
  status: OrderStatus;
  paymentStatus: "Pending" | "Paid";
  paymentMethod?: string;
  notes?: string;
  createdAt: any; // Firestore Timestamp
  updatedAt: any; // Firestore Timestamp
}
