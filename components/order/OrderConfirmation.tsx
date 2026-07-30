"use client";

import { useOrder } from "@/context/OrderContext";
import { CheckCircle2, Coffee, Upload, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderConfirmation() {
  const { activeOrder, unpaidTab, setCurrentView, clearUnpaidTab, setActiveOrder } = useOrder();
  const [showPaidAnim, setShowPaidAnim] = useState(false);
  const router = useRouter();
  
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

  if (!activeOrder && !unpaidTab) {
    return (
      <div className="flex flex-col w-full min-h-screen bg-paper items-center justify-center">
        <p className="text-ink/60 mb-4">No active order found.</p>
        <button onClick={() => setCurrentView("menu")} className="text-primary font-medium hover:underline">
          Return to Menu
        </button>
      </div>
    );
  }

  const isTab = unpaidTab !== null;
  const displayItems = isTab ? unpaidTab.items : activeOrder?.items;
  const displayTotal = isTab ? unpaidTab.total : activeOrder?.total;
  const orderId = activeOrder?.id || "#AB-2847";

  const handlePaid = () => {
    setShowPaidAnim(true);
    setTimeout(() => {
      clearUnpaidTab();
      setActiveOrder(null);
      setCurrentView("menu");
    }, 2500);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-paper pb-40">
      {/* Fun Success Overlay */}
      {showPaidAnim && (
        <div className="fixed inset-0 z-[100] bg-primary flex flex-col items-center justify-center animate-in fade-in duration-300">
          <div className="text-[80px] mb-6 animate-bounce">💸🎉</div>
          <h2 className="text-3xl font-bold text-white text-center px-6">You're all squared up!</h2>
          <p className="text-white/80 mt-3 text-lg">Thanks for dropping by Demo Cafe. See you next time!</p>
        </div>
      )}

      <div className="flex flex-col items-center pt-[100px] px-6 max-w-xl mx-auto w-full">
      
      {/* Success Icon */}
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15 }}
        className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6"
      >
        <CheckCircle2 className="w-12 h-12 text-primary" />
      </motion.div>

      <h1 className="text-[28px] font-bold text-ink mb-2">
        {isTab ? "Added to your Tab!" : "Order Confirmed!"}
      </h1>
      <p className="text-ink/60 text-[15px] mb-8 text-center max-w-sm">
        {isTab 
          ? "Your craft coffee is being prepared. Pay at the counter when you're ready." 
          : "Your payment was successful and your order is being prepared."}
      </p>

      {/* Order Info Card */}
      <div className="w-full bg-sand rounded-2xl p-6 mb-6">
        <div className="flex justify-between items-start border-b border-ink/10 pb-4 mb-4">
          <div>
            <span className="text-[11px] font-bold text-ink/50 tracking-wider mb-1 block">ORDER NUMBER</span>
            <span className="text-[20px] font-medium text-ink">{orderId}</span>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-bold text-ink/50 tracking-wider mb-1 block">EST. READY</span>
            <span className="text-[20px] font-medium text-primary">2:45 PM</span>
          </div>
        </div>

        <div className="border-b border-ink/10 pb-6 mb-6">
          <span className="text-[11px] font-bold text-ink/50 tracking-wider mb-1 block">TABLE NUMBER</span>
          <span className="text-[20px] font-medium text-ink">B1</span>
        </div>

        <div className="flex flex-col items-center justify-center">
          <span className="text-[13px] font-medium text-ink/70 mb-2">Time remaining</span>
          <div className="flex items-center gap-2 text-[24px] font-bold text-ink">
            <span className="text-green-400">●</span>
            {mins}:{secs}
          </div>
        </div>
      </div>

      {/* Order Summary simple list */}
      <div className="w-full bg-sand rounded-2xl p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-[16px] text-ink">{isTab ? "Running Tab" : "Order Summary"}</h3>
          {isTab && (
             <span className="font-bold text-[18px] text-primary">Total: ₹{displayTotal?.toFixed(0)}</span>
          )}
        </div>
        <div className="space-y-4">
          {displayItems?.map((item: any, i: number) => (
            <div key={`${item.id}-${i}`} className="flex gap-4">
              <div className="w-10 h-10 bg-sand rounded-lg flex items-center justify-center shrink-0 text-primary">
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
        {activeOrder?.instructions && (
          <div className="mt-6 pt-5 border-t border-ink/10">
            <h4 className="font-medium text-[13px] text-ink/70 mb-2 uppercase tracking-wide">Recent Instructions</h4>
            <p className="text-[14px] text-ink font-medium bg-sand p-3 rounded-xl italic">"{activeOrder.instructions}"</p>
          </div>
        )}
      </div>

      {/* Interactive Pay Button for Tab */}
      {isTab && (
        <button 
          onClick={handlePaid}
          className="w-full bg-primary hover:bg-primary/80 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all text-white py-5 rounded-2xl font-bold text-[16px] flex items-center justify-center gap-3 mb-6"
        >
          <Wallet className="w-5 h-5" /> 
          Already paid the bill dude, let me go!
        </button>
      )}

      <button className="w-full bg-transparent border border-ink hover:bg-ink hover:text-paper transition-colors text-ink py-4 rounded-full font-medium text-[15px] flex items-center justify-center gap-2 mb-4">
        <Upload className="w-4 h-4" /> Share with Friends
      </button>

      <button 
        onClick={() => {
          setCurrentView("menu");
        }}
        className="w-full py-4 text-primary font-medium text-[15px] hover:underline"
      >
        Back to Menu
      </button>

      <button 
        onClick={() => {
          router.push("/");
        }}
        className="w-full pb-4 text-ink/50 font-medium text-[13px] hover:underline"
      >
        Return to Main Website
      </button>
      </div>
    </div>
  );
}
