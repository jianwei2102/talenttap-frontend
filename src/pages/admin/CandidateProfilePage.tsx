import React, { useState } from "react";
import {
	PieChart,
	Pie,
	Tooltip,
	Label,
	Legend,
	ResponsiveContainer,
	LineChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Line,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	Radar,
} from "recharts";
import ProgressBar from "react-bootstrap/ProgressBar";
import {
	CircleCheckIcon,
	CircleCrossIcon,
	NeutralEmojiIcon,
	RobotIcon,
	SadEmojiIcon,
	SmileyEmojiIcon,
} from "../../assets/index.js";
import AdminNavBar from "../../components/admin/AdminNavBar.tsx";

interface CandidateInformation {
	name: string;
	dateOfBirth: string;
	gender: string;
	nationality: string;
	religion: string;
	linkedInLink: string;
	socialMediaLink: { socialMedia: string; link: string }[];
	resumeLink: string;
	imageSource: string;
	suitabilityScore: number;
}

interface PersonalityTrait {
	trait: string;
	percentage: number;
}

interface Strength {
	category: string;
	description: string;
}

interface WorkExperience {
	companyName: string;
	position: string;
	duration: string;
	details: string[];
}

interface MotivationAndInterest {
	category: string;
	description: string;
}

interface SideProject {
	name: string;
	description: string;
}

interface PotentialGrowthArea {
	category: string;
	description: string;
}

interface Skill {
	category: string;
	description: string;
}

interface SkillGap {
	category: string;
	description: string;
}

