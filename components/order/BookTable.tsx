"use client";

import { useState, useMemo } from "react";
import { useOrder } from "@/context/OrderContext";
import { ArrowLeft, ShoppingCart, CheckCircle } from "lucide-react";
import { Calendar } from "@/components/ui/Calendar";

export default function BookTable() {
  const { setCurrentView, setBookingDetails } = useOrder();

  const times = useMemo(() => {
    const arr = [];
    let currentHour = 10;
    let currentMinute = 0;
    while (currentHour < 21) {
      const ampm = currentHour >= 12 ? 'PM' : 'AM';
      const displayHour = currentHour > 12 ? currentHour - 12 : currentHour;
      const displayMinute = currentMinute === 0 ? '00' : '30';
      arr.push(`${displayHour}:${displayMinute} ${ampm}`);
      
      currentMinute += 30;
      if (currentMinute >= 60) {
        currentMinute = 0;
        currentHour++;
      }
    }
    return arr;
  }, []);

  const [partySize, setPartySize] = useState("2");
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  });
  const [time, setTime] = useState(times[0]);
  const [seating, setSeating] = useState("Window seat");
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleConfirm = () => {
    setBookingDetails({
      partySize,
      date: selectedDate,
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
          <h2 className="text-[16px] font-medium text-ink mb-4">Date</h2>
          <Calendar selectedDate={selectedDate} onSelect={setSelectedDate} />
        </div>

        {/* Time */}
        <div className="mb-8">
          <h2 className="text-[16px] font-medium text-ink mb-4">Time</h2>
          <div className="relative">
            <select 
              value={time} 
              onChange={e => setTime(e.target.value)}
              className="w-full bg-[#f2e6db] text-[15px] font-medium text-ink rounded-2xl px-5 py-4 appearance-none outline-none focus:ring-1 focus:ring-[#9A5015]/30 cursor-pointer shadow-sm"
            >
              {times.map((t, i) => (
                <option key={t} value={t} disabled={i === 5}>{t}</option>
              ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-ink/50">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
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
