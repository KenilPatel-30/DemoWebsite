"use client";

import { useState } from "react";
import { useOrder } from "@/context/OrderContext";
import { ArrowLeft, ShoppingCart, CheckCircle } from "lucide-react";

export default function BookTable() {
  const { setCurrentView, setBookingDetails } = useOrder();
  
  const [partySize, setPartySize] = useState("2");
  const [date, setDate] = useState("13");
  const [time, setTime] = useState("10:30 AM");
  const [seating, setSeating] = useState("Window seat");
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleConfirm = () => {
    setBookingDetails({
      partySize,
      date: `October ${date}, 2023`, // hardcoded month for demo purposes as per figma
      time,
      seating,
      name,
      phone,
      email,
    });
    setCurrentView("bookingConfirmed");
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FCF6F0] pb-10">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[#FCF6F0] pt-safe border-b border-ink/5">
        <div className="flex items-center justify-between px-6 py-4">
          <button onClick={() => setCurrentView("home")} className="p-2 -ml-2 text-[#9A5015]">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-[18px] font-medium text-ink">Demo Cafe</h1>
          <button onClick={() => setCurrentView("cart")} className="p-2 -mr-2 text-ink">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="px-6 mt-6">
        <h1 className="text-[26px] font-bold text-ink mb-2">Book a Table</h1>
        <p className="text-[14px] text-ink/60 mb-8">Reserve your spot for an artisanal experience.</p>

        {/* Party Size */}
        <div className="mb-8">
          <h2 className="text-[16px] font-medium text-ink mb-4">Party Size</h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-6 px-6 pb-2">
            {["1", "2", "3", "4", "5", "6", "7+"].map(size => (
              <button 
                key={size}
                onClick={() => setPartySize(size)}
                className={`w-12 h-12 shrink-0 rounded-full font-medium flex items-center justify-center transition-colors ${
                  partySize === size 
                    ? "bg-[#9A5015] text-white shadow-md" 
                    : "bg-[#f2e6db] text-ink hover:bg-[#ebdccc]"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Date */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-[16px] font-medium text-ink">Date</h2>
            <span className="text-[13px] text-[#9A5015] font-medium">October 2026</span>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-6 px-6 pb-2">
            {[
              { day: "Thu", date: "12" },
              { day: "Fri", date: "13" },
              { day: "Sat", date: "14" },
              { day: "Sun", date: "15" },
              { day: "Mon", date: "16" }
            ].map(d => (
              <button 
                key={d.date}
                onClick={() => setDate(d.date)}
                className={`w-[60px] h-[75px] shrink-0 rounded-2xl flex flex-col items-center justify-center gap-1 transition-colors ${
                  date === d.date 
                    ? "bg-[#9A5015] text-white shadow-md" 
                    : "bg-[#f2e6db] text-ink hover:bg-[#ebdccc]"
                }`}
              >
                <span className="text-[12px] font-medium opacity-80">{d.day}</span>
                <span className="text-[20px] font-bold">{d.date}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time */}
        <div className="mb-8">
          <h2 className="text-[16px] font-medium text-ink mb-4">Time</h2>
          <div className="grid grid-cols-3 gap-3">
            {["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM"].map(t => (
              <button 
                key={t}
                onClick={() => setTime(t)}
                className={`py-3 rounded-full text-[13px] font-medium transition-colors ${
                  time === t 
                    ? "bg-[#9A5015] text-white shadow-md" 
                    : "bg-[#f2e6db] text-ink hover:bg-[#ebdccc]"
                }`}
              >
                {t}
              </button>
            ))}
            <button disabled className="py-3 rounded-full text-[13px] font-medium bg-[#f2e6db]/50 text-ink/30 line-through">
              12:30 PM
            </button>
          </div>
        </div>

        {/* Seating Preference */}
        <div className="mb-10">
          <h2 className="text-[16px] font-medium text-ink mb-4">Seating Preference</h2>
          <div className="flex flex-wrap gap-3">
            {["Indoor seating", "Outdoor patio", "Private corner", "Window seat"].map(pref => (
              <button 
                key={pref}
                onClick={() => setSeating(pref)}
                className={`px-5 py-3 rounded-full text-[13px] font-medium transition-colors ${
                  seating === pref 
                    ? "bg-[#9A5015] text-white shadow-md" 
                    : "bg-[#f2e6db] text-ink hover:bg-[#ebdccc]"
                }`}
              >
                {pref}
              </button>
            ))}
          </div>
        </div>

        {/* Guest Details */}
        <div className="bg-[#f2e6db] rounded-2xl p-5 mb-8">
          <h2 className="text-[16px] font-medium text-ink mb-4">Guest Details</h2>
          <div className="space-y-3">
            <input 
              type="text" 
              placeholder="Full Name" 
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-[#FCF6F0] rounded-xl px-4 py-3.5 text-[14px] text-ink placeholder:text-ink/40 outline-none border border-transparent focus:border-[#9A5015]/30"
            />
            <input 
              type="tel" 
              placeholder="Phone Number" 
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full bg-[#FCF6F0] rounded-xl px-4 py-3.5 text-[14px] text-ink placeholder:text-ink/40 outline-none border border-transparent focus:border-[#9A5015]/30"
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#FCF6F0] rounded-xl px-4 py-3.5 text-[14px] text-ink placeholder:text-ink/40 outline-none border border-transparent focus:border-[#9A5015]/30"
            />
          </div>
        </div>

        <p className="text-[12px] text-ink/50 text-center leading-relaxed mb-8 px-4">
          Tables are held for 15 minutes past reservation time. Free cancellation up to 2 hours before.
        </p>

        <button 
          onClick={handleConfirm}
          className="w-full bg-[#9A5015] hover:bg-[#804210] transition-colors text-white py-4 rounded-full font-medium text-[16px] shadow-lg flex items-center justify-center gap-2"
        >
          Confirm Reservation <CheckCircle className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
