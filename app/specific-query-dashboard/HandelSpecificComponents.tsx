// "use client";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { DatePickerWithRange } from "@/components/ui/datePickerRangeModifica";
// import { MenuCheckbox } from "@/components/ui/comboboxDemo";
// import { useEffect, useState } from "react";
// import Card, { CardContent, CardProps } from "@/components/Card";
// import LineChart from "@/components/LineChart";
// import { useSetState } from "@mantine/hooks";
// // Definición del tipo para un rango de fechas
// // type DateRange = {
// //     startDate?: Date;
// //     endDate?: Date;
// //   };

// interface PurchaseItem {
//   purchase_date: Date | string; // Assuming purchase_date can be either a Date or a string representation
//   item_price: number;
// }
// type DateObject = {
//   before?: Date;
//   after?: Date;
// };

// // Definición del tipo para un array de objetos DateObject
// type RangeDates = DateObject[];


// const HandelSpecificComponents = () => {
//   const [RangeDates, setRangeDates] = useState<RangeDates>();
//   const [selectedDays, SetselectedDays] = useState< DateObject | null>(null);
//   const [selectedData, setSelectedData] = useState<any>([]);
//   const [checkedValues, setCheckedValues] = useState<string[]>([]);
//   const [ventasPorDia, setVentasPorDia] = useState<any>([]); 

// console.log("ventasPorDia",ventasPorDia);


//   // Función de devolución de llamada para manejar cambios en los valores chequeados
//   const handleValueChange = (newValues: string[]) => {
//     setCheckedValues(newValues);

    
//   };
//   // console.log("selectedData", selectedData);


//   // Función para recibir los datos del hijo
//   const receiveSelectedDays = (data: DateObject | undefined | null) => {
//     SetselectedDays(data ?? null);
//   };

//   const supabase = createClientComponentClient();

//   useEffect(() => {
//     const fetchDataRangeDates = async () => {
//       try {
//         const {
//           data: { user },
//         } = await supabase.auth.getUser();
//         if (!user) return;
        
//         const { data: ventasPorDiaData, error: ventasPorDiaError } = await supabase.rpc("obtenerventaspordia",  { id_argumento: user.id });

//         if (ventasPorDiaError) {
//           throw new Error("Error al obtener las ventas por día");
//         }
        
   
//         setVentasPorDia(ventasPorDiaData);
  

//         const { data, error } = await supabase.rpc(
//           "obtener_fechas_disponibles_por_id",
//           { id_argumento: user.id }
//         );
       
//         if (error) {
//           throw new Error("Error al obtener las fechas");
//         }

//         if (data && data.length > 0) {
//           const { fecha_minima, fecha_maxima } = data[0];
//           setRangeDates([
//             { before: new Date(fecha_minima) },
//             { after: new Date(fecha_maxima) },
//           ]);
//         }

       
     
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchDataRangeDates();
//   },
//   []);


          

//   return (
//     <>
//       <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-2">
//         <DatePickerWithRange
//           RangeDates={RangeDates}
//           sendDataToParent={receiveSelectedDays}
//         />
//         <MenuCheckbox
//         onValueChange={handleValueChange}
//           />
//       </section>
//       <CardContent>
//         <p className="p-4 font-semibold">Overview</p>

//         <LineChart
//         //  data = {selectedData}
//         />
//       </CardContent>
//     </>
//   );
// };

// export default HandelSpecificComponents;
