import React from "react";

interface HomeCampaignCardProps {
  name: string;
  location: string;
  type: string;
  experienceRequirement: string;
  imageSrc: string;
}

function HomeCampaignCard({
  name,
  location,
  type,
  experienceRequirement,
  imageSrc,
}: HomeCampaignCardProps) {
  return (
    <div className="w-full h-48 border border-stone-400 rounded flex justify-between p-5">
      <div className="w-4/6 flex flex-col mr-2">
        <span className="text-xl text-red-700 font-bold mb-3">{name}</span>
        <div className="h-5/6 flex flex-col justify-around">
          <div className="h-auto w-full mb-2 flex items-center">
            <svg
              className="h-5 w-5 text-red-500"
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
            <span className="text-md ml-2">{location}</span>
          </div>
          <div className="h-auto mb-2 flex items-center">
            <svg
              className="h-5 w-5 text-red-500"
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
              <line x1="9" y1="6" x2="20" y2="6" />{" "}
              <line x1="9" y1="12" x2="20" y2="12" />{" "}
              <line x1="9" y1="18" x2="20" y2="18" />{" "}
              <line x1="5" y1="6" x2="5" y2="6.01" />{" "}
              <line x1="5" y1="12" x2="5" y2="12.01" />{" "}
              <line x1="5" y1="18" x2="5" y2="18.01" />
            </svg>
            <span className="text-md ml-2">{type}</span>
          </div>
          <div className="h-auto mb-2 flex items-center">
            <svg
              className="h-5 w-5 text-red-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              {" "}
              <circle cx="12" cy="12" r="10" />{" "}
              <line x1="12" y1="16" x2="12" y2="12" />{" "}
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span className="text-md ml-2">{experienceRequirement}</span>
          </div>
        </div>
      </div>
      <img
        className="w-2/6 object-contain"
        alt="../assets/hilti-logo.png"
        src={require("../assets/hilti-logo.png")}></img>
    </div>
  );
}

export default HomeCampaignCard;
