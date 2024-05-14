import React from "react";
import { useNavigate } from "react-router-dom";
import AdminNavBar from "../../components/admin/AdminNavBar.tsx";
import StatisticCard from "../../components/admin/StatisticCard.tsx";
import OngoingCampaignCard from "../../components/admin/OngoingCampaignCard.tsx";
import HiringRequestTable from "../../components/admin/HiringRequestTable.tsx";
import GraphCard from "../../components/admin/GraphCard.tsx";
import Icon from "@mui/material/Icon";

let statisticCardDate = [
	{
		title: "Total Employees",
		figure: 35842,
		percentage: 3.1,
		type: "down",
		icon: "person_outline",
	},
	{
		title: "New Hires",
		figure: 1890,
		percentage: 3.1,
		type: "down",
		icon: "person_add",
	},
	{
		title: "New Account Managers",
		figure: 1218,
		percentage: 3.1,
		type: "up",
		icon: "business_center",
	},
	{
		title: "Promotions",
		figure: 289,
		percentage: 3.1,
		type: "down",
		icon: "emoji_people",
	},
];

export default function AdminDashboardPage() {
	const navigate = useNavigate();

	const handleStartNewCampaignButtonClick = () => {
		navigate("/create-campaign");
	};

	return (
		<>
			<div className="h-screen w-screen absolute flex flex-col  pb-5">
				<AdminNavBar activeIndex={0} />
				<div className="mt-10 px-10">
					{/* Header Section */}
					<div className="flex flex-row w-full justify-between items-center mb-10">
						<div>
							<p className="mb-2">Pages / Dashboard</p>
							<h1 className="text-3xl font-bold">Main Dashboard</h1>
						</div>
						<div className="w-auto">
							<button
								className="w-full bg-red-700 text-center text-white text-md p-3 rounded-full"
								onClick={handleStartNewCampaignButtonClick}>
								Start New Campaign
							</button>
						</div>
					</div>

					{/* Statistic Card Section */}
					<div className="grid grid-cols-4 gap-10 grid-flow-row mb-6 w-full">
						{statisticCardDate.map(function (card) {
							return (
								<StatisticCard
									title={card.title}
									figure={card.figure}
									percentage={card.percentage}
									type={card.type}
									icon={card.icon}
								/>
							);
						})}
					</div>
					{/* Recruitment Drives & Ongoing campaign sections */}
					<div className="flex flex-row w-full mb-6" style={{ maxHeight: "600px" }}>
						{/* Recruitment Drives */}
						<div className="w-full me-6">
							<GraphCard />
						</div>
						<div className="min-w-[38%]">
							<OngoingCampaignCard />
						</div>
					</div>

					{/* New Hiring Request Section */}
					<div className="w-full">
						<div className="ml-auto w-[60%]">
							<HiringRequestTable />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
