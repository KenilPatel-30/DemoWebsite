"use client";

import { useState } from "react";
import Image from "next/image";
import { useOrder } from "@/context/OrderContext";
import { ORDER_CATEGORIES, ORDER_MENU } from "@/lib/orderData";
import { ArrowLeft, Search, Plus, Minus } from "lucide-react";

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
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[#FCF6F0]/90 backdrop-blur-md pt-safe shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
          <button onClick={() => setCurrentView("home")} className="p-2 -ml-2 text-[#9A5015]">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <input 
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 mx-4 bg-white border border-ink/10 rounded-full px-4 py-2 text-[14px] outline-none shadow-sm focus:border-[#9A5015]/30 focus:ring-1 focus:ring-[#9A5015]/30 transition-all text-ink placeholder:text-ink/40"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto px-6 pb-4 no-scrollbar max-w-7xl mx-auto w-full">
          {ORDER_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full whitespace-nowrap text-[14px] font-medium transition-colors ${
                activeCategory === cat 
                  ? "bg-[#9A5015] text-white shadow-md" 
                  : "bg-[#ebdccc] text-ink hover:bg-[#e4d0bc]"
              }`}
            >
              {cat}
            </button>
          ))}
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
