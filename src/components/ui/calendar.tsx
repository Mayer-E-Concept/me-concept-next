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
        months: "relative flex flex-col gap-4",
        month: "w-full",
        month_caption:
          "relative mx-8 mb-2 flex h-9 items-center justify-center",
        caption_label:
          "text-sm font-semibold uppercase tracking-widest text-[#C5895B]",
        nav: "absolute top-0 flex w-full justify-between z-10",
        button_previous: cn(
          "size-9 inline-flex items-center justify-center rounded-lg",
          "text-[rgba(244,242,236,0.45)] hover:text-[#F4F2EC]",
          "hover:bg-white/8 transition-colors focus:outline-none"
        ),
        button_next: cn(
          "size-9 inline-flex items-center justify-center rounded-lg",
          "text-[rgba(244,242,236,0.45)] hover:text-[#F4F2EC]",
          "hover:bg-white/8 transition-colors focus:outline-none"
        ),
        weeks: "mt-1",
        weekdays: "flex",
        weekday:
          "size-9 p-0 flex items-center justify-center text-[10px] font-semibold tracking-wider text-[rgba(244,242,236,0.35)] uppercase",
        week: "flex mt-1",
        day: "group size-9 p-0 text-sm",
        day_button: cn(
          "relative flex size-9 items-center justify-center rounded-lg p-0",
          "text-[rgba(244,242,236,0.75)] text-sm transition-colors",
          "hover:bg-white/10 hover:text-[#F4F2EC]",
          "group-data-[selected]:bg-[#C5895B] group-data-[selected]:text-white group-data-[selected]:font-semibold",
          "group-data-[disabled]:text-[rgba(244,242,236,0.18)] group-data-[disabled]:cursor-not-allowed group-data-[disabled]:line-through",
          "group-data-[outside]:opacity-25",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5895B]/60"
        ),
        today:
          "[&:not([data-selected])>button]:ring-1 [&:not([data-selected])>button]:ring-[#C5895B]/60",
        outside: "opacity-25",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, ...rest }: { orientation?: string }) =>
          orientation === "left" ? (
            <ChevronLeft size={15} strokeWidth={2} {...rest} aria-hidden />
          ) : (
            <ChevronRight size={15} strokeWidth={2} {...rest} aria-hidden />
          ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
