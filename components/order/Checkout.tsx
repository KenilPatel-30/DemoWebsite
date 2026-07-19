"use client";

import { useState } from "react";
import { useOrder } from "@/context/OrderContext";
import { ArrowLeft, ShoppingCart, Clock, ChevronUp, Lock, CheckCircle2 } from "lucide-react";

export default function Checkout() {
  const { cart, cartTotal, setCurrentView } = useOrder();
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const serviceFee = cartTotal * 0.05;
  const gst = cartTotal * 0.18;
  const total = cartTotal + serviceFee + gst;

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FCF6F0] pb-40 md:pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[#FCF6F0] pt-safe border-b border-ink/5">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
          <button onClick={() => setCurrentView("cart")} className="p-2 -ml-2 text-[#9A5015]">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-[18px] font-medium text-ink">Demo Cafe</h1>
          <button onClick={() => setCurrentView("cart")} className="p-2 -mr-2 text-ink">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="px-6 mt-6 max-w-7xl mx-auto w-full">
        {/* Desktop Grid Layout Wrapper */}
        <div className="md:grid md:grid-cols-12 md:gap-10 items-start">
          
          {/* Left Column: Fulfillment & Order Summary */}
          <div className="md:col-span-6">

        <div className="flex justify-center items-center gap-2 text-ink/60 font-medium text-[13px] mb-8">
          <Clock className="w-4 h-4" />
          <span>Ready in 10-15 mins</span>
        </div>

        {/* Order Summary Dropdown (Expanded by default for design match) */}
        <div className="bg-[#f2e6db] rounded-2xl p-5 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-[16px] text-ink">Order Summary</h3>
            <div className="flex items-center gap-2 text-ink font-bold text-[16px]">
              ₹{total.toFixed(0)}
              <ChevronUp className="w-4 h-4 text-ink/50" />
            </div>
          </div>
          <div className="space-y-3 text-[14px] text-ink/80">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between">
                <span className="truncate pr-4">{item.quantity}x {item.menuItem.name}</span>
                <span>₹{item.totalPrice * item.quantity}</span>
              </div>
            ))}
            <div className="flex justify-between pt-3 border-t border-ink/10">
              <span>Taxes & Fees</span>
              <span>₹{(serviceFee + gst).toFixed(0)}</span>
            </div>
          </div>
        </div>
        </div>

        {/* Right Column: Payment Methods & Actions */}
        <div className="md:col-span-6 mt-8 md:mt-0">
          {/* Payment Methods */}
        <h2 className="text-[18px] font-medium text-ink mb-4">Payment Method</h2>
        <div className="space-y-3">
          {[
            { id: "UPI", title: "UPI", desc: "Google Pay, PhonePe, Paytm", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg> },
            { id: "Card", title: "Credit / Debit Card", desc: "", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg> },
            { id: "Wallet", title: "Wallet", desc: "₹200 available", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path></svg> },
            { id: "Cash", title: "Cash on Pickup", desc: "", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01M18 12h.01"></path></svg> }
          ].map(opt => (
            <div 
              key={opt.id}
              onClick={() => setPaymentMethod(opt.id)}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition ${
                paymentMethod === opt.id 
                  ? "border-[#9A5015] bg-[#9A5015]/5" 
                  : "border-transparent bg-white hover:border-[#9A5015]/30"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#FCF6F0] flex items-center justify-center text-[#9A5015]">
                {opt.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-[15px] text-ink leading-tight">{opt.title}</h4>
                {opt.desc && <p className={`text-[12px] mt-0.5 ${opt.id === "Wallet" ? "text-green-600 font-medium" : "text-ink/50"}`}>{opt.desc}</p>}
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === opt.id ? 'border-[#9A5015]' : 'border-ink/20'}`}>
                {paymentMethod === opt.id && <div className="w-2.5 h-2.5 bg-[#9A5015] rounded-full" />}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Inline Action Bar */}
        <div className="hidden md:block mt-8">
          <button 
            onClick={() => setCurrentView("orderConfirmed")}
            className="w-full bg-[#9A5015] hover:bg-[#804210] transition-colors text-white py-4 rounded-2xl font-medium text-[16px] shadow-lg flex items-center justify-between px-6 mb-3"
          >
            <span>₹{total.toFixed(0)}</span>
            <span>Place Order</span>
          </button>
          
          <div className="flex items-center justify-center gap-6 text-[11px] font-medium text-ink/40">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> Secure Payment
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3" /> 256-bit Encryption
            </div>
          </div>
        </div>

          </div>
        </div>
      </div>

      {/* Mobile Bottom Fixed Action Bar */}
      <div className="md:hidden fixed bottom-[80px] left-0 right-0 bg-[#FCF6F0] p-4 pb-safe border-t border-ink/5 z-30">
        <div className="max-w-md mx-auto">
          <button 
            onClick={() => setCurrentView("orderConfirmed")}
            className="w-full bg-[#9A5015] hover:bg-[#804210] transition-colors text-white py-4 rounded-2xl font-medium text-[16px] shadow-lg flex items-center justify-between px-6 mb-3"
          >
            <span>₹{total.toFixed(0)}</span>
            <span>Place Order</span>
          </button>
          
          <div className="flex items-center justify-center gap-6 text-[11px] font-medium text-ink/40">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> Secure Payment
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3" /> 256-bit Encryption
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
