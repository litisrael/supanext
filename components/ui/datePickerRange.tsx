"use client"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import {  DateBefore, DateAfter } from "react-day-picker"
import { useEffect, useState } from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface DateRange {
  from: Date;
  to: Date;
}

export interface DatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
  from?: Date;
  to?: Date;
}
export function DatePickerWithRange({
  className,

}: DatePickerWithRangeProps) {
   const [maxymindates, setMaxymindates] = useState<any>();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2023, 10, 17),
    // to: new Date(2022, 0, 20),
  })
  
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.rpc('maxymindates');
        if (error) {
          throw new Error('Error al obtener las fechas');
        }
        if (data && data.length > 0) {
          const { mindate, maxdate } = data[0];
  
          setMaxymindates([
            {before: new Date(mindate)},
            {after: new Date(maxdate)},
          ]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log("bkasbd",maxymindates);
  
// // Define el rango permitido utilizando el tipo DateRange
// const beforeMatcher: DateBefore = { before: new Date(2023, 1, 20) };
// const afterMatcher: DateAfter = { after: new Date(2023, 1, 25) };



 // will match days before the 2nd of February 2019 }

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
      
            disabled = {maxymindates}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
