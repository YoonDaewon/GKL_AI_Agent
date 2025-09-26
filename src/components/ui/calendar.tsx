"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      // classNames={{
      //   months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
      //   month: "space-y-4",
      //   caption: "flex justify-center pt-1 relative items-center",
      //   caption_label: "text-sm font-medium",
      //   nav: "space-x-1 flex items-center",
      //   nav_button: cn(
      //     buttonVariants({ variant: "outline" }),
      //     "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
      //   ),
      //   nav_button_previous: "absolute left-1",
      //   nav_button_next: "absolute right-1",
      //   table: "w-full border-collapse space-y-1",
      //   head_row: "flex",
      //   head_cell:
      //     "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
      //   row: "flex w-full mt-2",
      //   cell: cn(
      //     "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
      //     props.mode === "range"
      //       ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
      //       : "[&:has([aria-selected])]:rounded-md",
      //   ),
      //   day: cn(
      //     buttonVariants({ variant: "ghost" }),
      //     "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
      //   ),
      //   day_range_start: "day-range-start",
      //   day_range_end: "day-range-end",
      //   day_selected:
      //     "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
      //   day_today: "bg-accent text-accent-foreground",
      //   day_outside:
      //     "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
      //   day_disabled: "text-muted-foreground opacity-50",
      //   day_range_middle:
      //     "aria-selected:bg-accent aria-selected:text-accent-foreground",
      //   day_hidden: "invisible",
      //   ...classNames,
      // }}
      classNames={{
        months: "relative flex flex-col sm:flex-row gap-4",
        month: "w-full",
        month_caption:
          "relative mx-10 mb-1 flex h-9 items-center justify-center z-20",
        caption_label: "text-sm font-medium",
        nav: "absolute top-0 flex w-full justify-between z-10",
        button_previous: cn(
          buttonVariants({ variant: "ghost" }),
          "size-9 text-muted-foreground/80 hover:text-foreground p-0",
        ),
        button_next: cn(
          buttonVariants({ variant: "ghost" }),
          "size-9 text-muted-foreground/80 hover:text-foreground p-0",
        ),
        weekday: "size-9 p-0 text-xs font-medium text-muted-foreground/80",
        day_button:
          "relative flex size-9 items-center justify-center whitespace-nowrap rounded-md p-0 text-foreground group-[[data-[selected=true]]:not(.range-middle)]:[transition-property:color,background-color,border-radius,box-shadow] group-[[data-selected]:not(.range-middle)]:duration-150 group-data-disabled:pointer-events-none focus-visible:z-10 hover:bg-accent hover:group-data-[disabled=true]:bg-transparent group-data-[selected=true]:bg-primary hover:data-[selected=false]:text-foreground group-data-[selected=true]:text-primary-foreground group-data-[disabled=true]:text-foreground/30 group-data-[disabled=true]:line-through group-data-[outside=true]:text-foreground/30 group-data-[selected=true]:group-data-[outside=true]:text-primary-foreground outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] group-[.range-start:not(.range-end)]:rounded-e-none group-[.range-end:not(.range-start)]:rounded-s-none group-[.range-middle]:rounded-none group-[.range-middle]:group-data-[selected=selected]:bg-accent group-[.range-middle]:group-data-[selected=true]:text-foreground",
        day: "group size-9 px-0 py-px text-sm",
        range_start: "range-start",
        range_end: "range-end",
        range_middle: "range-middle",
        today:
          "*:after:pointer-events-none *:after:absolute *:after:bottom-1 *:after:start-1/2 *:after:z-10 *:after:size-[3px] *:after:-translate-x-1/2 *:after:rounded-full *:after:bg-primary [&[data-selected]:not(.range-middle)>*]:after:bg-background [&[data-disabled]>*]:after:bg-foreground/30 *:after:transition-colors",
        outside:
          "text-muted-foreground data-selected:bg-accent/50 data-selected:text-muted-foreground",
        hidden: "invisible",
        week_number: "size-9 p-0 text-xs font-medium text-muted-foreground/80",
        ...classNames,
      }}
      // components={{
      //   IconLeft: ({ className, ...props }) => (
      //     <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
      //   ),
      //   IconRight: ({ className, ...props }) => (
      //     <ChevronRight className={cn("h-4 w-4", className)} {...props} />
      //   ),
      // }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
