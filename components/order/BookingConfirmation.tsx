"use client";

import { useOrder } from "@/context/OrderContext";
import { Check, CalendarDays, Users, Armchair, Navigation } from "lucide-react";
import { motion } from "framer-motion";

export default function BookingConfirmation() {
  const { bookingDetails, setCurrentView } = useOrder();

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FCF6F0] items-center pt-16 px-6 pb-24">
      
      {/* Success Icon */}
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15 }}
        className="w-24 h-24 bg-[#c8e6c9] rounded-full flex items-center justify-center mb-6"
      >
        <Check className="w-12 h-12 text-[#2e7d32]" strokeWidth={3} />
      </motion.div>

      <h1 className="text-[28px] font-bold text-ink mb-2">Table Reserved!</h1>
      <p className="text-[15px] text-ink/60 mb-10 text-center">We&apos;re looking forward to hosting you.</p>

      {/* Confirmation Card */}
      <div className="w-full bg-[#f2e6db] rounded-2xl p-6 mb-8">
        <div className="flex justify-between items-center border-b border-ink/10 pb-6 mb-6">
          <span className="text-[11px] font-bold text-ink/50 tracking-wider">CONFIRMATION</span>
          <span className="text-[22px] font-bold text-[#9A5015]">TB-8472</span>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <CalendarDays className="w-5 h-5 text-ink/60 mt-0.5" />
            <div>
              <span className="text-[13px] font-medium text-ink/60 block mb-0.5">Date & Time</span>
              <span className="text-[16px] font-medium text-ink">{bookingDetails?.date || "Tomorrow"}, {bookingDetails?.time || "10:30 AM"}</span>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Users className="w-5 h-5 text-ink/60 mt-0.5" />
            <div>
              <span className="text-[13px] font-medium text-ink/60 block mb-0.5">Party Size</span>
              <span className="text-[16px] font-medium text-ink">{bookingDetails?.partySize || "2"} People</span>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Armchair className="w-5 h-5 text-ink/60 mt-0.5" />
            <div>
              <span className="text-[13px] font-medium text-ink/60 block mb-0.5">Table Type</span>
              <span className="text-[16px] font-medium text-ink">{bookingDetails?.seating || "Window Seat"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full space-y-4 mb-10">
        <button className="w-full bg-[#9A5015] hover:bg-[#804210] transition-colors text-white py-4 rounded-full font-medium text-[15px] shadow-lg flex items-center justify-center gap-2">
          <CalendarDays className="w-4 h-4" /> Add to Calendar
        </button>
        <button className="w-full bg-transparent border border-ink hover:bg-ink hover:text-white transition-colors text-ink py-4 rounded-full font-medium text-[15px] flex items-center justify-center gap-2">
          <Navigation className="w-4 h-4" /> Directions to Cafe
        </button>
      </div>

      <div className="flex flex-col gap-6 w-full items-center">
        <button className="text-[15px] font-medium text-ink hover:underline">
          Modify Booking
        </button>
        <button 
          onClick={() => setCurrentView("home")}
          className="text-[15px] font-medium text-red-600 hover:underline"
        >
          Cancel Reservation
        </button>
      </div>

    </div>
  );
}
