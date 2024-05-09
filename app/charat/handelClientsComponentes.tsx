"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { DatePickerWithRange } from "@/components/ui/datePickerRangeModifica";
import { MenuCheckbox } from "@/components/ui/comboboxDemo";
import { useEffect, useState } from "react";
import Card, { CardContent, CardProps } from "@/components/Card";
import LineChart from "@/components/LineChart";
import { useSetState } from "@mantine/hooks";

import { DollarSign, Users, CreditCard, Activity } from "lucide-react";

interface DateRange {
  from?: Date | string;
  to?: Date | string;
}

interface PurchaseItem {
  purchase_date: Date | string; // Assuming purchase_date can be either a Date or a string representation
  item_price: number;
}
type DateObject = {
  before?: Date;
  after?: Date;
};
interface TypeSkuYFecha {
  purchase_date: string;
  sku: string;
  total_quantity: number;
}
// Definición del tipo para un array de objetos DateObject
type RangeDates = DateObject[];

const HandelClientsComponents = () => {
  const [RangeDates, setRangeDates] = useState<RangeDates>();
  const [selectedDays, SetselectedDays] = useState<DateRange | null>(null);
  const [cantidadpPorSkuYFecha, setCantidadpPorSkuYFecha] = useState<
    TypeSkuYFecha[]
  >([]);
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const [skuColors, setSkuColors] = useState({});

  const [promedio, setPromedio] = useState<number>(0); // Estado para almacenar el promedio
  const [totalCantidad, setTotalCantidad] = useState<number>(0); // Estado para almacenar la cantidad total
  const [cardData, setCardData] = useState<CardProps[]>([]);

  console.log("cardData ", cardData);
  console.log("checkedValues ", checkedValues);
  console.log("cantidadpPorSkuYFecha ", cantidadpPorSkuYFecha);

  // Función de devolución de llamada para manejar cambios en los valores chequeados
  const handleValueChange = (newValues: string[]) => {
    setCheckedValues(newValues);
  };

  // Función para recibir los datos del hijo
  const receiveSelectedDays = (data: DateObject | undefined | null) => {
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
          const skuColors = {}; // Objeto para almacenar colores por SKU
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
          const dataTransformada = data.reduce((acc, curr) => {
            const { purchase_date, sku, total_quantity } = curr;

            if (checkedValues.includes(sku)) {
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
          }, {});

          // Convertir el objeto transformado en un array
          const dataTransformadaArray = Object.values(dataTransformada).sort(
            (a, b) => new Date(a.purchase_date) - new Date(b.purchase_date)
          );

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
