import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import AdminNavBar from "../../components/admin/AdminNavBar.tsx";
import CommandBar from "../../components/CommandBar.tsx";
import { CustomToggle } from "../../components";
import {
  SquareAddIcon,
  PeopleTwoIcon,
  CircleCheckIcon,
  CalendarIcon,
  HelpIcon,
  CrossIcon,
} from "../../assets/index.js";

interface Campaign {
  name: string;
  id: string;
  duration: string;
  targetRecruitmentHeadcount: number;
  campaignStepsList: string[];
}

const supportTextSections = [
  {
    section: "Overview",
    message: "The Admin Campaign List Page shows you all the campaigns at HILTI.",
  },
  {
    section: "Create A New Campaign",
    message:
      'To create a new campaign, simply click on the "Start New Campaign" button on the top right section of the page.',
  },
  {
    section: "View Campaigns",
    message: "Scroll down the page to view all the ongoing campaigns at HILTI.",
  },
  {
    section: "View Campaign Process and Results",
    message:
      "To view a specific campaign's process and results, simply click on the card of the campaign that you wish to view.",
  },
  {
    section: "Ctrl + K Shortcut Key",
    message:
      "Simply click on Ctrl + K on your keyboard to display the command box! The command box helps you navigate to frequently visited areas of the site, without needing to click on multiple buttons. If you need any help, you can also search through the website, which employs AI to get the resources that you need.",
  },
];

