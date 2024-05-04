import React from "react";
import {
  LineChart as BarGraph,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

interface DataItem {
  [key: string]: number | string; // Puede ser un número o una cadena
  purchase_date: string; // purchase_date es una cadena
}
interface Props {
  cantidadpPorSkuYFecha: DataItem[]; 
  skuColors?: { [key: string]: string }; // Tipo opcional de skuColors
}

export default function LineChart({ cantidadpPorSkuYFecha , skuColors}:Props) {

  
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarGraph data={cantidadpPorSkuYFecha  }>
        <XAxis
          dataKey="purchase_date"
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
        {skuColors &&
          Object.keys(skuColors).map((sku, index) => (
            <Line
              key={sku}
              type="monotone"
              dataKey={sku}
              stroke={skuColors[sku]}
              activeDot={{ r: 8 }} // Activar punto activo
            />
          ))}
      </BarGraph>
    </ResponsiveContainer>
  );
}
