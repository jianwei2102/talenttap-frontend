import React from "react";
import { useNavigate } from "react-router-dom";
import AdminNavBar from "../../components/admin/AdminNavBar.tsx";

function CampaignListPage() {
	const navigate = useNavigate();

	const createCampaignHandle = () => {
		navigate('/create-campaign');
	}

	return (
		<div className="h-screen w-screen flex flex-col">
			<AdminNavBar activeIndex={1} />
			<div className="main-container flex flex-col p-5">
				<div className="w-full flex justify-between items-center">
					<div className="w-auto flex flex-col">
						<span className="text-gray-400">Pages / Campaign</span>
						<span className="text-black font-bold text-2xl">Campaign List</span>
					</div>
					<button className="h-3/4 bg-red-700 rounded-lg flex items-center p-1.5" onClick={createCampaignHandle}>
                    <svg
							className="h-5 w-5 text-white"
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
						<span className="text-white text-sm pl-2">Start New Campaign</span>
					</button>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 justify-between gap-12  mt-20"></div>
			</div>
		</div>
	);
}

export default CampaignListPage;
