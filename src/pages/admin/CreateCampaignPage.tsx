import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useDrag, useDrop, DndContext, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Accordion from "react-bootstrap/Accordion";
import Dropdown from "react-bootstrap/Dropdown";
import AdminNavBar from "../../components/admin/AdminNavBar.tsx";
import CommandBar from "../../components/CommandBar.tsx";
import {
	GeneralInterviewIcon,
	TechnicalAssessmentIcon,
	HiringManagerInterviewIcon,
	InformationIcon,
	TrashCanIcon,
	CrossIcon,
	RobotIcon,
} from "../../assets/index.js";
import { CustomToggle } from "../../components";
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
// import {fromIni} from "@aws-sdk/credential-providers";

interface CampaignDetails {
	name: string;
	overview: string;
	requirement: string;
	recruitmentHeadcount: number;
	location: string;
	startDuration: string;
	endDuration: string;
	workFlexibility: string;
	department: string;
	expertise: string;
}

interface CampaignStepCardProps {
	interviewType: "General Interview" | "Technical Assessment" | "Hiring Manager Interview";
	name: string;
	index: number;
	moveCard: (hoverIndex: number, dragIndex: number) => void;
}

interface QuestionDetailsCardProps {
	question: string;
	keywordPositiveList: Keyword[];
	keywordNegativeList: Keyword[];
	index: number;
}

interface SectionDetailsCardProps {
	questionList: Question[];
	sectionIndex: number;
	name: string;
}

type Section = {
	questionList: Question[];
	name: string;
};

type Question = {
	question: string;
	keywordPositive: Keyword[];
	keywordNegative: Keyword[];
};

type Keyword = {
	keyword: string;
	weightage: number;
};

type GeneralInterviewInfo = {
	questionList: Question[];
};

type TechnicalAssessmentInfo = {
	sectionList: Section[];
};

type HiringManagerInterviewInfo = {
	interviewTitle: string;
	durationMinutes: number;
	description: string;
};

type InterviewComponent = {
	stepNumber: number;
	name: string;
	type: "General Interview" | "Technical Assessment" | "Hiring Manager Interview";
	interviewInfo: GeneralInterviewInfo | TechnicalAssessmentInfo | HiringManagerInterviewInfo;
};

