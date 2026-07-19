"use client";

import Image from "next/image";
import { useOrder } from "@/context/OrderContext";
import { ArrowLeft, Clock, Trash2, Plus, Minus } from "lucide-react";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, setCurrentView, cartTotal } = useOrder();

  const serviceFee = cartTotal * 0.05;
  const gst = cartTotal * 0.18;
  const total = cartTotal + serviceFee + gst;

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FCF6F0] pb-40 md:pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[#FCF6F0] pt-safe border-b border-ink/5">
        <div className="flex items-center justify-center px-6 py-4 relative">
          <button onClick={() => setCurrentView("menu")} className="absolute left-6 p-2 -ml-2 text-[#9A5015]">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-[18px] font-medium text-ink">Your Cart</h1>
        </div>
      </div>

      <div className="px-6 mt-6 max-w-7xl mx-auto w-full">
        {/* Desktop Grid Layout Wrapper */}
        <div className="md:grid md:grid-cols-12 md:gap-10 items-start">
          
          {/* Left Column: Items */}
          <div className="md:col-span-7">
        {/* Info Banner */}
        <div className="bg-[#f2e6db] rounded-xl p-3 flex justify-center items-center gap-2 text-[#9A5015] font-medium text-[13px] mb-6">
          <Clock className="w-4 h-4" />
          <span>Ready in 10-15 mins</span>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20 text-ink/50">Your cart is empty.</div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-[#f2e6db] p-4 rounded-2xl flex gap-4 relative">
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="absolute top-4 right-4 text-ink/40 hover:text-red-500 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
                <div className="relative w-[70px] h-[70px] shrink-0 rounded-xl overflow-hidden bg-white/50">
                  <Image src={item.menuItem.image} alt={item.menuItem.name} fill className="object-cover" />
                </div>
                
                <div className="flex flex-col flex-1 py-1">
                  <h3 className="font-medium text-[15px] leading-tight text-ink pr-6 mb-1">{item.menuItem.name}</h3>
                  <p className="text-[12px] text-ink/60 leading-snug mb-3 pr-2">
                    {[
                      item.selections.size,
                      item.selections.milkType,
                      item.selections.sugarLevel,
                      ...item.selections.addons.map(a => item.menuItem.addons?.find(ad => ad.id === a)?.name)
                    ].filter(Boolean).join(", ")}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-bold text-[#9A5015] text-[16px]">₹{item.totalPrice}</span>
                    
                    <div className="flex items-center justify-between bg-white rounded-full h-8 px-1 w-[90px] border border-ink/5 shadow-sm">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 flex items-center justify-center text-ink/60 hover:text-ink"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-medium text-[13px]">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 flex items-center justify-center text-ink/60 hover:text-ink"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <button 
              onClick={() => setCurrentView("menu")}
              className="flex items-center gap-2 text-[#9A5015] font-medium text-[14px] py-2"
            >
              <Plus className="w-4 h-4" /> Add more items
            </button>
          </div>
        )}
          </div>

          {/* Right Column: Summary & Checkout */}
          <div className="md:col-span-5 md:sticky md:top-24">

        {cart.length > 0 && (
          <>
            <div className="mt-8 md:mt-0 space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-ink mb-2">Special Instructions</label>
                <textarea 
                  placeholder="Any special requests?"
                  className="w-full bg-[#f2e6db] rounded-2xl p-4 text-[14px] text-ink placeholder:text-ink/40 resize-none outline-none focus:ring-1 focus:ring-[#9A5015]/30 border border-transparent"
                  rows={2}
                />
              </div>

              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Promo Code" 
                  className="flex-1 bg-[#f2e6db] rounded-xl px-4 py-3.5 text-[14px] text-ink placeholder:text-ink/40 outline-none border border-transparent focus:ring-1 focus:ring-[#9A5015]/30"
                />
                <button className="bg-[#ebdccc] hover:bg-[#e4d0bc] transition px-6 rounded-xl text-[14px] font-medium text-ink">
                  Apply
                </button>
              </div>
            </div>

            <div className="mt-8 bg-[#f2e6db] rounded-2xl p-5 mb-8">
              <h3 className="font-medium text-[16px] text-ink mb-4">Order Summary</h3>
              <div className="space-y-3 text-[14px]">
                <div className="flex justify-between text-ink/80">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-ink/80">
                  <span>Service Fee (5%)</span>
                  <span>₹{serviceFee.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-ink/80 pb-3 border-b border-ink/10">
                  <span>GST (18%)</span>
                  <span>₹{gst.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-[16px] font-bold text-ink pt-1">
                  <span>Total</span>
                  <span className="text-[#9A5015]">₹{total.toFixed(0)}</span>
                </div>
              </div>
            </div>
          </>
        )}
              {/* Desktop Checkout Buttons (Inline) */}
              <div className="hidden md:flex flex-col gap-3 mt-6">
                <button 
                  onClick={() => setCurrentView("checkout")}
                  className="w-full bg-[#9A5015] hover:bg-[#804210] transition-colors text-white py-4 rounded-full font-medium text-[15px] shadow-lg flex items-center justify-between px-6"
                >
                  <span>Pay Online</span>
                  <span>₹{total.toFixed(0)}</span>
                </button>
                <button 
                  onClick={() => setCurrentView("orderConfirmed")}
                  className="w-full bg-transparent border border-ink/20 hover:bg-ink/5 transition-colors text-ink py-4 rounded-full font-medium text-[15px]"
                >
                  Pay at Counter
                </button>
              </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Fixed Action Bar */}
      {cart.length > 0 && (
        <div className="md:hidden fixed bottom-[80px] left-0 right-0 bg-[#FCF6F0] p-4 pb-safe border-t border-ink/5 z-30">
          <div className="max-w-md mx-auto flex flex-col gap-3">
            <button 
              onClick={() => setCurrentView("checkout")}
              className="w-full bg-[#9A5015] hover:bg-[#804210] transition-colors text-white py-3.5 rounded-full font-medium text-[15px] shadow-lg flex items-center justify-between px-6"
            >
              <span>Pay Online</span>
              <span>₹{total.toFixed(0)}</span>
            </button>
            <button 
              onClick={() => setCurrentView("orderConfirmed")}
              className="w-full bg-transparent border border-ink/20 hover:bg-ink/5 transition-colors text-ink py-3.5 rounded-full font-medium text-[15px]"
            >
              Pay at Counter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
