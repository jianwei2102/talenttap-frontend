import React from "react";

import { PieChart, Pie, Cell, Tooltip, LabelList, Legend } from "recharts";

const data = [
  {
    range: "$0 - $1,000",
    value: 400,
  },
  {
    range: "$1,001 - $2,000",
    value: 300,
  },
  {
    range: "$2,001 - $3,000",
    value: 300,
  },
  {
    range: "$3,001 - $4,000",
    value: 200,
  },
  {
    range: "$4,001 - $5,000",
    value: 278,
  },
  {
    range: "$5,001+",
    value: 189,
  },
];

const COLORS = ["#a587ca", "#36cedc", "#8fe968", "#ffea56", "#ffb750", "#fe797b"];

export const CostPerHire = (
  <PieChart width={800} height={500}>
    <Pie data={data} dataKey="value" nameKey="range" cx="50%" cy="50%" outerRadius={200}>
      <LabelList dataKey="value" position="inside" />
      {data.map((entry, index) => (
        <Cell fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Legend
      layout="vertical"
      verticalAlign="middle"
      align="right"
      iconType="circle"
      formatter={(value, entry, index) => <span className="tw-text-black tw-m-2">{value}</span>}
    />
  </PieChart>
);
