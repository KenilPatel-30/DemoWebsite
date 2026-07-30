"use client";

import { useOrder } from "@/context/OrderContext";
import { ArrowLeft, Search, Package, Clock, Receipt } from "lucide-react";
import Link from "next/link";

export default function OrderHistory() {
  const { setCurrentView } = useOrder();

  return (
    <div className="flex flex-col w-full min-h-screen bg-paper pb-24 pt-[80px]">
      {/* Header */}
      <div className="sticky top-[80px] z-20 bg-paper/90 backdrop-blur-md border-b border-ink/5">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
          <button onClick={() => setCurrentView("home")} className="p-2 -ml-2 text-primary">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-[18px] font-medium text-ink">My Orders</h1>
          <div className="w-9" /> {/* Spacer */}
        </div>
      </div>

      <div className="px-6 mt-12 max-w-lg mx-auto w-full flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-sand rounded-full flex items-center justify-center mb-6 text-primary">
          <Receipt className="w-10 h-10" />
        </div>
        <h2 className="text-[22px] font-bold text-ink mb-2">No past orders yet</h2>
        <p className="text-[15px] text-ink/60 mb-8">When you place an order, it will appear here so you can easily track or reorder it.</p>
        
        <button 
          onClick={() => setCurrentView("menu")}
          className="bg-primary hover:bg-primary/80 transition-colors text-white py-4 px-10 rounded-full font-medium text-[16px] shadow-lg flex items-center justify-center gap-2"
        >
          Start a new order
        </button>
      </div>
    </div>
  );
}