function CreateCampaignPage() {
	const navigate = useNavigate();

	const [campaignDetails, setCampaignDetails] = useState<CampaignDetails>({
		name: "",
		overview: "",
		requirement: "",
		recruitmentHeadcount: 0,
		location: "",
		startDuration: "",
		endDuration: "",
		workFlexibility: "",
		department: "",
		expertise: "",
	});
	const [campaignInterviewComponentList, setCampaignInterviewComponentList] = useState<
		InterviewComponent[]
	>([]);
	const [activeComponentIndex, setActiveComponentIndex] = useState(0);
	const [activeSubComponentIndex, setActiveSubComponentIndex] = useState(-1);
	const [isShowingAiGenerateQuestionsModal, setIsShowingAiGenerateQuestionModal] = useState(false);
	const [isShowingOneClickPostingModal, setIsShowingOneClickPostingModal] = useState(false);
	const [aiGenerateQuestionModalSectionIndex, setAiGenerateQuestionModalSectionIndex] =
		useState(-1);
	const [wasDragDropped, setWasDragDropped] = useState(false);

	useEffect(() => {
		if (activeSubComponentIndex === -1 && campaignInterviewComponentList.length > 0) {
			setActiveSubComponentIndex(0);
			setActiveComponentIndex(1);
		}
	}, [campaignInterviewComponentList]);

	const handleCreateCampaignButtonClick = () => {
		//TODO: Save campaignDetails and campaignInterviewComponentList (all the data is in these 2 variables)
		setIsShowingOneClickPostingModal(true);
	};

	const handleDiscardButtonClick = () => {
		navigate("/admin");
	};

	const handleCampaignDetailsButtonClick = () => {
		setActiveComponentIndex(0);
		setActiveSubComponentIndex(-1);
	};

	const handleCustomizeInterviewButtonClick = () => {
		setActiveComponentIndex(1);
		setActiveSubComponentIndex(0);
	};

	const handleInterviewComponentInsertionDrop = (interviewType) => {
		let newInterview: InterviewComponent;
		switch (interviewType) {
			case "General Interview":
				let generalInterview: GeneralInterviewInfo = {
					questionList: [],
				};
				newInterview = {
					stepNumber: campaignInterviewComponentList.length,
					interviewInfo: generalInterview,
					name: "General Interview",
					type: "General Interview",
				};
				break;
			case "Technical Assessment":
				let technicalAssessment: TechnicalAssessmentInfo = {
					sectionList: [],
				};
				newInterview = {
					stepNumber: campaignInterviewComponentList.length,
					interviewInfo: technicalAssessment,
					name: "Technical Assessment",
					type: "Technical Assessment",
				};
				break;
			case "Hiring Manager Interview":
				let hiringManagerInterview: HiringManagerInterviewInfo = {
					interviewTitle: "",
					durationMinutes: 30,
					description: "",
				};
				newInterview = {
					stepNumber: campaignInterviewComponentList.length,
					interviewInfo: hiringManagerInterview,
					name: "Hiring Manager Interview",
					type: "Hiring Manager Interview",
				};
		}
		setCampaignInterviewComponentList((items) => [...items, newInterview]);
	};

	const InterviewComponentMainContainer = () => {
		const ref = useRef(null);
		let updatedList = campaignInterviewComponentList;

		const moveCard = useCallback(
			(dragIndex: number, hoverIndex: number) => {
				const dragCard = campaignInterviewComponentList[dragIndex];

				updatedList.splice(dragIndex, 1);
				updatedList.splice(hoverIndex, 0, dragCard);

				return updatedList;
			},
			[campaignInterviewComponentList]
		);

		useEffect(() => {
			if (wasDragDropped) {
				setCampaignInterviewComponentList(updatedList);
			}
			setWasDragDropped(false);
		}, [wasDragDropped]);

		return (
			<div ref={ref} className="tw-w-full tw-flex tw-flex-col tw-items-end">
				{campaignInterviewComponentList.map((component, index) => (
					<InterviewComponentStepCard
						interviewType={component.type}
						index={index}
						name={component.name}
						moveCard={moveCard}
					/>
				))}
			</div>
		);
	};

	const InterviewComponentDropContainer = ({ handleDrop }) => {
		const [{ canDrop, isOver }, drop] = useDrop({
			accept: "InterviewComponentButton",
			drop: () => ({ name: "InterviewComponentDropContainer" }),
			collect: (monitor) => ({
				isOver: monitor.isOver(),
				canDrop: monitor.canDrop(),
			}),
		});

		return (
			<div
				ref={drop}
				className="tw-w-[90%] tw-border-gray-400 tw-border-2 tw-border-dashed tw-p-2 tw-mt-3 tw-text-center">
				Drag and drop to add interview components!
			</div>
		);
	};

	const InterviewComponentStepCard = ({
		interviewType,
		name,
		index,
		moveCard,
	}: CampaignStepCardProps) => {
		const ref = useRef(null);

		const [, drop] = useDrop({
			accept: "InterviewComponentStepCard",
			hover: (item: any, monitor) => {
				const dragIndex = item.index;
				const hoverIndex = index;

				if (dragIndex === hoverIndex) {
					return;
				}

				moveCard(dragIndex, hoverIndex);
				item.index = hoverIndex;
			},
		});

		const [{ isDragging }, drag] = useDrag({
			type: "InterviewComponentStepCard",
			item: { name, index, type: "InterviewComponentStepCard" },
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
			}),
			end: () => setWasDragDropped(true),
		});

		drag(drop(ref));

		const handleInterviewComponentStepCardClick = () => {
			setActiveComponentIndex(1);
			setActiveSubComponentIndex(index);
		};

		return (
			<button
				ref={ref}
				className={
					activeSubComponentIndex === index
						? "tw-w-[90%] tw-flex tw-items-center tw-rounded-3xl tw-p-2 tw-mt-3 tw-bg-red-700 tw-text-white"
						: "tw-w-[90%] tw-flex tw-items-center tw-rounded-3xl tw-p-2 tw-mt-3 tw-bg-white tw-border tw-border-black tw-text-black"
				}
				draggable
				onClick={handleInterviewComponentStepCardClick}>
				<svg
					className="tw-h-full tw-w-auto"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round">
					{" "}
					<path stroke="none" d="M0 0h24v24H0z" /> <circle cx="9" cy="5" r="1" />{" "}
					<circle cx="9" cy="12" r="1" /> <circle cx="9" cy="19" r="1" />{" "}
					<circle cx="15" cy="5" r="1" /> <circle cx="15" cy="12" r="1" />{" "}
					<circle cx="15" cy="19" r="1" />
				</svg>
				<div
					className={
						activeSubComponentIndex === index
							? "tw-h-full tw-w-auto tw-ml-0.5 tw-text-white"
							: "tw-h-full tw-w-auto tw-ml-0.5 tw-text-black"
					}>
					{interviewType === "General Interview" ? (
						<GeneralInterviewIcon />
					) : interviewType === "Technical Assessment" ? (
						<TechnicalAssessmentIcon />
					) : (
						<HiringManagerInterviewIcon />
					)}
				</div>
				<span className="tw-text-sm tw-ml-1.5">{name}</span>
			</button>
		);
	};

	const InterviewComponentButton = ({ interviewType, handleDrop }) => {
		const [{ isDragging }, drag] = useDrag({
			type: "InterviewComponentButton",
			item: { interviewType, InterviewComponentButton },
			end: (item, monitor) => {
				const dropResult = monitor.getDropResult();
				if (item && dropResult) {
					handleDrop(item.interviewType);
				}
			},
			collect: (monitor) => ({ isDragging: monitor.isDragging() }),
		});
		return (
			<button
				ref={drag}
				className="tw-w-full tw-flex tw-items-center tw-justify-between tw-rounded-3xl tw-p-2 tw-mt-3 tw-bg-white tw-border tw-border-black tw-text-black"
				draggable={true}>
				<div className="tw-flex tw-items-center">
					<svg
						className="tw-h-full tw-w-auto"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round">
						{" "}
						<path stroke="none" d="M0 0h24v24H0z" /> <circle cx="9" cy="5" r="1" />{" "}
						<circle cx="9" cy="12" r="1" /> <circle cx="9" cy="19" r="1" />{" "}
						<circle cx="15" cy="5" r="1" /> <circle cx="15" cy="12" r="1" />{" "}
						<circle cx="15" cy="19" r="1" />
					</svg>
					<div className="tw-h-full tw-w-auto tw-ml-1 tw-text-black">
						{interviewType === "General Interview" ? (
							<GeneralInterviewIcon />
						) : interviewType === "Technical Assessment" ? (
							<TechnicalAssessmentIcon />
						) : (
							<HiringManagerInterviewIcon />
						)}
					</div>
					<span className="tw-ml-1.5">{interviewType}</span>
				</div>
				<div className="tw-h-full tw-w-auto tw-flex tw-justify-end tw-items-center tw-text-black">
					<InformationIcon />
				</div>
			</button>
		);
	};

	const CampaignDetailsContainer = () => {
		// List options for dropdown
		const workFlexibilityList = ["On-site", "Work From Home", "Hybrid"];
		const departmentList = ["Sales & Marketing", "IT", "Electrical Engineering"];
		const expertiseList = ["Intern", "Entry-level", "Experienced Professional"];

		const [campaignName, setCampaignName] = useState(campaignDetails.name);
		const [overview, setOverview] = useState(campaignDetails.overview);
		const [requirement, setRequirement] = useState(campaignDetails.requirement);
		const [recruitmentHeadcount, setRecruitmentHeadcount] = useState(
			campaignDetails.recruitmentHeadcount
		);
		const [startDuration, setStartDuration] = useState(campaignDetails.startDuration);
		const [endDuration, setEndDuration] = useState(campaignDetails.endDuration);
		const [location, setLocation] = useState(campaignDetails.location);
		const [workFlexibility, setWorkFlexibility] = useState(campaignDetails.workFlexibility);
		const [department, setDepartment] = useState(campaignDetails.department);
		const [expertise, setExpertise] = useState(campaignDetails.expertise);

		useEffect(() => {
			let updateCampaignDetails = campaignDetails;
			updateCampaignDetails.name = campaignName;
			setCampaignDetails(updateCampaignDetails);
		}, [campaignName]);

		useEffect(() => {
			let updateCampaignDetails = campaignDetails;
			updateCampaignDetails.overview = overview;
			setCampaignDetails(updateCampaignDetails);
		}, [overview]);

		useEffect(() => {
			let updateCampaignDetails = campaignDetails;
			updateCampaignDetails.requirement = requirement;
			setCampaignDetails(updateCampaignDetails);
		}, [requirement]);

		useEffect(() => {
			let updateCampaignDetails = campaignDetails;
			updateCampaignDetails.recruitmentHeadcount = recruitmentHeadcount;
			setCampaignDetails(updateCampaignDetails);
		}, [recruitmentHeadcount]);

		useEffect(() => {
			let updateCampaignDetails = campaignDetails;
			updateCampaignDetails.startDuration = startDuration;
			setCampaignDetails(updateCampaignDetails);
		}, [startDuration]);

		useEffect(() => {
			let updateCampaignDetails = campaignDetails;
			updateCampaignDetails.endDuration = endDuration;
			setCampaignDetails(updateCampaignDetails);
		}, [endDuration]);

		useEffect(() => {
			let updateCampaignDetails = campaignDetails;
			updateCampaignDetails.location = location;
			setCampaignDetails(updateCampaignDetails);
		}, [location]);

		useEffect(() => {
			let updateCampaignDetails = campaignDetails;
			updateCampaignDetails.workFlexibility = workFlexibility;
			setCampaignDetails(updateCampaignDetails);
		}, [workFlexibility]);

		useEffect(() => {
			let updateCampaignDetails = campaignDetails;
			updateCampaignDetails.department = department;
			setCampaignDetails(updateCampaignDetails);
		}, [department]);

		useEffect(() => {
			let updateCampaignDetails = campaignDetails;
			updateCampaignDetails.expertise = expertise;
			setCampaignDetails(updateCampaignDetails);
		}, [expertise]);

		const handleCampaignNameInputChange = (event) => {
			setCampaignName(event.target.value);
		};

		const handleOverviewInputChange = (event) => {
			setOverview(event.target.value);
		};

		const handleRequirementInputChange = (event) => {
			setRequirement(event.target.value);
		};

		const handleRecruitmentHeadcountInputChange = (event) => {
			setRecruitmentHeadcount(event.target.value);
		};

		// TODO: Error validation?
		const handleStartDurationInputChange = (date) => {
			setStartDuration(date);
		};

		// TODO: Error validation?
		const handleEndDurationInputChange = (date) => {
			setEndDuration(date);
		};

		const handleLocationInputChange = (event) => {
			setLocation(event.target.value);
		};

		const handleWorkFlexibilityInputChange = (event) => {
			setWorkFlexibility(event);
		};

		const handleDepartmentInputChange = (event) => {
			setDepartment(event);
		};

		const handleExpertiseInputChange = (event) => {
			setExpertise(event);
		};

		return (
			<div className="tw-h-auto tw-flex tw-flex-col">
				<span className="tw-font-bold tw-text-3xl">Campaign Details</span>
				<div className="tw-bg-white tw-rounded-xl shadown tw-p-4 tw-mt-3">
					<span className="tw-text-2xl">General Information</span>
					<div className="tw-h-0.5 tw-bg-gray-400 tw-mt-2 tw-mb-3"></div>
					<div className="tw-w-full tw-flex tw-flex-col">
						<span className="tw-text-xl">Campaign Name</span>
						<input
							type="text"
							className="tw-w-full tw-p-2 tw-border tw-border-black tw-rounded-xl tw-mt-1 focus:tw-outline-none"
							value={campaignName}
							onChange={handleCampaignNameInputChange}></input>
					</div>
					<div className="tw-w-full tw-flex tw-flex-col tw-mt-3">
						<span className="tw-text-xl">Overview</span>
						<textarea
							className="tw-w-full tw-p-2 tw-border tw-border-black tw-rounded-xl tw-mt-1 focus:tw-outline-none tw-resize-none"
							rows={5}
							cols={50}
							value={overview}
							onChange={handleOverviewInputChange}></textarea>
					</div>
					<div className="tw-w-full tw-flex tw-flex-col tw-mt-3">
						<span className="tw-text-xl">Requirement</span>
						<textarea
							className="tw-w-full tw-p-2 tw-border tw-border-black tw-rounded-xl tw-mt-1 focus:tw-outline-none tw-resize-none"
							rows={5}
							cols={50}
							value={requirement}
							onChange={handleRequirementInputChange}></textarea>
					</div>
					<div className="tw-w-full tw-flex tw-flex-col tw-mt-3">
						<span className="tw-text-xl">Image</span>
						{/* //TODO Add Image */}
					</div>
				</div>
				<div className="tw-bg-white tw-rounded-xl shadow tw-p-4 tw-mt-3">
					<span className="tw-text-2xl">Settings</span>
					<div className="tw-h-0.5 tw-bg-gray-400 tw-mt-2 tw-mb-3 tw-flex tw-flex-col"></div>
					<div className="tw-flex tw-justify-between tw-items-center tw-py-2">
						<div className="tw-w-1/4 tw-flex tw-flex-col">
							<span className="tw-text-xl">Recruitment Headcount</span>
							<input
								type="number"
								className="tw-p-2 tw-border tw-border-black tw-rounded-lg focus:tw-outline-none"
								value={recruitmentHeadcount}
								onChange={handleRecruitmentHeadcountInputChange}></input>
						</div>
						<div className="tw-w-4/6 tw-flex tw-flex-col">
							<span className="tw-w-full tw-text-xl">Duration</span>
							<div className="tw-w-full tw-flex">
								<DatePicker
									className="tw-w-full tw-border tw-border-black tw-rounded-lg tw-p-2"
									selected={startDuration}
									onChange={handleStartDurationInputChange}
								/>
								<span className="tw-w-1/6 tw-text-center">-</span>
								<DatePicker
									className="tw-w-full tw-border tw-border-black tw-rounded-lg tw-p-2"
									selected={endDuration}
									onChange={handleEndDurationInputChange}
								/>
							</div>
						</div>
					</div>
					<div className="tw-flex tw-justify-between tw-py-2 tw-mt-3">
						<div className="tw-w-[45%] tw-flex tw-flex-col">
							<span className="tw-text-xl">Location</span>
							<input
								type="text"
								className="tw-w-full tw-p-2 tw-border tw-border-black tw-rounded-lg focus:tw-outline-none"
								value={location}
								onChange={handleLocationInputChange}></input>
						</div>
						<div className="tw-w-[45%] tw-flex tw-flex-col">
							<span className="tw-text-xl">Work Flexibility</span>
							<Dropdown onSelect={handleWorkFlexibilityInputChange}>
								<Dropdown.Toggle
									id="work-flexibility-dropdown"
									as={CustomToggle}
									className="tw-w-full tw-flex">
									{workFlexibility === "" ? "Please Select An Option" : workFlexibility}
								</Dropdown.Toggle>
								<Dropdown.Menu className="tw-w-full">
									{workFlexibilityList.map((item, index) => (
										<Dropdown.Item className="tw-w-full" eventKey={item}>
											{item}
										</Dropdown.Item>
									))}
								</Dropdown.Menu>
							</Dropdown>
						</div>
					</div>
					<div className="tw-flex tw-justify-between tw-py-2 tw-mt-3">
						<div className="tw-w-[45%] tw-flex tw-flex-col">
							<span className="tw-text-xl">Department</span>
							<Dropdown onSelect={handleDepartmentInputChange}>
								<Dropdown.Toggle
									id="department-dropdown"
									as={CustomToggle}
									className="tw-w-full tw-flex">
									{department === "" ? "Please Select An Option" : department}
								</Dropdown.Toggle>
								<Dropdown.Menu className="tw-w-full">
									{departmentList.map((item, index) => (
										<Dropdown.Item eventKey={item}>{item}</Dropdown.Item>
									))}
								</Dropdown.Menu>
							</Dropdown>
						</div>
						<div className="tw-w-[45%] tw-flex tw-flex-col">
							<span className="tw-text-xl">Expertise</span>
							<Dropdown onSelect={handleExpertiseInputChange}>
								<Dropdown.Toggle
									id="expertise-dropdown"
									as={CustomToggle}
									className="tw-w-full tw-flex">
									{expertise === "" ? "Please Select An Option" : expertise}
								</Dropdown.Toggle>
								<Dropdown.Menu className="tw-w-full">
									{expertiseList.map((item, index) => (
										<Dropdown.Item eventKey={item}>{item}</Dropdown.Item>
									))}
								</Dropdown.Menu>
							</Dropdown>
						</div>
					</div>
				</div>
				<div className="tw-bg-white tw-rounded-xl shadow tw-p-4 tw-mt-3">
					<span className="tw-text-2xl">Person Involved</span>
					<div className="tw-h-0.5 tw-bg-gray-400 tw-mt-2 tw-mb-3 tw-flex tw-flex-col"></div>
				</div>
			</div>
		);
	};

	const handleDeleteInterviewComponentButtonClick = () => {
		let updatedInterviewComponentsList = [...campaignInterviewComponentList];
		updatedInterviewComponentsList.splice(activeSubComponentIndex, 1);
		setCampaignInterviewComponentList(updatedInterviewComponentsList);

		if (updatedInterviewComponentsList.length === 0) {
			setActiveSubComponentIndex(-1);
		} else if (activeSubComponentIndex !== 0) {
			setActiveSubComponentIndex(activeSubComponentIndex - 1);
		}
	};

	const GeneralInterviewDetailsCard = () => {
		let generalInterview = campaignInterviewComponentList[activeSubComponentIndex]
			.interviewInfo as GeneralInterviewInfo;
		const [generalInterviewQuestionList, setGeneralInterviewQuestionList] = useState(
			generalInterview.questionList
		);
		
		type Keyword = {
			keyword: string;
			weightage: number;
		};
		  
		useEffect(() => {
			let updatedList = campaignInterviewComponentList;
			let generalInterviewInfo: GeneralInterviewInfo = {
				questionList: generalInterviewQuestionList,
			};
			updatedList[activeSubComponentIndex].interviewInfo = generalInterviewInfo;
			setCampaignInterviewComponentList(updatedList);
		}, [generalInterviewQuestionList]);

		const QuestionCard = ({
			question,
			keywordPositiveList,
			keywordNegativeList,
			index,
		}: QuestionDetailsCardProps) => {
			const [currentQuestion, setCurrentQuestion] = useState(question);
			const [currentPositiveKeywordList, setCurrentPositiveKeywordList] =
				useState(keywordPositiveList);
			const [currentNegativeKeywordList, setCurrentNegativeKeywordList] =
				useState(keywordNegativeList);

			const [positiveKeywordSuggestionList, setPositiveKeywordSuggestionList] = useState([]);
			const [negativeKeywordSuggestionList, setNegativeKeywordSuggestionList] = useState([]);

			useEffect(() => {
				const fetchKeywords = async () => {
					  const {positiveKeywords, negativeKeywords} = await handleAiGenerateKeywordButtonClick();
					  setPositiveKeywordSuggestionList(positiveKeywords);
					  setNegativeKeywordSuggestionList(negativeKeywords);
				};
				fetchKeywords();
			}, [currentQuestion]);

			const handleQuestionInputChange = (event) => {
				setCurrentQuestion(event.target.value);
			};

			const handleDeleteQuestionButtonClick = () => {
				let updatedList = [...generalInterviewQuestionList];
				updatedList.splice(index, 1);
				setGeneralInterviewQuestionList(updatedList);
			};

			const handleKeywordPositiveInputChange = (event) => {
				let newList = [...currentPositiveKeywordList];
				let keywordIndex: number = event.target.getAttribute("data-key");
		
				if (event.target.getAttribute("data-type") === "keyword") {
					if (newList.length <= keywordIndex) {
						for (let i = newList.length; i <= keywordIndex - 1; i += 1) {
							let emptyKeyword: Keyword = { keyword: "", weightage: 0 };
							newList.push(emptyKeyword);
						}
						let newKeyword: Keyword = { keyword: event.target.value, weightage: 0 };
						newList.push(newKeyword);
						setCurrentPositiveKeywordList(newList);
					} else {
						newList[keywordIndex].keyword = event.target.value;
						setCurrentPositiveKeywordList(newList);
					}
				} else if (event.target.getAttribute("data-type") === "weight") {
					if (newList.length <= keywordIndex) {
						for (let i = newList.length; i <= keywordIndex - 1; i += 1) {
							let emptyKeyword: Keyword = { keyword: "", weightage: 0 };
							newList.push(emptyKeyword);
						}
						let newKeyword: Keyword = { keyword: "", weightage: event.target.value };
						newList.push(newKeyword);
						setCurrentPositiveKeywordList(newList);
					} else {
						newList[keywordIndex].weightage = event.target.value;
						setCurrentPositiveKeywordList(newList);
					}
				}
			};

			const handleKeywordNegativeInputChange = (event) => {
				let newList = [...currentNegativeKeywordList];
				let keywordIndex: number = event.target.getAttribute("data-key");

				if (event.target.getAttribute("data-type") === "keyword") {
					if (newList.length <= keywordIndex) {
						for (let i = newList.length; i <= keywordIndex - 1; i += 1) {
							let emptyKeyword: Keyword = { keyword: "", weightage: 0 };
							newList.push(emptyKeyword);
						}
						let newKeyword: Keyword = { keyword: event.target.value, weightage: 0 };
						newList.push(newKeyword);
						setCurrentNegativeKeywordList(newList);
					} else {
						newList[keywordIndex].keyword = event.target.value;
						setCurrentNegativeKeywordList(newList);
					}
				} else if (event.target.getAttribute("data-type") === "weight") {
					if (newList.length <= keywordIndex) {
						for (let i = newList.length; i <= keywordIndex - 1; i += 1) {
							let emptyKeyword: Keyword = { keyword: "", weightage: 0 };
							newList.push(emptyKeyword);
						}
						let newKeyword: Keyword = { keyword: "", weightage: event.target.value };
						newList.push(newKeyword);
						setCurrentNegativeKeywordList(newList);
					} else {
						newList[keywordIndex].weightage = event.target.value;
						setCurrentNegativeKeywordList(newList);
					}
				}
			};

			const handleKeywordDeleteButtonClick = (event) => {
				if (event.currentTarget.getAttribute("data-keyword-type") === "positive") {
					let updatedKeywordList = [...currentPositiveKeywordList];
					updatedKeywordList.splice(event.currentTarget.getAttribute("data-keyword-index"), 1);
					setCurrentPositiveKeywordList(updatedKeywordList);
				} else if (event.currentTarget.getAttribute("data-keyword-type") === "negative") {
					let updatedKeywordList = [...currentNegativeKeywordList];
					updatedKeywordList.splice(event.currentTarget.getAttribute("data-keyword-index"), 1);
					setCurrentNegativeKeywordList(updatedKeywordList);
				}
			};

			useEffect(() => {
				let tempQuestionList = generalInterviewQuestionList;
				tempQuestionList[index].question = currentQuestion;
				tempQuestionList[index].keywordPositive = currentPositiveKeywordList;
				tempQuestionList[index].keywordNegative = currentNegativeKeywordList;
				setGeneralInterviewQuestionList(tempQuestionList);
			}, [currentQuestion, currentPositiveKeywordList, currentNegativeKeywordList]);

			const handleAddPositiveKeywordButtonClick = () => {
				let newEmptyKeyword: Keyword = { keyword: "", weightage: 0 };
				setCurrentPositiveKeywordList((prevState) => [...prevState, newEmptyKeyword]);
			};

			const handleAddNegativeKeywordButtonClick = () => {
				let newEmptyKeyword: Keyword = { keyword: "", weightage: 0 };
				setCurrentNegativeKeywordList((prevState) => [...prevState, newEmptyKeyword]);
			};

			return (
				<div className="tw-mb-2">
					<Accordion.Item eventKey={String(index)}>
						<Accordion.Header>
							<span className="tw-text-xl tw-font-bold">{"Question " + (index + 1)}</span>
						</Accordion.Header>
						<Accordion.Body className="tw-flex tw-flex-col tw-p-3">
							<div className="tw-flex tw-justify-between tw-items-end">
								<div className="tw-w-5/6 tw-flex tw-flex-col">
									<span className="tw-text-lg">Question</span>
									<input
										id="question"
										className="tw-w-full tw-border tw-border-black tw-rounded-lg tw-p-2 focus:tw-outline-none"
										value={currentQuestion}
										type="text"
										onChange={handleQuestionInputChange}></input>
								</div>
								<div className="tw-w-1/6 tw-flex tw-justify-end">
									<button
										className="tw-flex tw-justify-center tw-items-center tw-bg-white tw-border tw-border-black tw-rounded-lg tw-p-2"
										onClick={handleDeleteQuestionButtonClick}>
										<span>Delete Question</span>
										<div className="tw-h-5 tw-text-black">
											<TrashCanIcon />
										</div>
									</button>
								</div>
							</div>
							<div className="tw-w-full tw-flex tw-justify-between tw-mt-3">
								<div className="tw-w-[45%] tw-h-fit tw-border tw-border-black tw-rounded-lg tw-py-0.5 tw-flex tw-flex-col">
									<div className="tw-w-full tw-flex tw-p-2">
										<span className="tw-w-1/2">Positive Keyword</span>
										<span className="tw-w-1/2">Weightage</span>
									</div>
									<div className="tw-flex tw-flex-col tw-px-2">
										{currentPositiveKeywordList.map((keyword, index) => (
											<div className="tw-w-full tw-flex tw-mb-2">
												<input
													type="text"
													className="tw-w-1/2 tw-border tw-border-black tw-rounded-lg tw-px-2 tw-py-0.5 focus:tw-outline-none"
													value={keyword.keyword}
													data-key={index}
													data-type="keyword"
													onChange={handleKeywordPositiveInputChange}></input>
												<input
													type="number"
													className="tw-w-2/6 tw-border tw-border-black tw-rounded-lg tw-px-2 tw-py-0.5 tw-ml-2 focus:tw-outline-none"
													value={keyword.weightage}
													data-key={index}
													data-type="weight"
													onChange={handleKeywordPositiveInputChange}></input>
												<button
													className="tw-w-[20%] tw-text-red-700 tw-flex tw-justify-center tw-items-center"
													data-keyword-index={index}
													data-keyword-type="positive"
													onClick={handleKeywordDeleteButtonClick}>
													<div className="tw-h-full tw-text-red-700">
														<TrashCanIcon />
													</div>
												</button>
											</div>
										))}
									</div>
									<div className="tw-h-[0.5px] tw-w-full tw-bg-black"></div>
									<button
										className="tw-w-full tw-rounded-lg tw-bg-white tw-text-black tw-py-1"
										onClick={handleAddPositiveKeywordButtonClick}>
										Add New Keyword
									</button>
								</div>
								<div className="tw-w-[45%] tw-h-fit tw-border tw-border-black tw-rounded-lg tw-py-0.5 tw-flex tw-flex-col">
									<div className="tw-w-full tw-flex tw-p-2">
										<span className="tw-w-1/2">Negative Keyword</span>
										<span className="tw-w-1/2">Weightage</span>
									</div>
									<div className="tw-flex tw-flex-col tw-px-2">
										{currentNegativeKeywordList.map((keyword, index) => (
											<div className="tw-w-full tw-flex tw-mb-2">
												<input
													type="text"
													className="tw-w-1/2 tw-border tw-border-black tw-rounded-lg tw-px-2 tw-py-0.5 focus:tw-outline-none"
													value={keyword.keyword}
													data-key={index}
													data-type="keyword"
													onChange={handleKeywordNegativeInputChange}></input>
												<input
													type="number"
													className="tw-w-2/6 tw-border tw-border-black tw-rounded-lg tw-px-2 tw-py-0.5 tw-ml-2 focus:tw-outline-none"
													value={keyword.weightage}
													data-key={index}
													data-type="weight"
													onChange={handleKeywordNegativeInputChange}></input>
												<button
													className="tw-w-[20%] tw-text-red-700 tw-flex tw-justify-center tw-items-center"
													data-keyword-index={index}
													data-keyword-type="negative"
													onClick={handleKeywordDeleteButtonClick}>
													<div className="tw-h-full tw-text-red-700">
														<TrashCanIcon />
													</div>
												</button>
											</div>
										))}
									</div>
									<div className="tw-h-[0.5px] tw-w-full tw-bg-black"></div>
									<button
										className="tw-w-full tw-rounded-lg tw-bg-white tw-text-black tw-py-1"
										onClick={handleAddNegativeKeywordButtonClick}>
										Add New Keyword
									</button>
								</div>
							</div>
							<div className="tw-w-full tw-h-fit tw-border tw-border-red-700 tw-border-2 tw-rounded-xl tw-flex tw-flex-col tw-py-2 tw-px-3 tw-mt-3">
								<div className="tw-flex tw-items-center">
									<div className="tw-h-full tw-text-red-700">
										<RobotIcon />
									</div>
									<span className="tw-text-black tw-font-bold tw-text-lg tw-ml-2">
										AI-Assisted Keyword Suggestion
									</span>
									<button 
										className="tw-bg-red-700 tw-rounded-xl tw-text-white tw-py-1 tw-px-2 tw-ml-3"
										onClick={handleAiGenerateKeywordButtonClick}>
										Generate Keyword
									</button>
								</div>
								<div className="tw-h-fit tw-flex tw-justify-between tw-mt-2">
									<div className="tw-h-fit tw-w-[45%] tw-flex tw-flex-col">
										<span className="tw-text-md tw-font-bold underline">Positive Keyword</span>
										<div className="tw-w-full tw-p-2 tw-flex tw-flex-wrap">
											{positiveKeywordSuggestionList.map((keyword, index) => (
												<button className="tw-h-fit w-fit tw-border tw-border-black tw-rounded-xl tw-p-2 tw-m-1">
													{keyword}
												</button>
											))}
										</div>
									</div>
									<div className="tw-w-[1px] tw-bg-red-700 tw-ml-2 tw-mr-2"></div>
									<div className="tw-h-fit tw-w-[45%] tw-flex tw-flex-col">
										<span className="tw-text-md tw-font-bold underline">Negative Keyword</span>
										<div className="tw-w-full tw-p-2 tw-flex tw-flex-wrap">
											{negativeKeywordSuggestionList.map((keyword, index) => (
												<button className="tw-h-fit tw-w-fit tw-border tw-border-black tw-rounded-xl tw-p-2 tw-m-1">
													{keyword}
												</button>
											))}
										</div>
									</div>
								</div>
							</div>
						</Accordion.Body>
					</Accordion.Item>
				</div>
			);
		};

		const handleAddNewQuestionButtonClick = () => {
			let newQuestion: Question = { question: "", keywordPositive: [], keywordNegative: [] };
			setGeneralInterviewQuestionList((prevState) => [...prevState, newQuestion]);
		};

		return (
			<div className="tw-flex tw-flex-col">
				<div className="tw-flex tw-justify-between tw-items-center tw-mb-2">
					<span className="tw-text-2xl tw-font-bold">General Interview</span>
					<button
						className="tw-bg-red-400 tw-text-white tw-rounded-lg tw-p-2"
						onClick={handleAiGeneratePromptButtonClick}>
						AI Generate Prompt
					</button>
				</div>
				<Accordion defaultActiveKey={["test"]} alwaysOpen>
					{generalInterviewQuestionList.map((questionInfo, index) => (
						<QuestionCard
							question={questionInfo.question}
							keywordPositiveList={questionInfo.keywordPositive}
							keywordNegativeList={questionInfo.keywordNegative}
							index={index}
						/>
					))}
				</Accordion>
				<div className="tw-w-full tw-flex tw-justify-between tw-items-center tw-mt-3">
					<button
						className="tw-w-2/6 tw-bg-red-700 tw-text-white tw-text-center tw-p-2 tw-rounded-lg"
						onClick={handleAddNewQuestionButtonClick}>
						Add New Question
					</button>
					<button
						className="tw-w-2/6 tw-bg-white tw-text-black tw-border tw-border-black tw-text-center tw-p-2 tw-rounded-lg"
						onClick={handleDeleteInterviewComponentButtonClick}>
						Delete Interview Component
					</button>
				</div>
			</div>
		);
	};

	const TechnicalAssessmentDetailsCard = () => {
		let technicalAssessment = campaignInterviewComponentList[activeSubComponentIndex]
			.interviewInfo as TechnicalAssessmentInfo;
		const [technicalAssessmentSectionList, setTechnicalAssessmentSectionList] = useState(
			technicalAssessment.sectionList
		);

		useEffect(() => {
			let updatedList = campaignInterviewComponentList;
			let technicalAssessmentInfo: TechnicalAssessmentInfo = {
				sectionList: technicalAssessmentSectionList,
			};
			updatedList[activeSubComponentIndex].interviewInfo = technicalAssessmentInfo;
			setCampaignInterviewComponentList(updatedList);
		}, [technicalAssessmentSectionList]);

		const SectionCard = ({ sectionIndex, questionList, name }: SectionDetailsCardProps) => {
			const [currentQuestionList, setCurrentQuestionList] = useState(questionList);
			const [currentSectionName, setCurrentSectionName] = useState(name);

			const handleSectionNameChange = (event) => {
				setCurrentSectionName(event.target.value);
			};

			const handleDeleteSectionButtonClick = () => {
				let updatedSectionList = [...technicalAssessmentSectionList];
				updatedSectionList.splice(sectionIndex, 1);
				setTechnicalAssessmentSectionList(updatedSectionList);
			};

			const handleAddNewQuestionButtonClick = () => {
				let newEmptyQuestion: Question = { question: "", keywordPositive: [], keywordNegative: [] };
				setCurrentQuestionList((prevState) => [...prevState, newEmptyQuestion]);
			};

			const QuestionCard = ({
				question,
				keywordPositiveList,
				keywordNegativeList,
				index: questionIndex,
			}: QuestionDetailsCardProps) => {
				const [currentQuestion, setCurrentQuestion] = useState(question);
				const [currentPositiveKeywordList, setCurrentPositiveKeywordList] =
					useState(keywordPositiveList);
				const [currentNegativeKeywordList, setCurrentNegativeKeywordList] =
					useState(keywordNegativeList);

				const handleQuestionInputChange = (event) => {
					setCurrentQuestion(event.target.value);
				};

				const handleDeleteQuestionButtonClick = () => {
					let updatedQuestionList = [...technicalAssessmentSectionList[sectionIndex].questionList];
					updatedQuestionList.splice(questionIndex - 1, 1);
					let updatedSectionList = [...technicalAssessmentSectionList];
					updatedSectionList[sectionIndex].questionList = updatedQuestionList;
					setTechnicalAssessmentSectionList(updatedSectionList);
				};

				const handleKeywordPositiveInputChange = (event) => {
					let newList = [...currentPositiveKeywordList];
					let keywordIndex: number = event.target.getAttribute("data-key");

					if (event.target.getAttribute("data-type") === "keyword") {
						if (newList.length <= keywordIndex) {
							for (let i = newList.length; i <= keywordIndex - 1; i += 1) {
								let emptyKeyword: Keyword = { keyword: "", weightage: 0 };
								newList.push(emptyKeyword);
							}
							let newKeyword: Keyword = { keyword: event.target.value, weightage: 0 };
							newList.push(newKeyword);
							setCurrentPositiveKeywordList(newList);
						} else {
							newList[keywordIndex].keyword = event.target.value;
							setCurrentPositiveKeywordList(newList);
						}
					} else if (event.target.getAttribute("data-type") === "weight") {
						if (newList.length <= keywordIndex) {
							for (let i = newList.length; i <= keywordIndex - 1; i += 1) {
								let emptyKeyword: Keyword = { keyword: "", weightage: 0 };
								newList.push(emptyKeyword);
							}
							let newKeyword: Keyword = { keyword: "", weightage: event.target.value };
							newList.push(newKeyword);
							setCurrentPositiveKeywordList(newList);
						} else {
							newList[keywordIndex].weightage = event.target.value;
							setCurrentPositiveKeywordList(newList);
						}
					}
				};

				const handleKeywordNegativeInputChange = (event) => {
					let newList = [...currentNegativeKeywordList];
					let keywordIndex: number = event.target.getAttribute("data-key");

					if (event.target.getAttribute("data-type") === "keyword") {
						if (newList.length <= keywordIndex) {
							for (let i = newList.length; i <= keywordIndex - 1; i += 1) {
								let emptyKeyword: Keyword = { keyword: "", weightage: 0 };
								newList.push(emptyKeyword);
							}
							let newKeyword: Keyword = { keyword: event.target.value, weightage: 0 };
							newList.push(newKeyword);
							setCurrentNegativeKeywordList(newList);
						} else {
							newList[keywordIndex].keyword = event.target.value;
							setCurrentNegativeKeywordList(newList);
						}
					} else if (event.target.getAttribute("data-type") === "weight") {
						if (newList.length <= keywordIndex) {
							for (let i = newList.length; i <= keywordIndex - 1; i += 1) {
								let emptyKeyword: Keyword = { keyword: "", weightage: 0 };
								newList.push(emptyKeyword);
							}
							let newKeyword: Keyword = { keyword: "", weightage: event.target.value };
							newList.push(newKeyword);
							setCurrentNegativeKeywordList(newList);
						} else {
							newList[keywordIndex].weightage = event.target.value;
							setCurrentNegativeKeywordList(newList);
						}
					}
				};

				const handleKeywordDeleteButtonClick = (event) => {
					if (event.currentTarget.getAttribute("data-keyword-type") === "positive") {
						let updatedKeywordList = [...currentPositiveKeywordList];
						updatedKeywordList.splice(event.currentTarget.getAttribute("data-keyword-index"), 1);
						setCurrentPositiveKeywordList(updatedKeywordList);
					} else if (event.currentTarget.getAttribute("data-keyword-type") === "negative") {
						let updatedKeywordList = [...currentNegativeKeywordList];
						updatedKeywordList.splice(event.currentTarget.getAttribute("data-keyword-index"), 1);
						setCurrentNegativeKeywordList(updatedKeywordList);
					}
				};

				useEffect(() => {
					// Update Technical Assessment Information
					let updatedSectionList = technicalAssessmentSectionList;
					updatedSectionList[sectionIndex].name = currentSectionName;
					updatedSectionList[sectionIndex].questionList = currentQuestionList;
					setTechnicalAssessmentSectionList(updatedSectionList);
					updatedSectionList[sectionIndex].questionList[questionIndex].question = currentQuestion;
					updatedSectionList[sectionIndex].questionList[questionIndex].keywordPositive =
						currentPositiveKeywordList;
					updatedSectionList[sectionIndex].questionList[questionIndex].keywordNegative =
						currentNegativeKeywordList;
					setTechnicalAssessmentSectionList(updatedSectionList);
				}, [
					currentQuestionList,
					currentSectionName,
					currentQuestion,
					currentPositiveKeywordList,
					currentNegativeKeywordList,
				]);

				const handleAddPositiveKeywordButtonClick = () => {
					let newEmptyKeyword: Keyword = { keyword: "", weightage: 0 };
					setCurrentPositiveKeywordList((prevState) => [...prevState, newEmptyKeyword]);
				};

				const handleAddNegativeKeywordButtonClick = () => {
					let newEmptyKeyword: Keyword = { keyword: "", weightage: 0 };
					setCurrentNegativeKeywordList((prevState) => [...prevState, newEmptyKeyword]);
				};

				return (
					<div className="tw-mb-2">
						<Accordion.Item eventKey={String(questionIndex)}>
							<Accordion.Header>
								<span className="tw-text-xl tw-font-bold">{"Question " + (questionIndex + 1)}</span>
							</Accordion.Header>
							<Accordion.Body className="tw-flex tw-flex-col tw-p-3">
								<div className="tw-flex tw-justify-between tw-items-end">
									<div className="tw-w-5/6 tw-flex tw-flex-col">
										<span className="tw-text-lg">Question</span>
										<input
											className="tw-w-full tw-border tw-border-black tw-rounded-lg tw-p-2 focus:tw-outline-none"
											value={currentQuestion}
											type="text"
											onChange={handleQuestionInputChange}></input>
									</div>
									<div className="tw-w-1/6 tw-flex tw-justify-end">
										<button
											className="tw-flex tw-justify-center tw-items-center tw-bg-white tw-border tw-border-black tw-rounded-lg tw-p-2"
											onClick={handleDeleteQuestionButtonClick}>
											<span>Delete Question</span>
											<div className="tw-h-5 tw-text-black">
												<TrashCanIcon />
											</div>
										</button>
									</div>
								</div>
								<div className="tw-w-full tw-flex tw-justify-between tw-mt-3">
									<div className="tw-w-[45%] tw-h-fit tw-border tw-border-black tw-rounded-lg tw-py-0.5 tw-flex tw-flex-col">
										<div className="tw-w-full tw-flex tw-p-2">
											<span className="tw-w-1/2">Positive Keyword</span>
											<span className="tw-w-1/2">Weightage</span>
										</div>
										<div className="tw-flex tw-flex-col tw-px-2">
											{currentPositiveKeywordList.map((keyword, index) => (
												<div className="tw-w-full tw-flex tw-mb-2">
													<input
														type="text"
														className="tw-w-1/2 tw-border tw-border-black tw-rounded-lg tw-px-2 tw-py-0.5 focus:tw-outline-none"
														value={keyword.keyword}
														data-key={index}
														data-type="keyword"
														onChange={handleKeywordPositiveInputChange}></input>
													<input
														type="number"
														className="tw-w-2/6 tw-border tw-border-black tw-rounded-lg tw-px-2 tw-py-0.5 tw-ml-2 focus:tw-outline-none"
														value={keyword.weightage}
														data-key={index}
														data-type="weight"
														onChange={handleKeywordPositiveInputChange}></input>
													<button
														className="tw-w-[20%] tw-text-red-700 tw-flex tw-justify-center tw-items-center"
														data-keyword-index={index}
														data-keyword-type="positive"
														onClick={handleKeywordDeleteButtonClick}>
														<div className="tw-h-full tw-text-red-700">
															<TrashCanIcon />
														</div>
													</button>
												</div>
											))}
										</div>
										<div className="tw-h-[0.5px] tw-w-full tw-bg-black"></div>
										<button
											className="tw-w-full tw-rounded-lg tw-bg-white tw-text-black tw-py-1"
											onClick={handleAddPositiveKeywordButtonClick}>
											Add New Keyword
										</button>
									</div>
									<div className="tw-w-[45%] tw-h-fit tw-border tw-border-black tw-rounded-lg tw-py-0.5 tw-flex tw-flex-col">
										<div className="tw-w-full tw-flex tw-p-2">
											<span className="tw-w-1/2">Negative Keyword</span>
											<span className="tw-w-1/2">Weightage</span>
										</div>
										<div className="tw-flex tw-flex-col tw-px-2">
											{currentNegativeKeywordList.map((keyword, index) => (
												<div className="tw-w-full tw-flex tw-mb-2">
													<input
														type="text"
														className="tw-w-1/2 tw-border tw-border-black tw-rounded-lg tw-px-2 tw-py-0.5 focus:tw-outline-none"
														value={keyword.keyword}
														data-key={index}
														data-type="keyword"
														onChange={handleKeywordNegativeInputChange}></input>
													<input
														type="number"
														className="tw-w-2/6 tw-border tw-border-black tw-rounded-lg tw-px-2 tw-py-0.5 tw-ml-2 focus:tw-outline-none"
														value={keyword.weightage}
														data-key={index}
														data-type="weight"
														onChange={handleKeywordNegativeInputChange}></input>
													<button
														className="tw-w-[20%] tw-text-red-700 tw-flex tw-justify-center tw-items-center"
														data-keyword-index={index}
														data-keyword-type="negative"
														onClick={handleKeywordDeleteButtonClick}>
														<div className="tw-h-full tw-text-red-700">
															<TrashCanIcon />
														</div>
													</button>
												</div>
											))}
										</div>
										<div className="tw-h-[0.5px] tw-w-full tw-bg-black"></div>
										<button
											className="tw-w-full tw-rounded-lg tw-bg-white tw-text-black tw-py-1"
											onClick={handleAddNegativeKeywordButtonClick}>
											Add New Keyword
										</button>
									</div>
								</div>
							</Accordion.Body>
						</Accordion.Item>
					</div>
				);
			};

			return (
				<div className="tw-mb-2">
					<Accordion.Item eventKey={String(sectionIndex)}>
						<Accordion.Header>
							<span className="tw-text-xl tw-font-bold">
								{currentSectionName === "" ? "Section " + (sectionIndex + 1) : currentSectionName}
							</span>
						</Accordion.Header>
						<Accordion.Body className="tw-flex tw-flex-col">
							<div className="tw-w-full tw-flex tw-flex-col">
								<div className="tw-flex tw-justify-between tw-items-center tw-py-2">
									<span className="tw-w-1/2 tw-text-lg">Section Name</span>
									<div className="tw-w-1/2 tw-flex tw-justify-end">
										<button
											className="tw-flex tw-justify-center tw-items-center tw-bg-white tw-border tw-border-black tw-rounded-lg tw-p-2"
											onClick={handleDeleteSectionButtonClick}>
											<span>Delete Section</span>
											<div className="tw-h-5 tw-text-black">
												<TrashCanIcon />
											</div>
										</button>
										<button
											className="tw-bg-red-400 tw-text-white tw-rounded-lg tw-p-2 tw-ml-2"
											data-section-index={sectionIndex}
											onClick={handleAiGenerateQuestionButtonClick}>
											AI Generate Question
										</button>
									</div>
								</div>
								<input
									type="text"
									className="tw-w-full tw-border tw-border-black tw-rounded-lg tw-p-2 focus:tw-outline-none"
									value={currentSectionName}
									onChange={handleSectionNameChange}></input>
							</div>
							<Accordion alwaysOpen className="tw-mt-3">
								{currentQuestionList.map((question, questionIndex) => (
									<QuestionCard
										question={question.question}
										keywordPositiveList={question.keywordPositive}
										keywordNegativeList={question.keywordNegative}
										index={questionIndex}
									/>
								))}
							</Accordion>
							<button
								className="tw-w-2/6 tw-bg-red-700 tw-text-white tw-rounded-lg tw-py-2 tw-mt-3"
								onClick={handleAddNewQuestionButtonClick}>
								Add New Question
							</button>
						</Accordion.Body>
					</Accordion.Item>
				</div>
			);
		};

		const handleAddNewSectionButtonClick = () => {
			let newSection: Section = { questionList: [], name: "" };
			setTechnicalAssessmentSectionList((prevState) => [...prevState, newSection]);
		};

		return (
			<div className="tw-flex tw-flex-col">
				<div className="tw-flex tw-justify-between tw-items-center tw-mb-2">
					<span className="tw-text-2xl tw-font-bold">Technical Assessment</span>
				</div>
				<Accordion defaultActiveKey={["0"]} alwaysOpen>
					{technicalAssessmentSectionList.map((section, index) => (
						<SectionCard
							questionList={section.questionList}
							name={section.name}
							sectionIndex={index}
						/>
					))}
				</Accordion>
				<div className="tw-w-full tw-flex tw-justify-between tw-items-center tw-mt-3">
					<button
						className="tw-w-2/6 tw-bg-red-700 tw-text-white tw-text-center tw-p-2 tw-rounded-lg"
						onClick={handleAddNewSectionButtonClick}>
						Add New Section
					</button>
					<button
						className="tw-w-2/6 tw-bg-white tw-text-black tw-border tw-border-black tw-text-center tw-p-2 tw-rounded-lg"
						onClick={handleDeleteInterviewComponentButtonClick}>
						Delete Interview Component
					</button>
				</div>
			</div>
		);
	};

	const HiringManagerInterviewDetailsCard = () => {
		let hiringManagerInterviewInfo = campaignInterviewComponentList[activeSubComponentIndex]
			.interviewInfo as HiringManagerInterviewInfo;

		const [interviewTitle, setInterviewTitle] = useState(hiringManagerInterviewInfo.interviewTitle);
		const [durationMinutes, setDurationMinutes] = useState(
			hiringManagerInterviewInfo.durationMinutes
		);
		const [description, setDescription] = useState(hiringManagerInterviewInfo.description);

		const handleInterviewTitleInputChange = (event) => {
			setInterviewTitle(event.target.value);
		};

		const handleDurationMinutesInputChange = (event) => {
			setDurationMinutes(event.target.value);
		};

		const handleDescriptionInputChange = (event) => {
			setDescription(event.target.value);
		};

		useEffect(() => {
			let updatedInterviewComponents = campaignInterviewComponentList;
			let updatedHiringManagerInfo: HiringManagerInterviewInfo = {
				interviewTitle: interviewTitle,
				durationMinutes: durationMinutes,
				description: description,
			};
			updatedInterviewComponents[activeSubComponentIndex].interviewInfo = updatedHiringManagerInfo;
		}, [interviewTitle, durationMinutes, description]);

		return (
			<div className="tw-flex tw-flex-col">
				<span className="tw-font-bold tw-text-3xl">Hiring Manager Interview</span>
				<div className="tw-bg-white tw-rounded-xl tw-border tw-border-gray-400 tw-p-4 tw-mt-3">
					<span className="tw-text-2xl">Settings</span>
					<div className="tw-h-0.5 tw-bg-gray-500 tw-mt-2 tw-mb-3"></div>
					<div className="tw-w-full tw-flex tw-justify-between">
						<div className="tw-w-[65%] tw-flex tw-flex-col">
							<span className="tw-text-xl">Interview Title</span>
							<input
								type="text"
								className="tw-w-full tw-p-2 tw-border tw-border-black tw-rounded-xl tw-mt-1 focus:tw-outline-none"
								value={interviewTitle}
								onChange={handleInterviewTitleInputChange}></input>
						</div>
						<div className="tw-w-[25%] tw-flex tw-flex-col">
							<span className="tw-text-xl">{"Duration (Minutes)"}</span>
							<input
								type="number"
								className="tw-w-full tw-p-2 tw-border tw-border-black tw-rounded-xl tw-mt-1 focus:tw-outline-none"
								value={durationMinutes}
								onChange={handleDurationMinutesInputChange}></input>
						</div>
					</div>
					<div className="tw-w-full tw-flex tw-flex-col tw-mt-3">
						<span className="tw-text-xl">Short Description</span>
						<textarea
							className="tw-w-full tw-p-2 tw-border tw-border-black tw-rounded-xl tw-mt-1 focus:tw-outline-none tw-resize-none"
							rows={5}
							cols={50}
							value={description}
							onChange={handleDescriptionInputChange}></textarea>
					</div>
				</div>
				<div className="tw-bg-white tw-rounded-xl tw-border tw-border-gray-400 tw-p-4 tw-mt-3">
					<span className="tw-text-2xl">Person Involved</span>
					<div className="tw-h-0.5 tw-bg-gray-500 tw-mt-2 tw-mb-3"></div>
				</div>
				<div className="tw-w-full tw-flex tw-justify-end tw-items-center tw-mt-3">
					<button
						className="tw-w-2/6 tw-bg-white tw-text-black tw-border tw-border-black tw-text-center tw-p-2 tw-rounded-lg"
						onClick={handleDeleteInterviewComponentButtonClick}>
						Delete Interview Component
					</button>
				</div>
			</div>
		);
	};

	const handleAiGeneratePromptButtonClick = (event) => {
		if (event.currentTarget.getAttribute("data-section-index") !== undefined) {
			setAiGenerateQuestionModalSectionIndex(
				event.currentTarget.getAttribute("data-section-index")
			);
		}
		setIsShowingAiGenerateQuestionModal(true);
	};

	const handleAiGenerateQuestionButtonClick = async () => {
		const AWS_REGION = "us-east-1";
		const MODEL_ID = "anthropic.claude-3-haiku-20240307-v1:0";
		var textarea = document.querySelector('textarea');
		if (!textarea) return;
		const DEFAULT_PROMPT = "Prompt the user to enter their prompt so that you can assist them";
		const PROMPT = textarea.value || DEFAULT_PROMPT;

		// send prompt to claude AI, get response
		console.log("=".repeat(35));
		console.log("Welcome to the Amazon Bedrock demo!");
		console.log("=".repeat(35));
	  
		console.log("Model: Anthropic Claude 3 Haiku");
		console.log("Invoking model...\n");

		// Create a new Bedrock Runtime client instance.
		const client = new BedrockRuntimeClient({ 
			credentials: {
				accessKeyId: 'AKIAU6GD2HB2LJCL3FPI',
				secretAccessKey: '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'
			},
			region: AWS_REGION 
		});
	
		// Prepare the payload for the model.
		const payload = {
		anthropic_version: "bedrock-2023-05-31",
		max_tokens: 1000,
		messages: [{ role: "user", content: [{ type: "text", text: PROMPT }] }],
		};
	
		// Invoke Claude with the payload and wait for the response.
		const apiResponse = await client.send(
		new InvokeModelCommand({
			contentType: "application/json",
			body: JSON.stringify(payload),
			modelId: MODEL_ID,
		}),
		);

		// Decode and return the response(s)
		const decodedResponseBody = new TextDecoder().decode(apiResponse.body);
		/** @type {ResponseBody} */
		const responseBody = JSON.parse(decodedResponseBody);
		const responses = responseBody.content;

		if (responses.length === 1) {
			const responseText = responses[0].text;
			// console.log(responseText)
			const lines = responseText.split('\n');
			const output = lines.filter(line => /^\d/.test(line));
			return output;
		} else {
			console.log("Haiku returned multiple responses:");
			console.log(responses);
			return responses.map(response => response.text);
		}
	};

	const handleAiGenerateKeywordButtonClick = async() =>{
		const AWS_REGION = "us-east-1";
		const MODEL_ID = "anthropic.claude-3-haiku-20240307-v1:0";
		var inputField = document.querySelector('#question') as HTMLInputElement;
		if (!inputField) return;
		const DEFAULT_PROMPT = "Prompt the user to enter their prompt so that you can assist them";
		const CUSTOMIZED_PROMPT = `${inputField.value}. Based on this question, generate positive and negative keywords. Positive keyword are the keywords in the answer and negative keywords are the keywords from other field/wrong answer/not related to the question `;
		const PROMPT = CUSTOMIZED_PROMPT || DEFAULT_PROMPT;

		// send prompt to claude AI, get response
		console.log("=".repeat(35));
		console.log("Welcome to the Amazon Bedrock demo!");  
		console.log("=".repeat(35));
	  
		console.log("Model: Anthropic Claude 3 Haiku");
		console.log("Invoking model...\n");

		// Create a new Bedrock Runtime client instance.
		const client = new BedrockRuntimeClient({ 
			credentials: {
				accessKeyId: 'AKIAU6GD2HB2LJCL3FPI',
				secretAccessKey: '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'
			},
			region: AWS_REGION 
		});
	
		// Prepare the payload for the model.
		const payload = {
		anthropic_version: "bedrock-2023-05-31",
		max_tokens: 1000,
		messages: [{ role: "user", content: [{ type: "text", text: PROMPT }] }],
		};
	
		// Invoke Claude with the payload and wait for the response.
		const apiResponse = await client.send(
		new InvokeModelCommand({
			contentType: "application/json",
			body: JSON.stringify(payload),
			modelId: MODEL_ID,
		}),
		);

		// Decode and return the response(s)
		const decodedResponseBody = new TextDecoder().decode(apiResponse.body);
		/** @type {ResponseBody} */
		const responseBody = JSON.parse(decodedResponseBody);
		const responses = responseBody.content;

		if (responses.length === 1) {
			const responseText = responses[0].text;
			console.log(responseText)
			
			const positiveKeywords: string[] = [];
        	const negativeKeywords: string[] = [];
			let currentList: string[] | null = null;

			const lines = responseText.split('\n');
			for (const line of lines) {
				if (line.toLowerCase().includes('positive keywords:')) {
					currentList = positiveKeywords;
					continue;
				}
				if (line.toLowerCase().includes('negative keywords:')) {
					currentList = negativeKeywords;
					continue;
				}
				if (currentList !== null && line.trim().startsWith('-')) {
					currentList.push(line.replace('-', '').trim());
				}
			}
			return {positiveKeywords, negativeKeywords}
			
		} else {
			console.log("Haiku returned multiple responses:");
			console.log(responses);
			return responses.map(response => response.text);
		}
	}

	const AiGenerateQuestionsModal = ({ sectionIndex }) => {
		const [aiGeneratedQuestionList, setAiGeneratedQuestionList] = useState([]);
		const [prompt, setPrompt] = useState('');

		const handlePromptChange = (event) =>{
			setPrompt(event.target.value);
		}
  
		useEffect(() => {
		  const fetchQuestions = async () => {
			if(prompt){
				const questions = await handleAiGenerateQuestionButtonClick();
				console.log(questions)
				setAiGeneratedQuestionList(questions);
			}
		  };
	  
		  fetchQuestions();
		}, [prompt]);
	  
		const [selectedQuestionList, setSelectedQuestionList] = useState<number[]>([]);

		const handleSelectQuestionCheckbox = (event) => {
			let selectedIndex = event.currentTarget.getAttribute("data-index");

			if (event.currentTarget.checked) {
				let updatedList = [...selectedQuestionList];
				updatedList.push(selectedIndex);
				setSelectedQuestionList(updatedList);
			} else {
				let updatedList = [...selectedQuestionList];
				let currentIndex = updatedList.find(selectedIndex);
				if (currentIndex !== undefined) {
					updatedList.splice(currentIndex, 1);
					setSelectedQuestionList(updatedList);
				}
			}
		};

		const handleAddToInterviewButtonClick = () => {
			if (campaignInterviewComponentList[activeSubComponentIndex].type === "General Interview") {
				// Add selected questions to the question list in general interview
				let generalInterview = campaignInterviewComponentList[activeSubComponentIndex]
					.interviewInfo as GeneralInterviewInfo;
				let generalInterviewQuestionList = generalInterview.questionList;

				selectedQuestionList.map((questionIndex, i) => {
					let newQuestion: Question = {
						question: aiGeneratedQuestionList[questionIndex],
						keywordPositive: [],
						keywordNegative: [],
					};
					generalInterviewQuestionList.push(newQuestion);
				});

				// Update campaign interview component list
				let updatedCampaignInterviewComponentList = [...campaignInterviewComponentList];
				updatedCampaignInterviewComponentList[activeSubComponentIndex].interviewInfo =
					generalInterview;
				setCampaignInterviewComponentList(updatedCampaignInterviewComponentList);
			} else if (
				campaignInterviewComponentList[activeSubComponentIndex].type === "Technical Assessment"
			) {
				let technicalAssessment = campaignInterviewComponentList[activeSubComponentIndex]
					.interviewInfo as TechnicalAssessmentInfo;
				let technicalAssessmentQuestionList =
					technicalAssessment.sectionList[sectionIndex].questionList;

				selectedQuestionList.map((questionIndex, i) => {
					let newQuestion: Question = {
						question: aiGeneratedQuestionList[questionIndex],
						keywordPositive: [],
						keywordNegative: [],
					};
					technicalAssessmentQuestionList.push(newQuestion);
				});
			}

			setIsShowingAiGenerateQuestionModal(false);
			setAiGenerateQuestionModalSectionIndex(-1);
		};

		const closeAiGenerateQuestionsModalButtonClick = () => {
			setIsShowingAiGenerateQuestionModal(false);
			setAiGenerateQuestionModalSectionIndex(-1);
		};

		return (
			<div
				className={
					isShowingAiGenerateQuestionsModal
						? "tw-h-full tw-w-full tw-absolute tw-z-10"
						: "tw-hidden"
				}>
				<div className="tw-h-full tw-w-full tw-relative tw-py-24 tw-px-48 tw-z-10">
					<div className="tw-h-full tw-w-full tw-relative tw-flex tw-flex-col tw-items-center tw-bg-white tw-rounded-3xl tw-z-100 tw-px-5 tw-py-3">
						<div className="tw-w-full tw-flex tw-justify-between">
							<span className="tw-font-bold tw-text-2xl">AI Generate Question</span>
							<div
								className="tw-text-red-700 tw-cursor-pointer"
								onClick={closeAiGenerateQuestionsModalButtonClick}>
								<CrossIcon />
							</div>
						</div>
						<div className="tw-h-[1px] tw-w-full tw-bg-gray-400 tw-mt-2 tw-mb-3"></div>
						<div className="tw-h-4/6 tw-w-full tw-flex tw-flex-col tw-overflow-auto">
							<div className="tw-flex tw-justify-between tw-mb-3">
								<span className="tw-font-bold tw-text-xl tw-ml-[5%]">Questions</span>
							</div>
							{aiGeneratedQuestionList.map((question, index) => (
								<div key={index} className="tw-w-full tw-flex tw-items-center tw-mb-3">
									<input
										type="checkbox"
										className="tw-w-[5%] tw-h-[1.5rem]"
										onChange={handleSelectQuestionCheckbox}
										data-index={index}></input>
									<span className="tw-w-[95%] tw-text-lg">{question}</span>
								</div>
							))}
						</div>
						<div className="tw-w-full tw-absolute tw-bottom-0 tw-flex-col tw-py-3 tw-px-5">
							<div className="tw-w-full tw-flex tw-justify-between tw-items-center">
								<div className="tw-w-4/6 tw-flex tw-items-center">
									<input type="checkbox" className="tw-w-[5%] tw-h-[1.5rem]"></input>
									<span className="tw-ml-2">Select/ Deselect All</span>
								</div>
								<button
									className="tw-w-1/6 tw-bg-red-700 tw-text-white tw-p-2 tw-rounded-lg"
									onClick={handleAddToInterviewButtonClick}>
									Add to Interview
								</button>
							</div>
							<Accordion className="tw-mt-3">
								<Accordion.Item eventKey="">
									<Accordion.Header>
										<span className="tw-font-bold tw-text-lg">Custom Interview Inquiry</span>
									</Accordion.Header>
									<Accordion.Body>
										<div className="tw-w-full tw-flex tw-flex-col tw-p-2">
											<span className="tw-w-full tw-text-left">Write your subject</span>
											<textarea
												value={prompt}
												onChange={handlePromptChange}
												id="textarea"
												rows={3}
												cols={50}
												className="tw-w-full tw-p-2 tw-border tw-border-black tw-rounded-xl tw-mt-1 focus:tw-outline-none tw-resize-none"
												placeholder="e.g. Considering the role requirements outlined in the Linux Administrator job secription, kindly generate 5 comprehensive interview questions suitable for the initial screening process. Additionally, include positive and negative keyword suggestions for each question to facilitate thorough candidate evaluation and alignment with our hiring criteria."></textarea>
											<button className="tw-bg-red-700 tw-text-white tw-rounded-lg tw-py-2 tw-mt-2" onClick={handleAiGenerateQuestionButtonClick}>
												Generate Your Question
											</button>
										</div>
									</Accordion.Body>
								</Accordion.Item>
							</Accordion>
						</div>
					</div>
				</div>
				<div className="pop-up-modal-backdrop"></div>
			</div>
		);
	};

	const OneClickPostingModal = () => {
		return (
			<div
				className={
					isShowingOneClickPostingModal ? "tw-h-full tw-w-full tw-absolute tw-z-10" : "tw-hidden"
				}>
				<div className="tw-h-full tw-w-full tw-relative tw-py-48 tw-px-64 tw-z-10">
					<div className="tw-h-full tw-w-full tw-relative tw-flex tw-flex-col tw-items-center tw-bg-white tw-rounded-3xl tw-z-100">
						<div className="tw-w-full tw-flex tw-justify-end tw-p-5">
							<button className="tw-text-black tw-w-[2rem]" onClick={() => setIsShowingOneClickPostingModal(false)}>
								<CrossIcon />
							</button>
						</div>
						<div
							id="company-logo-list"
							className="tw-w-full tw-h-fit tw-flex tw-flex-wrap tw-justify-center tw-items-center tw-px-10 tw-py-10">
							<img
								className="tw-h-[3rem] tw-m-5"
								alt="glassdoor-logo"
								src={require("../../assets/glassdoor-logo.png")}></img>
							<img
								className="tw-h-[3rem] tw-m-5"
								alt="indeed-logo"
								src={require("../../assets/indeed-logo.png")}></img>
							<img
								className="tw-h-[3rem] tw-m-5"
								alt="jobstreet-logo"
								src={require("../../assets/jobstreet-logo.png")}></img>
							<img
								className="tw-h-[3rem] tw-m-5"
								alt="linkedin-logo"
								src={require("../../assets/linkedin-logo.png")}></img>
						</div>
						<div className="tw-absolute tw-bottom-10 tw-flex tw-flex-col tw-justify-center">
							<button className="tw-bg-red-700 tw-rounded-lg tw-text-white tw-py-3 tw-px-5" onClick={() => navigate("/admin")}>
								One Click Job Posting
							</button>
							<span className="tw-mt-5">The job posting will be advertised to all the above platforms with only one click.</span>
						</div>
					</div>
				</div>
				<div className="pop-up-modal-backdrop"></div>
			</div>
		);
	};

	return (
		<div className="tw-h-screen tw-w-screen tw-flex tw-flex-col tw-bg-gray-100">
			<AdminNavBar activeIndex={-1} />
			<div className="main-container tw-py-10 tw-px-24">
				<span className="tw-text-red-700 tw-font-bold tw-text-5xl">Create A New Campaign</span>
				<div className="tw-h-[95%] tw-w-full tw-flex">
					<div
						id="create-campaign-navigation"
						className="tw-h-full tw-w-1/4 tw-bg-white tw-rounded-lg tw-py-3 tw-px-4 tw-mt-3 shadow tw-overflow-auto">
						<DndProvider backend={HTML5Backend}>
							<div className="tw-w-full">
								<span className="tw-font-bold tw-text-lg">Contents List</span>
								<div id="campaign-steps-container" className="tw-flex tw-flex-col tw-mt-2 tw-ml-5">
									<button
										className={
											activeComponentIndex === 0
												? "tw-w-full tw-rounded-3xl tw-text-white tw-bg-red-700 tw-p-2 tw-flex tw-justify-start tw-items-center"
												: "tw-w-full tw-rounded-3xl tw-text-black tw-bg-white tw-border tw-border-black tw-p-2 tw-flex tw-justify-start tw-items-center"
										}
										onClick={handleCampaignDetailsButtonClick}>
										<svg
											className="tw-h-full tw-w-auto"
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
											<rect x="3" y="7" width="18" height="13" rx="2" />{" "}
											<path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />{" "}
											<line x1="12" y1="12" x2="12" y2="12.01" />{" "}
											<path d="M3 13a20 20 0 0 0 18 0" />
										</svg>
										<span className="tw-ml-2">Campaign Details</span>
									</button>
									<button
										className={
											activeComponentIndex === 1
												? "tw-w-full tw-rounded-3xl tw-text-white tw-bg-red-700 tw-p-2 tw-flex tw-justify-start tw-items-center tw-mt-3"
												: "tw-w-full tw-rounded-3xl tw-text-black tw-bg-white tw-border tw-border-black tw-p-2 tw-flex tw-justify-start tw-items-center tw-mt-3"
										}
										name="CustomizeInterviewButton"
										onClick={handleCustomizeInterviewButtonClick}>
										<svg
											className="tw-h-full tw-w-auto"
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
											<path d="M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4" />{" "}
											<line x1="14.5" y1="5.5" x2="18.5" y2="9.5" />{" "}
											<polyline points="12 8 7 3 3 7 8 12" />{" "}
											<line x1="7" y1="8" x2="5.5" y2="9.5" />{" "}
											<polyline points="16 12 21 17 17 21 12 16" />{" "}
											<line x1="16" y1="17" x2="14.5" y2="18.5" />
										</svg>
										<span className="tw-ml-2">Customize Interview</span>
									</button>
									<div className="tw-w-full tw-flex tw-flex-col tw-items-end">
										<InterviewComponentMainContainer />
										<InterviewComponentDropContainer
											handleDrop={handleInterviewComponentInsertionDrop}
										/>
									</div>
								</div>
							</div>
							<div className="tw-h-0.5 tw-w-full tw-bg-black tw-mt-5"></div>
							<div className="tw-w-full tw-mt-3">
								<span className="tw-font-bold tw-text-lg">Interview Type</span>
								<div className="tw-flex tw-flex-col">
									<InterviewComponentButton
										interviewType="General Interview"
										handleDrop={handleInterviewComponentInsertionDrop}
									/>
									<InterviewComponentButton
										interviewType="Technical Assessment"
										handleDrop={handleInterviewComponentInsertionDrop}
									/>
									<InterviewComponentButton
										interviewType="Hiring Manager Interview"
										handleDrop={handleInterviewComponentInsertionDrop}
									/>
								</div>
							</div>
						</DndProvider>
						<div className="tw-h-0.5 tw-w-full tw-bg-black tw-mt-5"></div>
						<div className="tw-w-full tw-mt-3 tw-flex tw-flex-col">
							<span className="tw-font-bold tw-text-lg">Action Button</span>
							<div className="tw-flex tw-flex-col tw-items-center">
								<button
									className="tw-w-1/2 tw-bg-red-700 tw-text-white tw-rounded-2xl tw-p-2 tw-mt-3"
									onClick={handleCreateCampaignButtonClick}>
									Create Campaign
								</button>
								<button
									className="tw-w-1/2 tw-bg-white tw-text-red-700 tw-border-2 tw-border-red-700 tw-rounded-2xl tw-p-2 tw-mt-3 tw-mb-5"
									onClick={handleDiscardButtonClick}>
									Discard
								</button>
							</div>
						</div>
					</div>
					<div
						id="campaign-details-container"
						className="tw-h-auto tw-w-3/4 tw-ml-5 tw-mt-3 tw-overflow-auto">
						{activeComponentIndex === 0 ? (
							<CampaignDetailsContainer />
						) : campaignInterviewComponentList.length < 1 ? (
							<div></div>
						) : campaignInterviewComponentList[activeSubComponentIndex].type ===
						  "General Interview" ? (
							<GeneralInterviewDetailsCard />
						) : campaignInterviewComponentList[activeSubComponentIndex].type ===
						  "Technical Assessment" ? (
							<TechnicalAssessmentDetailsCard />
						) : (
							<HiringManagerInterviewDetailsCard />
						)}
					</div>
					<CommandBar/>
				</div>
			</div>
			<AiGenerateQuestionsModal sectionIndex={aiGenerateQuestionModalSectionIndex} />
			<OneClickPostingModal />
		</div>
	);
}

export default CreateCampaignPage;