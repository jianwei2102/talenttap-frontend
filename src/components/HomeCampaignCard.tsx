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
    <div className="tw-w-full tw-h-48 tw-border tw-border-stone-400 tw-rounded tw-flex tw-justify-between tw-p-5">
      <div className="tw-w-4/6 tw-flex tw-flex-col tw-mr-2">
        <span className="tw-text-xl tw-text-red-700 tw-font-bold tw-mb-3">{name}</span>
        <div className="tw-h-5/6 tw-flex tw-flex-col tw-justify-around">
          <div className="tw-h-auto tw-w-full tw-mb-2 tw-flex tw-items-center">
            <svg
              className="tw-h-5 tw-w-5 tw-text-red-500"
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
            <span className="tw-text-md tw-ml-2">{location}</span>
          </div>
          <div className="tw-h-auto tw-mb-2 tw-flex tw-items-center">
            <svg
              className="tw-h-5 tw-w-5 tw-text-red-500"
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
            <span className="tw-text-md tw-ml-2">{type}</span>
          </div>
          <div className="tw-h-auto tw-mb-2 tw-flex tw-items-center">
            <svg
              className="tw-h-5 tw-w-5 tw-text-red-500"
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
            <span className="tw-text-md tw-ml-2">{experienceRequirement}</span>
          </div>
        </div>
      </div>
      <img
        className="tw-w-2/6 tw-object-contain"
        alt="campaign picture"
        src={imageSrc}></img>
    </div>
  );
}

export default HomeCampaignCard;
