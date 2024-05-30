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

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

const FormSchema = z
  .object({
    datesSelected: z.object({
      from: z.date(), // Permitir que las fechas sean nulas
      to: z.date(),
    }),

    asinSelected: z.string().array().min(1, {
      message: "Please select at least one ASIN.",
    }),
    accountType: z.string().min(1, {
      message: "Please select a function type for the chart.",
    }),
  })
  .refine((data) => {
    // Verificar si alguna de las fechas está indefinida
    const { from, to } = data.datesSelected;
    if (!from || !to) {
      throw new Error("Please select both 'from' and 'to' dates.");
    }
    return true; // Devolver true si la validación pasa
  });

export default function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      datesSelected: {
        from: undefined,
        to: undefined,
      },
      asinSelected: [],
      accountType: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(!form.formState.isValid);
    console.log(data);

    toast({
      title: "You submitted the following values:",
      description: JSON.stringify(data),
    });
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className=" flex flex-col sm:flex-row justify-center space-y-4 sm:space-x-2 sm:space-y-0">

           

            <div className="flex-1 ">
              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => {
                  return (
                    <FormItem  className="text-center w-[200px]  mx-auto">
                      <FormLabel>Account type</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an account type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent >
                          <SelectItem value="Sales">Sales</SelectItem>
                          <SelectItem value="Orders">Orders</SelectItem>
                          <SelectItem value="raitng parents">
                            raitng parents
                          </SelectItem>
                          <SelectItem disabled value="Orders By City">
                            Orders By City
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="flex-1 ml-4 mr-4">
              <FormField
                control={form.control}
                name="datesSelected"
                render={({ field }) => (
                  <FormItem  className="text-center">
                    <FormLabel>Date Range</FormLabel>
                    <FormControl>
                      <DatePickerWithRange
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1 ">
              <FormField
                control={form.control}
                name="asinSelected"
                render={({ field }) => (
                  <FormItem  className="text-center ">
                    <FormLabel >Select ASIN</FormLabel>
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
            </div>
          </div>
          <Button
            type="submit"
            className="w-full mt-11 "
            // disabled={!form.formState.isValid}
          >
            Search Data
          </Button>
        </form>
      </Form>
    </div>
  );
}
