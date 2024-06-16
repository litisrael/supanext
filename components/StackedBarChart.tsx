
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
  Area,ResponsiveContainer
} from "recharts";
import { useState, useEffect } from "react";

import { generateRandomColor } from "../utils/generateRandomColor.js";


type ChartDataType = {
  name: string;
  value1: number;
  value2: number;
  // Otros campos si es necesario
};

interface SimpleLineChartProps {
  data: ChartDataType[];
  reversed?: boolean;
}


export  const StackedBarChart = ({ data = [], reversed = false }: SimpleLineChartProps) => {
  const [chartData, setChartData] = useState<ChartDataType[]>([]);

  useEffect(() => {
    if (data) {
      setChartData(data);
    }
  }, [data]);

  return (
    <>
      <div className="w-full h-full min-h-[300px] p-4">
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
        <Tooltip />
        <Legend />
        
        {chartData.length > 0 &&
          Object.keys(chartData[0]).filter(key => key !== "name").map((key) => (
            <Bar
              key={key}
             stackId="a"
              dataKey={key}
              fill={generateRandomColor()}
              // activeDot={{ r: 8 }}
            />
          ))}
        
 
      </BarChart>
      </ResponsiveContainer>
      </div>
    </>
  );
}
