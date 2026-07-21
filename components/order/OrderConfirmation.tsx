"use client";

import { useOrder } from "@/context/OrderContext";
import { Check, Clock, Upload, Coffee } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function OrderConfirmation() {
  const { cart, setCurrentView, clearCart } = useOrder();
  
  // A simple countdown timer for visual effect
  const [timeLeft, setTimeLeft] = useState(600); // 10 mins

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const secs = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FCF6F0] pb-24">
      <div className="flex flex-col items-center pt-16 px-6 max-w-xl mx-auto w-full">
      
      {/* Success Icon */}
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15 }}
        className="w-24 h-24 bg-[#c8e6c9] rounded-full flex items-center justify-center mb-6"
      >
        <Check className="w-12 h-12 text-[#2e7d32]" strokeWidth={3} />
      </motion.div>

      <h1 className="text-[28px] font-bold text-ink mb-2">Order Confirmed!</h1>
      <p className="text-[15px] text-ink/60 mb-10 text-center">Your craft coffee is being prepared.</p>

      {/* Order Info Card */}
      <div className="w-full bg-[#f2e6db] rounded-2xl p-6 mb-6">
        <div className="flex justify-between items-start border-b border-ink/10 pb-4 mb-4">
          <div>
            <span className="text-[11px] font-bold text-ink/50 tracking-wider mb-1 block">ORDER NUMBER</span>
            <span className="text-[20px] font-medium text-ink">#AB-2847</span>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-bold text-ink/50 tracking-wider mb-1 block">EST. READY</span>
            <span className="text-[20px] font-medium text-[#9A5015]">2:45 PM</span>
          </div>
        </div>

        <div className="border-b border-ink/10 pb-6 mb-6">
          <span className="text-[11px] font-bold text-ink/50 tracking-wider mb-1 block">TABLE NUMBER</span>
          <span className="text-[20px] font-medium text-ink">B1</span>
        </div>

        <div className="flex flex-col items-center justify-center">
          <span className="text-[13px] font-medium text-ink/70 mb-2">Time remaining</span>
          <div className="flex items-center gap-2 text-[24px] font-bold text-ink">
            <Clock className="w-6 h-6 text-[#2e7d32]" />
            {mins}:{secs}
          </div>
        </div>
      </div>

      {/* Order Summary simple list */}
      <div className="w-full bg-[#f2e6db] rounded-2xl p-6 mb-8">
        <h3 className="font-medium text-[16px] text-ink mb-4">Order Summary</h3>
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="w-10 h-10 bg-[#ebdccc] rounded-lg flex items-center justify-center shrink-0 text-[#9A5015]">
                <Coffee className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-[14px] text-ink leading-tight">{item.menuItem.name}</h4>
                <p className="text-[12px] text-ink/50 leading-snug mt-1">
                  {[item.selections.size, item.selections.milkType].filter(Boolean).join(", ")}
                </p>
              </div>
              <span className="font-bold text-[14px] text-ink">₹{item.totalPrice * item.quantity}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full bg-transparent border border-ink hover:bg-ink hover:text-white transition-colors text-ink py-4 rounded-full font-medium text-[15px] flex items-center justify-center gap-2 mb-4">
        <Upload className="w-4 h-4" /> Share with Friends
      </button>

      <button 
        onClick={() => {
          clearCart();
          setCurrentView("menu");
        }}
        className="w-full py-4 text-[#9A5015] font-medium text-[15px] hover:underline"
      >
        Back to Menu
      </button>

      <button 
        onClick={() => {
          clearCart();
          window.location.href = "/";
        }}
        className="w-full pb-4 text-ink/50 font-medium text-[13px] hover:underline"
      >
        Return to Main Website
      </button>
      </div>
    </div>
  );
}
