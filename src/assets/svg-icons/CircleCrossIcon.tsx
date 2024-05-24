import React from "react";

function CircleCrossIcon() {
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
			<path stroke="none" d="M0 0h24v24H0z" /> <circle cx="12" cy="12" r="9" />{" "}
			<path d="M10 10l4 4m0 -4l-4 4" />
		</svg>
	);
}

export default CircleCrossIcon;
