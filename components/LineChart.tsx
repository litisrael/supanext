/** @format */
"use client";
import React from "react";
import {
  LineChart as BarGraph,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,Line,
} from "recharts";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Props = {};

const data = [

  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
    {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function LineChart(
  // {data}
{}: Props) {
  // console.log("dentro de charat", data);
    const todasLasPropiedadesSet = new Set();
  const colorArray = [ 'indigo',
  'blue',
  'teal',
  'red',
  'pink',
  'grape',
  'violet',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'green',
  'lime',
  'yellow',
  'orange',]
  
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarGraph data={data}>
        <XAxis
          dataKey={"name"}
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
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey={"total"} radius={[4, 4, 0, 0]} />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </BarGraph>
    </ResponsiveContainer>
  );
}
