"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useOrder } from "@/context/OrderContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ChevronDown } from "lucide-react";
import { OrderItem } from "@/lib/orderData";

const generateId = () => Math.random().toString(36).substr(2, 9);

export default function ItemDetailsModal() {
  const { activeItem, setActiveItem, addToCart } = useOrder();
  
  // We keep a local copy of the item so we can still render it while animating out
  const [displayedItem, setDisplayedItem] = useState<OrderItem | null>(null);

  // Local state for selections
  const [size, setSize] = useState("");
  const [milk, setMilk] = useState("");
  const [sugar, setSugar] = useState("");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [showAllergens, setShowAllergens] = useState(false);

  useEffect(() => {
    if (activeItem) {
      // Setup state for new item
      setDisplayedItem(activeItem);
      setSize(activeItem.sizes?.[0]?.label || "");
      setMilk(activeItem.milkTypes?.[0] || "");
      setSugar(activeItem.sugarLevels?.[0] || "");
      setSelectedAddons([]);
      setQuantity(1);
      setShowAllergens(false);
      
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [activeItem]);

  // Calculate dynamic price
  let currentPrice = displayedItem?.price || 0;
  if (displayedItem?.sizes) {
    const s = displayedItem.sizes.find(x => x.label === size);
    if (s) currentPrice += s.priceAdd;
  }
  if (displayedItem?.addons) {
    displayedItem.addons.forEach(a => {
      if (selectedAddons.includes(a.id)) currentPrice += a.price;
    });
  }

  const handleAddToCart = () => {
    if (!displayedItem) return;
    
    addToCart({
      id: generateId(),
      menuItem: displayedItem,
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
    <AnimatePresence>
      {activeItem && displayedItem && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-ink/40 backdrop-blur-sm md:p-4"
          onClick={() => setActiveItem(null)}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md md:max-w-xl h-[90dvh] md:h-[85dvh] bg-[#FCF6F0] rounded-t-3xl md:rounded-3xl flex flex-col overflow-hidden shadow-2xl relative"
          >
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain min-h-0 pb-[100px]">
              {/* Hero Image */}
              <div className="relative w-full h-[240px] md:h-[320px] shrink-0 bg-white">
                <Image src={displayedItem.image} alt={displayedItem.name} fill className="object-cover" />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveItem(null);
                  }}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-ink shadow-sm z-10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="px-6 py-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-[24px] font-medium text-ink leading-tight pr-4">{displayedItem.name}</h2>
                  <span className="text-[18px] font-bold text-[#9A5015]">₹{displayedItem.price}</span>
                </div>
                <p className="text-[14px] text-ink/70 leading-relaxed mb-8">
                  {displayedItem.description}
                </p>

                {/* Options */}
                <div className="space-y-8">
                  {displayedItem.sizes && (
                    <div>
                      <h3 className="font-medium text-[16px] text-ink mb-3">Size</h3>
                      <div className="bg-[#f2e6db] rounded-2xl p-2 space-y-1">
                        {displayedItem.sizes.map((s) => (
                          <div key={s.label} onClick={() => setSize(s.label)} className="flex items-center justify-between p-3 rounded-xl cursor-pointer hover:bg-white/40 transition">
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
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {displayedItem.milkTypes && (
                    <div>
                      <h3 className="font-medium text-[16px] text-ink mb-3">Milk Type</h3>
                      <div className="flex flex-wrap gap-2">
                        {displayedItem.milkTypes.map((m) => (
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

                  {displayedItem.sugarLevels && (
                    <div>
                      <h3 className="font-medium text-[16px] text-ink mb-3">Sugar</h3>
                      <div className="flex flex-wrap gap-2">
                        {displayedItem.sugarLevels.map((s) => (
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

                  {displayedItem.addons && (
                    <div>
                      <h3 className="font-medium text-[16px] text-ink mb-3">Add-ons</h3>
                      <div className="bg-[#f2e6db] rounded-2xl p-2 space-y-1">
                        {displayedItem.addons.map((a) => (
                          <div key={a.id} onClick={() => toggleAddon(a.id)} className="flex items-center justify-between p-3 rounded-xl cursor-pointer hover:bg-white/40 transition">
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-[4px] border-2 flex items-center justify-center ${selectedAddons.includes(a.id) ? 'border-[#9A5015] bg-[#9A5015]' : 'border-ink/20 bg-transparent'}`}>
                                {selectedAddons.includes(a.id) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                              </div>
                              <span className="text-[15px] text-ink">{a.name}</span>
                            </div>
                            <span className="text-[13px] text-ink/50">+₹{a.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-2">
                    <button 
                      onClick={() => setShowAllergens(!showAllergens)}
                      className="w-full flex items-center justify-between bg-[#f2e6db] p-4 rounded-2xl text-[15px] font-medium text-ink"
                    >
                      <span>Allergens & Info</span>
                      <ChevronDown className={`w-5 h-5 text-ink/50 transition-transform ${showAllergens ? 'rotate-180' : ''}`} />
                    </button>
                    {showAllergens && (
                      <div className="bg-[#f2e6db]/50 p-4 rounded-2xl text-[14px] text-ink/80 mt-2">
                        {displayedItem.allergens && displayedItem.allergens.length > 1 ? (
                          <ul className="list-disc pl-5 space-y-1">
                            {displayedItem.allergens.map((allergen, idx) => (
                              <li key={idx}>{allergen}</li>
                            ))}
                          </ul>
                        ) : displayedItem.allergens && displayedItem.allergens.length === 1 ? (
                          <p>{displayedItem.allergens[0]}</p>
                        ) : (
                          <p>No specific allergen information provided.</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
