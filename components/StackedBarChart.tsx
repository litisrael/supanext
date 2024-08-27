
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,ResponsiveContainer,
  TooltipProps
} from "recharts";
import { useState, useEffect , useMemo} from "react";

import { generateRandomColor } from "../utils/generateRandomColor.js";


type ChartDataType = {
  name: string;
  value1: number;
  value2: number;
  // Otros campos si es necesario
};

interface SimpleLineChartProps {
  data: ChartDataType[];
  showLegend?: boolean;
}


export  const StackedBarChart = ({ data = [], showLegend = true }: SimpleLineChartProps) => {
  // const [chartData, setChartData] = useState<ChartDataType[]>([]);

  // useEffect(() => {
  //   if (data) {
  //     setChartData(data);
  //   }
  // }, [data]);



  const barColors = useMemo(() => 
    data.length > 0
      ?  Object.keys(data[0]).filter(key => key !== "name").map((key) => (
        <Bar
          key={key}
         stackId="a"
          dataKey={key}
          fill={generateRandomColor()}
          // activeDot={{ r: 8 }}
          />
        ))
    : [],
[data] // Dependencia de useMemo: actualiza cuando cambia 'data'
);


const CustomTooltip: React.FC<TooltipProps<string, string>> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow-lg max-w-xs max-h-40 overflow-auto">
        <p className="font-bold mb-2">{label}</p>
        <ul>
          {payload.map((entry, index) => (
            <li key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
};


  return (
    <>
      <div className="w-full h-full min-h-[300px] ">
      <ResponsiveContainer width="100%" height={400}>

   
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip position={{ y: 200 }} content={CustomTooltip} />
        {showLegend && 
        <Legend
        // wrapperStyle={{ fontSize: '12px' }} // Ejemplo de ajuste de tamaño de fuente  
        />
      }
        
        {/* {data.length > 0 &&
          Object.keys(data[0]).filter(key => key !== "name").map((key) => (
            <Bar
              key={key}
             stackId="a"
              dataKey={key}
              fill={barColors[key]}
              // activeDot={{ r: 8 }}
            />
          ))} */}
        
 {barColors}
      </BarChart>
      </ResponsiveContainer>
      </div>
    </>
  );
}
