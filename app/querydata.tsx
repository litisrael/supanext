"use client"
import { useEffect, useState } from 'react';
// import { Select, Group, Alert } from '@mantine/core';
// import { DatePicker, MonthPicker } from '@mantine/dates';
// import { CalendarDayPicker } from '../Calendarday';
import '@mantine/dates/styles.css';

import { DatePickerWithRange } from "@/components/ui/datePickerRange";


export function SelectOptionComponent( ) {
    

    // const supabase = createClient();
//   const [selectedValue, setSelectedValue] = useState<string | null>('pick day or range');
//   const [minDate, setMinDate] = useState<Date | undefined>(undefined)
//   const [maxDate, setMaxDate] = useState<Date |  undefined>(undefined)
//   const [datesLoaded, setDatesLoaded] = useState(false);


//   -- Crear o reemplazar una función que acepta un argumento de nombre de tabla y crea esa tabla
// CREATE OR REPLACE FUNCTION create_table_by_name(table_name TEXT)
//   RETURNS VOID AS $$
//   BEGIN
//     -- Construir la consulta SQL dinámicamente usando el nombre de la tabla proporcionado
//     EXECUTE 'CREATE TABLE IF NOT EXISTS ' || table_name || ' (id SERIAL PRIMARY KEY, name TEXT)';
//   END;
// $$ LANGUAGE plpgsql;

// // Invocar la función para crear una tabla con el nombre especificado
// const { data, error } = await supabase.rpc("create_table_by_name", {
//   table_name: "mi_tabla_personalizada",
// });



//   const fetchFromTo = async () => {
//     try {
//       const { data, error } = await supabase.rpc('maxymindates');
//       const firstData = data && data[0];

//       if (!firstData) {
//         console.log(error);
        
//         throw new Error('Error al conectar con la base de datos');
//       }

//       const { mindate, maxdate } = firstData;
//       console.log('Fechas min:', mindate, 'Fechas max:', maxdate);
//       setMinDate(new Date(mindate));
//       setMaxDate(new Date(maxdate));
//       setDatesLoaded(true);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchFromTo();
//   }, []);

//   if (!datesLoaded) {
//     return <p>Cargando fechas...</p>;
//   }

//   const componentsMap: Record<string, React.ReactNode> = {
//     'pick day or range': <CalendarDayPicker minDate={minDate} maxDate={maxDate} />,
//     'One month': <MonthPicker />,
//   };

//   const handleSelectChange = (value: string ) => {
//     console.log('valor', value);
//     setSelectedValue(value);
//   };

  return (
    <>
         <DatePickerWithRange  />
   
    </>
  );
}

// export async function getServerSideProps() {
//     try {
//       const supabase = createClient();
//       const { data, error } = await supabase.rpc('maxymindates');
//       if (error || !data || !data[0]) {
//         throw new Error('Error al conectar con la base de datos');
//       }
//       const { mindate, maxdate } = data[0];
//       return {
//         props: {
//           mindate,
//           maxdate,
//         },
//       };
//     } catch (error) {
//       console.error(error);
//       return {
//         props: {
//           mindate: null,
//           maxdate: null,
//         },
//       };
//     }
//   }