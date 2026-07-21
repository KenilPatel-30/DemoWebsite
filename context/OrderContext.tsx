"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { OrderItem } from "@/lib/orderData";

export type CartItem = {
  id: string; // unique instance id for cart
  menuItem: OrderItem;
  quantity: number;
  selections: {
    size?: string;
    milkType?: string;
    sugarLevel?: string;
    addons: string[];
  };
  specialInstructions: string;
  totalPrice: number;
};

type OrderContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, delta: number) => void;
  cartTotal: number;
  cartCount: number;
  // Navigation State
  currentView: "home" | "menu" | "cart" | "checkout" | "orderConfirmed" | "bookTable" | "bookingConfirmed";
  setCurrentView: (view: "home" | "menu" | "cart" | "checkout" | "orderConfirmed" | "bookTable" | "bookingConfirmed") => void;
  activeItem: OrderItem | null;
  setActiveItem: (item: OrderItem | null) => void;
  // Booking State
  bookingDetails: any;
  setBookingDetails: (details: any) => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentView, setCurrentView] = useState<OrderContextType["currentView"]>("home");
  const [activeItem, setActiveItem] = useState<OrderItem | null>(null);
  const [bookingDetails, setBookingDetails] = useState<any>({});

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQ = item.quantity + delta;
          return { ...item, quantity: Math.max(1, newQ) };
        }
        return item;
      })
    );
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.totalPrice * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <OrderContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        cartTotal,
        cartCount,
        currentView,
        setCurrentView,
        activeItem,
        setActiveItem,
        bookingDetails,
        setBookingDetails,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}
