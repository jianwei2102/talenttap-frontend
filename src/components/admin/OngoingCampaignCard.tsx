import React from "react";
import {useNavigate} from "react-router-dom";
import CampaignListTile from "../../components/admin/sub/CampaignListTile.tsx";
import { BriefcaseIcon } from "../../assets/index.js";
import { Icon } from "@mui/material";


let mockData = [
  {
    id: 1,
    title: "ASEAN Software Engineer 2024",
    newHire: 20,
    startdate: "Jan 2024",
    endDate: "Dec 2024",
  },
  {
    id: 2,
    title: "Account Managers Msia 2024",
    newHire: 20,
    startdate: "Jan 2024",
    endDate: "Mar 2024",
  },
  {
    id: 3,
    title: "ASEAN Software Engineer 2024",
    newHire: 20,
    startdate: "Apr 2024",
    endDate: "Dec 2024",
  },
  {
    id: 4,
    title: "ASEAN Software Engineer 2024",
    newHire: 20,
    startdate: "Jan 2024",
    endDate: "Dec 2024",
  },  
];

export default function OngoingCampaignCard() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        overflow: "auto",
        // maxHeight: "600px",
      }}
      className="tw-bg-white tw-flex tw-flex-auto tw-flex-col grow tw-p-5 tw-rounded-lg tw-h-full"
    >
      {/* Header Section*/}
      <div className="tw-flex tw-flex-row tw-items-center tw-justify-between tw-mb-5">
        {/* Icon */}
        <div className="tw-border-black tw-border tw-rounded-lg tw-p-1 tw-mr-5 tw-text-red-700">
          <Icon
            color="error" 
            style={{ fontSize:35}}
            sx={{ paddingBottom: 0, marginBottom: -1, fontSize: 100 }}
          >
            <BriefcaseIcon />
          </Icon>
        </div>
        {/* Title */}
        <h1 className="tw-text-2xl tw-font-bold">Ongoing Campaigns</h1>
        {/* Button */}
        <button className="tw-text-red-500 tw-rounded-lg tw-px-2 tw-py-1 tw-ml-auto tw-font-bold" onClick={() => navigate("/campaign-list")}>
          View All
        </button>
      </div>
      {/* List Tile Section*/}
      <div>

        {
          mockData.map(function (campaign) {
            return (
              <CampaignListTile
                id={campaign.id}
                title={campaign.title}
                newHire={campaign.newHire}
                startdate={campaign.startdate}
                endDate={campaign.endDate}
              />
            );
          })
        }
        {/* <CampaignListTile />
        <CampaignListTile />
        <CampaignListTile />
        <CampaignListTile /> */}
      </div>
    </div>
  );
}
