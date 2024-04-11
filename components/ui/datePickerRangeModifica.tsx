"use client"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { DateRange, DateBefore, DateAfter } from "react-day-picker"
import { useEffect, useState } from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type DateObject = {
    before?: Date;
    after?: Date;
  };
// const customDateFormatter = (date) => format(date, 'yyyy/MM/dd');

export function DatePickerWithRange({
  className,
  RangeDates,
  sendDataToParent 
}: {
  className?:React.HTMLAttributes<HTMLDivElement>
  RangeDates: DateObject[] | undefined;
  sendDataToParent: (data: DateRange | undefined) => void;
} ) {

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2023, 10, 17),
    // to: new Date(2022, 0, 20),
  })
  
  useEffect(() => {
    let from = null;
    let to = null;

    if (date && date.from) {
        from = format(date.from, "yyyy/MM/dd");
        if ( date.to) {
          // Agregar la hora "23:59" a la fecha date.to
          const toDateWithTime = new Date(date.to);
          toDateWithTime.setHours(23, 59, 0, 0);
          to = format(toDateWithTime, "yyyy/MM/dd HH:mm:ss");
      }
  
    }
    sendDataToParent({  from,  to });

   

    
    //sendDataToParent(date); // Envía los datos al componente padre cuando date cambie
  }, [date]);
 
// console.log(typeof date);

// const customDateFormatter = (date) => format(date, 'yyyy/MM/dd');
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
        
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}

            numberOfMonths={2}
       
            disabled = {RangeDates}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
