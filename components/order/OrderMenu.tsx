"use client";

import { useState } from "react";
import Image from "next/image";
import { useOrder } from "@/context/OrderContext";
import { ORDER_CATEGORIES, ORDER_MENU } from "@/lib/orderData";
import { IMG } from "@/lib/site";
import { Search, Plus, Minus, CupSoda } from "lucide-react";

const CATEGORY_IMAGES: Record<string, string> = {
  "All": IMG.warmInterior,
  "Coffee": IMG.latte,
  "Starter": IMG.brunchPlate,
  "Main Course": IMG.margherita,
  "Dessert": IMG.dessert,
  "Mocktails": IMG.drinks,
  "Shakes": IMG.matcha,
  "Siders": IMG.pizzaCocktails,
  "Chef's Recommended": IMG.heroNight,
};

const basePath = process.env.NODE_ENV === "production" ? "/DemoWebsite" : "";

export default function OrderMenu() {
  const { setCurrentView, setActiveItem, cart, updateQuantity, addToCart } = useOrder();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMenu = ORDER_MENU.filter(item => {
    const matchesCategory = activeCategory === "All" || true;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full pb-32 bg-[#FCF6F0] min-h-screen">
      {/* Header Banner */}
      <div className="flex flex-col items-center justify-center pt-28 pb-4 w-full">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-ink/5 mb-4">
          <CupSoda className="w-8 h-8 text-[#9A5015]" strokeWidth={2} />
        </div>
        <a href={`${basePath}/`} className="transition-transform hover:scale-105 active:scale-95">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-ink mb-3 text-center">Demo Cafe</h1>
        </a>
        <div className="bg-white border border-ink/5 px-4 py-1.5 rounded-full flex items-center gap-2 text-[12px] font-medium text-ink shadow-sm">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span>Open Now • Prep: 10 mins</span>
        </div>
      </div>

      {/* Header */}
      <div className="sticky top-[80px] z-20 bg-[#FCF6F0]/90 backdrop-blur-md pt-2 pb-2 shadow-sm">
        <div className="flex items-center justify-between px-6 py-2 max-w-7xl mx-auto w-full">
          <input 
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 mx-4 bg-white border border-ink/10 rounded-full px-4 py-2 text-[14px] outline-none shadow-sm focus:border-[#9A5015]/30 focus:ring-1 focus:ring-[#9A5015]/30 transition-all text-ink placeholder:text-ink/40"
          />
        </div>

        {/* Category Marquee */}
        <div 
          className="w-full overflow-hidden pb-4 mt-2" 
          style={{ 
            maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)"
          }}
        >
          <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
            {[...ORDER_CATEGORIES, ...ORDER_CATEGORIES].map((cat, i) => (
              <div 
                key={`${cat}-${i}`}
                onClick={() => setActiveCategory(cat)}
                className="flex flex-col items-center gap-2 cursor-pointer group flex-shrink-0 transition-all hover:scale-[1.02] active:scale-95 w-[90px] md:w-[110px]"
              >
                 <div className={`relative w-full aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden ${activeCategory === cat ? 'ring-4 ring-[#9A5015] ring-offset-2 ring-offset-[#FCF6F0]' : 'ring-1 ring-ink/10 shadow-sm'}`}>
                   <Image src={CATEGORY_IMAGES[cat] || IMG.warmInterior} alt={cat} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                 </div>
                 <span className={`text-[12px] md:text-[14px] font-medium text-center leading-tight ${activeCategory === cat ? 'text-[#9A5015]' : 'text-ink/80'}`}>
                   {cat}
                 </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="px-6 mt-6 max-w-7xl mx-auto w-full">
        <h2 className="text-[20px] md:text-[24px] font-medium text-ink mb-6">{activeCategory === "All" ? "Coffee" : activeCategory}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMenu.map(item => {
            // Check if item is in cart (simple check, assumes no variants for this basic button)
            const cartItem = cart.find(c => c.menuItem.id === item.id);

            return (
              <div 
                key={item.id}
                onClick={() => setActiveItem(item)}
                className="bg-[#f2e6db] p-4 rounded-2xl flex gap-5 cursor-pointer hover:bg-[#ebdccc] transition-colors group"
              >
                <div className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px] shrink-0 rounded-xl overflow-hidden bg-white/50">
                  <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                
                <div className="flex flex-col flex-1 justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-[15px] leading-tight text-ink pr-2">{item.name}</h3>
                      {item.tags?.[0] && (
                        <span className="text-[10px] font-medium text-[#d87c34] bg-white px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm border border-white/50">
                          {item.tags[0] === "Vegan" ? "🌱 Vegan" : `🔥 ${item.tags[0]}`}
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-ink/60 line-clamp-2 leading-snug">{item.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-[#9A5015] text-[16px]">₹{item.price}</span>
                    
                    {/* Add Button */}
                    <button 
                      className={`h-8 rounded-full flex items-center justify-center font-medium text-[13px] transition border ${
                        cartItem 
                          ? "bg-white text-ink border-ink/10 px-1 w-[80px]" 
                          : "bg-transparent text-[#9A5015] border-[#9A5015] px-5 hover:bg-[#9A5015] hover:text-white"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (cartItem) {
                          // if in cart, just go to item details to modify, or we can handle +/- here
                          setActiveItem(item);
                        } else {
                          setActiveItem(item); // Always open modal first to customize
                        }
                      }}
                    >
                      {cartItem ? (
                        <div className="flex items-center justify-between w-full px-2">
                          <Minus className="w-3 h-3 text-ink/50" />
                          <span>{cartItem.quantity}</span>
                          <Plus className="w-3 h-3 text-ink/50" />
                        </div>
                      ) : (
                        "Add"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
