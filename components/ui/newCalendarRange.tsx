import * as React from "react";
import { addDays, format, endOfDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange, Matcher } from "react-day-picker";


import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useState, useEffect } from "react";

type DateObject = {
  before?: string;
  after?: string;
};

export function DatePickerWithRange({
  className,
  value,
  onChange,
}: {
  className?: React.HTMLAttributes<HTMLDivElement>;
  value: DateRange | undefined ;
  onChange: (value: DateRange | undefined) => void;
}) {


  const [RangeDates, setRangeDates] = useState<Matcher | undefined>(undefined);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });


  // console.log("value", value);
  
  const fetchDatesRange = async () => {
    
    const response = await fetch("/api/querys/fetchDataRangeDates");
    const data = await response.json();
    const reformattedData = data.reduce((acc: DateObject[], date: DateObject) => {
      if (date.before) {
        acc.push({ before: date.before });
      }
      if (date.after) {
        
        acc.push({ after: date.after });
        setDate({ from: undefined, to: new Date(date.after) });
      }
      return acc;
    }, []);
    setRangeDates(reformattedData);
    
  };
 
  useEffect(() => {
    if (value && value.to) {
      const endOfDayValue = endOfDay(new Date(value.to));
      if (value.to.getTime() !== endOfDayValue.getTime()) {
        onChange({ ...value, to: endOfDayValue });
      }
    }
  }, [value, onChange]);


  useEffect(() => {
    fetchDatesRange();
  }, []);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon 
            className="mr-2 h-4 w-4" />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, "LLL dd, y")} -{" "}
                  
                  { format( value.to, "LLL dd, y")}
                </>
              ) : (
                format(value.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.to}
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
            disabled={RangeDates}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
