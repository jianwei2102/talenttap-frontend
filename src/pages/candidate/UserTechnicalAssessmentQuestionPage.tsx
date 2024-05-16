import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionSection from "../../models/QuestionSection";
import Question from "../../models/Question";
import { TechnicalAssessmentAPI } from "../../api/technicalAssessmentAPI.ts";

const SKILL_ASSESSMENT_ID = 1;

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

	useEffect (() => {

		TechnicalAssessmentAPI.get(SKILL_ASSESSMENT_ID).then((response) => {
			console.log(response);

			let sections: QuestionSection[] = [];
			response.forEach(question => {

				let sectionIndex = -1;
				for (let i = 0; i < sections.length; i++) {
					if (sections[i].sectionName === question.sectionName) {
						sectionIndex = i;
					}
				}

				if (sectionIndex === -1) { // section does not exist
					sections.push({
						sectionName: question.sectionName,
						sectionIndex: sections.length,
						questionList: [{
							id: question.id,
							question: question.question,
							title: question.title,
							hint: question.hint,
							allowedTimeSeconds: question.allowedTimeSeconds,
							maxCharacterAnswer: question.maxCharacterAnswer,
							answer: "",
							timeSpent: 0,
							numAttempts: 0
						}]
					});
				} else { // section already exists
					sections[sectionIndex].questionList.push({
						id: question.id,
						question: question.question,
						title: question.title,
						hint: question.hint,
						allowedTimeSeconds: question.allowedTimeSeconds,
						maxCharacterAnswer: question.maxCharacterAnswer,
						answer: "",
						timeSpent: 0,
						numAttempts: 0
					});
				}
			});

			console.log("sections: ", sections);
			setCurrentQuestionLists(sections);
		});

	}, []);

	const [activeSectionIndex, setActiveSectionIndex] = useState(0);
	const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
	const [currentCharacterNum, setCurrentCharacterNum] = useState(0);
	const [isLastQuestion, setIsLastQuestion] = useState(false);
	const [currentQuestionAnswer, setCurrentQuestionAnswer] = useState("");
	const [currentQuestionLists, setCurrentQuestionLists] = useState<QuestionSection[]>([]);

	const [startTime, setStartTime] = useState<number>(Date.now());

	const saveQuestionAnswer = () => {
		// Save Answer
		const newQuestionLists = [...currentQuestionLists];

		currentQuestionLists[activeSectionIndex].questionList[activeQuestionIndex].answer =
			currentQuestionAnswer;

		setCurrentQuestionLists(newQuestionLists);
	};

	const answerHasChanged = () => {
		return currentQuestionAnswer !== currentQuestionLists[activeSectionIndex].questionList[activeQuestionIndex].answer;
	};

	const continueHandle = () => {
		let newQuestionIndex = activeQuestionIndex;
		let newSectionIndex = activeSectionIndex;
		let lastQuestion = false;

		saveQuestionAnswer();

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
		// TODO: Save questions answer & data like timeSpent, numAttempts, etc. in db
		const elapsedTime = updateTimeSpent();
		updateNumAttempts(elapsedTime);
		console.log(currentQuestionLists);

		saveQuestionAnswer();

		TechnicalAssessmentAPI.post(SKILL_ASSESSMENT_ID, currentQuestionLists).then((response) => {
			console.log(response);
		});

		navigate('/submission-completed');
	};

	const answerCharacterNumberHandle = (event) => {
		let currentCharacters: string = event.target.value;
		setCurrentCharacterNum(currentCharacters.length);
		setCurrentQuestionAnswer(currentCharacters);
	};

	const QuestionSectionCard = (section: QuestionSectionCardProps) => {
		return (
			<div className="tw-w-full tw-pt-3 tw-pb-3 tw-pl-1 tw-pr-1 tw-flex tw-flex-col">
				<span className="tw-mb-2 tw-font-bold tw-text-md">
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

	const updateTimeSpent = () => {
		const endTime = Date.now();
		const currentQuestion = currentQuestionLists[activeSectionIndex].questionList[activeQuestionIndex];

		const elapsedTime = Math.round((endTime - startTime) / 1000);
		currentQuestion.timeSpent = elapsedTime + currentQuestion.timeSpent;

		return elapsedTime;
	};

	const updateNumAttempts = (elapsedTime: number) => {
		if (elapsedTime < 1000) return;

		if (!answerHasChanged()) return;

		const currentQuestion = currentQuestionLists[activeSectionIndex].questionList[activeQuestionIndex];
		currentQuestion.numAttempts += 1;
	};

	const QuestionCard = (questionCard: QuestionCardProps) => {

		const navigateToQuestionHandle = () => {
			const elapsedTime = updateTimeSpent();
			updateNumAttempts(elapsedTime);

			saveQuestionAnswer();

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

			setStartTime(Date.now());
		};

		return (
			<div
				className="tw-flex tw-items-center tw-pt-1 tw-pb-1 tw-cursor-pointer"
				onClick={navigateToQuestionHandle}>
				<input
					className="tw-h-4 tw-w-4 tw-bg-gray-100 tw-border-gray-300 tw-rounded-md"
					type="checkbox"
					readOnly={true}
					checked={!questionCard.isEmpty}></input>
				<span
					className={questionCard.isActive === true ? "tw-text-sm tw-ml-2 tw-font-bold" : "tw-text-sm tw-ml-2"}>
					{questionCard.questionIndex + 1 + ". " + questionCard.question.title}
				</span>
			</div>
		);
	};

	return (
		<div className="tw-h-screen tw-w-screen tw-flex tw-justify-between tw-p-20 tw-bg-slate-200">
			<div className="tw-h-full tw-w-3/4 tw-bg-white tw-p-5 tw-mr-5">
				<span className="tw-text-3xl tw-font-bold">
					{
					String.fromCharCode(65 + activeSectionIndex) +
						". " +
						currentQuestionLists[activeSectionIndex]?.sectionName}
				</span>
				<div className="tw-h-full tw-w-full tw-pl-2 tw-pr-2 tw-pt-5 tw-pb-5">
					<span className="tw-font-bold tw-text-lg">
						{activeQuestionIndex +
							1 +
							". " +
							currentQuestionLists[activeSectionIndex]?.questionList[activeQuestionIndex].question}
					</span>
					<div className="tw-h-full tw-w-full tw-p-5 tw-flex tw-flex-col">
						<textarea
							id="technical-assessment-answer-input"
							className="tw-h-5/6 tw-w-full tw-border tw-border-black tw-rounded-sm tw-p-2"
							rows={10}
							cols={50}
							onInput={answerCharacterNumberHandle}
							readOnly={false}
							value={currentQuestionAnswer}>
						</textarea>
						<div className="tw-w-full tw-flex tw-justify-end tw-pt-3">
							{currentCharacterNum + "/ " + currentQuestionLists[activeSectionIndex]?.questionList[activeQuestionIndex].maxCharacterAnswer + " characters"}
						</div>
					</div>
				</div>
			</div>
			<div className="tw-h-full tw-w-1/4 tw-flex tw-flex-col tw-items-center tw-bg-white tw-p-5">
				<span className="tw-w-full tw-text-lg tw-font-bold tw-text-center tw-p-2">Questions</span>
				<span className="tw-w-full tw-text-sm tw-text-slate-400 tw-text-center tw-p-2">
					Please answer all questions below:
				</span>
				<div className="tw-w-full tw-h-1/2 tw-overflow-auto">
					{currentQuestionLists.map((section, index) => (
						<QuestionSectionCard
							questionSection={section}
							characterIndex={String.fromCharCode(65 + index)}
						/>
					))}
				</div>
				<button
					className=" tw-w-4/6 tw-bg-red-700 tw-flex tw-items-center tw-justify-center tw-p-2"
					onClick={isLastQuestion ? submitHandle : continueHandle}>
					<span className="tw-text-white tw-mr-2">{isLastQuestion ? "Submit" : "Continue"}</span>
					<svg className="tw-h-5 tw-w-5 tw-text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M14 5l7 7m0 0l-7 7m7-7H3"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}

export default UserTechnicalAssessmentQuestionPage;
