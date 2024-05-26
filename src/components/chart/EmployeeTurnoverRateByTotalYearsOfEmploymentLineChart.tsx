import React from "react";

import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Label,
} from "recharts";

const data = [
  { year: 0, percentage: 0 },
  { year: 1, percentage: 47 },
  { year: 2, percentage: 24 },
  { year: 3, percentage: 11 },
  { year: 4, percentage: 5 },
  { year: 5, percentage: 3 },
  { year: 6, percentage: 2 },
  { year: 7, percentage: 4 },
  { year: 8, percentage: 1 },
  { year: 9, percentage: 0.6 },
  { year: 10, percentage: 0.4 },
];

export const EmployeeTurnoverRateByTotalYearsOfEmploymentLineChart = (
  <ResponsiveContainer width="100%" height={500}>
    <AreaChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="3%" stopColor="#FF0000" stopOpacity={0.4} />
          <stop offset="90%" stopColor="#FFFFFF" stopOpacity={0} />
        </linearGradient>
      </defs>
      <Area
        type="monotone"
        dataKey="percentage"
        stroke="#000000"
        dot={{ fill: "red" }}
        fill="url(#colorUv)"
      />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" vertical={false} />
      <XAxis
        dataKey="year"
        label={{
          value: "Total Years of Employment",
          offset: -10,
          position: "insideBottom",
        }}
      />
      <YAxis
        label={{
          value: "Employee Turnover Percentage",
          angle: -90,
          position: "insideLeft",
        }}
      />
      <Tooltip />
    </AreaChart>
  </ResponsiveContainer>
);
