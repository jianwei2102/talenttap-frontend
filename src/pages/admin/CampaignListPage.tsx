import React from "react";
import { useNavigate } from "react-router-dom";
import AdminNavBar from "../../components/admin/AdminNavBar.tsx";

function CampaignListPage() {
	const navigate = useNavigate();

	const createCampaignHandle = () => {
		navigate('/create-campaign');
	}

	return (
		<div className="tw-h-screen tw-w-screen tw-flex tw-flex-col">
			<AdminNavBar activeIndex={1} />
			<div className="main-container tw-flex tw-flex-col tw-p-5">
				<div className="tw-w-full tw-flex tw-justify-between tw-items-center">
					<div className="tw-w-auto tw-flex tw-flex-col">
						<span className="tw-text-gray-400">Pages / Campaign</span>
						<span className="tw-text-black tw-font-bold tw-text-2xl">Campaign List</span>
					</div>
					<button className="tw-h-3/4 tw-bg-red-700 tw-rounded-lg tw-flex tw-items-center tw-p-1.5" onClick={createCampaignHandle}>
                    <svg
							className="tw-h-5 tw-w-5 tw-text-white"
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
							<rect x="4" y="4" width="16" height="16" rx="2" />{" "}
							<line x1="9" y1="12" x2="15" y2="12" /> <line x1="12" y1="9" x2="12" y2="15" />
						</svg>
						<span className="tw-text-white tw-text-sm tw-pl-2">Start New Campaign</span>
					</button>
				</div>
				<div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 2xl:tw-grid-cols-3 tw-justify-between tw-gap-12  tw-mt-20"></div>
			</div>
		</div>
	);
}

export default CampaignListPage;
