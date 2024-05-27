import React from "react";

function GridIcon() {
  return (
    <svg
      className="tw-h-full tw-w-fit"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round">
      {" "}
      <path stroke="none" d="M0 0h24v24H0z" /> <rect x="4" y="4" width="6" height="6" rx="1" />{" "}
      <rect x="14" y="4" width="6" height="6" rx="1" />{" "}
      <rect x="4" y="14" width="6" height="6" rx="1" />{" "}
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </svg>
  );
}

export default GridIcon;