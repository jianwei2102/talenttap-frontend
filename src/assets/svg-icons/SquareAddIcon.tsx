import React from "react";

function SquareAddIcon() {
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
			<path stroke="none" d="M0 0h24v24H0z" /> <rect x="4" y="4" width="16" height="16" rx="2" />{" "}
			<line x1="9" y1="12" x2="15" y2="12" /> <line x1="12" y1="9" x2="12" y2="15" />
		</svg>
	);
}

export default SquareAddIcon;
