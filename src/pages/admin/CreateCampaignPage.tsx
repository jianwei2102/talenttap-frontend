import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useDrag, useDrop, DndContext, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Accordion from "react-bootstrap/Accordion";
import Dropdown from "react-bootstrap/Dropdown";
import AdminNavBar from "../../components/admin/AdminNavBar.tsx";
import {
	GeneralInterviewIcon,
	TechnicalAssessmentIcon,
	HiringManagerInterviewIcon,
	InformationIcon,
	TrashCanIcon,
} from "../../assets/index.js";
import { CustomToggle } from "../../components";

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
	const [wasDragDropped, setWasDragDropped] = useState(false);

	const handleCreateCampaignButtonClick = () => {
		//TODO: Save campaignDetails and campaignInterviewComponentList (all the data is in these 2 variables)
		navigate("/admin");
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
			<div ref={ref} className="w-full flex flex-col items-end">
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
				className="w-[90%] border-gray-400 border-2 border-dashed p-2 mt-3 text-center">
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
						? "w-[90%] flex items-center rounded-3xl p-2 mt-3 bg-red-700 text-white"
						: "w-[90%] flex items-center rounded-3xl p-2 mt-3 bg-white border border-black text-black"
				}
				draggable
				onClick={handleInterviewComponentStepCardClick}>
				<svg
					className="h-full w-auto"
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
							? "h-full w-auto ml-0.5 text-white"
							: "h-full w-auto ml-0.5 text-black"
					}>
					{interviewType === "General Interview" ? (
						<GeneralInterviewIcon />
					) : interviewType === "Technical Assessment" ? (
						<TechnicalAssessmentIcon />
					) : (
						<HiringManagerInterviewIcon />
					)}
				</div>
				<span className="text-sm ml-1.5">{name}</span>
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
				className="w-full flex items-center justify-between rounded-3xl p-2 mt-3 bg-white border border-black text-black"
				draggable={true}>
				<div className="flex items-center">
					<svg
						className="h-full w-auto"
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
					<div className="h-full w-auto ml-1 text-black">
						{interviewType === "General Interview" ? (
							<GeneralInterviewIcon />
						) : interviewType === "Technical Assessment" ? (
							<TechnicalAssessmentIcon />
						) : (
							<HiringManagerInterviewIcon />
						)}
					</div>
					<span className="ml-1.5">{interviewType}</span>
				</div>
				<div className="h-full w-auto flex justify-end items-center text-black">
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
			<div className="h-auto flex flex-col">
				<span className="font-bold text-3xl">Campaign Details</span>
				<div className="bg-white rounded-xl shadown p-4 mt-3">
					<span className="text-2xl">General Information</span>
					<div className="h-0.5 bg-gray-400 mt-2 mb-3"></div>
					<div className="w-full flex flex-col">
						<span className="text-xl">Campaign Name</span>
						<input
							type="text"
							className="w-full p-2 border border-black rounded-xl mt-1 focus:outline-none"
							value={campaignName}
							onChange={handleCampaignNameInputChange}></input>
					</div>
					<div className="w-full flex flex-col mt-3">
						<span className="text-xl">Overview</span>
						<textarea
							className="w-full p-2 border border-black rounded-xl mt-1 focus:outline-none resize-none"
							rows={5}
							cols={50}
							value={overview}
							onChange={handleOverviewInputChange}></textarea>
					</div>
					<div className="w-full flex flex-col mt-3">
						<span className="text-xl">Requirement</span>
						<textarea
							className="w-full p-2 border border-black rounded-xl mt-1 focus:outline-none resize-none"
							rows={5}
							cols={50}
							value={requirement}
							onChange={handleRequirementInputChange}></textarea>
					</div>
					<div className="w-full flex flex-col mt-3">
						<span className="text-xl">Image</span>
						{/* //TODO Add Image */}
					</div>
				</div>
				<div className="bg-white rounded-xl shadow p-4 mt-3">
					<span className="text-2xl">Settings</span>
					<div className="h-0.5 bg-gray-400 mt-2 mb-3 flex flex-col"></div>
					<div className="flex justify-between items-center py-2">
						<div className="w-1/4 flex flex-col">
							<span className="text-xl">Recruitment Headcount</span>
							<input
								type="number"
								className="p-2 border border-black rounded-lg focus:outline-none"
								value={recruitmentHeadcount}
								onChange={handleRecruitmentHeadcountInputChange}></input>
						</div>
						<div className="w-4/6 flex flex-col">
							<span className="w-full text-xl">Duration</span>
							<div className="w-full flex">
								<DatePicker
									className="w-full border border-black rounded-lg p-2"
									selected={startDuration}
									onChange={handleStartDurationInputChange}
								/>
								<span className="w-1/6 text-center">-</span>
								<DatePicker
									className="w-full border border-black rounded-lg p-2"
									selected={endDuration}
									onChange={handleEndDurationInputChange}
								/>
							</div>
						</div>
					</div>
					<div className="flex justify-between py-2 mt-3">
						<div className="w-[45%] flex flex-col">
							<span className="text-xl">Location</span>
							<input
								type="text"
								className="w-full p-2 border border-black rounded-lg focus:outline-none"
								value={location}
								onChange={handleLocationInputChange}></input>
						</div>
						<div className="w-[45%] flex flex-col">
							<span className="text-xl">Work Flexibility</span>
							<Dropdown onSelect={handleWorkFlexibilityInputChange}>
								<Dropdown.Toggle
									id="work-flexibility-dropdown"
									as={CustomToggle}
									className="w-full flex">
									{workFlexibility === "" ? "Please Select An Option" : workFlexibility}
								</Dropdown.Toggle>
								<Dropdown.Menu className="w-full">
									{workFlexibilityList.map((item, index) => (
										<Dropdown.Item className="w-full" eventKey={item}>
											{item}
										</Dropdown.Item>
									))}
								</Dropdown.Menu>
							</Dropdown>
						</div>
					</div>
					<div className="flex justify-between py-2 mt-3">
						<div className="w-[45%] flex flex-col">
							<span className="text-xl">Department</span>
							<Dropdown onSelect={handleDepartmentInputChange}>
								<Dropdown.Toggle id="department-dropdown" as={CustomToggle} className="w-full flex">
									{department === "" ? "Please Select An Option" : department}
								</Dropdown.Toggle>
								<Dropdown.Menu className="w-full">
									{departmentList.map((item, index) => (
										<Dropdown.Item eventKey={item}>{item}</Dropdown.Item>
									))}
								</Dropdown.Menu>
							</Dropdown>
						</div>
						<div className="w-[45%] flex flex-col">
							<span className="text-xl">Expertise</span>
							<Dropdown onSelect={handleExpertiseInputChange}>
								<Dropdown.Toggle id="expertise-dropdown" as={CustomToggle} className="w-full flex">
									{expertise === "" ? "Please Select An Option" : expertise}
								</Dropdown.Toggle>
								<Dropdown.Menu className="w-full">
									{expertiseList.map((item, index) => (
										<Dropdown.Item eventKey={item}>{item}</Dropdown.Item>
									))}
								</Dropdown.Menu>
							</Dropdown>
						</div>
					</div>
				</div>
				<div className="bg-white rounded-xl shadow p-4 mt-3">
					<span className="text-2xl">Person Involved</span>
					<div className="h-0.5 bg-gray-400 mt-2 mb-3 flex flex-col"></div>
				</div>
			</div>
		);
	};

	const handleDeleteInterviewComponentButtonClick = () => {
		let updatedInterviewComponentsList = [...campaignInterviewComponentList];
		updatedInterviewComponentsList.splice(activeSubComponentIndex, 1);
		setCampaignInterviewComponentList(updatedInterviewComponentsList);

		if (updatedInterviewComponentsList.length < 1) {
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

			const handleQuestionInputChange = (event) => {
				setCurrentQuestion(event.target.value);
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
				tempQuestionList[index - 1].question = currentQuestion;
				tempQuestionList[index - 1].keywordPositive = currentPositiveKeywordList;
				tempQuestionList[index - 1].keywordNegative = currentNegativeKeywordList;
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
				<div className="mb-2">
					<Accordion.Item eventKey={String(index)}>
						<Accordion.Header>
							<span className="text-xl font-bold">{"Question " + index}</span>
						</Accordion.Header>
						<Accordion.Body className="flex flex-col p-3">
							<div className="flex flex-col">
								<span className="text-lg">Question</span>
								<input
									className="w-full border border-black rounded-lg p-2 focus:outline-none"
									value={currentQuestion}
									type="text"
									onChange={handleQuestionInputChange}></input>
							</div>
							<div className="w-full flex justify-between mt-3">
								<div className="w-[45%] h-fit border border-black rounded-lg py-0.5 flex flex-col">
									<div className="w-full flex p-2">
										<span className="w-1/2">Positive Keyword</span>
										<span className="w-1/2">Weightage</span>
									</div>
									<div className="flex flex-col px-2">
										{currentPositiveKeywordList.map((keyword, index) => (
											<div className="w-full flex mb-2">
												<input
													type="text"
													className="w-1/2 border border-black rounded-lg px-2 py-0.5 focus:outline-none"
													value={keyword.keyword}
													data-key={index}
													data-type="keyword"
													onChange={handleKeywordPositiveInputChange}></input>
												<input
													type="number"
													className="w-2/6 border border-black rounded-lg px-2 py-0.5 ml-2 focus:outline-none"
													value={keyword.weightage}
													data-key={index}
													data-type="weight"
													onChange={handleKeywordPositiveInputChange}></input>
												<button
													className="w-[20%] text-red-700 flex justify-center items-center"
													data-keyword-index={index}
													data-keyword-type="positive"
													onClick={handleKeywordDeleteButtonClick}>
													<TrashCanIcon />
												</button>
											</div>
										))}
									</div>
									<div className="h-[0.5px] w-full bg-black"></div>
									<button
										className="w-full rounded-lg bg-white text-black py-1"
										onClick={handleAddPositiveKeywordButtonClick}>
										Add New Keyword
									</button>
								</div>
								<div className="w-[45%] h-fit border border-black rounded-lg py-0.5 flex flex-col">
									<div className="w-full flex p-2">
										<span className="w-1/2">Negative Keyword</span>
										<span className="w-1/2">Weightage</span>
									</div>
									<div className="flex flex-col px-2">
										{currentNegativeKeywordList.map((keyword, index) => (
											<div className="w-full flex mb-2">
												<input
													type="text"
													className="w-1/2 border border-black rounded-lg px-2 py-0.5 focus:outline-none"
													value={keyword.keyword}
													data-key={index}
													data-type="keyword"
													onChange={handleKeywordNegativeInputChange}></input>
												<input
													type="number"
													className="w-2/6 border border-black rounded-lg px-2 py-0.5 ml-2 focus:outline-none"
													value={keyword.weightage}
													data-key={index}
													data-type="weight"
													onChange={handleKeywordNegativeInputChange}></input>
												<button
													className="w-[20%] text-red-700 flex justify-center items-center"
													data-keyword-index={index}
													data-keyword-type="negative"
													onClick={handleKeywordDeleteButtonClick}>
													<TrashCanIcon />
												</button>
											</div>
										))}
									</div>
									<div className="h-[0.5px] w-full bg-black"></div>
									<button
										className="w-full rounded-lg bg-white text-black py-1"
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

		const handleAddNewQuestionButtonClick = () => {
			let newQuestion: Question = { question: "", keywordPositive: [], keywordNegative: [] };
			setGeneralInterviewQuestionList((prevState) => [...prevState, newQuestion]);
		};

		return (
			<div className="flex flex-col">
				<div className="flex justify-between items-center mb-2">
					<span className="text-2xl font-bold">General Interview</span>
					<button className="bg-red-400 text-white rounded-lg p-2">AI Generate Question</button>
				</div>
				<Accordion defaultActiveKey={["0"]} alwaysOpen>
					{generalInterviewQuestionList.map((questionInfo, index) => (
						<QuestionCard
							question={questionInfo.question}
							keywordPositiveList={questionInfo.keywordPositive}
							keywordNegativeList={questionInfo.keywordNegative}
							index={index + 1}
						/>
					))}
				</Accordion>
				<div className="w-full flex justify-between items-center mt-3">
					<button
						className="w-2/6 bg-red-700 text-white text-center p-2 rounded-lg"
						onClick={handleAddNewQuestionButtonClick}>
						Add New Question
					</button>
					<button
						className="w-2/6 bg-white text-black border border-black text-center p-2 rounded-lg"
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
					<div className="mb-2">
						<Accordion.Item eventKey={String(questionIndex)}>
							<Accordion.Header>
								<span className="text-xl font-bold">{"Question " + (questionIndex + 1)}</span>
							</Accordion.Header>
							<Accordion.Body className="flex flex-col p-3">
								<div className="flex flex-col">
									<span className="text-lg">Question</span>
									<input
										className="w-full border border-black rounded-lg p-2 focus:outline-none"
										value={currentQuestion}
										type="text"
										onChange={handleQuestionInputChange}></input>
								</div>
								<div className="w-full flex justify-between mt-3">
									<div className="w-[45%] h-fit border border-black rounded-lg py-0.5 flex flex-col">
										<div className="w-full flex p-2">
											<span className="w-1/2">Positive Keyword</span>
											<span className="w-1/2">Weightage</span>
										</div>
										<div className="flex flex-col px-2">
											{currentPositiveKeywordList.map((keyword, index) => (
												<div className="w-full flex mb-2">
													<input
														type="text"
														className="w-1/2 border border-black rounded-lg px-2 py-0.5 focus:outline-none"
														value={keyword.keyword}
														data-key={index}
														data-type="keyword"
														onChange={handleKeywordPositiveInputChange}></input>
													<input
														type="number"
														className="w-2/6 border border-black rounded-lg px-2 py-0.5 ml-2 focus:outline-none"
														value={keyword.weightage}
														data-key={index}
														data-type="weight"
														onChange={handleKeywordPositiveInputChange}></input>
													<button
														className="w-[20%] text-red-700 flex justify-center items-center"
														data-keyword-index={index}
														data-keyword-type="positive"
														onClick={handleKeywordDeleteButtonClick}>
														<TrashCanIcon />
													</button>
												</div>
											))}
										</div>
										<div className="h-[0.5px] w-full bg-black"></div>
										<button
											className="w-full rounded-lg bg-white text-black py-1"
											onClick={handleAddPositiveKeywordButtonClick}>
											Add New Keyword
										</button>
									</div>
									<div className="w-[45%] h-fit border border-black rounded-lg py-0.5 flex flex-col">
										<div className="w-full flex p-2">
											<span className="w-1/2">Negative Keyword</span>
											<span className="w-1/2">Weightage</span>
										</div>
										<div className="flex flex-col px-2">
											{currentNegativeKeywordList.map((keyword, index) => (
												<div className="w-full flex mb-2">
													<input
														type="text"
														className="w-1/2 border border-black rounded-lg px-2 py-0.5 focus:outline-none"
														value={keyword.keyword}
														data-key={index}
														data-type="keyword"
														onChange={handleKeywordNegativeInputChange}></input>
													<input
														type="number"
														className="w-2/6 border border-black rounded-lg px-2 py-0.5 ml-2 focus:outline-none"
														value={keyword.weightage}
														data-key={index}
														data-type="weight"
														onChange={handleKeywordNegativeInputChange}></input>
													<button
														className="w-[20%] text-red-700 flex justify-center items-center"
														data-keyword-index={index}
														data-keyword-type="negative"
														onClick={handleKeywordDeleteButtonClick}>
														<TrashCanIcon />
													</button>
												</div>
											))}
										</div>
										<div className="h-[0.5px] w-full bg-black"></div>
										<button
											className="w-full rounded-lg bg-white text-black py-1"
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
				<div className="mb-2">
					<Accordion.Item eventKey={String(sectionIndex)}>
						<Accordion.Header>
							<span className="text-xl font-bold">
								{currentSectionName === "" ? "Section " + (sectionIndex + 1) : currentSectionName}
							</span>
						</Accordion.Header>
						<Accordion.Body className="flex flex-col">
							<div className="w-full flex flex-col">
								<div className="flex justify-between items-center py-2">
									<span className="text-lg">Section Name</span>
									<button className="bg-red-400 text-white rounded-lg p-2">
										AI Generate Question
									</button>
								</div>
								<input
									type="text"
									className="w-full border border-black rounded-lg p-2 focus:outline-none"
									value={currentSectionName}
									onChange={handleSectionNameChange}></input>
							</div>
							<Accordion alwaysOpen className="mt-3">
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
								className="w-2/6 bg-red-700 text-white rounded-lg py-2 mt-3"
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
			<div className="flex flex-col">
				<div className="flex justify-between items-center mb-2">
					<span className="text-2xl font-bold">Technical Assessment</span>
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
				<div className="w-full flex justify-between items-center mt-3">
					<button
						className="w-2/6 bg-red-700 text-white text-center p-2 rounded-lg"
						onClick={handleAddNewSectionButtonClick}>
						Add New Section
					</button>
					<button
						className="w-2/6 bg-white text-black border border-black text-center p-2 rounded-lg"
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
			<div className="flex flex-col">
				<span className="font-bold text-3xl">Hiring Manager Interview</span>
				<div className="bg-white rounded-xl border border-gray-400 p-4 mt-3">
					<span className="text-2xl">Settings</span>
					<div className="h-0.5 bg-gray-500 mt-2 mb-3"></div>
					<div className="w-full flex justify-between">
						<div className="w-[65%] flex flex-col">
							<span className="text-xl">Interview Title</span>
							<input
								type="text"
								className="w-full p-2 border border-black rounded-xl mt-1 focus:outline-none"
								value={interviewTitle}
								onChange={handleInterviewTitleInputChange}></input>
						</div>
						<div className="w-[25%] flex flex-col">
							<span className="text-xl">{"Duration (Minutes)"}</span>
							<input
								type="number"
								className="w-full p-2 border border-black rounded-xl mt-1 focus:outline-none"
								value={durationMinutes}
								onChange={handleDurationMinutesInputChange}></input>
						</div>
					</div>
					<div className="w-full flex flex-col mt-3">
						<span className="text-xl">Short Description</span>
						<textarea
							className="w-full p-2 border border-black rounded-xl mt-1 focus:outline-none resize-none"
							rows={5}
							cols={50}
							value={description}
							onChange={handleDescriptionInputChange}></textarea>
					</div>
				</div>
				<div className="bg-white rounded-xl border border-gray-400 p-4 mt-3">
					<span className="text-2xl">Person Involved</span>
					<div className="h-0.5 bg-gray-500 mt-2 mb-3"></div>
				</div>
				<div className="w-full flex justify-end items-center mt-3">
					<button
						className="w-2/6 bg-white text-black border border-black text-center p-2 rounded-lg"
						onClick={handleDeleteInterviewComponentButtonClick}>
						Delete Interview Component
					</button>
				</div>
			</div>
		);
	};

	return (
		<div className="h-screen w-screen flex flex-col bg-slate-200">
			<AdminNavBar activeIndex={-1} />
			<div className="main-container py-10 px-24">
				<span className="text-red-700 font-bold text-5xl">Create A New Campaign</span>
				<div className="h-[95%] w-full flex">
					<div
						id="create-campaign-navigation"
						className="h-full w-1/4 bg-white rounded-lg py-3 px-4 mt-3 shadow overflow-auto">
						<DndProvider backend={HTML5Backend}>
							<div className="w-full">
								<span className="font-bold text-lg">Contents List</span>
								<div id="campaign-steps-container" className="flex flex-col mt-2 ml-5">
									<button
										className={
											activeComponentIndex === 0
												? "w-full rounded-3xl text-white bg-red-700 p-2 flex justify-start items-center"
												: "w-full rounded-3xl text-black bg-white border border-black p-2 flex justify-start items-center"
										}
										onClick={handleCampaignDetailsButtonClick}>
										<svg
											className="h-full w-auto"
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
										<span className="ml-2">Campaign Details</span>
									</button>
									<button
										className={
											activeComponentIndex === 1
												? "w-full rounded-3xl text-white bg-red-700 p-2 flex justify-start items-center mt-3"
												: "w-full rounded-3xl text-black bg-white border border-black p-2 flex justify-start items-center mt-3"
										}
										name="CustomizeInterviewButton"
										onClick={handleCustomizeInterviewButtonClick}>
										<svg
											className="h-full w-auto"
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
										<span className="ml-2">Customize Interview</span>
									</button>
									<div className="w-full flex flex-col items-end">
										<InterviewComponentMainContainer />
										<InterviewComponentDropContainer
											handleDrop={handleInterviewComponentInsertionDrop}
										/>
									</div>
								</div>
							</div>
							<div className="h-0.5 w-full bg-black mt-5"></div>
							<div className="w-full mt-3">
								<span className="font-bold text-lg">Interview Type</span>
								<div className="flex flex-col">
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
						<div className="h-0.5 w-full bg-black mt-5"></div>
						<div className="w-full mt-3 flex flex-col">
							<span className="font-bold text-lg">Action Button</span>
							<div className="flex flex-col items-center">
								<button
									className="w-1/2 bg-red-700 text-white rounded-2xl p-2 mt-3"
									onClick={handleCreateCampaignButtonClick}>
									Create Campaign
								</button>
								<button
									className="w-1/2 bg-white text-red-700 border-2 border-red-700 rounded-2xl p-2 mt-3 mb-5"
									onClick={handleDiscardButtonClick}>
									Discard
								</button>
							</div>
						</div>
					</div>
					<div id="campaign-details-container" className="h-auto w-3/4 ml-5 mt-3 overflow-auto">
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
				</div>
			</div>
		</div>
	);
}

export default CreateCampaignPage;
