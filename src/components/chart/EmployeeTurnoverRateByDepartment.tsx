import React from "react";

import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  LabelList,
} from "recharts";

const data = [
  { department: "Finance", involuntary: 5, voluntary: 12 },
  { department: "HR", involuntary: 3, voluntary: 4 },
  { department: "Marketing", involuntary: 4, voluntary: 9 },
  { department: "IT", involuntary: 8, voluntary: 6 },
  { department: "Talent Acquisition", involuntary: 2, voluntary: 15 },
];

export const EmployeeTurnoverRateByDepartment = (
  <ResponsiveContainer width="100%" height={500}>
    <BarChart
      width={730}
      height={250}
      data={data}
      margin={{ top: 20, right: 20, bottom: 30, left: 20 }}>
      <XAxis
        dataKey="department"
        label={{
          value: "Department",
          offset: -20,
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
      <Bar dataKey="involuntary" fill="#ffa69e">
        <LabelList dataKey="involuntary" position="top" />
      </Bar>
      <Bar dataKey="voluntary" fill="#aed9e0">
        <LabelList dataKey="voluntary" position="top" />
      </Bar>
      <Legend verticalAlign="top" height={36} />
    </BarChart>
  </ResponsiveContainer>
);
