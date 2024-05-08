import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface QuestionSection {
	sectionName: string;
	sectionIndex: number;
	questionList: Question[];
}

interface Question {
	question: string;
	componentName: string;
	answer: string;
}

interface QuestionSectionCardProps {
	questionSection: QuestionSection;
	characterIndex: string;
}

interface QuestionCardProps {
	question: Question;
	questionIndex: number;
	sectionIndex: number;
	isActive: boolean;
	isEmpty: boolean;
}

function UserTechnicalAssessmentQuestionPage() {
	const navigate = useNavigate();

	// TODO: Get questions from campaign (start)
	const questionList1: Question[] = [
		{
			question:
				"Share an experience where you successfully negotiated a deal with a challenging customer.",
			componentName: "Negotiation",
			answer: "",
		},
		{
			question: "Another question here.",
			componentName: "Components of a Deal",
			answer: "",
		},
	];

	const questionList2: Question[] = [
		{
			question: "Section 2 Question 1.",
			componentName: "Expanding Customer Base",
			answer: "",
		},
		{
			question: "Another question here.",
			componentName: "Opening Message",
			answer: "",
		},
	];

	const questionSection1: QuestionSection = {
		sectionName: "Making Deals",
		sectionIndex: 0,
		questionList: questionList1,
	};
	const questionSection2: QuestionSection = {
		sectionName: "Research Skills",
		sectionIndex: 1,
		questionList: questionList2,
	};

	const questionSectionList: QuestionSection[] = [questionSection1, questionSection2];
	// TODO: Get questions for campaign (end)

	const [activeSectionIndex, setActiveSectionIndex] = useState(0);
	const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
	const [currentCharacterNum, setCurrentCharacterNum] = useState(0);
	const [isLastQuestion, setIsLastQuestion] = useState(false);
	const [currentQuestionAnswer, setCurrentQuestionAnswer] = useState("");
	const [currentQuestionLists, setCurrentQuestionLists] = useState(questionSectionList);

	const saveQuestionAnswer = (sectionIndex: number, questionIndex: number) => {
		// Save Answer
		const newQuestionLists = [...currentQuestionLists];

		currentQuestionLists[activeSectionIndex].questionList[activeQuestionIndex].answer =
			currentQuestionAnswer;

		setCurrentQuestionLists(newQuestionLists);
	};

	const continueHandle = () => {
		let newQuestionIndex = activeQuestionIndex;
		let newSectionIndex = activeSectionIndex;
		let lastQuestion = false;

		saveQuestionAnswer(newSectionIndex, newQuestionIndex);

		// Change question and section index
		if (newQuestionIndex + 1 >= currentQuestionLists[activeSectionIndex].questionList.length) {
			newQuestionIndex = 0;
			newSectionIndex = activeSectionIndex + 1;
		} else {
			newQuestionIndex += 1;

			if (
				newQuestionIndex + 1 >= currentQuestionLists[activeSectionIndex].questionList.length &&
				newSectionIndex + 1 >= currentQuestionLists.length
			) {
				lastQuestion = true;
			}
		}

		setActiveQuestionIndex(newQuestionIndex);
		setActiveSectionIndex(newSectionIndex);
		setIsLastQuestion(lastQuestion);

		setCurrentQuestionAnswer(
			currentQuestionLists[newSectionIndex].questionList[newQuestionIndex].answer
		);
		setCurrentCharacterNum(currentQuestionLists[newSectionIndex].questionList[newQuestionIndex].answer.length);
	};

	const submitHandle = () => {
		// TODO: Save questions in db
		saveQuestionAnswer(activeSectionIndex, activeQuestionIndex);
		navigate('/submission-completed');
	};

	// TODO: Change max character number according to question?
	const maxCharacterNum = 2500;

	const answerCharacterNumberHandle = (event) => {
		let currentCharacters: string = event.target.value;
		setCurrentCharacterNum(currentCharacters.length);
		setCurrentQuestionAnswer(currentCharacters);
	};

	const QuestionSectionCard = (section: QuestionSectionCardProps) => {
		return (
			<div className="w-full pt-3 pb-3 pl-1 pr-1 flex flex-col">
				<span className="mb-2 font-bold text-md">
					{section.characterIndex + ". " + section.questionSection.sectionName}
				</span>
				{section.questionSection.questionList.map((question, index) => (
					<QuestionCard
						question={question}
						questionIndex={index}
						sectionIndex={section.questionSection.sectionIndex}
						isEmpty={question.answer.length === 0 ? true : false}
						isActive={
							section.questionSection.sectionIndex === activeSectionIndex &&
							index === activeQuestionIndex
								? true
								: false
						}
					/>
				))}
			</div>
		);
	};

	const QuestionCard = (questionCard: QuestionCardProps) => {
		const navigateToQuestionHandle = () => {
			saveQuestionAnswer(activeSectionIndex, activeQuestionIndex);

			let newQuestionIndex = questionCard.questionIndex;
			let newSectionIndex = questionCard.sectionIndex;
			setActiveQuestionIndex(newQuestionIndex);
			setActiveSectionIndex(newSectionIndex);

			if (
				questionCard.sectionIndex >= currentQuestionLists.length - 1 &&
				questionCard.questionIndex >=
				currentQuestionLists[activeSectionIndex].questionList.length - 1
			) {
				setIsLastQuestion(true);
			} else {
				setIsLastQuestion(false);
			}

			setCurrentQuestionAnswer(
				currentQuestionLists[newSectionIndex].questionList[newQuestionIndex].answer
			);
			setCurrentCharacterNum(currentQuestionLists[newSectionIndex].questionList[newQuestionIndex].answer.length);
		};

		return (
			<div
				className="flex items-center pt-1 pb-1 cursor-pointer"
				onClick={navigateToQuestionHandle}>
				<input
					className="h-4 w-4 bg-gray-100 border-gray-300 rounded-md"
					type="checkbox"
					checked={!questionCard.isEmpty}></input>
				<span
					className={questionCard.isActive === true ? "text-sm ml-2 font-bold" : "text-sm ml-2"}>
					{questionCard.questionIndex + 1 + ". " + questionCard.question.componentName}
				</span>
			</div>
		);
	};

	return (
		<div className="h-screen w-screen flex justify-between p-20 bg-slate-200">
			<div className="h-full w-3/4 bg-white p-5 mr-5">
				<span className="text-3xl font-bold">
					{String.fromCharCode(65 + activeSectionIndex) +
						". " +
						currentQuestionLists[activeSectionIndex].sectionName}
				</span>
				<div className="h-full w-full pl-2 pr-2 pt-5 pb-5">
					<span className="font-bold text-lg">
						{activeQuestionIndex +
							1 +
							". " +
							currentQuestionLists[activeSectionIndex].questionList[activeQuestionIndex].question}
					</span>
					<div className="h-full w-full p-5 flex flex-col">
						<textarea
							id="technical-assessment-answer-input"
							className="h-5/6 w-full border border-black rounded-sm p-2"
							rows={10}
							cols={50}
							onInput={answerCharacterNumberHandle}
							readOnly={false}
							value={currentQuestionAnswer}>
						</textarea>
						<div className="w-full flex justify-end pt-3">
							{currentCharacterNum + "/ " + maxCharacterNum + " characters"}
						</div>
					</div>
				</div>
			</div>
			<div className="h-full w-1/4 flex flex-col items-center bg-white p-5">
				<span className="w-full text-lg font-bold text-center p-2">Questions</span>
				<span className="w-full text-sm text-slate-400 text-center p-2">
					Please answer all questions below:
				</span>
				<div className="w-full h-1/2 overflow-auto">
					{currentQuestionLists.map((section, index) => (
						<QuestionSectionCard
							questionSection={section}
							characterIndex={String.fromCharCode(65 + index)}
						/>
					))}
				</div>
				<button
					className=" w-4/6 bg-red-700 flex items-center justify-center p-2"
					onClick={isLastQuestion ? submitHandle : continueHandle}>
					<span className="text-white mr-2">{isLastQuestion ? "Submit" : "Continue"}</span>
					<svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M14 5l7 7m0 0l-7 7m7-7H3"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}

export default UserTechnicalAssessmentQuestionPage;
