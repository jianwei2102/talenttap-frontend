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

	useEffect(() => {

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
							numAttempts: 0,
							positiveKeywords: [],
							negativeKeywords: []
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
						numAttempts: 0,
						positiveKeywords: [],
						negativeKeywords: []
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
				className="flex items-center pt-1 pb-1 cursor-pointer"
				onClick={navigateToQuestionHandle}>
				<input
					className="h-4 w-4 bg-gray-100 border-gray-300 rounded-md"
					type="checkbox"
					readOnly={true}
					checked={!questionCard.isEmpty}></input>
				<span
					className={questionCard.isActive === true ? "text-sm ml-2 font-bold" : "text-sm ml-2"}>
					{questionCard.questionIndex + 1 + ". " + questionCard.question.title}
				</span>
			</div>
		);
	};

	return (
		<div className="h-screen w-screen flex justify-between p-20 bg-gray-200">
			<div className="h-full w-3/4 bg-white p-5 mr-5">
				<span className="text-3xl font-bold">
					{
						String.fromCharCode(65 + activeSectionIndex) +
						". " +
						currentQuestionLists[activeSectionIndex]?.sectionName}
				</span>
				<div className="h-full w-full pl-2 pr-2 pt-5 pb-5">
					<span className="font-bold text-lg">
						{activeQuestionIndex +
							1 +
							". " +
							currentQuestionLists[activeSectionIndex]?.questionList[activeQuestionIndex].question}
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
							{currentCharacterNum + "/ " + currentQuestionLists[activeSectionIndex]?.questionList[activeQuestionIndex].maxCharacterAnswer + " characters"}
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
