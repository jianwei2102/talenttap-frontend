import { UserNavBar} from "../../components";
import { useEffect, useState } from "react";
import Card from "../../components/HomeCampaignCard.tsx";
import MorePageNavigation from "../../components/MorePageNavigation.tsx";
import React from "react";
import {getAll} from "../../models/campaigns.js"
import { Modal } from "react-bootstrap"; 

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

function CookiesPopup({ onAccept }) {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    onAccept();
  };

  if (!accepted) {
    return (
      <Modal show={true} centered backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Cookies Consent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            This website uses cookies or similar technologies, to enhance your
            browsing experience and provide personalized recommendations. By
            continuing to use our website, you agree to our{' '}
            <a href="#" className="underline">
              Privacy Policy
            </a>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={handleAccept}>
            I Accept
          </button>
        </Modal.Footer>
      </Modal>
    );
  }

  return null; // No need to render anything if the user has accepted
}

function UserHomePage() {
  const [activeCampaignIndex, setActiveCampaignIndex] = useState(0);
  const campaignsPerPage = 6
  const [currentPageIndex, setCurrentPageIndex] = useState(0); // Default to the first page
  const [totalPages, setTotalPages] = useState(0); // Initialize totalPages
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  const showOngoingCampaigns = () => {
    setActiveCampaignIndex(0);
  };

  const showAppliedCampaigns = () => {
    setActiveCampaignIndex(1);
  };

  const handleAcceptCookies = () => {
    setCookiesAccepted(true);
  };

  // TODO: Get data and populate the array
  useEffect(() => {
    const fetchData = async () => {
      const results = await getAll();
      setCampaigns(results);
      // TODO: Get data and calculate total number of pages needed (6 campaigns per page)
      const totalPagesCalculated = Math.ceil(results.length / campaignsPerPage);
      setTotalPages(totalPagesCalculated);
    };
    fetchData();
  }, []);

    return (
    <>
      {!cookiesAccepted && <CookiesPopup onAccept={handleAcceptCookies} />}
      <div className="tw-h-screen tw-w-screen tw-absolute tw-flex tw-flex-col">
      <UserNavBar activeIndex={0} />
      <div className="main-container tw-w-full tw-flex tw-flex-col tw-items-center tw-pl-28 tw-pr-28">
        <div className="tw-w-full tw-h-10 tw-flex tw-justify-between tw-relative tw-fixed tw-mt-5">
          <div
            id="campaign-switch"
            className="tw-w-2/6 tw-flex tw-justify-center tw-items-center tw-border tw-border-stone-400 tw-rounded-md tw-p-1">
            <div
              className={
                activeCampaignIndex === 0
                  ? "tw-bg-red-700 tw-text-white tw-text-sm tw-text-center tw-mr-2 tw-flex tw-justify-center tw-items-center tw-p-1 tw-rounded-md tw-h-full tw-w-5/6 tw-cursor-pointer"
                  : "tw-bg-white tw-text-black tw-text-sm tw-text-center tw-mr-2 tw-flex tw-justify-center tw-items-center tw-p-1 tw-h-full tw-w-5/6 tw-cursor-pointer"
              }
              onClick={showOngoingCampaigns}>
              Ongoing Campaign
            </div>
            <div
              className={
                activeCampaignIndex === 1
                  ? "tw-bg-red-700 tw-text-white tw-text-sm tw-text-center tw-flex tw-justify-center tw-items-center tw-p-1 tw-rounded-md tw-h-full tw-w-5/6 tw-cursor-pointer"
                  : "tw-bg-white tw-text-black tw-text-sm tw-text-center tw-flex tw-justify-center tw-items-center tw-p-1 tw-h-full tw-w-5/6 tw-cursor-pointer"
              }
              onClick={showAppliedCampaigns}>
              Applied Campaign
            </div>
          </div>
          <div className="tw-w-3/4 tw-h-full tw-flex tw-justify-between tw-items-center tw-ml-40">
            <div className="tw-w-2/6 tw-h-full tw-border tw-border-stone-400 tw-rounded-md tw-flex tw-items-center tw-pl-1">
              <svg
                className="tw-h-4/6 tw-w-auto tw-text-red-500"
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
                className="tw-w-5/6 tw-text-xs tw-w-full tw-pl-2 tw-pt-1.5 tw-pb-1.5 tw-border-none"
                type="text"
                placeholder="Search by job title or keyword"></input>
            </div>
            <div className="tw-w-2/6 tw-h-full tw-border tw-border-stone-400 tw-rounded-md tw-flex tw-items-center tw-pl-1">
              <svg
                className="tw-h-4/6 tw-text-red-500"
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
                className="tw-w-5/6 tw-text-xs tw-w-full tw-pl-2 tw-pt-1.5 tw-pb-1.5 tw-border-none"
                type="text"
                placeholder="All locations"></input>
            </div>
            <button className="tw-w-1/4 tw-bg-red-700 tw-text-center tw-text-white tw-text-md tw-p-2 tw-border tw-rounded-md">
              SEARCH
            </button>
          </div>
        </div>
        <div className="home-main-container tw-overflow-auto tw-mt-10">
          <div className="tw-h-auto home-grid">
            {campaigns.map((campaign, index) => (
              <div key={index}>
                <Card name={campaign.name} location={campaign.location} type={campaign.department} experienceRequirement={campaign.requirement} imageSrc={campaign.image}/>
              </div>
            ))}
          </div>
        </div>
        <div className="tw-absolute tw-bottom-10">
          <MorePageNavigation currentActivePageIndex={currentPageIndex} totalPages={totalPages} />
        </div>
      </div>
    </div>
    </>
  );
}

export default UserHomePage;