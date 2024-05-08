import React from "react";

import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";

const data = [
  { name: "1", yu: 450, pv: 2400, amt: 2400 },
  { name: "2", yu: 300, pv: 1398, amt: 2210 },
  { name: "3", yu: 200, pv: 9800, amt: 2290 },
  { name: "4", yu: 278, pv: 3908, amt: 2000 },
  { name: "5", yu: 189, pv: 4800, amt: 2181 },
  { name: "6", yu: 239, pv: 3800, amt: 2500 },
  { name: "7", yu: 349, pv: 4300, amt: 2100 },
  { name: "8", yu: 200, pv: 4300, amt: 2100 },
];

export const renderLineChart = (
  <ResponsiveContainer width="100%" height={500}>
    <AreaChart data={data}>
      <defs>
      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="3%" stopColor="#FF0000" stopOpacity={0.4}/>
      <stop offset="90%" stopColor="#FFFFFF" stopOpacity={0}/>
    </linearGradient>
      </defs>
      <Area
        type="monotone"
        dataKey="yu"
        stroke="#000000"
        dot={{ fill: "red" }}
        fill="url(#colorUv)"
      />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" vertical={false} />
      <XAxis dataKey="name" />
      <YAxis axisLine={false} />
      <Tooltip />
    </AreaChart>
  </ResponsiveContainer>
);