function CampaignListPage() {
  const navigate = useNavigate();
  const [isShowingSupportModal, setIsShowingSupportModal] = useState(false);
  const [isShowingCreateCampaignModal, setIsShowingCreateCampaignModal] = useState(false);
  const [isShowingTemplateSelectionModal, setIsShowingTemplateSelectionModal] = useState(false);

  const campaignList: Campaign[] = [
    {
      name: "ASEAN Software Engineer 2024",
      id: "498163",
      duration: "1 May 2024 - 31 July 2024",
      targetRecruitmentHeadcount: 25,
      campaignStepsList: [
        "CV Filtering",
        "General Interview",
        "Technical Assessment",
        "Technical Assessment",
        "Hiring Manager Interview",
      ],
    },
    {
      name: "Account Managers Msia 2024",
      id: "498162",
      duration: "15 Feb 2024 - 15 April 2024",
      targetRecruitmentHeadcount: 35,
      campaignStepsList: [
        "CV Filtering",
        "General Interview",
        "Technical Assessment",
        "Hiring Manager Interview",
        "Hiring Manager Interview",
      ],
    },
    {
      name: "ASEAN Mechanical Engineer 2024",
      id: "498161",
      duration: "1 Jan 2024 - 31 March 2024",
      targetRecruitmentHeadcount: 15,
      campaignStepsList: [
        "CV Filtering",
        "Technical Assessment",
        "General Interview",
        "Hiring Manager Interview",
      ],
    },
    {
      name: "ASEAN Software Engineer 2024",
      id: "498160",
      duration: "1 Nov 2023 - 1 Jan 2024",
      targetRecruitmentHeadcount: 5,
      campaignStepsList: [
        "CV Filtering",
        "General Interview",
        "Hiring Manager Interview",
        "Hiring Manager Interview",
      ],
    },
  ];

  const createCampaignHandle = () => {
    navigate("/create-campaign");
  };

  const handleCampaignCardClick = () => {
    navigate("/campaign-process-results");
  };

  return (
    <div className="tw-h-screen tw-w-screen tw-flex tw-flex-col tw-bg-gray-100">
      <AdminNavBar activeIndex={1} />
      <div className="main-container tw-flex tw-flex-col tw-px-10 tw-pt-5 tw-pb-10 tw-overflow-auto">
        <div className="tw-w-full tw-flex tw-justify-between tw-items-center">
          <div className="tw-w-auto tw-flex tw-flex-col">
            <span className="tw-text-gray-400">Pages / Campaign</span>
            <div className="tw-flex tw-items-center">
              <span className="tw-text-black tw-font-bold tw-text-2xl">Campaign List</span>
              <div
                className="tw-h-5 tw-text-black tw-ml-2 tw-cursor-pointer"
                onClick={() => setIsShowingSupportModal(true)}>
                <HelpIcon />
              </div>
            </div>
          </div>
          <button
            className="tw-h-4/5 tw-bg-red-700 tw-rounded-lg tw-flex tw-items-center tw-p-3"
            onClick={() => setIsShowingCreateCampaignModal(true)}>
            <div className="tw-text-white tw-flex tw-items-center">
              <SquareAddIcon />
            </div>
            <span className="tw-text-white tw-text-sm tw-pl-2">Start New Campaign</span>
          </button>
        </div>
        <div className="tw-w-full tw-flex tw-flex-col tw-mt-10">
          <div className="tw-h-fit tw-w-full tw-flex tw-items-center">
            <div className="tw-h-[2.5rem] tw-w-[2.5rem] tw-border tw-border-red-700 tw-rounded-xl tw-text-red-700 tw-p-2">
              <PeopleTwoIcon />
            </div>
            <span className="tw-font-bold tw-text-xl tw-text-black tw-ml-5">Ongoing Campaigns</span>
          </div>
          <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 2xl:tw-grid-cols-3 tw-justify-between tw-gap-12 tw-mt-5">
            {campaignList.map((campaign, index) => (
              <div
                className="tw-bg-white tw-border tw-border-black tw-rounded-lg tw-flex tw-flex-col tw-p-5 tw-pb-10 tw-cursor-pointer"
                onClick={handleCampaignCardClick}>
                <div className="tw-w-full">
                  <span>{"Campaign ID #" + campaign.id}</span>
                </div>
                <img
                  className="tw-h-[10rem] tw-object-cover tw-mt-5"
                  src={require("../../assets/campaign-default-image.png")}></img>
                <div className="tw-flex tw-flex-col tw-mt-5">
                  <span className="tw-font-bold tw-text-lg tw-text-red-700">{campaign.name}</span>
                  <div className="tw-flex tw-mt-3">
                    <div className="tw-flex tw-items-center">
                      <div className="tw-h-[2rem] tw-text-red-700">
                        <CircleCheckIcon />
                      </div>
                      <span className="tw-ml-2">
                        {campaign.targetRecruitmentHeadcount + " new hires"}
                      </span>
                    </div>
                    <div className="tw-flex tw-ml-10 tw-items-center">
                      <div className="tw-h-[2rem] tw-text-red-700">
                        <CalendarIcon />
                      </div>
                      <span className="tw-ml-2">{campaign.duration}</span>
                    </div>
                  </div>
                  <div className="tw-w-full tw-h-fit tw-flex tw-justify-center tw-items-center tw-relative tw-mt-5">
                    <div className="tw-w-full tw-flex tw-justify-between tw-items-start">
                      {campaign.campaignStepsList.map((step, index) => (
                        <div className="tw-w-[3rem] tw-z-10">
                          <div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
                            <svg
                              className="tw-h-[3rem] tw-w-[3rem] tw-text-red-700 tw-flex tw-justify-center tw-items-center"
                              viewBox="0 0 24 24"
                              fill="white"
                              stroke="currentColor"
                              stroke-width="1"
                              stroke-linecap="round"
                              stroke-linejoin="round">
                              {" "}
                              <circle cx="12" cy="12" r="10" />
                            </svg>
                            <span className="tw-w-[3rem] tw-h-[3rem] tw-absolute tw-text-center tw-flex tw-justify-center tw-items-center">
                              {index < 9 ? "0" + (index + 1) : index + 1}
                            </span>
                          </div>
                          <span className="tw-w-full tw-flex tw-justify-center tw-text-sm tw-text-center">
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="tw-h-[2px] tw-w-[95%] tw-bg-red-700 tw-absolute tw-z-1 tw-top-[1.5rem]"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <CommandBar /> */}
      </div>

      {/* Support Section */}
      <div
        className={
          isShowingSupportModal
            ? "tw-h-screen tw-w-screen tw-absolute tw-fixed tw-flex tw-justify-center tw-items-center"
            : "tw-hidden"
        }>
        <div
          className="tw-h-full tw-w-full tw-bg-gray-700 tw-opacity-30 tw-absolute tw-top-0 tw-left-0 tw-z-20"
          onClick={() => setIsShowingSupportModal(false)}></div>
        <div className="tw-h-4/6 tw-w-1/2 tw-px-5 tw-pt-10 tw-pb-5 tw-bg-white tw-rounded-xl tw-shadow tw-z-30 tw-overflow-auto">
          <div className="tw-w-full tw-flex tw-justify-between tw-items-center">
            <span className="tw-font-bold tw-text-2xl">
              Welcome to the Admin Campaign List Page!
            </span>
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

      {/* Create Campaign Template Section */}
      <div
        className={
          isShowingCreateCampaignModal
            ? "tw-h-screen tw-w-screen tw-absolute tw-fixed tw-flex tw-justify-center tw-items-center"
            : "tw-hidden"
        }>
        <div
          className="tw-h-full tw-w-full tw-bg-gray-700 tw-opacity-30 tw-absolute tw-top-0 tw-left-0 tw-z-20"
          onClick={() => setIsShowingCreateCampaignModal(false)}></div>
        <div className="tw-h-fit tw-w-[30%] tw-px-10 tw-pt-10 tw-pb-5 tw-bg-white tw-rounded-xl tw-shadow tw-z-30 tw-flex tw-flex-col tw-overflow-auto">
          <span className="tw-w-full tw-font-bold tw-text-3xl tw-text-black tw-text-center tw-mb-10">
            Create New Campaign
          </span>
          <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-px-10">
            <div className="tw-w-full tw-flex tw-flex-col tw-items-center">
              <button
                className="tw-w-full tw-border tw-border-red-700 tw-rounded tw-rounded-xl tw-bg-white tw-text-red-700 tw-text-center tw-py-2 tw-px-8 tw-mb-5"
                onClick={() => navigate("/create-campaign")}>
                Create Campaign
              </button>
            </div>
            <div className="tw-w-full tw-flex tw-justify-center tw-mb-5">
              <button
                className="tw-w-full tw-rounded tw-rounded-xl tw-bg-red-700 tw-text-white tw-text-center tw-py-2 tw-px-8"
                onClick={() => {setIsShowingCreateCampaignModal(false);setIsShowingTemplateSelectionModal(true);}}>
                Create From Template
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Template Section */}
      <div
        className={
          isShowingTemplateSelectionModal
            ? "tw-h-screen tw-w-screen tw-absolute tw-fixed tw-flex tw-justify-center tw-items-center"
            : "tw-hidden"
        }>
        <div
          className="tw-h-full tw-w-full tw-bg-gray-700 tw-opacity-30 tw-absolute tw-top-0 tw-left-0 tw-z-20"
          onClick={() => setIsShowingTemplateSelectionModal(false)}></div>
        <div className="tw-h-[40%] tw-w-[30%] tw-px-10 tw-pt-10 tw-pb-5 tw-bg-white tw-rounded-xl tw-shadow tw-z-30 tw-flex tw-flex-col tw-overflow-auto">
          <span className="tw-w-full tw-font-bold tw-text-3xl tw-text-black tw-text-center tw-mb-10">
            Select Campaign Template
          </span>
          <div className="tw-w-full tw-flex tw-flex-col tw-px-5">
            <div className="tw-flex tw-flex-col tw-cursor-pointer hover:tw-bg-gray-300" onClick={() => navigate("/create-campaign/1")}>
              <div className="tw-h-[2px] tw-w-full tw-bg-gray-400" />
              <span className="tw-py-3 tw-px-2">Sofware Engineer Campaign Template</span>
              <div className="tw-h-[2px] tw-w-full tw-bg-gray-400" />
            </div>
            <div className="tw-flex tw-flex-col tw-cursor-pointer hover:tw-bg-gray-300" onClick={() => navigate("/create-campaign/1")}>
              <span className="tw-py-3 tw-px-2">Account Manager Campaign Template</span>
              <div className="tw-h-[2px] tw-w-full tw-bg-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <CommandBar />
    </div>
  );
}

export default CampaignListPage;
