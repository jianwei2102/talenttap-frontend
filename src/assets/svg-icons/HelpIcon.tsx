import React from "react";

function HelpIcon() {
  return (
    <svg
      className="tw-h-fit tw-w-full"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round">
      {" "}
      <path stroke="none" d="M0 0h24v24H0z" /> <circle cx="12" cy="12" r="9" />{" "}
      <line x1="12" y1="17" x2="12" y2="17.01" />{" "}
      <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
    </svg>
  );
}

export default HelpIcon;
