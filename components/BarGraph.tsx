import React from "react";

import {
//   LineChart as BarGraph,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  CartesianGrid,
  Tooltip,
  Legend, BarChart, Bar, 
} from "recharts";

import { VentasXState } from "../app/orders/handelClientsComponentes";



interface BarGraphProps {
// Objeto con datos, donde la clave es el nombre de la barra y el valor es el valor
    data: VentasXState[]
    dataKey?: string; // Propiedad opcional para la clave de datos

   colors: { [key: string]: string };
  }
  

 const BarGraph: React.FC<BarGraphProps> = ({data, dataKey,  colors }) => {
  
  return (
    
    <ResponsiveContainer width={"100%"} height={350}>
      
      <BarChart data={data  }>
        <XAxis
        dataKey={dataKey} 
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
          tickFormatter={(value) => `${value}`}
        />
    <Tooltip />
          {/* <Legend /> */}
        {/* Renderizar líneas para cada SKU */}
        {colors &&
          Object.keys(colors).map((it, index) => (
            <Bar
              key={it}
            //   type="monotone"
            stackId="a"
              dataKey={it}
              fill={colors[it]}
            //   activeDot={{ r: 8 }} // Activar punto activo
            />
          ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
export default BarGraph