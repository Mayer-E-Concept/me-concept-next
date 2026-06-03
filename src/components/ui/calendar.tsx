"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const LOCALE_DATA = {
  ro: {
    days: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sâ"],
    months: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
             "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],
    prevLabel: "Luna anterioară",
    nextLabel: "Luna următoare",
  },
  de: {
    days: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    months: ["Januar", "Februar", "März", "April", "Mai", "Juni",
             "Juli", "August", "September", "Oktober", "November", "Dezember"],
    prevLabel: "Vorheriger Monat",
    nextLabel: "Nächster Monat",
  },
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay(); // 0=Sun, 1=Mon...
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

export interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
  className?: string;
  locale?: "ro" | "de";
}

export function Calendar({ selected, onSelect, disabled, className, locale = "ro" }: CalendarProps) {
  const L = LOCALE_DATA[locale];
  const today = new Date();
  const [viewYear, setViewYear] = useState(selected?.getFullYear() ?? today.getFullYear());
  const [viewMonth, setViewMonth] = useState(selected?.getMonth() ?? today.getMonth());

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth); // 0=Sun

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(viewYear, viewMonth, d));
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className={cn("select-none", className)}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <button
          onClick={prevMonth}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "rgba(244,242,236,0.45)", borderRadius: 6, lineHeight: 0 }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#F4F2EC")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(244,242,236,0.45)")}
          aria-label={L.prevLabel}
        >
          <ChevronLeft size={16} strokeWidth={2} />
        </button>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#1A6F7A" }}>
          {L.months[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "rgba(244,242,236,0.45)", borderRadius: 6, lineHeight: 0 }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#F4F2EC")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(244,242,236,0.45)")}
          aria-label={L.nextLabel}
        >
          <ChevronRight size={16} strokeWidth={2} />
        </button>
      </div>

      {/* Day names */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 4 }}>
        {L.days.map((d) => (
          <div key={d} style={{ textAlign: "center", fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", color: "rgba(244,242,236,0.32)", padding: "4px 0", textTransform: "uppercase" }}>
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
        {cells.map((date, idx) => {
          if (!date) return <div key={idx} />;
          const isToday = isSameDay(date, today);
          const isSelected = selected ? isSameDay(date, selected) : false;
          const isDisabled = disabled ? disabled(date) : false;

          return (
            <button
              key={idx}
              onClick={() => !isDisabled && onSelect?.(isSelected ? undefined : date)}
              disabled={isDisabled}
              style={{
                width: "100%",
                aspectRatio: "1",
                border: isToday && !isSelected ? "1px solid rgba(26,111,122,0.55)" : "1px solid transparent",
                borderRadius: 8,
                background: isSelected ? "#1A6F7A" : "transparent",
                color: isDisabled
                  ? "rgba(244,242,236,0.18)"
                  : isSelected
                    ? "#fff"
                    : "rgba(244,242,236,0.75)",
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                fontWeight: isSelected ? 700 : 400,
                cursor: isDisabled ? "not-allowed" : "pointer",
                textDecoration: isDisabled ? "line-through" : "none",
                transition: "background .15s, color .15s",
              }}
              onMouseEnter={(e) => {
                if (!isDisabled && !isSelected) {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.10)";
                  (e.currentTarget as HTMLButtonElement).style.color = "#F4F2EC";
                }
              }}
              onMouseLeave={(e) => {
                if (!isDisabled && !isSelected) {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(244,242,236,0.75)";
                }
              }}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
