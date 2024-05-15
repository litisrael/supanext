"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { DatePickerWithRange } from "@/components/ui/datePickerRangeModifica";
import { MenuCheckbox } from "@/components/ui/comboboxDemo";
import { useEffect, useState } from "react";
import Card, { CardContent, CardProps } from "@/components/Card";
import LineChart from "@/components/LineChart";
import BarGraph from "@/components/BarGraph";
import { useSetState } from "@mantine/hooks";
import {  DateBefore, DateAfter,Matcher } from "react-day-picker"
import { ShoppingCart, Users, CreditCard, Activity } from "lucide-react";
import PageTitle from "@/components/PageTitle";

import { getUser, combineHeadersForChartOrders,combineHeadersForChartState } from "../../utils/dataFunctions";


interface DateRange {
  from?: Date | string;
  to?: Date | string;
}




export interface DataTransformadaItem {
  purchase_date: string;
  sku: string;
  total_quantity: number;

}
// interface TypeSkuYFecha {
//   purchase_date: string;
//   sku: string;
//   total_quantity: number;
// }
export interface SkuColors {
  [sku: string]: string;
}


// type DateObject = {
//   before?: Date;
//   after?: Date;
// };
// interface AccType {
//   [purchase_date: string]: 
//   { [key: string]: any }; // Puedes usar 'any' para los valores si no estás seguro de su tipo
// }

 export type RangeDates = Matcher[] | undefined;
 
 export type VentasXState = {
  ship_state: string;
  sku: string;
  total_quantity: number;
}

const HandelClientsComponents = () => {
  const [ventasXState, setVentasXState] = useState<VentasXState[]>([]);
  const [statecolor, setStatecolor] = useState({});
  const [RangeDates, setRangeDates] = useState<RangeDates>();
  const [selectedDays, SetselectedDays] = useState<DateRange | null>(null);
  const [cantidadpPorSkuYFecha, setCantidadpPorSkuYFecha] = useState<
  DataTransformadaItem[]
  >([]);
  const [dataRenderizar, setDataRenderizar] = useState<
  DataTransformadaItem[]
  >([]);
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const [skuColors, setSkuColors] = useState({});
 const [cardData, setCardData] = useState<CardProps[]>([]);
 const [dataFetched, setDataFetched] = useState<boolean>(false);
 const [isLoading, setIsLoading] = useState<boolean>(true);

  // Función de devolución de llamada para manejar cambios en los valores chequeados
  const handleValueChange = (newValues: string[]) => {
    setCheckedValues(newValues);
  };

  // Función para recibir los datos del hijo
  const receiveSelectedDays = (data: DateRange  | undefined) => {
    SetselectedDays(data ?? null);
  };

  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchDataRangeDates = async () => {
      try {
        const user =await getUser()
       
        if (!user) return;
        // const { data, error } = await supabase.rpc("maxymindates");
        const { data, error } = await supabase.rpc(
          "obtener_fechas_disponibles_por_id",
          { id_argumento: user.id }
        );

        if (error) {
          throw new Error("Error al obtener las fechas");
        }

        if (data && data.length > 0) {
          const { fecha_minima, fecha_maxima } = data[0];
          setRangeDates([
            { before: new Date(fecha_minima) },
            { after: new Date(fecha_maxima) },
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
        const user = await getUser()
        if (!user) return;
        if (
          selectedDays !== null &&
          selectedDays.from !== null &&
          selectedDays.to !== null
        ) {
          const { data :dataVentasXdia , error :VentasXdia } = await supabase.rpc(
            "obtener_cantidad_ventas_por_dia",
            {
              id_usuario: user.id,
              from_date: selectedDays.from,
              to_date: selectedDays.to,
            }
          );

          if (VentasXdia) {
            throw new Error(VentasXdia.message);
          }

          const { data :dataVentasXState , error :VentasXState } = await supabase.rpc(
            "obtener_cantidad_ventas_state",
            {
              id_usuario: user.id,
              from_date: selectedDays.from,
              to_date: selectedDays.to,
            }
          );

          if (VentasXState) {
            throw new Error(VentasXState.message);
          }

          setVentasXState(dataVentasXState)
          setCantidadpPorSkuYFecha(dataVentasXdia)
          setDataFetched(true);
          setIsLoading(false)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataCharat();
  }, [selectedDays]); // Agrega selectedDays como una dependencia del efecto


  useEffect(() => {
    if (dataFetched) {
      const { dataRenderizar: newDataRenderizar, skuColors: newSkuColors, totalCantidad }
       = combineHeadersForChartOrders(cantidadpPorSkuYFecha, checkedValues);


       setDataRenderizar(newDataRenderizar);
       setSkuColors(newSkuColors);
       const promedioCalculado = (totalCantidad / newDataRenderizar.length).toFixed(2);
       const cardDataMap = [
         { amount: totalCantidad, discription: "Sales quantity" },
         { amount: promedioCalculado, discription: "Average sales" }
        ];
        const { salesByState , stateColors }    = combineHeadersForChartState(ventasXState,checkedValues)
    console.log("salesByState",salesByState);
    // @ts-ignore
        setVentasXState(salesByState) 
        setStatecolor(stateColors)
  
      const newCardData = cardDataMap.map(({ amount, discription }) => ({
        label: discription,
        amount: `${amount}`,
        icon: ShoppingCart,
        discription
      }));
  
      setCardData(newCardData);
    }
    
  }, [cantidadpPorSkuYFecha, checkedValues, dataFetched]);


  return (
    <>
     <div className="text-center">

        <PageTitle  title="SALES QUANTITY DATA" />
        <h1>
          {RangeDates && RangeDates.length > 0 ? (
            <>
              <p className="p-4 font-semibold">You can search for data from the calendar</p>
              {RangeDates.map((item, index) => (
                <div key={index}>
                  {typeof item === 'object' && item !== null && !('length' in item) ? (
                    <div className="flex flex-col space-y-1">
                      {('before' in item && item.before) && <p className="text-gray-600">From: <span className="font-medium">{item.before.toDateString()}</span></p>}
                      {('after' in item && item.after) && <p className="text-gray-600">To: <span className="font-medium">{item.after.toDateString()}</span></p>}
                    </div>
                  ) : null}
                </div>
              ))}
            </>
          ) : (
            <span>{isLoading ? "Loading..." : "No data available"}</span>
          )}
        </h1>

     </div>


    
       <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-2 justify-items-center items-center">
        <DatePickerWithRange
          RangeDates={RangeDates}
          sendDataToParent={receiveSelectedDays}
          
        />
        <MenuCheckbox onValueChange={handleValueChange} />
      </section>
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((d, i) => (
          <Card
            key={i}
            amount={d.amount}
            discription={d.discription}
            icon={d.icon}
            label={d.label}
          />
        ))}
      </section>
   
      <CardContent className="text-center">
        <p className="p-4 font-semibold">Sales quantity by SKU</p>
        <LineChart
          cantidadpPorSkuYFecha={dataRenderizar}
          skuColors={skuColors}
        />
      </CardContent>
      
      <CardContent className="text-center">
        <p className="p-4 font-semibold">Sales quantity by State</p>

      <BarGraph  data={ventasXState} dataKey="ship_state" colors={statecolor}  />
      </CardContent>
    </>
  );
};

export default HandelClientsComponents;
