"use client";

import { useState, useMemo } from "react";
import { Check, CalendarDays, Users, Armchair, Navigation, ArrowLeft, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { Calendar } from "@/components/ui/Calendar";

export default function ReservePage() {
  const [step, setStep] = useState<"book" | "confirm">("book");

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
    setStep("confirm");
  };



  if (step === "confirm") {
    return (
      <div className="flex flex-col w-full min-h-screen bg-[#FCF6F0] items-center pt-24 px-6 pb-24 font-sans text-ink">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="w-24 h-24 bg-[#c8e6c9] rounded-full flex items-center justify-center mb-6"
        >
          <Check className="w-12 h-12 text-[#2e7d32]" strokeWidth={3} />
        </motion.div>

        <h1 className="text-[28px] font-bold text-ink mb-2">Table Reserved!</h1>
        <p className="text-[15px] text-ink/60 mb-10 text-center">We're looking forward to hosting you.</p>

        <div className="w-full max-w-lg bg-[#f2e6db] rounded-2xl p-8 mb-8">
          <div className="flex justify-between items-center border-b border-ink/10 pb-6 mb-6">
            <span className="text-[11px] font-bold text-ink/50 tracking-wider">CONFIRMATION</span>
            <span className="text-[22px] font-bold text-[#9A5015]">TB-8472</span>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <CalendarDays className="w-5 h-5 text-ink/60 mt-0.5" />
              <div>
                <span className="text-[13px] font-medium text-ink/60 block mb-0.5">Date & Time</span>
                <span className="text-[16px] font-medium text-ink">{selectedDate} at {time}</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Users className="w-5 h-5 text-ink/60 mt-0.5" />
              <div>
                <span className="text-[13px] font-medium text-ink/60 block mb-0.5">Party Size</span>
                <span className="text-[16px] font-medium text-ink">{partySize} People</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Armchair className="w-5 h-5 text-ink/60 mt-0.5" />
              <div>
                <span className="text-[13px] font-medium text-ink/60 block mb-0.5">Table Type</span>
                <span className="text-[16px] font-medium text-ink">{seating}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-lg flex flex-col sm:flex-row gap-4 mb-10">
          <button className="flex-1 bg-[#9A5015] hover:bg-[#804210] transition-colors text-white py-4 rounded-full font-medium text-[15px] shadow-lg flex items-center justify-center gap-2">
            <CalendarDays className="w-4 h-4" /> Add to Calendar
          </button>
          <a href="https://maps.google.com/?q=Surat" target="_blank" rel="noreferrer" className="flex-1 bg-transparent border border-ink hover:bg-ink hover:text-white transition-colors text-ink py-4 rounded-full font-medium text-[15px] flex items-center justify-center gap-2">
            <Navigation className="w-4 h-4" /> Directions
          </a>
        </div>

        <Link href="/" className="text-[15px] font-medium text-ink hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FCF6F0] font-sans text-ink">
      <div className="sticky top-0 z-20 bg-[#FCF6F0]/90 backdrop-blur-md pt-safe border-b border-ink/5">
        <div className="max-w-3xl mx-auto flex items-center px-6 py-4 relative">
          <Link href="/" className="absolute left-6 p-2 -ml-2 text-ink/60 hover:text-ink">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-[18px] font-medium text-ink mx-auto">{SITE.name}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto w-full px-6 mt-8 pb-20">
        <h1 className="text-[26px] font-bold text-ink mb-2">Book a Table</h1>
        <p className="text-[14px] text-ink/60 mb-10">Reserve your spot for an artisanal experience.</p>

        {/* Party Size */}
        <div className="mb-10">
          <h2 className="text-[16px] font-medium text-ink mb-4">Party Size</h2>
          <div className="flex flex-wrap gap-3">
            {["1", "2", "3", "4", "5", "6", "7+"].map(size => (
              <button 
                key={size}
                onClick={() => setPartySize(size)}
                className={`w-14 h-14 rounded-full font-medium flex items-center justify-center transition-colors ${
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
        <div className="mb-10">
          <h2 className="text-[16px] font-medium text-ink mb-4">Date</h2>
          <Calendar selectedDate={selectedDate} onSelect={setSelectedDate} />
        </div>

        {/* Time */}
        <div className="mb-10">
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
        <div className="mb-12">
          <h2 className="text-[16px] font-medium text-ink mb-4">Seating Preference</h2>
          <div className="flex flex-wrap gap-3">
            {["Indoor seating", "Outdoor patio", "Private corner", "Window seat"].map(pref => (
              <button 
                key={pref}
                onClick={() => setSeating(pref)}
                className={`px-6 py-3 rounded-full text-[14px] font-medium transition-colors ${
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
        <div className="bg-[#f2e6db] rounded-3xl p-6 sm:p-8 mb-8">
          <h2 className="text-[18px] font-medium text-ink mb-6">Guest Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Full Name" 
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-[#FCF6F0] rounded-xl px-5 py-4 text-[15px] text-ink placeholder:text-ink/40 outline-none focus:ring-1 focus:ring-[#9A5015]/30"
            />
            <input 
              type="tel" 
              placeholder="Phone Number" 
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full bg-[#FCF6F0] rounded-xl px-5 py-4 text-[15px] text-ink placeholder:text-ink/40 outline-none focus:ring-1 focus:ring-[#9A5015]/30"
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#FCF6F0] rounded-xl px-5 py-4 text-[15px] text-ink placeholder:text-ink/40 outline-none focus:ring-1 focus:ring-[#9A5015]/30 sm:col-span-2"
            />
          </div>
        </div>

        <p className="text-[13px] text-ink/50 text-center leading-relaxed mb-8">
          Tables are held for 15 minutes past reservation time. Free cancellation up to 2 hours before.
        </p>

        <button 
          onClick={handleConfirm}
          className="w-full bg-[#9A5015] hover:bg-[#804210] transition-colors text-white py-4 sm:py-5 rounded-full font-medium text-[16px] shadow-lg flex items-center justify-center gap-2"
        >
          Confirm Reservation <CheckCircle className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
