import React from "react";

import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const rangeData = [
  {
    day: "05-01",
    temperature: [-1, 10],
  },
  {
    day: "05-02",
    temperature: [2, 15],
  },
  {
    day: "05-03",
    temperature: [3, 12],
  },
  {
    day: "05-04",
    temperature: [4, 12],
  },
  {
    day: "05-05",
    temperature: [12, 16],
  },
  {
    day: "05-06",
    temperature: [5, 16],
  },
  {
    day: "05-07",
    temperature: [3, 12],
  },
  {
    day: "05-08",
    temperature: [0, 8],
  },
  {
    day: "05-09",
    temperature: [-3, 5],
  },
];

export const renderBarChart = (
  <ResponsiveContainer width="100%" height={500}>
    <BarChart
      width={730}
      height={250}
      data={rangeData}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    >
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="temperature" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);
