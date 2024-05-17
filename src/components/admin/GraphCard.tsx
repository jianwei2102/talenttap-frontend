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
    <div className="tw-bg-white tw-p-5 tw-rounded-2xl tw-h-full">
      <div className="tw-flex tw-flex-row tw-justify-between">
        <h1 className="tw-text-2xl tw-font-bold tw-mb-10">Recruitment Drives</h1>
        <select
          id="countries"
          className="block tw-w-[30%] tw-p-2 tw-mb-6 tw-text-sm tw-text-gray-900 tw-border tw-border-gray-300 tw-rounded-lg tw-bg-slate-50 focus:ring-blue-500 focus:tw-border-blue-500 "
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
