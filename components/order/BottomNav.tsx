"use client";

import { useOrder } from "@/context/OrderContext";
import { UtensilsCrossed, Receipt, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const { currentView, setCurrentView, cartCount, cartTotal } = useOrder();

  const navItems = [
    { id: "menu", label: "Menu", icon: UtensilsCrossed },
    { id: "orders", label: "Orders", icon: Receipt },
  ] as const;

  return (
    <div className="fixed bottom-6 left-0 right-0 z-[90] px-4 flex justify-center pointer-events-none pb-safe">
      <div className={cn(
        "flex items-center gap-3 transition-all duration-300 w-full",
        cartCount > 0 ? "justify-between max-w-[360px] md:max-w-[400px]" : "justify-center max-w-max"
      )}>
        {/* Main Nav Pill */}
        <div className="flex items-center gap-1 rounded-full bg-[#FCF6F0]/95 backdrop-blur-lg px-1.5 py-1.5 shadow-xl border border-ink/10 pointer-events-auto shrink-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id || (currentView === "menu" && item.id === "menu");
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "menu" || item.id === "orders") {
                    setCurrentView(item.id as any);
                  }
                }}
                className={cn(
                  "flex flex-row items-center gap-1.5 px-4 py-2.5 rounded-full transition-colors",
                  isActive ? "bg-[#9A5015] text-white shadow-sm" : "text-ink/70 hover:text-ink hover:bg-ink/5"
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[13px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Floating Cart Button (Right side) */}
        {cartCount > 0 && (
          <button
            onClick={() => setCurrentView("cart")}
            className="flex items-center justify-center gap-2.5 rounded-full bg-[#9A5015] hover:bg-[#804210] text-white px-5 py-3 shadow-2xl pointer-events-auto transition-transform active:scale-95 flex-1 max-w-[140px]"
          >
            <div className="relative shrink-0">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-white text-[9px] font-bold text-[#9A5015] shadow-sm">
                {cartCount}
              </span>
            </div>
            <div className="font-bold text-[14px] truncate">
               ₹{cartTotal.toFixed(0)}
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
