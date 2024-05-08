import React from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CampaignListTile from "../../components/admin/sub/CampaignListTile.tsx";


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
  return (
    <div
      style={{
        overflow: "auto",
        // maxHeight: "600px",
      }}
      className="bg-white flex flex-auto flex-col grow p-5 rounded-lg h-full"
    >
      {/* Header Section*/}
      <div className="flex flex-row items-center justify-between mb-5">
        {/* Icon */}
        <div className="border-black border rounded-lg p-1 mr-5">
          <PersonOutlineIcon classes="" color="error" fontSize="large" />
        </div>
        {/* Title */}
        <h4 className="text-lg font-bold grow">Ongoing Campaigns</h4>
        {/* Button */}
        <button className="text-red-500 rounded-lg px-2 py-1 ml-auto font-bold">
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
