import React from "react";
import Icon from "@mui/material/Icon";

let iconType = {
  up: {
    icon: "trending_up",
    color: "success",
    bg: 'bg-green-300'
  },
  down: {
    icon: "trending_down",
    color: "error",
    bg: 'bg-red-300'
  },
};

interface StatisticCardProps {
  title: string;
  figure: number;
  percentage: number;
  type: string;
  icon: string;
}

export default function StatisticCard({
  title,
  figure,
  percentage,
  type,
  icon,
}: StatisticCardProps) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <div className="bg-white flex flex-auto flex-col max-w-96 min-w-80  p-5 rounded-lg">
        <div className="flex flex-row justify-between">
          <div className="mb-5">
            <p className="mb-2">{title}</p>
            <h1 className="text-3xl font-bold">{figure}</h1>
          </div>
          <div>
            {/* Icon Container */}
            <div className="border-black border rounded-lg p-1">
              <Icon
                color="error"
                // fontSize="large"
                sx={{ paddingBottom: 0, marginBottom: -1, fontSize: 100 }}
              >
                {icon}
              </Icon>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-start">
          <p className="mb-2 flex-1">vs Last Year</p>
          <div className={`${iconType[type].bg} rounded-full px-5 py-1 flex`}>
            <p className="">{percentage}%</p>
            <Icon
              color={iconType[type].color}
              fontSize="large"
              sx={{ marginLeft: 2, paddingBottom: 0, marginBottom: -1 }}
            >
              {iconType[type].icon}
            </Icon>
            <span></span>
          </div>
        </div>
      </div>
    </>
  );
}
