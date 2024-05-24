import React from "react";
import Icon from "@mui/material/Icon";

let iconType = {
  up: {
    icon: "trending_up",
    color: "success",
    bg: 'tw-bg-green-300'
  },
  down: {
    icon: "trending_down",
    color: "error",
    bg: 'tw-bg-red-300'
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
      <div className="tw-bg-white tw-flex tw-flex-auto tw-flex-col max-w-96 min-w-80  tw-p-5 tw-rounded-lg">
        <div className="tw-flex tw-flex-row tw-justify-between">
          <div className="tw-mb-5">
            <p className="tw-mb-2">{title}</p>
            <h1 className="tw-text-3xl tw-font-bold">{figure}</h1>
          </div>
          <div>
            {/* Icon Container */}
            <div className="tw-border-black tw-border tw-rounded-lg tw-p-1">
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
        <div className="tw-flex tw-flex-row tw-justify-start tw-items-end">
          <span className="tw-mb-2 tw-flex-1">vs Last Year</span>
          <div className={`${iconType[type].bg} tw-rounded-full tw-px-5 tw-py-2 tw-flex tw-justify-center tw-items-center tw-m-0`}>
            <span className="tw-flex tw-justify-center tw-items-center">{percentage + "%"}</span>
            <Icon
              color={iconType[type].color}
              fontSize="large"
              sx={{ marginLeft: 1, paddingBottom: 0 }}
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
