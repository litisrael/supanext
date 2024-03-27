"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { DatePickerWithRange } from "@/components/ui/datePickerRangeModifica";
import { ComboboxDemo } from "@/components/ui/comboboxDemo";
import { useEffect, useState } from "react";
import Card, { CardContent, CardProps } from "@/components/Card";
import BarChart from "@/components/BarChart";
// Definición del tipo para un rango de fechas
type DateRange = {
    startDate?: Date;
    endDate?: Date;
  };
  
type DateObject = {
    before?: Date;
    after?: Date;
  };
  
  // Definición del tipo para un array de objetos DateObject
  type RangeDates = DateObject[];

  const HandelClientsComponents = () => {


    const [RangeDates, setRangeDates] = useState<RangeDates>();
    const [selectedDays, SetselectedDays] = useState<DateRange | null>(null);
// console.log("RangeDates",RangeDates);
// console.log("selectedDays",selectedDays);


    // Función para recibir los datos del hijo
    const receiveSelectedDays = (data: DateRange | undefined) => {
        SetselectedDays(data ?? null);
    };
  

  const supabase = createClientComponentClient();
  useEffect(() => {
    const fetchDataRangeDates = async () => {
      try {
        const { data, error } = await supabase.rpc("maxymindates");
        if (error) {
          throw new Error("Error al obtener las fechas");
        }
        if (data && data.length > 0) {
          const { mindate, maxdate } = data[0];

          setRangeDates([
            { before: new Date(mindate) },
            { after: new Date(maxdate) },
          ]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataRangeDates();
  }, []);


  useEffect(() => {
    const fetchDataCharat = async () => {
        try {
            if (selectedDays.from !== null && selectedDays.to !== null) {
                const { data, error } = await supabase
                    .from('spapi_allOrders')
                    .select('purchase_date, item_price')
                    .gte('purchase_date', selectedDays.from) // Utiliza el nombre de tu columna de fecha y ajusta el operador según tus necesidades
                    .lte('purchase_date', selectedDays.to);

                if (error) {
                    throw new Error(error.message);
                }

                console.log("Data:", data);
                // Aquí puedes hacer lo que quieras con los datos, como enviarlos al componente padre
            } else {
                console.log("selectedDays.from y selectedDays.to deben ser distintos de null");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    fetchDataCharat();
}, [selectedDays]); // Agrega selectedDays como una dependencia del efecto

      
//     }
    //   if (data !== null) {
    //     const groupedData: DateObject[] = data.reduce((result, order) => {
    //       const dateKey = new Date(order.purchase_date).toLocaleDateString();
    //       result[dateKey] = (result[dateKey] || 0) + order.item_price;
    //       return result;
    //     }, {});

        // Convertir el objeto a un array de objetos
        // const dataArray = Object.entries(groupedData).map(([date, total]) => ({
        //   date,
        //   total: parseFloat(total.toFixed(2)),
        // }));
        // dataArray.sort((a, b) => new Date(a.date) - new Date(b.date));

        // setChartData(dataArray);
        // console.log('dataArray', dataArray);
    


  
  return (
    <>
       <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-2">

      <DatePickerWithRange RangeDates={RangeDates}   sendDataToParent={receiveSelectedDays}/>
      <ComboboxDemo />
   </section>
      <CardContent>
          <p className="p-4 font-semibold">Overview</p>

          <BarChart />
        </CardContent>
    
    </>
  );
};

export default HandelClientsComponents;
