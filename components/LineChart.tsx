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

export default function LineChart({ cantidadpPorSkuYFecha }) {
  const skuColors = {}; // Objeto para almacenar colores por SKU
  const colorArray = [
    "indigo",
    "blue",
    "teal",
    "red",
    "pink",
    "grape",
    "violet",
    "indigo",
    "blue",
    "cyan",
    "teal",
    "green",
    "lime",
    "yellow",
    "orange",
  ];

  // Transformación de datos
  const dataTransformada = cantidadpPorSkuYFecha.reduce((acc, curr) => {
    const { purchase_date, sku, total_quantity } = curr;
    if (!acc[purchase_date]) {
      acc[purchase_date] = { purchase_date };
    }

    // Si el SKU aún no está en la fecha, lo inicializamos con la cantidad
    if (!acc[purchase_date][sku]) {
      acc[purchase_date][sku] = total_quantity;
      // Si el SKU no tiene un color asignado, le asignamos uno nuevo
      if (!skuColors[sku]) {
        skuColors[sku] = colorArray[Object.keys(skuColors).length % colorArray.length];
      }
    } else {
      // Si el SKU ya existe, sumamos la cantidad a la existente
      acc[purchase_date][sku] += total_quantity;
    }
    return acc;
  }, {});

  // Convertir el objeto transformado en un array
  const dataTransformadaArray = Object.values(dataTransformada)
    .sort((a, b) => new Date(a.purchase_date) - new Date(b.purchase_date));


  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarGraph data={dataTransformadaArray}>
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
        {Object.keys(skuColors).map((sku, index) => (
          <Line
            key={sku}
            type="monotone"
            dataKey={sku}
            stroke={skuColors[sku]}
            activeDot={{ r: 8 }} 
          />
        ))}
      </BarGraph>
    </ResponsiveContainer>
  );
}
