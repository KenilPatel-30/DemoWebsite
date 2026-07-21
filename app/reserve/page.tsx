"use client";

import { useState } from "react";
import { Check, CalendarDays, Users, Armchair, Navigation, ArrowLeft, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SITE } from "@/lib/site";

export default function ReservePage() {
  const [step, setStep] = useState<"book" | "confirm">("book");
  
  const [partySize, setPartySize] = useState("2");
  const [date, setDate] = useState("13");
  const [time, setTime] = useState("10:30 AM");
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
                <span className="text-[16px] font-medium text-ink">October {date}, 2026, {time}</span>
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
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-[16px] font-medium text-ink">Date</h2>
            <span className="text-[13px] text-[#9A5015] font-medium">October 2026</span>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 snap-x -mx-6 px-6 md:mx-0 md:px-0">
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
                className={`w-[70px] h-[90px] shrink-0 snap-start rounded-2xl flex flex-col items-center justify-center gap-2 transition-colors ${
                  date === d.date 
                    ? "bg-[#9A5015] text-white shadow-md" 
                    : "bg-[#f2e6db] text-ink hover:bg-[#ebdccc]"
                }`}
              >
                <span className="text-[13px] font-medium opacity-80">{d.day}</span>
                <span className="text-[22px] font-bold">{d.date}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time */}
        <div className="mb-10">
          <h2 className="text-[16px] font-medium text-ink mb-4">Time</h2>
          <div className="grid grid-cols-2 min-[400px]:grid-cols-3 sm:grid-cols-4 gap-3">
            {["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM"].map((t, i) => (
              <button 
                key={t}
                onClick={() => setTime(t)}
                disabled={i === 5}
                className={`py-3 rounded-full text-[14px] font-medium transition-colors ${
                  time === t 
                    ? "bg-[#9A5015] text-white shadow-md" 
                    : i === 5 
                      ? "bg-[#f2e6db]/50 text-ink/30 line-through cursor-not-allowed"
                      : "bg-[#f2e6db] text-ink hover:bg-[#ebdccc]"
                }`}
              >
                {t}
              </button>
            ))}
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
