import React from "react";
import { useState } from "react";
import { renderLineChart } from "../chart/CustomLineChart.tsx";
import { renderBarChart } from "../chart/CustomBarChart.tsx";
import { renderPieChart } from "../chart/CustomPieChart.tsx";

let mockData = {
  Recruitment: () => {
    return renderLineChart;
  },
  Test: () => {
    return renderBarChart;
  },

  CA: () => {
    return renderPieChart;
  },
};

export default function GraphCard() {
  let [chartType, setChartType] = useState("Recruitment");

  return (
    <div className="bg-white p-5 rounded-2xl h-full">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold mb-10">Recruitment Drives</h1>
        <select
          id="countries"
          className="block w-[30%] p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-slate-50 focus:ring-blue-500 focus:border-blue-500 "
          onChange={(e) => {
            setChartType(e.target.value);
          }}
        >
          <option selected value="Recruitment">
            Line
          </option>
          <option value="Test">Bar</option>
          <option value="CA">Pie</option>
        </select>
      </div>
      {chartType && mockData[chartType]()}
    </div>
  );
}