function CandidateProfilePage() {
	// Candidate Information Initalization
	const candidateInformation: CandidateInformation = {
		name: "Jane Doe",
		dateOfBirth: "01/01/2000",
		gender: "Female",
		nationality: "Malaysian",
		religion: "Buddhist",
		linkedInLink: "https://www.google.com",
		socialMediaLink: [{ socialMedia: "Instagram", link: "https://www.instagram.com" }],
		resumeLink: "https://www.google.com",
		imageSource: "",
		suitabilityScore: 80,
	};
	const campaignName = "ASEAN Software Engineer Position 2024";
	const interviewStatus = "Completed";
	const approvalStatus = "Approved";
	const appliedRole = "Software Engineer";
	const personalityTraitList: PersonalityTrait[] = [
		{ trait: "Agreeableness", percentage: 50 },
		{ trait: "Openness", percentage: 85 },
		{ trait: "Conscientiousness", percentage: 15 },
		{ trait: "Extraversion", percentage: 35 },
		{ trait: "Neuroticism", percentage: 5 },
	];
	const strengthList: Strength[] = [
		{
			category: "Leadership and Management Skills",
			description: "Successful project manager with a track record of on-time delivery.",
		},
		{
			category: "Adaptability and Flexibility",
			description: "Quick to adapt to new technologies.",
		},
		{ category: "Communication Skills", description: "Strong, persuasive negotiator." },
	];
	const workExperienceList: WorkExperience[] = [
		{
			companyName: "FusionEx",
			position: "Marketing Manager",
			duration: "25 November 2020 - 11 October 2023",
			details: [
				"Developed and implemented a new digital marketing strategy.",
				"Spearheaded the launch of a new product line that increased company revenue by 20%.",
			],
		},
	];
	const motivationAndInterestList: MotivationAndInterest[] = [
		{
			category: "Volunteering/ Community Service",
			description: "Engagement in community service or non-profit organizations.",
		},
		{
			category: "Arts and Culture",
			description: "Interest in activities like painting, music, theater, or literature.",
		},
	];
	const sideProjectList: SideProject[] = [];
	const potetialGrowthAreaList: PotentialGrowthArea[] = [
		{
			category: "Negotiation and Persuasion Skills",
			description:
				"Focusing on advanced negotiation techniques to ensure the best terms in sales agreements while maintaining positive client relationships.",
		},
		{
			category: "Product Knowledge and Expertise",
			description:
				"Deepening knowledge about HILTI power tools being sold, including technical details, to better address client queries and provide comprehensive solutions.",
		},
	];
	const skillList: Skill[] = [
		{
			category: "Market Analysis",
			description: "Ability to analyze market trends and adapt sales strategies accordingly.",
		},
	];
	const skillGapList: SkillGap[] = [
		{
			category: "CRM Software Proficiency",
			description:
				"Limited experience in using Customer Relationship Management (CRM) tools effectively.",
		},
	];
	const interviewComponentList = [
		{name: "General Interview", isCompleted: true},
		{name: "Technical Assessment Interview", isCompleted: true},
		{name: "Hiring Manager Interview", isCompleted: false},
		{name: "CIO Interview", isCompleted: false},
	];

	// States for the Candidate Profile Page
	const [activeComponentIndex, setActiveComponentIndex] = useState(0);

	const handleProfileComponentButtonClick = (event) => {
		if (activeComponentIndex !== Number(event.currentTarget.getAttribute("data-component-index"))) {
			setActiveComponentIndex(Number(event.currentTarget.getAttribute("data-component-index")));
		}
	};

	const GeneralInformationComponent = () => {
		return (
			<div
				id="general-information-container"
				className="tw-flex tw-flex-col tw-flex-wrap tw-mt-2 tw-mb-16">
				<span className="tw-font-bold tw-text-xl">General Information</span>
				<div className="tw-flex tw-justify-between tw-mt-5">
					<div className="tw-flex tw-flex-col">
						<div className="tw-flex tw-mt-3">
							<span className="tw-font-bold tw-text-lg">
								{"Interview Status: " + interviewStatus}
							</span>
							<span className="tw-font-bold tw-text-lg tw-ml-24">
								{"Approval Status: " + approvalStatus}
							</span>
						</div>
						<div className="tw-flex tw-flex-col tw-mt-10">
							<span className="tw-font-bold tw-text-lg">Applied Role</span>
							<span className="tw-bg-white tw-rounded-xl tw-p-2 tw-text-2xl tw-font-bold tw-mt-2">
								{appliedRole}
							</span>
						</div>
					</div>
					<div className="tw-w-1/6 tw-flex tw-flex-col tw-mt-3">
						<span className="tw-font-bold tw-text-lg tw-mb-3">Suitability Score</span>
						<ResponsiveContainer className="tw-w-full tw-h-full">
							<PieChart>
								<Pie
									data={[
										{
											name: "suitability",
											score: candidateInformation.suitabilityScore,
											fill: "green",
										},
										{
											name: "no value",
											score: 100 - candidateInformation.suitabilityScore,
											fill: "white",
										},
									]}
									cx="50%"
									cy="50%"
									dataKey="score"
									outerRadius={50}
									innerRadius={30}
									fill="#fff"
									startAngle={-270}>
									<Label
										value={candidateInformation.suitabilityScore}
										position="center"
										style={{ fontWeight: "bold", fontSize: "2rem" }}
									/>
								</Pie>
							</PieChart>
						</ResponsiveContainer>
					</div>
				</div>
				<div className="tw-flex tw-mt-10 tw-justify-between">
					<div className="tw-w-[45%] tw-flex tw-flex-col">
						<span className="tw-text-lg tw-font-bold">Personality</span>
						<div
							id="personality-traits-container"
							className="tw-h-full tw-bg-white tw-rounded tw-p-3">
							{personalityTraitList.map((personalityTrait, index) => (
								<div className="tw-w-full tw-h-fit">
									<span className="tw-mb-1">{personalityTrait.trait}</span>
									<ProgressBar
										now={personalityTrait.percentage}
										variant={"success"}
										label={`${personalityTrait.percentage}%`}
									/>
								</div>
							))}
						</div>
					</div>
					<div className="tw-w-[45%] tw-flex tw-flex-col">
						<span className="tw-text-lg tw-font-bold">Strengths</span>
						<div id="strengths-container" className="tw-h-full tw-bg-white tw-rounded tw-p-3">
							{
								strengthList.length < 1 ? <div className="tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center">No strengths for the candidate is found.</div> : strengthList.map((strength, index) => (
									<div className="tw-w-full tw-h-fit tw-flex tw-flex-col tw-mb-3">
										<span className="tw-font-bold tw-text-lg tw-mb-2">{strength.category}</span>
										<span className="tw-text-md">{strength.description}</span>
									</div>
								))
							}
						</div>
					</div>
				</div>
				<div className="tw-w-full tw-flex tw-flex-col tw-mt-10">
					<span className="tw-font-bold tw-text-lg">Work Experience</span>
					{workExperienceList.length < 1 ? <div className="tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center">No work experience for the candidate is found.</div> :workExperienceList.map((workExperience, index) => (
						<div className="tw-w-full tw-bg-white tw-rounded tw-flex tw-flex-col tw-justify-center tw-p-3">
							<span className="tw-font-bold tw-text-lg">{workExperience.companyName}</span>
							<span>{"Position: " + workExperience.position}</span>
							<span>{"Duration: " + workExperience.duration}</span>
							<span>Details: </span>
							{workExperience.details.map((detail, index) => (
								<span>{"- " + detail}</span>
							))}
						</div>
					))}
				</div>
				<div className="tw-w-full tw-flex tw-justify-between tw-mt-10">
					<div className="tw-h-full tw-w-[45%] tw-flex tw-flex-col">
						<span className="tw-text-lg tw-font-bold">Motivation & Interests</span>
						<div className="tw-h-full tw-w-full tw-bg-white tw-rounded tw-flex tw-flex-col tw-p-3">
							{motivationAndInterestList.length < 1 ? <div className="tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center">No motivations and interests for the candidate is found.</div> : motivationAndInterestList.map((item, index) => (
								<div className="tw-flex tw-flex-col tw-mb-5">
									<span className="tw-font-bold">{item.category}</span>
									<span>{item.description}</span>
								</div>
							))}
						</div>
					</div>
					<div className="tw-h-full tw-w-[45%] tw-flex tw-flex-col">
						<span className="tw-text-lg tw-font-bold">Side Project</span>
						<div className="tw-h-full tw-w-full tw-bg-white tw-rounded tw-flex tw-flex-col tw-p-3">
							{sideProjectList.length < 1 ? <div className="tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center">No side projects for the candidate is found.</div> : sideProjectList.map((item, index) => (
								<div className="tw-flex tw-flex-col tw-mb-5">
									<span className="tw-font-bold">{item.name}</span>
									<span>{item.description}</span>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="tw-w-full tw-flex tw-flex-col tw-mt-10">
					<span className="tw-font-bold tw-text-lg">Potential Growth Area</span>
					{potetialGrowthAreaList.length < 1 ? <div className="tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center">No potential growth area for the candidate is found.</div> : potetialGrowthAreaList.map((potential, index) => (
						<div className="tw-w-full tw-bg-white tw-rounded tw-flex tw-flex-col tw-justify-center tw-p-3">
							<span className="tw-font-bold tw-text-lg">{potential.category}</span>
							<span>{"Position: " + potential.description}</span>
						</div>
					))}
				</div>
				<div className="tw-w-full tw-flex tw-justify-between tw-mt-10">
					<div className="tw-h-full tw-w-[45%] tw-flex tw-flex-col">
						<span className="tw-text-lg tw-font-bold">Skills</span>
						<div className="tw-h-full tw-w-full tw-bg-white tw-rounded tw-flex tw-flex-col tw-p-3">
							{skillList.length < 1 ? <div className="tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center">No skills for the candidate is found.</div> : skillList.map((skill, index) => (
								<div className="tw-flex tw-flex-col tw-mb-5">
									<span className="tw-font-bold">{skill.category}</span>
									<span>{skill.description}</span>
								</div>
							))}
						</div>
					</div>
					<div className="tw-h-full tw-w-[45%] tw-flex tw-flex-col">
						<span className="tw-text-lg tw-font-bold">Skill Gap</span>
						<div className="tw-h-full tw-w-full tw-bg-white tw-rounded tw-flex tw-flex-col tw-p-3">
							{skillGapList.length < 1 ? <div className="tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center">No skill gaps for the candidate is found.</div> : skillGapList.map((skillGap, index) => (
								<div className="tw-flex tw-flex-col tw-mb-5">
									<span className="tw-font-bold">{skillGap.category}</span>
									<span>{skillGap.description}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	};

	const OverallSentimentAndEmotionAnalysisComponent = () => {
		//TODO: Retrieve data for sentiment and analysis
		const aiInsightSummary =
			"The candidate displayed a calm and confident demeanor throughout the assessments. Candidate appeared to be polite and respectful, and answered all questions with relevant answers with a professional manner.";
		const overallSentimentList = [
			{ name: "Positive", value: 48, fill: "#e6b400" },
			{ name: "Negative", value: 30, fill: "#8b0000" },
			{ name: "Neutral", value: 22, fill: "#f5f5dc" },
		];
		const sentimentOverTimeDataList = [
			{ time: 0, Positive: 30, Negative: 30, Neutral: 40 },
			{ time: 1, Positive: 20, Negative: 30, Neutral: 50 },
			{ time: 2, Positive: 40, Negative: 40, Neutral: 20 },
			{ time: 3, Positive: 30, Negative: 10, Neutral: 60 },
			{ time: 4, Positive: 10, Negative: 20, Neutral: 70 },
			{ time: 5, Positive: 40, Negative: 30, Neutral: 30 },
		];
		const overallEmotionDataList = [
			{ emotion: "Energetic", value: 80, fullValue: 100 },
			{ emotion: "Concentrated", value: 50, fullValue: 100 },
			{ emotion: "Confident", value: 35, fullValue: 100 },
			{ emotion: "Thoughtful", value: 15, fullValue: 100 },
			{ emotion: "Stressful", value: 45, fullValue: 100 },
			{ emotion: "Uneasy", value: 55, fullValue: 100 },
			{ emotion: "Emotional", value: 60, fullValue: 100 },
			{ emotion: "Passionate", value: 90, fullValue: 100 },
		];
		const sentimentScoreData = 4.5;
		const sentimentScoreDataList = [
			{ name: "Negative", value: 2, fill: "#8b0000" },
			{ name: "Neutral", value: 1, fill: "#f5f5dc" },
			{ name: "Positive", value: 2, fill: "#e6b400" },
		];

		// Data to display arrow on overall sentiment gauge chart
		const arrowData = [
			{ value: sentimentScoreData },
			{ value: 0 },
			{ value: 5 - sentimentScoreData },
		];
		const RADIAN = Math.PI / 180;
		const width = 500;
		const Arrow = (props) => {
			//eslint-disable-line react/no-multi-comp
			const { cx, cy, midAngle, outerRadius } = props;
			const sin = Math.sin(-RADIAN * midAngle);
			const cos = Math.cos(-RADIAN * midAngle);
			const mx = cx + (outerRadius + width * 0.03) * cos;
			const my = cy + (outerRadius + width * 0.03) * sin;
			return (
				<g>
					<path
						d={`M${cx},${cy}L${mx},${my}`}
						strokeWidth="6"
						stroke="black"
						fill="none"
						strokeLinecap="round"
					/>
					<circle cx={cx} cy={cy} r={width * 0.1} fill="white" stroke="none" />
				</g>
			);
		};

		return (
			<div
				id="overall-sentiment-and-emotion-analysis-container"
				className="tw-flex tw-flex-col tw-mt-2 tw-mb-16">
				<span className="tw-font-bold tw-text-xl">Overall Sentiment & Emotion Analysis</span>
				<div className="tw-w-full tw-flex tw-flex-col tw-border tw-border-red-700 tw-p-3 tw-rounded-lg tw-mt-5">
					<div className="tw-flex tw-items-center">
						<div className="tw-text-red-700 tw-mr-2">
							<RobotIcon />
						</div>
						<span className="tw-font-bold tw-font-lg">AI Insights - Summary</span>
					</div>
					<div className="tw-mt-5">{aiInsightSummary}</div>
				</div>
				<div className="tw-w-full tw-flex tw-justify-between tw-mt-5">
					<div className="tw-w-[40%] tw-flex tw-flex-col tw-rounded-lg tw-bg-white tw-px-3 tw-py-5">
						<div className="tw-flex tw-justify-between tw-items-center">
							<span className="tw-font-bold tw-text-lg">Personality</span>
							<div className="tw-text-red-700">
								<RobotIcon />
							</div>
						</div>
						<div className="tw-full tw-mt-3">
							{personalityTraitList.map((personalityTrait, index) => (
								<div className="tw-w-full tw-h-fit">
									<span className="tw-mb-1">{personalityTrait.trait}</span>
									<ProgressBar
										now={personalityTrait.percentage}
										variant={"success"}
										label={`${personalityTrait.percentage}%`}
									/>
								</div>
							))}
						</div>
					</div>
					<div className="tw-w-[55%] tw-h-full tw-flex tw-flex-col tw-rounded-lg tw-bg-white tw-px-3 tw-py-5">
						<div className="tw-w-full tw-flex tw-justify-between tw-items-center">
							<span className="tw-font-bold tw-text-lg">Overall Sentiment</span>
							<div className="tw-text-red-700">
								<RobotIcon />
							</div>
						</div>
						<div className="tw-w-full tw-h-full tw-flex tw-justify-between tw-items-center">
							<ResponsiveContainer className="tw-w-full tw-h-full">
								<PieChart>
									<Tooltip />
									<Pie
										data={overallSentimentList}
										dataKey="value"
										outerRadius={80}
										innerRadius={60}
										startAngle={-270}
										fill="#fff"></Pie>
									<Legend
										layout="horizontal"
										verticalAlign="bottom"
										align="center"
										iconType="circle"
										formatter={(value, entry, index) => (
											<span className="tw-text-black tw-m-2">{value}</span>
										)}
									/>
								</PieChart>
							</ResponsiveContainer>
						</div>
					</div>
				</div>
				<div className="tw-h-[20rem] tw-w-full tw-flex tw-flex-col tw-mt-5 tw-rounded-lg tw-bg-white tw-p-3">
					<div className="tw-flex tw-justify-between">
						<span className="tw-font-bold tw-text-lg">Sentiment Over Time</span>
						<div className="tw-text-red-700">
							<RobotIcon />
						</div>
					</div>
					<div className="tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center tw-mt-3">
						<ResponsiveContainer className="tw-w-full tw-h-full">
							<LineChart data={sentimentOverTimeDataList}>
								<CartesianGrid />
								<XAxis dataKey="time" interval={"preserveStartEnd"}></XAxis>
								<YAxis></YAxis>
								<Legend
									layout="horizontal"
									verticalAlign="bottom"
									align="center"
									formatter={(value, entry, index) => (
										<span className="tw-text-black tw-m-2">{value}</span>
									)}
								/>
								<Tooltip />
								<Line dataKey="Positive" stroke="#e6b400"></Line>
								<Line dataKey="Negative" stroke="#8b0000"></Line>
								<Line dataKey="Neutral" stroke="#000000"></Line>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>
				<div className="tw-w-full tw-flex tw-justify-between tw-mt-5">
					<div className="tw-w-[45%] tw-h-[20rem] tw-bg-white tw-rounded-lg tw-px-3 tw-py-5 tw-flex tw-flex-col">
						<div className="tw-flex tw-justify-between tw-items-center">
							<span className="tw-font-bold tw-text-lg">Overall Emotion</span>
							<div className="tw-text-red-700">
								<RobotIcon />
							</div>
						</div>
						<div className="tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center tw-mt-3">
							<ResponsiveContainer className="tw-w-full tw-h-full">
								<RadarChart outerRadius={100} data={overallEmotionDataList}>
									<Tooltip />
									<PolarGrid />
									<PolarAngleAxis dataKey={"emotion"} />
									<PolarRadiusAxis />
									<Radar dataKey="value" stroke="#8b0000" fill="#8b0000" fillOpacity={0.6} />
								</RadarChart>
							</ResponsiveContainer>
						</div>
					</div>
					<div className="tw-w-[50%] tw-h-[20rem] tw-bg-white tw-rounded-lg tw-px-3 tw-py-5 tw-flex tw-flex-col">
						<span className="tw-font-bold tw-text-lg">Sentiment Score</span>
						<div className="tw-w-full tw-h-full tw-mt-3">
							<ResponsiveContainer className="tw-w-full tw-h-full">
								<PieChart>
									<Pie
										stroke="none"
										data={sentimentScoreDataList}
										dataKey="value"
										innerRadius={80}
										outerRadius={100}
										startAngle={180}
										endAngle={0}
										cx="50%"
										cy="75%"
									/>
									<Pie
										stroke="none"
										fill="none"
										activeIndex={1}
										activeShape={Arrow}
										data={arrowData}
										dataKey="value"
										startAngle={180}
										endAngle={0}
										cx="50%"
										cy="75%">
										<Label
											value={sentimentScoreData}
											position="centerBottom"
											className="tw-font-bold tw-text-black tw-text-lg"
										/>
									</Pie>
								</PieChart>
							</ResponsiveContainer>
						</div>
						<div className="tw-w-full tw-h-1/6 tw-relative tw-bottom-5 tw-flex tw-justify-center tw-items-center">
							{sentimentScoreData <= 2 ? (
								<SadEmojiIcon />
							) : sentimentScoreData >= 4 ? (
								<SmileyEmojiIcon />
							) : (
								<NeutralEmojiIcon />
							)}
							<div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-ml-5">
								<span className="tw-font-bold tw-text-2xl">{sentimentScoreData}</span>
								<span className="tw-text-lg">
									{sentimentScoreData <= 2
										? "Negative"
										: sentimentScoreData >= 4
										? "Positive"
										: "Neutral"}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};

	const ApprovalsComponent = () => {
		//TODO: Retrieve data on approvals
		const approvalList = [
			{
				name: "Clark Kent (Hiring Manager)",
				justification:
					"Candidate shows great knowledge on the market and is very passionate about the job.",
				isApproved: true,
			},
			{
				name: "Diana Doe (Human Resource)",
				justification:
					"Candidate remains respectful and polite throughout all the assessments, conducting herself in a professional manner at all times. Candidate is very humble and displays good teamwork based on her recount on past experiences.",
				isApproved: true,
			},
			{
				name: "Bruce Wayne (Chief Innovation Officer)",
				justification:
					"Candidate is very konwledgeable on the company and its products, has relevant past experience in a similar job position, demonstrates great passion for the field.",
				isApproved: true,
			},
			{
				name: "Robin (Human Resource)",
				justification: "Candidate appears uneasy and not confident.",
				isApproved: false,
			},
		];

		return (
			<div
				id="approvals-component-container"
				className="tw-flex tw-flex-col tw-flex-wrap tw-mt-2 tw-mb-16">
				<span className="tw-text-xl tw-font-bold tw-mb-5">Approvals</span>
				{approvalList.map((approval, index) => (
					<div className="tw-border tw-border-red-700 tw-rounded-lg tw-w-full tw-p-2 tw-mb-5 tw-flex-col">
						<span className="tw-font-bold tw-text-lg">{approval.name}</span>
						<div className="tw-flex tw-justify-between tw-mt-3">
							<div className="tw-w-[75%] tw-flex tw-flex-col">
								<span className="tw-font-bold">Justification: </span>
								<span className="tw-mt-2">{approval.justification}</span>
							</div>
							<div className="tw-w-[20%] tw-flex tw-flex-col">
								<span className="tw-font-bold">Approval: </span>
								<div className="tw-h-[3rem] tw-flex tw-justify-center tw-items-center tw-mt-2">
									{approval.isApproved ? (
										<div className="tw-h-full tw-text-green-700">
											<CircleCheckIcon />
										</div>
									) : (
										<div className="tw-h-full tw-text-red-700">
											<CircleCrossIcon />
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		);
	};

	return (
		<div className="tw-h-screen tw-w-screen tw-flex tw-flex-col">
			<AdminNavBar activeIndex={-1} />
			<div className="main-container tw-flex tw-overflow-auto">
				<div id="profile-navigation" className="tw-w-[20%] tw-flex tw-flex-col tw-py-5 tw-px-3">
					<div className="tw-w-full tw-flex tw-justify-start">
						<button className="tw-bg-red-700 tw-text-white tw-py-2 tw-px-5 tw-rounded-lg">
							Back
						</button>
					</div>
					<div className="tw-h-1/2 tw-w-full tw-flex tw-flex-col tw-justify-center tw-items-center tw-px-5">
						<button
							className={
								activeComponentIndex === 0
									? "tw-h-fit tw-w-full tw-bg-blue-600 tw-text-white tw-text-center tw-py-2 tw-px-3 tw-rounded-lg tw-m-2"
									: "tw-h-fit tw-w-full tw-bg-white tw-text-black tw-border tw-border-black tw-text-center tw-py-2 tw-px-3 tw-rounded-lg tw-m-2"
							}
							data-component-index={0}
							onClick={handleProfileComponentButtonClick}>
							General Information
						</button>
						<button
							className={
								activeComponentIndex === 1
									? "tw-h-fit tw-w-full tw-bg-blue-600 tw-text-white tw-text-center tw-py-2 tw-px-3 tw-rounded-lg tw-m-2"
									: "tw-h-fit tw-w-full tw-bg-white tw-text-black tw-border tw-border-black tw-text-center tw-py-2 tw-px-3 tw-rounded-lg tw-m-2"
							}
							data-component-index={1}
							onClick={handleProfileComponentButtonClick}>
							Overall Sentiment & Emotion Analysis
						</button>
						<button
							className={
								activeComponentIndex === 2
									? "tw-h-fit tw-w-full tw-bg-blue-600 tw-text-white tw-text-center tw-py-2 tw-px-3 tw-rounded-lg tw-m-2"
									: "tw-h-fit tw-w-full tw-bg-white tw-text-black tw-border tw-border-black tw-text-center tw-py-2 tw-px-3 tw-rounded-lg tw-m-2"
							}
							data-component-index={2}
							onClick={handleProfileComponentButtonClick}>
							Approvals
						</button>
					</div>
					<div className="tw-w-full tw-mt-5">
						<span>Interview</span>
						<div className="tw-h-[2px] tw-w-full tw-bg-red-700 tw-mt-2"></div>
					</div>
					<div id="interview-component-navigation" className="tw-w-full tw-h-fit tw-flex tw-flex-col">
						{
							interviewComponentList.map((component, index) =>
								<button className="tw-flex tw-justify-between tw-items-center tw-m-3">
									<span className="tw-h-full tw-w-[75%] tw-text-lg">{component.name}</span>
									<div className="tw-h-full tw-w-[20%] tw-flex tw-items-center tw-justify-center">
										{component.isCompleted ? <div className="tw-text-green-700"><CircleCheckIcon /></div> : <div className="tw-text-red-700"><CircleCrossIcon /></div>}
									</div>
								</button>
							)
						}
					</div>
				</div>
				<div className="tw-w-[2px] tw-h-full tw-bg-gray-300"></div>
				<div
					id="candidate-profile-main-container"
					className="tw-w-[60%] tw-bg-blue-50 tw-flex tw-flex-col tw-p-5 tw-overflow-auto">
					<span className="tw-font-bold tw-text-xl">
						{campaignName + " --- " + candidateInformation.name}
					</span>
					{activeComponentIndex === 0 ? (
						<GeneralInformationComponent />
					) : activeComponentIndex === 1 ? (
						<OverallSentimentAndEmotionAnalysisComponent />
					) : (
						<ApprovalsComponent />
					)}
				</div>
				<div className="tw-w-[2px] tw-h-full tw-bg-gray-300"></div>
				<div
					id="candidate-information"
					className="tw-w-[20%] tw-flex-col tw-items-center tw-overflow-auto">
					<div className="tw-h-1/6 tw-w-full tw-p-3">
						<img
							alt="candidate image"
							src={candidateInformation.imageSource}
							className="tw-object-contain"></img>
					</div>
					<div className="tw-w-full tw-p-3 tw-flex tw-flex-col">
						<span className="tw-font-bold tw-text-lg">Name</span>
						<span>{candidateInformation.name}</span>
					</div>
					<div className="tw-w-full tw-p-3 tw-flex tw-flex-col">
						<span className="tw-font-bold tw-text-lg">Date of Birth</span>
						<span>{candidateInformation.dateOfBirth}</span>
					</div>
					<div className="tw-w-full tw-p-3 tw-flex tw-flex-col">
						<span className="tw-font-bold tw-text-lg">Gender</span>
						<span>{candidateInformation.gender}</span>
					</div>
					<div className="tw-w-full tw-p-3 tw-flex tw-flex-col">
						<span className="tw-font-bold tw-text-lg">Nationality</span>
						<span>{candidateInformation.nationality}</span>
					</div>
					<div className="tw-w-full tw-p-3 tw-flex tw-flex-col">
						<span className="tw-font-bold tw-text-lg">Religion</span>
						<span>{candidateInformation.religion}</span>
					</div>
					<div className="tw-w-full tw-p-3 tw-flex tw-flex-col">
						<span className="tw-font-bold tw-text-lg">LinkedIn</span>
						<a href={candidateInformation.linkedInLink} target="_blank">
							{candidateInformation.linkedInLink}
						</a>
					</div>
					<div className="tw-w-full tw-p-3 tw-flex tw-flex-col">
						<span className="tw-font-bold tw-text-lg">Social Media</span>
						{candidateInformation.socialMediaLink.map((socialMediaItem, index) => (
							<span className="mb-1">
								{socialMediaItem.socialMedia + ": "}
								<a href={socialMediaItem.link} target="_blank">
									{socialMediaItem.link}
								</a>
							</span>
						))}
					</div>
					<div className="tw-w-full tw-p-3 tw-flex tw-flex-col">
						<span className="tw-font-bold tw-text-lg">Resume</span>
						<a href={candidateInformation.resumeLink} target="_blank">
							{candidateInformation.resumeLink}
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CandidateProfilePage;
