"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { DatePickerWithRange } from "@/components/ui/datePickerRangeModifica";
import { MenuCheckbox } from "@/components/ui/comboboxDemo";
import { useEffect, useState } from "react";
import Card, { CardContent, CardProps } from "@/components/Card";
import LineChart from "@/components/LineChart";
import { useSetState } from "@mantine/hooks";
import {  DateBefore, DateAfter,Matcher } from "react-day-picker"
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import PageTitle from "@/components/PageTitle";



interface DateRange {
  from?: Date | string;
  to?: Date | string;
}




export interface DataTransformadaItem {
  purchase_date: string;
  sku: string;
  total_quantity: number;

}
interface TypeSkuYFecha {
  purchase_date: string;
  sku: string;
  total_quantity: number;
}
export interface SkuColors {
  [sku: string]: string;
}


type DateObject = {
  before?: Date;
  after?: Date;
};
interface AccType {
  [purchase_date: string]: 
  { [key: string]: any }; // Puedes usar 'any' para los valores si no estás seguro de su tipo
}

 export type RangeDates = Matcher[] | undefined;


const HandelClientsComponents = () => {
  const [RangeDates, setRangeDates] = useState<RangeDates>();
  const [selectedDays, SetselectedDays] = useState<DateRange | null>(null);
  const [cantidadpPorSkuYFecha, setCantidadpPorSkuYFecha] = useState<
  DataTransformadaItem[]
  >([]);
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const [skuColors, setSkuColors] = useState({});
 const [cardData, setCardData] = useState<CardProps[]>([]);

  // console.log("selectedDays ", selectedDays);
  // console.log("checkedValues ", checkedValues);
  console.log("cantidadpPorSkuYFecha ", cantidadpPorSkuYFecha);

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
        const {
          data: { user },
        } = await supabase.auth.getUser();
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
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;
        if (
          selectedDays !== null &&
          selectedDays.from !== null &&
          selectedDays.to !== null
        ) {
          const { data, error } = await supabase.rpc(
            "obtenercantidadporskuyfecha",
            {
              id_usuario: user.id,
              from_date: selectedDays.from,
              to_date: selectedDays.to,
            }
          );

          if (error) {
            throw new Error(error.message);
          }
          let totalCantidad = 0;
          const skuColors: SkuColors = {}; // Objeto para almacenar colores por SKU
          const colors = [
            "Slate",
            "Gray",
            "Zinc",
            "Neutral",
            "Stone",
            "Red",
            "Orange",
            "Amber",
            "Yellow",
            "Lime",
            "Green",
            "Emerald",
            "Teal",
            "Cyan",
            "Sky",
            "Blue",
            "Indigo",
            "Violet",
            "Purple",
            "Fuchsia",
            "Pink",
            "Rose",
          ];

          // Transformación de datos
          const dataTransformada  = data.reduce((acc: AccType, curr: TypeSkuYFecha) => {
            const { purchase_date, sku, total_quantity } = curr;

 
            if (checkedValues.includes(sku) ) {
              totalCantidad += total_quantity;
              if (!acc[purchase_date]) {
                acc[purchase_date] = { purchase_date };
              }

              // Si el SKU aún no está en la fecha, lo inicializamos con la cantidad
              if (!acc[purchase_date][sku]) {
                acc[purchase_date][sku] = total_quantity;
                // Si el SKU no tiene un color asignado, le asignamos uno nuevo
                if (!skuColors[sku]) {
                  const randomBaseColor =
                    colors[Math.floor(Math.random() * colors.length)];
                  const randomTone = Math.floor(Math.random() * 750) + 50; // Tono aleatorio entre 50 y 800
                  skuColors[sku] = `${randomBaseColor}`;
                }
              } else {
                // Si el SKU ya existe, sumamos la cantidad a la existente
                acc[purchase_date][sku] += total_quantity;
              }
            }
            return acc;
          },
          {}  as AccType)
        


    
          // Convertir el objeto transformado en un array
const dataTransformadaArray = Object.values<DataTransformadaItem>(dataTransformada).sort(
  (a, b) => new Date(a.purchase_date).getTime() - new Date(b.purchase_date).getTime()
);


          // const dataTransformadaArray = Object.values(dataTransformada).sort(
          //   (a, b) => new Date(a.purchase_date) - new Date(b.purchase_date)
          // );

          setSkuColors(skuColors);
          setCantidadpPorSkuYFecha(dataTransformadaArray);
          
          const promedioCalculado = (totalCantidad / dataTransformadaArray.length).toFixed(2);
          setCardData([
            {
              label: "Total Cantidad",
              amount: `$${totalCantidad}`,
              icon: DollarSign, // O puedes proporcionar el ícono correspondiente
              discription: "Cantidad de ventas",
            },
            {
              label: "Promedio",
              amount: `${promedioCalculado}`,
              icon: DollarSign, // O puedes proporcionar el ícono correspondiente
              discription: "Promedio de ventas",
            },
          ]);

          // setPromedio(parseFloat(promedioCalculado));
          // setTotalCantidad(totalCantidad);
          // console.log("Data:", data);
          // Aquí puedes hacer lo que quieras con los datos, como enviarlos al componente padre
        } else {
          console.log(
            "selectedDays.from y selectedDays.to deben ser distintos de null"
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataCharat();
  }, [selectedDays, checkedValues]); // Agrega selectedDays como una dependencia del efecto

  return (
    <>
     <div className="text-center">

        <PageTitle  title="DATOS DE CANTIDAD DE VENTAS" />
        <h1>
  {RangeDates && RangeDates.length > 0 ? (
    <>
      <p>You can search for data from the calendar</p>
      {RangeDates.map((item, index) => (
        <div key={index}>
          {/* Verificamos si es un DateObject */}
          {typeof item === 'object' && item !== null && !('length' in item) ? (
            <>
              {('before' in item && item.before) && <p>From: {item.before.toDateString()}</p>}
              {('after' in item && item.after) && <p>To: {item.after.toDateString()}</p>}
            </>
          ) : null}
        </div>
      ))}
    </>
  ) : (
    <span>No tienes datos</span>
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
        <p className="p-4 font-semibold">cantidad de ventas por Sku</p>
        <LineChart
          cantidadpPorSkuYFecha={cantidadpPorSkuYFecha}
          skuColors={skuColors}
        />
      </CardContent>
    </>
  );
};

export default HandelClientsComponents;
