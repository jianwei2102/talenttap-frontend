import UserNavBar from "../../components/UserNavBar.tsx";
import { useEffect, useState } from "react";
import Card from "../../components/HomeCampaignCard.tsx";
import MorePageNavigation from "../../components/MorePageNavigation.tsx";
import React from "react";
import {getAll} from "../../models/campaigns.js"

interface Campaign {
  name: string;
  jobFunction: string;
  positionType:string;
  location:string;
  createdBy:string;
  jobDescription:string;
  image:string;
  requirement:string;
  headcount: number;
  startDate: Date;
  endDate: Date;
  workFlexibility: string;
  department: string;
  expertise: string;
}

function UserHomePage() {
  const [activeCampaignIndex, setActiveCampaignIndex] = useState(0);
  const campaignsPerPage = 6
  const [campaigns, setCampaigns] = useState<Campaign[]>([])

  const showOngoingCampaigns = () => {
    setActiveCampaignIndex(0);
  };

  const showAppliedCampaigns = () => {
    setActiveCampaignIndex(1);
  };

  // TODO: Get data and populate the array
  useEffect(() => {
    const fetchData = async () => {
      const results = await getAll();
      setCampaigns(results);
      // TODO: Get data and calculate total number of pages needed (6 campaigns per page)
      setCurrentPageIndex(Math.ceil(results.length / campaignsPerPage));
    };
    fetchData();
  }, []);

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const totalPages = 3
  return (
    <div className="h-screen w-screen absolute flex flex-col">
      <UserNavBar activeIndex={0} />
      <div className="main-container w-full flex flex-col items-center pl-28 pr-28">
        <div className="w-full h-10 flex justify-between relative fixed mt-5">
          <div
            id="campaign-switch"
            className="w-2/6 flex justify-center items-center border border-stone-400 rounded-md p-1">
            <div
              className={
                activeCampaignIndex === 0
                  ? "bg-red-700 text-white text-sm text-center mr-2 flex justify-center items-center p-1 rounded-md h-full w-5/6 cursor-pointer"
                  : "bg-white text-black text-sm text-center mr-2 flex justify-center items-center p-1 h-full w-5/6 cursor-pointer"
              }
              onClick={showOngoingCampaigns}>
              Ongoing Campaign
            </div>
            <div
              className={
                activeCampaignIndex === 1
                  ? "bg-red-700 text-white text-sm text-center flex justify-center items-center p-1 rounded-md h-full w-5/6 cursor-pointer"
                  : "bg-white text-black text-sm text-center flex justify-center items-center p-1 h-full w-5/6 cursor-pointer"
              }
              onClick={showAppliedCampaigns}>
              Applied Campaign
            </div>
          </div>
          <div className="w-3/4 h-full flex justify-between items-center ml-40">
            <div className="w-2/6 h-full border border-stone-400 rounded-md flex items-center pl-1">
              <svg
                className="h-4/6 w-auto text-red-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round">
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <circle cx="10" cy="10" r="7" />{" "}
                <line x1="21" y1="21" x2="15" y2="15" />
              </svg>
              <input
                id="job-search-input"
                className="w-5/6 text-xs w-full pl-2 pt-1.5 pb-1.5 border-none"
                type="text"
                placeholder="Search by job title or keyword"></input>
            </div>
            <div className="w-2/6 h-full border border-stone-400 rounded-md flex items-center pl-1">
              <svg
                className="h-4/6 text-red-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round">
                {" "}
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />{" "}
                <circle cx="12" cy="10" r="3" />
              </svg>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <input
                id="location-search-input"
                className="w-5/6 text-xs w-full pl-2 pt-1.5 pb-1.5 border-none"
                type="text"
                placeholder="All locations"></input>
            </div>
            <button className="w-1/4 bg-red-700 text-center text-white text-md p-2 border rounded-md">
              SEARCH
            </button>
          </div>
        </div>
        <div className="home-main-container overflow-auto mt-10">
          <div className="grid grid-cols-2 grid-rows-3 gap-16">
            {campaigns.map((campaign, index) => (
              <div key={index}>
                <Card name={campaign.name} location={campaign.location} type={campaign.department} experienceRequirement={campaign.requirement} imageSrc={campaign.image}/>
              </div>
            ))}
          </div>
        </div>
        <div className="fixed absolute bottom-10">
          <MorePageNavigation currentActivePageIndex={currentPageIndex} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}

export default UserHomePage;