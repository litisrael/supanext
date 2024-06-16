import { ComboboxParents } from "@/components/ui/comboboxParents";
import { ComboboxState } from "@/components/ui/comboboxState";

import { DatePickerWithRange } from "@/components/ui/newCalendarRange";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ChildComponent from "./ChildComponent";
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
  selectedState: z.string().array()
  // .min(1, {
  //   message: "Please select at least one State.",
  // })
  // .optional()
  , 
  accountType: z.string().min(1, {
    message: "Please select a function type for the chart.",
  }),
});

type FormSchemaType = z.infer<typeof FormSchema>;



export default function InputForm(

) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormSchemaType | null>(null);
  const [responseData, setResponseData] = useState<any>(null);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      datesSelected: {
        from: undefined,
        to: undefined,
      },
      selectedState:[],
      asinSelected: [],
      accountType: "",
    },
  });

  const accountType = form.watch("accountType")
 
  async function onSubmit(data: FormSchemaType) {
    try {
      
      const { datesSelected, asinSelected, accountType
        , selectedState 
      } = data;

      const queryParams = new URLSearchParams({
        asinSelected: asinSelected.join(','),
        from: datesSelected.from ? datesSelected.from.toISOString() : '',
        to: datesSelected.to ? datesSelected.to.toISOString() : '',
      });
  
      // Agregar selectedState solo si accountType es "state" y selectedState no está vacío
      if (accountType === "state" && selectedState.length > 0) {
        queryParams.append('selectedState', selectedState.join(','));
      }
  
      const response = await fetch(`/api/querys/${accountType}?${queryParams.toString()}`);
      const responseData = await response.json();
      console.log(responseData);
      setFormData(data); // Guardar datos del formulario
      setResponseData(responseData); // Guardar datos de la respuesta
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem className="text-center  mx-auto w-[200px] p-0" >
                    <FormLabel className="block ">Account type</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an account type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="grossSalesParent">Gross Sales</SelectItem>
                        <SelectItem value="ordersByParent">Orders</SelectItem>
                        <SelectItem value="cancelledOrders">Orders Cancelled</SelectItem>
                        <SelectItem value="ranksParents">Rating Parents</SelectItem>
                        <SelectItem value="state">
                          Orders By City
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

          

            <div className="col-span-1">
              <FormField
                control={form.control}
                name="datesSelected"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormLabel
                     className=" block"
                     >Date Range</FormLabel>
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

            <div className="col-span-1 flex flex-row">
              <FormField
                control={form.control}
                name="asinSelected"
                render={({ field }) => (
                  <FormItem className="text-center w-full">
                    <FormLabel className="block">Select ASIN</FormLabel>
                    <FormControl>
                      <ComboboxParents selectedAsinParents={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                {accountType === "state" && (
              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="selectedState"
                  render={({ field }) => (
                    <FormItem className="text-center w-full">
                      <FormLabel className="block">Select city</FormLabel>
                      <FormControl>
                        <ComboboxState selectedState={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            </div>
          </div>
          <Button type="submit" className="w-full mt-11">
            Search Data
          </Button>
        </form>
      </Form>

      {formData && responseData && (
        <div className="w-full mt-8">
          <ChildComponent formData={formData} responseData={responseData} />
        </div>
      )}
    </div>
  );
}