"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useOrder } from "@/context/OrderContext";
import { motion } from "framer-motion";
import { X, Plus, Minus, ChevronDown } from "lucide-react";

const generateId = () => Math.random().toString(36).substr(2, 9);

export default function ItemDetailsModal() {
  const { activeItem, setActiveItem, addToCart } = useOrder();
  
  useEffect(() => {
    if (activeItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeItem]);

  if (!activeItem) return null;

  // Local state for selections
  const [size, setSize] = useState(activeItem.sizes?.[0]?.label || "");
  const [milk, setMilk] = useState(activeItem.milkTypes?.[0] || "");
  const [sugar, setSugar] = useState(activeItem.sugarLevels?.[0] || "");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  // Calculate dynamic price
  let currentPrice = activeItem.price;
  if (activeItem.sizes) {
    const s = activeItem.sizes.find(x => x.label === size);
    if (s) currentPrice += s.priceAdd;
  }
  if (activeItem.addons) {
    activeItem.addons.forEach(a => {
      if (selectedAddons.includes(a.id)) currentPrice += a.price;
    });
  }

  const handleAddToCart = () => {
    addToCart({
      id: generateId(),
      menuItem: activeItem,
      quantity,
      selections: {
        size,
        milkType: milk,
        sugarLevel: sugar,
        addons: selectedAddons,
      },
      specialInstructions: "",
      totalPrice: currentPrice,
    });
    setActiveItem(null);
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setActiveItem(null)}
        className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-50"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center pointer-events-none md:p-4">
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="w-full max-w-md md:max-w-xl h-[90dvh] md:h-auto md:max-h-[85dvh] bg-[#FCF6F0] rounded-t-3xl md:rounded-3xl flex flex-col overflow-hidden shadow-2xl pointer-events-auto relative"
        >
        {/* Hero Image */}
        <div className="relative w-full h-[240px] md:h-[320px] shrink-0 bg-white">
          <Image src={activeItem.image} alt={activeItem.name} fill className="object-cover" />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6 pb-32 no-scrollbar">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-[24px] font-medium text-ink leading-tight pr-4">{activeItem.name}</h2>
            <span className="text-[18px] font-bold text-[#9A5015]">₹{activeItem.price}</span>
          </div>
          <p className="text-[14px] text-ink/70 leading-relaxed mb-8">
            {activeItem.description}
          </p>

          {/* Options */}
          <div className="space-y-8">
            {activeItem.sizes && (
              <div>
                <h3 className="font-medium text-[16px] text-ink mb-3">Size</h3>
                <div className="bg-[#f2e6db] rounded-2xl p-2 space-y-1">
                  {activeItem.sizes.map((s) => (
                    <label key={s.label} className="flex items-center justify-between p-3 rounded-xl cursor-pointer hover:bg-white/40 transition">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${size === s.label ? 'border-[#9A5015]' : 'border-ink/20'}`}>
                          {size === s.label && <div className="w-2.5 h-2.5 bg-[#9A5015] rounded-full" />}
                        </div>
                        <span className="text-[15px] text-ink">{s.label}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[13px] text-ink/50">{s.oz}</span>
                        {s.priceAdd > 0 && <span className="text-[13px] text-ink/50">+₹{s.priceAdd}</span>}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {activeItem.milkTypes && (
              <div>
                <h3 className="font-medium text-[16px] text-ink mb-3">Milk Type</h3>
                <div className="flex flex-wrap gap-2">
                  {activeItem.milkTypes.map((m) => (
                    <button
                      key={m}
                      onClick={() => setMilk(m)}
                      className={`px-5 py-2.5 rounded-full text-[14px] font-medium transition border ${
                        milk === m 
                          ? "bg-[#9A5015] text-white border-[#9A5015]" 
                          : "bg-transparent text-ink border-ink/10 hover:border-ink/30"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeItem.sugarLevels && (
              <div>
                <h3 className="font-medium text-[16px] text-ink mb-3">Sugar</h3>
                <div className="flex flex-wrap gap-2">
                  {activeItem.sugarLevels.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSugar(s)}
                      className={`px-5 py-2.5 rounded-full text-[14px] font-medium transition border ${
                        sugar === s 
                          ? "bg-[#9A5015] text-white border-[#9A5015]" 
                          : "bg-transparent text-ink border-ink/10 hover:border-ink/30"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeItem.addons && (
              <div>
                <h3 className="font-medium text-[16px] text-ink mb-3">Add-ons</h3>
                <div className="bg-[#f2e6db] rounded-2xl p-2 space-y-1">
                  {activeItem.addons.map((a) => (
                    <label key={a.id} className="flex items-center justify-between p-3 rounded-xl cursor-pointer hover:bg-white/40 transition">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-[4px] border-2 flex items-center justify-center ${selectedAddons.includes(a.id) ? 'border-[#9A5015] bg-[#9A5015]' : 'border-ink/20 bg-transparent'}`}>
                          {selectedAddons.includes(a.id) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <span className="text-[15px] text-ink">{a.name}</span>
                      </div>
                      <span className="text-[13px] text-ink/50">+₹{a.price}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <button className="w-full flex items-center justify-between bg-[#f2e6db] p-4 rounded-2xl text-[15px] font-medium text-ink">
              <span>Allergens & Info</span>
              <ChevronDown className="w-5 h-5 text-ink/50" />
            </button>
          </div>
        </div>

          {/* Bottom Fixed Action Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-[#FCF6F0] p-4 pb-safe border-t border-ink/5 flex gap-4 items-center">
          <div className="flex items-center justify-between bg-[#f2e6db] rounded-full h-12 px-2 w-[120px] shrink-0">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 flex items-center justify-center text-ink/60 hover:text-ink transition"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-medium text-[15px]">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-ink/60 hover:text-ink transition"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="flex-1 bg-[#9A5015] hover:bg-[#804210] transition-colors text-white h-12 rounded-full font-medium text-[15px] shadow-lg flex items-center justify-center"
          >
            Add to Cart - ₹{currentPrice * quantity}
          </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
