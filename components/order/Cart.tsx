"use client";

import Image from "next/image";
import { useOrder } from "@/context/OrderContext";
import { ArrowLeft, Clock, Trash2, Plus, Minus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { orderService } from "@/services/orderService";
import { useState } from "react";
import { OrderItemData } from "@/types/restaurant";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, setCurrentView, cartTotal, orderInstructions, setOrderInstructions, tableNumber, setTableNumber, setActiveOrder, clearCart, setUnpaidTab } = useOrder();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  let baseTotal = 0;
  let addonsTotal = 0;
  
  cart.forEach(item => {
    let base = item.menuItem.price;
    if (item.selections.size && item.menuItem.sizes) {
      const s = item.menuItem.sizes.find(x => x.label === item.selections.size);
      if (s) base += s.priceAdd;
    }
    baseTotal += base * item.quantity;
    
    if (item.menuItem.addons) {
      item.selections.addons.forEach(aId => {
        const a = item.menuItem.addons?.find(ad => ad.id === aId);
        if (a) addonsTotal += a.price * item.quantity;
      });
    }
  });

  const serviceFee = cartTotal * 0.05;
  const gst = cartTotal * 0.18;
  const total = cartTotal + serviceFee + gst;

  const handlePayAtCounter = async () => {
    if (cart.length === 0) return;
    setIsSubmitting(true);
    
    try {
      const orderItems: OrderItemData[] = cart.map(item => {
        const cleanSelections: any = { addons: item.selections.addons || [] };
        if (item.selections.size) cleanSelections.size = item.selections.size;
        if (item.selections.milkType) cleanSelections.milkType = item.selections.milkType;
        if (item.selections.sugarLevel) cleanSelections.sugarLevel = item.selections.sugarLevel;

        return {
          menuItemId: item.menuItem.id || "unknown",
          name: item.menuItem.name,
          quantity: item.quantity,
          price: item.menuItem.price,
          selections: cleanSelections
        };
      });

      const orderDocId = await orderService.createOrder({
        customerName: "Guest",
        tableNumber: tableNumber || "Takeaway",
        items: orderItems,
        subtotal: cartTotal,
        tax: gst + serviceFee,
        total: total,
        status: "Pending",
        paymentStatus: "Pending",
        paymentMethod: "Pay at Counter",
        notes: orderInstructions || "",
      });

      setUnpaidTab((prev: any) => {
        if (!prev) return { items: [...cart], total: total };
        return {
          items: [...prev.items, ...cart],
          total: prev.total + total
        };
      });

      clearCart();
      setOrderInstructions("");
      setTableNumber("");
      router.push(`/order/${orderDocId}`);
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-paper pb-40 md:pb-40 pt-[80px]">
      {/* Header */}
      <div className="sticky top-[80px] z-20 bg-paper border-b border-ink/5">
        <div className="flex items-center justify-center px-6 py-4 relative">
          <button onClick={() => setCurrentView("menu")} className="absolute left-6 p-2 -ml-2 text-primary">
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
        <div className="bg-sand rounded-xl p-3 flex justify-center items-center gap-2 text-primary font-medium text-[13px] mb-6">
          <Clock className="w-4 h-4" />
          <span>Ready in 10-15 mins</span>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center">
            <p className="text-ink/50 mb-6">Your cart is empty.</p>
            <button 
              onClick={() => setCurrentView("menu")}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              <Plus className="w-5 h-5" /> Add Item
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-sand p-4 rounded-2xl flex gap-4 relative">
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="absolute top-4 right-4 text-ink/40 hover:text-red-500 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
                <div className="relative w-[70px] h-[70px] shrink-0 rounded-xl overflow-hidden bg-sand/50">
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
                    <span className="font-bold text-primary text-[16px]">₹{item.totalPrice}</span>
                    
                    <div className="flex items-center justify-between bg-sand rounded-full h-8 px-1 w-[90px] border border-ink/5 shadow-sm">
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
              className="flex items-center gap-2 text-primary font-medium text-[14px] py-2"
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
              <div className="flex gap-4">
                <div className="w-1/3">
                  <label className="block text-[13px] font-medium text-ink mb-2">Table #</label>
                  <input 
                    type="text" 
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="e.g. 12" 
                    className="w-full bg-sand rounded-xl px-4 py-3.5 text-[14px] text-ink placeholder:text-ink/40 outline-none border border-transparent focus:ring-1 focus:ring-primary/30"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[13px] font-medium text-ink mb-2">Special Instructions</label>
                  <textarea 
                    value={orderInstructions}
                    onChange={(e) => setOrderInstructions(e.target.value)}
                    placeholder="Any special requests?"
                    className="w-full bg-sand rounded-xl p-3.5 text-[14px] text-ink placeholder:text-ink/40 resize-none outline-none focus:ring-1 focus:ring-primary/30 border border-transparent"
                    rows={1}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Promo Code" 
                  className="flex-1 bg-sand rounded-xl px-4 py-3.5 text-[14px] text-ink placeholder:text-ink/40 outline-none border border-transparent focus:ring-1 focus:ring-primary/30"
                />
                <button className="bg-sand hover:opacity-80 transition px-6 rounded-xl text-[14px] font-medium text-ink">
                  Apply
                </button>
              </div>
            </div>

            <div className="mt-8 bg-sand rounded-2xl p-5 mb-8">
              <h3 className="font-medium text-[16px] text-ink mb-4">Order Summary</h3>
              <div className="space-y-3 text-[14px]">
                <div className="flex justify-between text-ink/80">
                  <span>Subtotal</span>
                  <span>₹{baseTotal.toFixed(0)}</span>
                </div>
                {addonsTotal > 0 && (
                  <div className="flex justify-between text-ink/80">
                    <span>Add-ons</span>
                    <span>₹{addonsTotal.toFixed(0)}</span>
                  </div>
                )}
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
                  <span className="text-primary">₹{total.toFixed(0)}</span>
                </div>
              </div>
            </div>
          </>
        )}
              {/* Desktop Checkout Buttons (Inline) */}
              <div className="hidden md:flex flex-col gap-3 mt-6">
                <button 
                  onClick={() => cart.length > 0 ? setCurrentView("checkout") : undefined}
                  disabled={cart.length === 0}
                  className={`w-full py-4 rounded-full font-medium text-[15px] flex items-center justify-between px-6 transition-colors ${
                    cart.length > 0 
                      ? "bg-primary hover:bg-primary/80 text-white shadow-lg" 
                      : "bg-ink/10 text-ink/40 cursor-not-allowed shadow-none"
                  }`}
                >
                  <span>{cart.length > 0 ? "Pay Online" : "Cart is Empty"}</span>
                  <span>₹{cart.length > 0 ? total.toFixed(0) : "0"}</span>
                </button>
                <button 
                  onClick={handlePayAtCounter}
                  disabled={cart.length === 0 || isSubmitting}
                  className={`w-full py-4 rounded-full font-medium text-[15px] transition-colors flex items-center justify-center gap-2 ${
                    cart.length > 0 && !isSubmitting
                      ? "bg-transparent border border-ink/20 hover:bg-ink/5 text-ink" 
                      : "bg-transparent border border-ink/10 text-ink/30 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {cart.length > 0 ? (isSubmitting ? "Processing..." : "Pay at Counter") : "Add items to order"}
                </button>
              </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Fixed Action Bar */}
      <div className="md:hidden fixed bottom-[100px] left-0 right-0 bg-paper p-4 pb-safe border-t border-ink/5 z-50">
        <div className="max-w-md mx-auto flex flex-col gap-3">
          <button 
            onClick={() => cart.length > 0 ? setCurrentView("checkout") : undefined}
            disabled={cart.length === 0}
            className={`w-full transition-colors py-3.5 rounded-full font-medium text-[15px] flex items-center justify-between px-6 ${
              cart.length > 0 
                ? "bg-primary hover:bg-primary/80 text-white shadow-lg" 
                : "bg-ink/10 text-ink/40 cursor-not-allowed"
            }`}
          >
            <span>{cart.length > 0 ? "Pay Online" : "Cart is Empty"}</span>
            <span>₹{cart.length > 0 ? total.toFixed(0) : "0"}</span>
          </button>
          <button 
            onClick={handlePayAtCounter}
            disabled={cart.length === 0 || isSubmitting}
            className={`w-full py-3.5 rounded-full font-medium text-[15px] transition-colors flex items-center justify-center gap-2 ${
              cart.length > 0 && !isSubmitting
                ? "bg-transparent border border-ink/20 hover:bg-ink/5 text-ink" 
                : "bg-transparent border border-ink/10 text-ink/30 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {cart.length > 0 ? (isSubmitting ? "Processing..." : "Pay at Counter") : "Add items to order"}
          </button>
        </div>
      </div>
    </div>
  );
}
