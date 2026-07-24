"use client";

import Image from "next/image";
import Link from "next/link";
import { useOrder } from "@/context/OrderContext";
import { ORDER_MENU } from "@/lib/orderData";
import { IMG } from "@/lib/site";
import { BookOpen, Wifi, Calendar, Info, Plus, CupSoda, ArrowLeft, Globe } from "lucide-react";
import { useRouter } from "next/navigation";

const basePath = process.env.NODE_ENV === "production" ? "/DemoWebsite" : "";

export default function OrderHome() {
  const { setCurrentView, setActiveItem } = useOrder();
  const router = useRouter();

  const recommendedItems = ORDER_MENU.filter(m => m.tags?.includes("Top Seller"));

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FCF6F0] pb-32">
      {/* Header Banner */}
      <div className="relative h-[280px] md:h-[400px] w-full bg-coffee">
        <Image 
          src={IMG.heroNight} 
          alt="Cafe Interior" 
          fill 
          className="object-cover opacity-60" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FCF6F0] to-transparent" />
        
        <a href={`${basePath}/`} className="absolute top-6 left-6 z-10 text-white/90 hover:text-white transition-colors bg-black/20 hover:bg-black/40 rounded-full p-2 backdrop-blur-sm flex items-center gap-2 pr-4 shadow-sm border border-white/10">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-[12px] font-medium leading-none">Main Site</span>
        </a>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-3">
            <CupSoda className="w-8 h-8 text-[#9A5015]" strokeWidth={2} />
          </div>
          <a href={`${basePath}/`} className="transition-transform hover:scale-105 active:scale-95">
            <h1 className="text-3xl font-display font-bold text-white mb-2 shadow-sm drop-shadow-md text-center">Demo Cafe</h1>
          </a>
          <div className="bg-[#FCF6F0] px-4 py-1.5 rounded-full flex items-center gap-2 text-[12px] font-medium text-ink shadow-md mb-6">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>Open Now • Prep: 10 mins</span>
          </div>
          
          <button 
            onClick={() => setCurrentView("menu")}
            className="w-[200px] bg-[#d87c34] hover:bg-[#c26b27] text-white py-3.5 rounded-full font-medium shadow-lg flex items-center justify-center gap-2 transition hover:scale-105 active:scale-95"
          >
            <CupSoda className="w-4 h-4" /> Order Ahead
          </button>
        </div>
      </div>

      <div className="mt-16 px-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-[18px] md:text-[22px] font-medium text-ink">Chef's Recommended</h2>
          <button onClick={() => setCurrentView("menu")} className="text-[13px] md:text-[15px] text-[#9A5015] font-medium">See All</button>
        </div>
        
        {/* Horizontal Scroll Menu / Grid on Desktop */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x no-scrollbar md:grid md:grid-cols-3 lg:grid-cols-4 md:overflow-visible md:snap-none -mx-6 px-6 md:mx-0 md:px-0">
          {recommendedItems.map(item => (
            <div 
              key={item.id} 
              className="min-w-[160px] md:min-w-0 bg-[#f2e6db] rounded-2xl p-3 snap-start md:snap-none cursor-pointer hover:bg-[#ebdccc] transition group"
              onClick={() => setActiveItem(item)}
            >
              <div className="relative w-full pt-[75%] rounded-xl overflow-hidden mb-3 transform-gpu" style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}>
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <h3 className="font-medium text-[14px] leading-tight mb-3 text-ink line-clamp-2">{item.name}</h3>
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#9A5015]">₹{item.price}</span>
                <button 
                  className="w-7 h-7 rounded-full bg-[#d87c34] text-white flex items-center justify-center shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveItem(item);
                  }}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Links */}
      <div className="mt-10 px-6 max-w-7xl mx-auto w-full space-y-3 md:space-y-0 md:grid md:grid-cols-2 md:gap-4 mb-20">
        {[
          { label: "View Full Menu", icon: BookOpen, action: () => setCurrentView("menu") },
          { label: "Join Free Wi-Fi", icon: Wifi, action: () => alert("Network: DemoCafe_Guest\nPassword: democafe2026") },
          { label: "Catering & Events", icon: Calendar, action: () => router.push("/reserve") },
          { label: "Our Story", icon: Info, action: () => window.location.href = `${basePath}/#about` },
          { label: "Visit Main Website", icon: Globe, action: () => window.location.href = `${basePath}/` }
        ].map((link, idx) => (
          <button 
            key={idx}
            onClick={link.action}
            className="w-full bg-white rounded-2xl p-4 flex items-center justify-between border border-ink/5 shadow-sm hover:border-[#d87c34]/30 transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#eef5ef] flex items-center justify-center text-green-700">
                <link.icon className="w-5 h-5" />
              </div>
              <span className="font-medium text-[15px]">{link.label}</span>
            </div>
            <span className="text-ink/30 font-light">›</span>
          </button>
        ))}
      </div>
    </div>
  );
}
