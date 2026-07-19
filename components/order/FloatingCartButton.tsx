"use client";

import { useOrder } from "@/context/OrderContext";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export default function FloatingCartButton() {
  const { cartCount, cartTotal, setCurrentView } = useOrder();

  if (cartCount === 0) return null;

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      className="fixed bottom-[90px] left-0 right-0 z-30 px-6 flex justify-center pointer-events-none md:left-auto md:w-[360px] md:bottom-6 md:right-6 md:px-0"
    >
      <div className="w-full max-w-md bg-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-2 pr-4 flex items-center justify-between pointer-events-auto border border-ink/5">
        <div className="flex items-center gap-3 pl-2">
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-ink/80" />
            <span className="absolute -top-1 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white">
              {cartCount}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-medium leading-none text-ink">View Cart</span>
            <span className="text-[11px] text-ink/50 mt-0.5">₹{cartTotal}</span>
          </div>
        </div>
        <button
          onClick={() => setCurrentView("cart")}
          className="bg-[#9A5015] hover:bg-[#804210] transition-colors text-white text-[13px] font-medium px-5 py-2.5 rounded-full shadow-md"
        >
          Checkout
        </button>
      </div>
    </motion.div>
  );
}
