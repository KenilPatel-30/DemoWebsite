"use client";

import { useOrder } from "@/context/OrderContext";
import { Home, UtensilsCrossed, Calendar, Receipt, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const { currentView, setCurrentView } = useOrder();

  // Make nav persistent across all screens.

  const navItems = [
    { id: "menu", label: "Menu", icon: UtensilsCrossed },
    { id: "orders", label: "Orders", icon: Receipt },
  ] as const;

  return (
    <div className="fixed bottom-6 left-0 right-0 z-40 flex justify-center pointer-events-none pb-safe">
      <div className="flex items-center gap-2 rounded-full bg-[#FCF6F0]/95 backdrop-blur-lg px-2 py-2 shadow-xl border border-ink/10 pointer-events-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id || (currentView === "menu" && item.id === "menu"); // Simplified active state
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === "menu" || item.id === "orders") {
                  setCurrentView(item.id as any);
                }
              }}
              className={cn(
                "flex flex-row items-center gap-2 px-6 py-3 rounded-full transition-colors",
                isActive ? "bg-[#9A5015] text-white" : "text-ink/70 hover:text-ink hover:bg-ink/5"
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[14px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
