import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavBar from "../../components/admin/AdminNavBar.tsx";
import StatisticCard from "../../components/admin/StatisticCard.tsx";
import OngoingCampaignCard from "../../components/admin/OngoingCampaignCard.tsx";
import HiringRequestTable from "../../components/admin/HiringRequestTable.tsx";
import GraphCard from "../../components/admin/GraphCard.tsx";
import {
  CrossIcon,
  HelpIcon,
  SquareAddIcon,
  InformationIcon,
  GridIcon,
} from "../../assets/index.js";
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

const supportTextSections = [
  {
    section: "Overview",
    message:
      "The Admin Dashboard Page allows you to view information regarding the recruitment at HILTI. Feel free to take a look at the statistic reports that have been compiled on the dashboard.",
  },
  {
    section: "Create A New Campaign",
    message:
      'To create a new campaign, simply click on the "Start New Campaign" button on the top right section of the page.',
  },
  {
    section: "View Ongoing Campaigns",
    message:
      'To view ongoing campaigns, scroll through the "Ongoing Campaigns" container on the right side of the Admin Dashboard. Click on any of the campaign cards to view the progress and results of the campaign. Alternatively, click on the "Campaign" text on the navigation bar (top of your screen) to view the entire campaign list.',
  },
  {
    section: "Ctrl + K Shortcut Key",
    message:
      "Simply click on Ctrl + K on your keyboard to display the command box! The command box helps you navigate to frequently visited areas of the site, without needing to click on multiple buttons. If you need any help, you can also search through the website, which employs AI to get the resources that you need.",
  },
];

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [isShowingSupportModal, setIsShowingSupportModal] = useState(false);
  const [isClickOpenCommandBar, setIsClickOpenCommandBar] = useState(false);

  return (
    <div id="test" className="tw-h-screen tw-w-screen tw-absolute tw-flex tw-flex-col tw-bg-gray-100">
      <AdminNavBar activeIndex={0} />
      <div id="main" className="main-container tw-flex tw-flex-col tw-px-10 tw-py-5 tw-overflow-auto">
        {/* Header Section */}
        <div className="tw-w-full tw-flex tw-justify-between tw-items-center">
          <div className="tw-w-auto tw-flex tw-flex-col">
            <span className="tw-text-gray-400">Pages / Dashboard</span>
            <div className="tw-flex tw-items-center">
              <span className="tw-text-black tw-font-bold tw-text-2xl">Dashboard</span>
              <div
                className="tw-h-5 tw-text-black tw-ml-2 tw-cursor-pointer"
                onClick={() => setIsShowingSupportModal(true)}>
                <HelpIcon />
              </div>
            </div>
          </div>
          <button
            className="tw-h-4/5 tw-bg-red-700 tw-rounded-lg tw-flex tw-items-center tw-p-3"
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
        <div className="tw-grid tw-grid-cols-4 tw-gap-10 tw-grid-flow-row tw-mb-10 tw-w-full tw-mt-10">
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
          className="tw-flex tw-flex-row tw-justify-between tw-w-full tw-mb-10"
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
          <div className="tw-ml-auto">
            <HiringRequestTable />
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div
        className={
          isShowingSupportModal
            ? "tw-h-screen tw-w-screen tw-absolute tw-fixed tw-flex tw-justify-center tw-items-center"
            : "tw-hidden"
        }>
        <div
          className="pop-up-modal-backdrop"
          onClick={() => setIsShowingSupportModal(false)}></div>
        <div className="tw-h-4/6 tw-w-1/2 tw-px-5 tw-pt-10 tw-pb-5 tw-bg-white tw-rounded-xl tw-shadow tw-z-10 tw-overflow-auto">
          <div className="tw-w-full tw-flex tw-justify-between tw-items-center">
            <span className="tw-font-bold tw-text-2xl">Welcome to the Admin Dashboard Page!</span>
            <div
              className="tw-h-8 tw-text-black tw-cursor-pointer"
              onClick={() => setIsShowingSupportModal(false)}>
              <CrossIcon />
            </div>
          </div>
          <span className="tw-text-lg tw-text-justify">
            {supportTextSections.map((support, index) => (
              <div className="tw-w-full tw-h-fit tw-bg-gray-100 tw-rounded-lg tw-p-2 tw-flex tw-flex-col tw-mt-5">
                <span className="tw-font-bold tw-text-xl">{support.section}</span>
                <span className="tw-mt-3">{support.message}</span>
              </div>
            ))}
          </span>
        </div>
      </div>

      <CommandBar />
    </div>
  );
};

export default AdminDashboardPage;
