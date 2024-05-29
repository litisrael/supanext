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
  datesSelected: z.object({
    from: z.date(),
    to: z.date(),
  }),
  // .refine((data) => data.startDate <= data.endDate, {
  //   message: "Start date must be before end date",
  // })
  asinSelected: z.array(z.string()),
  // .refine((asinSelected) => asinSelected.length > 0, {
  //   message: "Please select at least one ASIN.",
  // })
});

export default function InputForm() {
  const [selectedDays, SetselectedDays] = useState<DateRange | null>(null);

  console.log("en", selectedDays);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      datesSelected: {
        from: undefined,
        to: undefined,
      },
      asinSelected: [],
    },
  });

  // useEffect(() => {
  //   const watchedForm = form.watch();
  //   console.log("watchedForm",watchedForm);

  // }, [form])

  const watchedForm = form.watch();
  console.log("watchedForm", watchedForm);

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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
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
            name="datesSelected"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date Range</FormLabel>
                <FormControl>
                  <DatePickerWithRange sendDataToParent={receiveSelectedDays} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="asinSelected"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select ASIN</FormLabel>
                <FormControl>
                  <ComboboxParents
                    selectedAsinParents={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
