import React from "react";
import { useNavigate } from "react-router-dom";
import AdminNavBar from "../../components/admin/AdminNavBar.tsx";
import CommandBar from "../../components/CommandBar.tsx";
import { SquareAddIcon, PeopleTwoIcon, CircleCheckIcon, CalendarIcon } from "../../assets/index.js";

interface Campaign {
	name: string;
	id: string;
	duration: string;
	targetRecruitmentHeadcount: number;
	campaignStepsList: string[];
}

function CampaignListPage() {
	const navigate = useNavigate();

	const campaignList: Campaign[] = [
		{
			name: "ASEAN Software Engineer 2024",
			id: "498163",
			duration: "1 May 2024 - 31 July 2024",
			targetRecruitmentHeadcount: 25,
			campaignStepsList: [
				"CV Filtering",
				"General Interview",
				"Technical Assessment",
				"Technical Assessment",
				"Hiring Manager Interview",
			],
		},
		{
			name: "Account Managers Msia 2024",
			id: "498162",
			duration: "15 Feb 2024 - 15 April 2024",
			targetRecruitmentHeadcount: 35,
			campaignStepsList: [
				"CV Filtering",
				"General Interview",
				"Technical Assessment",
				"Hiring Manager Interview",
				"Hiring Manager Interview",
			],
		},
		{
			name: "ASEAN Mechanical Engineer 2024",
			id: "498161",
			duration: "1 Jan 2024 - 31 March 2024",
			targetRecruitmentHeadcount: 15,
			campaignStepsList: [
				"CV Filtering",
				"Technical Assessment",
				"General Interview",
				"Hiring Manager Interview",
			],
		},
		{
			name: "ASEAN Software Engineer 2024",
			id: "498160",
			duration: "1 Nov 2023 - 1 Jan 2024",
			targetRecruitmentHeadcount: 5,
			campaignStepsList: [
				"CV Filtering",
				"General Interview",
				"Hiring Manager Interview",
				"Hiring Manager Interview",
			],
		},
	];

	const createCampaignHandle = () => {
		navigate("/create-campaign");
	};

	return (
		<div className="tw-h-screen tw-w-screen tw-flex tw-flex-col tw-bg-gray-100">
			<AdminNavBar activeIndex={1} />
			<div className="main-container tw-flex tw-flex-col tw-px-10 tw-py-5 tw-overflow-auto">
				<div className="tw-w-full tw-flex tw-justify-between tw-items-center">
					<div className="tw-w-auto tw-flex tw-flex-col">
						<span className="tw-text-gray-400">Pages / Campaign</span>
						<span className="tw-text-black tw-font-bold tw-text-2xl">Campaign List</span>
					</div>
					<button
						className="tw-h-3/4 tw-bg-red-700 tw-rounded-lg tw-flex tw-items-center tw-p-2"
						onClick={createCampaignHandle}>
						<div className="tw-text-white tw-flex tw-items-center">
							<SquareAddIcon />
						</div>
						<span className="tw-text-white tw-text-sm tw-pl-2">Start New Campaign</span>
					</button>
				</div>
				<div className="tw-w-full tw-flex tw-flex-col tw-mt-10">
					<div className="tw-h-fit tw-w-full tw-flex tw-items-center">
						<div className="tw-h-[2.5rem] tw-w-[2.5rem] tw-border tw-border-red-700 tw-rounded-xl tw-text-red-700 tw-p-2">
							<PeopleTwoIcon />
						</div>
						<span className="tw-font-bold tw-text-xl tw-text-black tw-ml-5">Ongoing Campaigns</span>
					</div>
					<div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 2xl:tw-grid-cols-3 tw-justify-between tw-gap-12 tw-mt-5">
						{campaignList.map((campaign, index) => (
							<div className="tw-bg-white tw-border tw-border-black tw-rounded-lg tw-flex tw-flex-col tw-p-5 tw-pb-10">
								<div className="tw-w-full">
									<span>{"Campaign ID #" + campaign.id}</span>
								</div>
								<img
									className="tw-h-[10rem] tw-object-cover tw-mt-5"
									src={require("../../assets/campaign-default-image.png")}></img>
								<div className="tw-flex tw-flex-col tw-mt-5">
									<span className="tw-font-bold tw-text-lg tw-text-red-700">{campaign.name}</span>
									<div className="tw-flex tw-mt-3">
										<div className="tw-flex tw-items-center">
											<div className="tw-h-[2rem] tw-text-red-700">
												<CircleCheckIcon />
											</div>
											<span className="tw-ml-2">
												{campaign.targetRecruitmentHeadcount + " new hires"}
											</span>
										</div>
										<div className="tw-flex tw-ml-10 tw-items-center">
											<div className="tw-h-[2rem] tw-text-red-700">
												<CalendarIcon />
											</div>
											<span className="tw-ml-2">{campaign.duration}</span>
										</div>
									</div>
									<div className="tw-w-full tw-h-fit tw-flex tw-justify-center tw-items-center tw-relative tw-mt-5">
										<div className="tw-w-full tw-flex tw-justify-between tw-items-start">
											{campaign.campaignStepsList.map((step, index) => (
												<div className="tw-w-[3rem] tw-z-10">
													<div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
														<svg
															className="tw-h-[3rem] tw-w-[3rem] tw-text-red-700 tw-flex tw-justify-center tw-items-center"
															viewBox="0 0 24 24"
															fill="white"
															stroke="currentColor"
															stroke-width="1"
															stroke-linecap="round"
															stroke-linejoin="round">
															{" "}
															<circle cx="12" cy="12" r="10" />
														</svg>
														<span className="tw-w-[3rem] tw-h-[3rem] tw-absolute tw-text-center tw-flex tw-justify-center tw-items-center">
															{index < 9 ? "0" + (index + 1) : index + 1}
														</span>
													</div>
													<span className="tw-w-full tw-flex tw-justify-center tw-text-sm tw-text-center">{step}</span>
												</div>
											))}
										</div>
										<div className="tw-h-[2px] tw-w-[95%] tw-bg-red-700 tw-absolute tw-z-1 tw-top-[1.5rem]"></div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				<CommandBar/>
			</div>
		</div>
	);
}

export default CampaignListPage;
