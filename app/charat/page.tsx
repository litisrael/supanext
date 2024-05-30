"use client";
import { ComboboxParents } from "@/components/ui/comboboxParents";
import { DatePickerWithRange } from "@/components/ui/newCalendarRange";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";

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
    from: z.date({
      required_error: "Start date is required",
    }),
    to: z.date().refine((date) => !!date, {
      message: "End date is required",
    }),

  }),
 
  asinSelected: z.string().array().min(1,{

      message: "Please select at least one ASIN.",
  }),
  accountType: z.string().optional(),
 
});

export default function InputForm() {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      datesSelected: {
        from: undefined,
        to: undefined,
      },
      asinSelected: [],
      accountType: "",
    },
  });



  // const watchedForm = form.watch();
  // console.log("watchedForm", watchedForm);

 
  function onSubmit(data: z.infer<typeof FormSchema>) {
   console.log(!form.formState.isValid);
   
    !form.formState.isValid
    // toast({
    //   title: "You submitted the following values:",
    //   description: JSON.stringify(data),
    // });
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
            name="accountType"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Account type</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an account type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Orders">Orders</SelectItem>
                      <SelectItem value="raitng parents">raitng parents</SelectItem>
                      <SelectItem disabled value="Orders By City">Orders By City</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="datesSelected"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date Range</FormLabel>
                <FormControl>
                  <DatePickerWithRange
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              
              
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
          <Button type="submit"
            // disabled={!form.formState.isValid}
          
          >Search Data</Button>
        </form>
      </Form>
    </>
  );
}
