"use client";

import { useOrder } from "@/context/OrderContext";
import { Home, UtensilsCrossed, Calendar, Receipt, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const { currentView, setCurrentView } = useOrder();

  // Make nav persistent across all screens.

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "menu", label: "Menu", icon: UtensilsCrossed },
    { id: "orders", label: "Orders", icon: Receipt },
  ] as const;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 pb-safe">
      <div className="mx-auto flex max-w-xl items-center justify-around md:justify-between rounded-t-3xl bg-[#FCF6F0]/90 backdrop-blur-lg px-8 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t border-ink/5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id || (currentView === "menu" && item.id === "menu"); // Simplified active state
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === "home" || item.id === "menu") {
                  setCurrentView(item.id as any);
                }
              }}
              className={cn(
                "flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-full transition-colors",
                isActive ? "bg-[#9A5015] text-white" : "text-ink/60 hover:text-ink"
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
