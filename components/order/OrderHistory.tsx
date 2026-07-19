"use client";

import { useOrder } from "@/context/OrderContext";
import { ArrowLeft, Search, Package, Clock, Receipt } from "lucide-react";
import Link from "next/link";

export default function OrderHistory() {
  const { setCurrentView } = useOrder();

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FCF6F0] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[#FCF6F0]/90 backdrop-blur-md pt-safe border-b border-ink/5">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
          <button onClick={() => setCurrentView("home")} className="p-2 -ml-2 text-[#9A5015]">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-[18px] font-medium text-ink">My Orders</h1>
          <div className="w-9" /> {/* Spacer */}
        </div>
      </div>

      <div className="px-6 mt-12 max-w-lg mx-auto w-full flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-[#ebdccc] rounded-full flex items-center justify-center mb-6 text-[#9A5015]">
          <Receipt className="w-10 h-10" />
        </div>
        <h2 className="text-[22px] font-bold text-ink mb-2">No past orders yet</h2>
        <p className="text-[15px] text-ink/60 mb-8">When you place an order, it will appear here so you can easily track or reorder it.</p>
        
        <button 
          onClick={() => setCurrentView("menu")}
          className="bg-[#9A5015] hover:bg-[#804210] transition-colors text-white py-4 px-10 rounded-full font-medium text-[16px] shadow-lg flex items-center justify-center gap-2"
        >
          Start a new order
        </button>
      </div>
    </div>
  );
}
