import {
    LineChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Line,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";
  import { useEffect, useState } from "react";
  type ChartDataType = {
    name: string;
    value1: number;
    value2: number;
    // Otros campos si es necesario
  };
  

  import { generateRandomColor } from "../utils/generateRandomColor.js";
  export const SimpleLineChart = ({ data }: { data: ChartDataType[] }) => {
    const [chartData, setChartData] = useState<ChartDataType[]>([]);
  
    useEffect(() => {
      if (data) {
        setChartData(data);
      }
    }, [data]);
  
    // console.log("Chart Data:", chartData);
  
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
            
     <XAxis dataKey="name" 
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
          <CartesianGrid strokeDasharray="3 3" />
       
          <YAxis />
          <Tooltip />
          <Legend />
          {chartData.length > 0 &&
            Object.keys(chartData[0]).filter(key => key !== "name").map((key) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={generateRandomColor()} // Generate random color
                activeDot={{ r: 8 }}
              />
            ))}
        </LineChart>
      </ResponsiveContainer>
    );
  };
  