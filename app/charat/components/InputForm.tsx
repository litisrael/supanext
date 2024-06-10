// app/components/InputForm.tsx
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

import { useState } from "react";

const FormSchema = z.object({
  datesSelected: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    
    })
    .refine((data) => data.from && data.to, {
      message: "Both start and end dates are required",
      // path: ["datesSelected"],
    }),
  asinSelected: z.string().array().min(1, {
    message: "Please select at least one ASIN.",
  }),
  accountType: z.string().min(1, {
    message: "Please select a function type for the chart.",
  }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

interface InputFormProps {
  onFormSubmit: (data: any) => void;
}

export default function InputForm({ onFormSubmit }: InputFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormSchemaType>({
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

  async function onSubmit(data: FormSchemaType) {
    try {
      console.log("data",data);
      console.log("data",typeof data.datesSelected.from);
      
      const { datesSelected, asinSelected, accountType } = data;

      const queryParams = new URLSearchParams({
        asinSelected: asinSelected.join(','),
        
        from: datesSelected.from ? datesSelected.from.toISOString() : '',
        to: datesSelected.to ? datesSelected.to.toISOString() : '',
      });

      const response = await fetch(`/api/querys/${accountType}?${queryParams.toString()}`);
      const responseData = await response.json();
console.log(responseData);


      onFormSubmit(responseData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
   
      <Form {...form}>
        <form
        
        onSubmit={form.handleSubmit(onSubmit)}
        
        >

          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-x-2 sm:space-y-0">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem className="text-center w-[200px] mx-auto">
                    <FormLabel>Account type</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an account type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="grossSalesParent">Gross Sales</SelectItem>
                        <SelectItem value="ordersByParent">Orders</SelectItem>
                        <SelectItem value="cancelledOrders">orders cancelled</SelectItem>
                        <SelectItem value="ranksParents">Rating parents</SelectItem>
                        <SelectItem disabled value="Orders By City">
                          Orders By City
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1 ml-4 mr-4">
              <FormField
                control={form.control}
                name="datesSelected"
                render={({ field }) => (
               
                  <FormItem className="text-center">
                    <FormLabel>Date Range</FormLabel>
                    <FormControl>
                  
                      <DatePickerWithRange
                           //@ts-ignore
                      value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="asinSelected"
                render={({ field }) => (
                  <FormItem className="text-center">
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
            </div>
          </div>
          <Button type="submit" className="w-full mt-11">
            Search Data
          </Button>
        </form>
      </Form>
    </div>
  );
}
