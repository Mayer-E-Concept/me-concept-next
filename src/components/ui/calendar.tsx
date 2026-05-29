"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = false, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("w-fit", className)}
      classNames={{
        months: "flex flex-col space-y-4",
        month: "space-y-2",
        caption: "flex justify-center pt-1 relative items-center mb-2",
        caption_label: "text-sm font-semibold uppercase tracking-widest text-[#C5895B]",
        nav: "space-x-1 flex items-center absolute inset-x-0 top-0 justify-between",
        nav_button: cn(
          "size-9 inline-flex items-center justify-center rounded-lg",
          "text-[rgba(244,242,236,0.45)] hover:text-[#F4F2EC]",
          "hover:bg-white/10 transition-colors focus:outline-none bg-transparent border-0 cursor-pointer p-0"
        ),
        nav_button_previous: "left-0",
        nav_button_next: "right-0",
        table: "w-full border-collapse",
        head_row: "flex",
        head_cell:
          "size-9 flex items-center justify-center text-[10px] font-semibold tracking-wider text-[rgba(244,242,236,0.35)] uppercase",
        row: "flex w-full mt-1",
        cell: "size-9 text-center p-0 relative focus-within:relative focus-within:z-20",
        day: cn(
          "size-9 p-0 font-normal rounded-lg",
          "text-[rgba(244,242,236,0.75)] text-sm transition-colors",
          "hover:bg-white/10 hover:text-[#F4F2EC] cursor-pointer",
          "inline-flex items-center justify-center",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5895B]/60"
        ),
        day_selected:
          "bg-[#C5895B] text-white font-semibold hover:bg-[#b37a50] hover:text-white focus:bg-[#C5895B]",
        day_today:
          "ring-1 ring-[#C5895B]/60 text-[#F4F2EC]",
        day_outside: "opacity-25",
        day_disabled:
          "text-[rgba(244,242,236,0.18)] cursor-not-allowed line-through hover:bg-transparent hover:text-[rgba(244,242,236,0.18)]",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft size={15} strokeWidth={2} aria-hidden />,
        IconRight: () => <ChevronRight size={15} strokeWidth={2} aria-hidden />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
