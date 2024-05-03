"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { DatePickerWithRange } from "@/components/ui/datePickerRangeModifica";
import { MenuCheckbox } from "@/components/ui/comboboxDemo";
import { useEffect, useState } from "react";
import Card, { CardContent, CardProps } from "@/components/Card";
import LineChart from "@/components/LineChart";
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


const HandelSpecificComponents = () => {
  const [RangeDates, setRangeDates] = useState<RangeDates>();
  const [selectedDays, SetselectedDays] = useState< DateObject | null>(null);
  const [selectedData, setSelectedData] = useState<any>([]);
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const [ventasPorDia, setVentasPorDia] = useState<any>([]); 

console.log("ventasPorDia",ventasPorDia);


  // Función de devolución de llamada para manejar cambios en los valores chequeados
  const handleValueChange = (newValues: string[]) => {
    setCheckedValues(newValues);

    
  };
  // console.log("selectedData", selectedData);


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
        
        const { data: ventasPorDiaData, error: ventasPorDiaError } = await supabase.rpc("obtenerventaspordia",  { id_argumento: user.id });

        if (ventasPorDiaError) {
          throw new Error("Error al obtener las ventas por día");
        }
        
   
        setVentasPorDia(ventasPorDiaData);
  

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
  },
  []);


          
//           setSelectedData(data);
//           // console.log("Data:", data);
//           // Aquí puedes hacer lo que quieras con los datos, como enviarlos al componente padre
//         } else {
//           console.log(
//             "selectedDays.from y selectedDays.to deben ser distintos de null"
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchDataCharat();
//   }, [selectedDays]); // Agrega selectedDays como una dependencia del efecto



  // useEffect(() => {
  //   const objetosPorGrupo = selectedData.reduce((acc, objeto) => {
  //     // Obtenemos el grupo al que pertenece el SKU del objeto
  //     const grupo = valorDeGrupos[objeto.sku];
  
  //     // Si el grupo existe, agregamos el objeto al array correspondiente
  //     if (grupo) {
  //       // Si el grupo aún no tiene un array, lo inicializamos
  //       if (!acc[grupo]) {
  //         acc[grupo] = [];
  //       }
  //       // Agregamos el objeto al array del grupo
  //       acc[grupo].push(objeto);
  //     }
  
  //     return acc;
  //   }, {});
  
  //   // Actualizamos el estado con los objetos separados por grupos
  //   setDataSeparatedByGroups(objetosPorGrupo);
  // }, [selectedData]); // Asegúrate de incluir cualquier dependencia necesaria, como "objetos"
  




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





// para ver las ventas de cada pais estado
  // const stateCounts = {};

  // // Iterar sobre los resultados y contar el número de pedidos para cada estado
  // data.forEach(order => {
  //   const dateKey = new Date(order.purchase_date).toLocaleDateString();
  //   const state = order.ship_state;
  
  //   // Inicializar el objeto para la fecha si aún no existe
  //   stateCounts[dateKey] = stateCounts[dateKey] || {};
  //   // Incrementar el recuento para el estado correspondiente
  //   stateCounts[dateKey][state] = (stateCounts[dateKey][state] || 0) + 1;
  // });
  
  // // Convertir el objeto a un array de objetos
  // const dataStates = Object.entries(stateCounts).map(([date, stateCount]) => ({
  //   date,
  //   ...stateCount,
  // }));
  
  // console.log("stateCounts",stateCounts);
  
  // console.log("antes de dataStates",dataStates);
  
  // dataStates.sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // console.log("despues de dataStates",dataStates);
  // setSelectedData(dataStates)
  

  return (
    <>
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-2">
        <DatePickerWithRange
          RangeDates={RangeDates}
          sendDataToParent={receiveSelectedDays}
        />
        <MenuCheckbox
        onValueChange={handleValueChange}
          />
      </section>
      <CardContent>
        <p className="p-4 font-semibold">Overview</p>

        <LineChart
        //  data = {selectedData}
        />
      </CardContent>
    </>
  );
};

export default HandelSpecificComponents;
