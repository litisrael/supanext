"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { DatePickerWithRange } from "@/components/ui/datePickerRangeModifica";
import { MenuCheckbox } from "@/components/ui/comboboxDemo";
import { useEffect, useState } from "react";
import Card, { CardContent, CardProps } from "@/components/Card";
import BarChart from "@/components/BarChart";
import { useSetState } from "@mantine/hooks";
// Definición del tipo para un rango de fechas
// type DateRange = {
//     startDate?: Date;
//     endDate?: Date;
//   };

interface PurchaseItem {
  purchase_date: Date | string; // Assuming purchase_date can be either a Date or a string representation
  item_price: number;
}
type DateObject = {
  before?: Date;
  after?: Date;
};

// Definición del tipo para un array de objetos DateObject
type RangeDates = DateObject[];

const HandelClientsComponents = () => {
  const [RangeDates, setRangeDates] = useState<RangeDates>();
  const [selectedDays, SetselectedDays] = useState< DateObject | null>(null);
  const [selectedData, setSelectedData] = useState<any>([]);
  console.log("selectedData", selectedData);

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
        if (
          selectedDays !== null &&
          selectedDays.from !== null &&
          selectedDays.to !== null
        ) {
          const { data, error } = await supabase
            .from("main_orders")
           
            .select(
              `   * ,
                    item_tax (
                      fk, *
                    ),
                    promotion(
                      fk, *
                    ),
                    shipping_data(
                      fk, *
                    )

                  `
            )
            .gte("purchase_date", selectedDays.from) // Utiliza el nombre de tu columna de fecha y ajusta el operador según tus necesidades
            .lte("purchase_date", selectedDays.to);

          if (error) {
            throw new Error(error.message);
          }
          setSelectedData(data);
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
        <DatePickerWithRange
          RangeDates={RangeDates}
          sendDataToParent={receiveSelectedDays}
        />
        <MenuCheckbox
        //  selectedData={selectedData}
          />
      </section>
      <CardContent>
        <p className="p-4 font-semibold">Overview</p>

        <BarChart
        //  data = {dataSales}
        />
      </CardContent>
    </>
  );
};

export default HandelClientsComponents;
