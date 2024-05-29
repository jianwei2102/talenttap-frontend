import React from "react";
import { useState } from "react";
import { EmployeeTurnoverRateByTotalYearsOfEmploymentLineChart } from "../chart/EmployeeTurnoverRateByTotalYearsOfEmploymentLineChart.tsx";
import { EmployeeTurnoverRateByDepartment } from "../chart/EmployeeTurnoverRateByDepartment.tsx";
import { CostPerHire } from "../chart/CostPerHirePieChart.tsx";

let mockData = {
  EmployeeTurnoverRateByTotalYearsofEmployment: () => {
    return EmployeeTurnoverRateByTotalYearsOfEmploymentLineChart;
  },
  EmployeeTurnoverRateByDepartment: () => {
    return EmployeeTurnoverRateByDepartment;
  },

  CostPerHire: () => {
    return CostPerHire;
  },
};

export default function GraphCard() {
  let [chartType, setChartType] = useState("EmployeeTurnoverRateByTotalYearsofEmployment");

  return (
    <div className="tw-bg-white tw-p-5 tw-rounded-2xl tw-h-full">
      <div className="tw-flex tw-flex-row tw-justify-between">
        <h1 className="tw-text-2xl tw-font-bold tw-mb-10">Recruitment Statistics</h1>
        <select
          id="chart-type"
          className="tw-block tw-w-[60%] tw-p-2 tw-mb-6 tw-text-sm tw-text-gray-900 tw-border tw-border-gray-300 tw-rounded-lg tw-bg-slate-50 focus:ring-blue-500 focus:tw-border-blue-500 "
          onChange={(e) => {
            setChartType(e.target.value);
          }}
        >
          <option selected value="EmployeeTurnoverRateByTotalYearsofEmployment">
            Employee Turnover Rate by Total Years of Employment
          </option>
          <option value="EmployeeTurnoverRateByDepartment">Employee Turnover Rate by Department</option>
          <option value="CostPerHire">Cost Per Hire</option>
        </select>
      </div>
      <div className="tw-w-full tw-text-center tw-text-xl tw-font-bold">
        {
          chartType === "EmployeeTurnoverRateByTotalYearsofEmployment" ? "Employee Turnover Rate by Total Years of Employment" : chartType === "EmployeeTurnoverRateByDepartment" ? "Employee Turnover Rate by Department" : "Cost Per Hire"
        }
      </div>
      {chartType && mockData[chartType]()}
    </div>
  );
}
