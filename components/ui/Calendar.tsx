"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Calendar({ selectedDate, onSelect }: { selectedDate: string, onSelect: (date: string) => void }) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date(selectedDate);
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const handleSelect = (day: number) => {
    const d = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onSelect(d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }));
  };

  const selectedD = new Date(selectedDate);
  const monthName = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const todayMidnight = new Date();
  todayMidnight.setHours(0, 0, 0, 0);

  return (
    <div className="bg-sand rounded-3xl p-5 sm:p-6 w-full shadow-sm border border-ink/5">
      <div className="flex items-center justify-between mb-6">
        <button onClick={prevMonth} className="p-2 rounded-full hover:bg-black/5 transition-colors text-ink">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-bold text-[16px] text-ink">{monthName}</span>
        <button onClick={nextMonth} className="p-2 rounded-full hover:bg-black/5 transition-colors text-ink">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-4 gap-x-1 text-center">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} className="text-[12px] font-semibold text-ink/40 tracking-wider">
            {d}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const d = i + 1;
          const isSelected = selectedD.getDate() === d && selectedD.getMonth() === currentMonth.getMonth() && selectedD.getFullYear() === currentMonth.getFullYear();
          const isToday = new Date().getDate() === d && new Date().getMonth() === currentMonth.getMonth() && new Date().getFullYear() === currentMonth.getFullYear();
          
          const currentCellDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d);
          const isPast = currentCellDate < todayMidnight;
          
          return (
            <div key={d} className="flex justify-center">
              <button 
                disabled={isPast}
                onClick={() => handleSelect(d)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[14px] font-medium transition-all ${
                  isSelected 
                    ? 'bg-primary text-white shadow-md scale-110' 
                    : isPast 
                      ? 'text-ink/20 cursor-not-allowed'
                      : isToday
                        ? 'text-primary bg-primary/10 hover:bg-primary/20'
                        : 'text-ink hover:bg-black/5'
                }`}
              >
                {d}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
