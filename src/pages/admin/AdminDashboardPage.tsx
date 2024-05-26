import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavBar from "../../components/admin/AdminNavBar.tsx";
import StatisticCard from "../../components/admin/StatisticCard.tsx";
import OngoingCampaignCard from "../../components/admin/OngoingCampaignCard.tsx";
import HiringRequestTable from "../../components/admin/HiringRequestTable.tsx";
import GraphCard from "../../components/admin/GraphCard.tsx";
import { SquareAddIcon } from "../../assets/index.js";
import CommandBar from "../../components/CommandBar.tsx";

let statisticCardDate = [
  {
    title: "Total Employees",
    figure: 35842,
    percentage: 3.1,
    type: "down",
    icon: "groups",
  },
  {
    title: "New Hires",
    figure: 1890,
    percentage: 3.1,
    type: "down",
    icon: "person_add",
  },
  {
    title: "Vacancies",
    figure: 29,
    percentage: 0.8,
    type: "down",
    icon: "person_search",
  },
  {
    title: "Average Time-To-Fill (Days)",
    figure: 35,
    percentage: 2.4,
    type: "up",
    icon: "timelapse",
  },
];

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tw-h-screen tw-w-screen tw-absolute tw-flex tw-flex-col tw-bg-gray-100">
      <AdminNavBar activeIndex={0} />
      <div className="main-container tw-flex tw-flex-col tw-px-10 tw-py-5 tw-overflow-auto">
        {/* Header Section */}
        <div className="tw-w-full tw-flex tw-justify-between tw-items-center">
          <div className="tw-w-auto tw-flex tw-flex-col">
            <span className="tw-text-gray-400">Pages / Dashboard</span>
            <span className="tw-text-black tw-font-bold tw-text-2xl">Dashboard</span>
          </div>
          <button
            className="tw-h-3/4 tw-bg-red-700 tw-rounded-lg tw-flex tw-items-center tw-p-2"
            onClick={() => {
              navigate("/create-campaign");
            }}>
            <div className="tw-text-white tw-flex tw-items-center">
              <SquareAddIcon />
            </div>
            <span className="tw-text-white tw-text-sm tw-pl-2">Start New Campaign</span>
          </button>
        </div>

        {/* Statistic Card Section */}
        <div className="tw-grid tw-grid-cols-4 tw-gap-10 tw-grid-flow-row tw-mb-6 tw-w-full tw-mt-10">
          {statisticCardDate.map(function (card) {
            return (
              <StatisticCard
                title={card.title}
                figure={card.figure}
                percentage={card.percentage}
                type={card.type}
                icon={card.icon}
              />
            );
          })}
        </div>
        {/* Recruitment Drives & Ongoing campaign sections */}
        <div
          className="tw-flex tw-flex-row tw-justify-between tw-w-full tw-mb-6"
          style={{ maxHeight: "600px" }}>
          {/* Recruitment Drives */}
          <div className="tw-w-[70%] me-6">
            <GraphCard />
          </div>
          <div className="tw-w-[28%]">
            <OngoingCampaignCard />
          </div>
        </div>

        {/* New Hiring Request Section */}
        <div className="tw-w-full">
          <div className="tw-ml-auto tw-w-[60%]">
            <HiringRequestTable />
          </div>
        </div>
        <CommandBar />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
