import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavBar from "../../components/admin/AdminNavBar.tsx";
import StatisticCard from "../../components/admin/StatisticCard.tsx";
import OngoingCampaignCard from "../../components/admin/OngoingCampaignCard.tsx";
import HiringRequestTable from "../../components/admin/HiringRequestTable.tsx";
import GraphCard from "../../components/admin/GraphCard.tsx";
import Icon from "@mui/material/Icon";
import Accordion from "react-bootstrap/Accordion";
import CommandBar from "../../components/CommandBar.tsx";

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

const AdminDashboardPage: React.FC = () => {
	const navigate = useNavigate();

	const handleStartNewCampaignButtonClick = () => {
		navigate("/create-campaign");
	};

	return (
		<div className="tw-h-screen tw-w-screen tw-absolute tw-flex tw-flex-col tw-bg-gray-100">
			<AdminNavBar activeIndex={0} />
			<div className="main-container tw-px-10 tw-overflow-auto">
				{/* Header Section */}
				<div className="tw-flex tw-flex-row tw-w-full tw-justify-between tw-items-center tw-mb-10 tw-mt-10">
					<div>
						<p className="tw-mb-2">Pages / Dashboard</p>
						<h1 className="tw-text-3xl tw-font-bold">Main Dashboard</h1>
					</div>
					<div className="tw-w-auto">
						<button
							className="tw-w-full tw-bg-red-700 tw-text-center tw-text-white tw-text-md tw-p-3 tw-rounded-full"
							onClick={handleStartNewCampaignButtonClick}>
							Start New Campaign
						</button>
					</div>
				</div>

				{/* Statistic Card Section */}
				<div className="tw-grid tw-grid-cols-4 tw-gap-10 tw-grid-flow-row tw-mb-6 tw-w-full">
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
				<div className="tw-flex tw-flex-row tw-justify-between tw-w-full tw-mb-6" style={{ maxHeight: "600px" }}>
					{/* Recruitment Drives */}
					<div className="tw-w-[70%] me-6">
						<GraphCard />
					</div>
					<div className="tw-w-[28%]">
						<OngoingCampaignCard />
					</div>
				</div>

				{/* New Hiring Request Section */}
				<div className="tw-w-full">
					<div className="tw-ml-auto tw-w-[60%]">
						<HiringRequestTable />
					</div>
				</div>
				<CommandBar/>
			</div>
		</div>
	);
}

export default AdminDashboardPage