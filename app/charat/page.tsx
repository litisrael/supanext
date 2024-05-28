"use client";
import { ComboboxParents } from "@/components/ui/comboboxParents";
import { DatePickerWithRange } from "@/components/ui/newCalendarRange";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { DateRange, DateBefore, DateAfter, Matcher } from "react-day-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";




const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  dateRange: z
    .object({
      startDate: z.date(),
      endDate: z.date(),
    })
    .refine((data) => data.startDate <= data.endDate, {
      message: "Start date must be before end date",
    }),
});

export default function InputForm() {
  const [selectedDays, SetselectedDays] = useState<DateRange | null>(null);


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      dateRange: {
        startDate: selectedDays?.from,
        endDate: selectedDays?.to,
      },
    },
  });


 
  const receiveSelectedDays = (data: DateRange | undefined) => {
    SetselectedDays(data ?? null);
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    toast({
      title: "You submitted the following values:",
      description: JSON.stringify(data),
    });
  }

  return (
    <>
    <ComboboxParents />
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date Range</FormLabel>
              <FormControl>
                <DatePickerWithRange
              
                  sendDataToParent={receiveSelectedDays}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  {/* <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    
    </>
  );
}
