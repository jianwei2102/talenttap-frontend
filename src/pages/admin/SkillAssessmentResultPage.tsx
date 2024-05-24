import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionSection from "../../models/QuestionSection";
import Question from "../../models/Question";
import { TechnicalAssessmentResultAPI } from "../../api/technicalAssessmentResultAPI.ts";

const SKILL_ASSESSMENT_ID = 1;
const CANDIDATE_ID = 1;

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

function SkillAssessmentResultPage() {
    const navigate = useNavigate();

    useEffect(() => {

        TechnicalAssessmentResultAPI.get(SKILL_ASSESSMENT_ID, CANDIDATE_ID).then((response) => {
            console.log(response);

            let totalScore = 0;

            let sections: QuestionSection[] = [];
            response.forEach(answer => {
                const question = answer.question;

                let sectionIndex = -1;
                for (let i = 0; i < sections.length; i++) {
                    if (sections[i].sectionName === question.sectionName) {
                        sectionIndex = i;
                    }
                }

                totalScore += answer.scorePercentage;

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
                            answer: answer.answer,
                            timeSpent: 0,
                            numAttempts: 0,
                            positiveKeywords: question.keywords.filter(keyword => keyword.valueSign === "positive"),
                            negativeKeywords: question.keywords.filter(keyword => keyword.valueSign === "negative"),
                            scorePercentage: answer.scorePercentage
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
                        answer: answer.answer,
                        timeSpent: 0,
                        numAttempts: 0,
                        positiveKeywords: question.keywords.filter(keyword => keyword.valueSign === "positive"),
                        negativeKeywords: question.keywords.filter(keyword => keyword.valueSign === "negative"),
                        scorePercentage: answer.scorePercentage
                    });
                }
            });

            console.log("sections: ", sections);
            setCurrentQuestionLists(sections);
            setOverallScore(totalScore / response.length);
        });

    }, []);

    const [activeSectionIndex, setActiveSectionIndex] = useState(0);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [currentCharacterNum, setCurrentCharacterNum] = useState(0);
    const [isFirstQuestion, setIsFirstQuestion] = useState(true);
    const [isLastQuestion, setIsLastQuestion] = useState(false);
    const [currentQuestionAnswer, setCurrentQuestionAnswer] = useState("");
    const [currentQuestionLists, setCurrentQuestionLists] = useState<QuestionSection[]>([]);
    const [overallScore, setOverallScore] = useState(0);

    const previousHandle = () => {
        let newQuestionIndex = activeQuestionIndex;
        let newSectionIndex = activeSectionIndex;
        let isFirstQuestion = false;

        // Change question and section index
        if (newQuestionIndex == 0) {
            newSectionIndex = activeSectionIndex - 1;
            newQuestionIndex = currentQuestionLists[newSectionIndex].questionList.length - 1;
        } else {
            newQuestionIndex -= 1;
        }

        if (newSectionIndex == 0 && newQuestionIndex == 0) {
            console.log("first question");
            isFirstQuestion = true;
        }

        setActiveQuestionIndex(newQuestionIndex);
        setActiveSectionIndex(newSectionIndex);
        setIsFirstQuestion(isFirstQuestion);
        setIsLastQuestion(false);

        setCurrentQuestionAnswer(
            currentQuestionLists[newSectionIndex].questionList[newQuestionIndex].answer
        );

        setCurrentCharacterNum(currentQuestionLists[newSectionIndex].questionList[newQuestionIndex].answer.length);
    };

    const continueHandle = () => {
        let newQuestionIndex = activeQuestionIndex;
        let newSectionIndex = activeSectionIndex;
        let lastQuestion = false;

        // Change question and section index
        if (newQuestionIndex + 1 >= currentQuestionLists[activeSectionIndex].questionList.length) {
            newQuestionIndex = 0;
            newSectionIndex = activeSectionIndex + 1;
        } else {
            newQuestionIndex += 1;
        }

        if (
            newQuestionIndex + 1 >= currentQuestionLists[activeSectionIndex].questionList.length &&
            newSectionIndex + 1 >= currentQuestionLists.length
        ) {
            lastQuestion = true;
        }

        setActiveQuestionIndex(newQuestionIndex);
        setActiveSectionIndex(newSectionIndex);
        setIsFirstQuestion(false);
        setIsLastQuestion(lastQuestion);

        setCurrentQuestionAnswer(
            currentQuestionLists[newSectionIndex].questionList[newQuestionIndex].answer
        );
        setCurrentCharacterNum(currentQuestionLists[newSectionIndex].questionList[newQuestionIndex].answer.length);
    };

    const quitHandle = () => {
        // go back last page
        navigate(-1);
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

    const QuestionCard = (questionCard: QuestionCardProps) => {

        const navigateToQuestionHandle = () => {
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

            if (questionCard.sectionIndex === 0 && questionCard.questionIndex === 0) {
                setIsFirstQuestion(true);
            } else {
                setIsFirstQuestion(false);
            }

            setCurrentQuestionAnswer(
                currentQuestionLists[newSectionIndex].questionList[newQuestionIndex].answer
            );
            setCurrentCharacterNum(currentQuestionLists[newSectionIndex].questionList[newQuestionIndex].answer.length);
        };

        return (
            <div
                className="tw-flex tw-items-center tw-justify-between tw-pt-1 tw-pb-1 tw-cursor-pointer"
                onClick={navigateToQuestionHandle}>
                <div className="tw-flex tw-items-center">
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
                <span>{questionCard.question.scorePercentage}%</span>
            </div>
        );
    };

    return (
        <div className="tw-h-screen tw-w-screen tw-flex tw-justify-between tw-p-20 tw-bg-gray-100">
            {/* sidebar */}
            <div className="tw-h-full tw-w-1/4 tw-flex tw-flex-col">

                {/* Avatar card */}
                <div className="tw-flex tw-flex-col tw-bg-white tw-rounded-xl tw-w-full tw-mb-8">
                    <div className="tw-shadow-md tw-rounded-2xl tw-p-4">
                        <div className="tw-flex-none sm:tw-flex">
                            <div className="tw-relative tw-h-32 tw-w-32">
                                <img src="https://images.unsplash.com/photo-1589386417686-0d34b5903d23?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHByb2Zlc3Npb25hbHxlbnwwfDB8MHx8fDA%3D" alt="aji" className="tw-w-32 tw-h-32 tw-object-cover tw-rounded-2xl" />
                            </div>
                            <div className="tw-flex-auto sm:tw-ml-5 tw-justify-evenly">
                                <div className="tw-flex tw-items-center tw-justify-between sm:tw-mt-2">
                                    <div className="tw-flex tw-items-center">
                                        <div className="tw-flex tw-flex-col">
                                            <div className="tw-w-full tw-flex-none tw-text-lg tw-font-bold tw-leading-none">Stanford Swiss</div>
                                            <div className="tw-flex-auto tw-text-gray-600 tw-my-1">
                                                <span>standford.swiss@gmail.com</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tw-flex tw-flex-row tw-items-center">
                                    <div className="tw-flex-1 tw-inline-flex tw-items-center tw-ml-2 tw-space-x-2">
                                        <svg className="tw-cursor-pointer tw-w-5 tw-h-5 tw-p-1 tw-rounded-2xl tw-hover:bg-blue-500 tw-hover:text-white tw-transition tw-ease-in tw-duration-300" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 172 172" >
                                            <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" >
                                                <path d="M0,172v-172h172v172z" fill="none"></path>
                                                <g fill="#ffffff">
                                                    <path d="M71.66667,82.41667c3.58333,0 14.33333,-5.79783 14.33333,-20.13117c0,-22.28475 -19.72983,-26.45217 -41.95367,-26.45217c-4.19967,0 -17.00292,0.00717 -26.12967,0.00358c-5.93758,-0.00358 -10.75,4.81242 -10.75,10.75v78.82975c0,5.93758 4.81242,10.75 10.75,10.75h42.28333c15.83475,0 29.25792,-12.52733 29.38333,-28.36208c0.16842,-21.77233 -17.91667,-25.38792 -17.91667,-25.38792zM28.66667,53.75h25.08333c5.93758,0 10.75,4.81242 10.75,10.75c0,5.93758 -4.81242,10.75 -10.75,10.75h-25.08333zM55.54167,118.25h-26.875v-25.08333h26.875c6.92658,0 12.54167,5.61508 12.54167,12.54167c0,6.92658 -5.61508,12.54167 -12.54167,12.54167zM163.0775,103.91667c2.97058,0 5.375,-2.40442 5.37858,-5.375v0c0,-20.77975 -14.37275,-37.625 -35.83333,-37.625c-19.79075,0 -35.83333,16.84525 -35.83333,37.625c0,20.77975 16.04258,37.625 35.83333,37.625c17.51175,0 27.2405,-8.1915 31.992,-20.22075c0.91733,-2.31842 -0.8815,-4.83033 -3.3755,-4.83033h-8.60358c-1.30792,0 -2.46533,0.74175 -3.14258,1.86333c-3.27517,5.41083 -8.27392,8.85442 -15.00342,8.85442c-10.07633,0 -17.415,-7.65042 -19.2855,-17.91667h38.4205zM132.62275,75.25c7.44258,0 14.65583,5.934 16.69117,14.33333h-33.22825c2.69825,-8.41725 9.08375,-14.33333 16.53708,-14.33333zM148.70833,53.75h-28.66667c-2.967,0 -5.375,-2.408 -5.375,-5.375v0c0,-2.967 2.408,-5.375 5.375,-5.375h28.66667c2.967,0 5.375,2.408 5.375,5.375v0c0,2.967 -2.408,5.375 -5.375,5.375z"></path>
                                                </g>
                                            </g>
                                        </svg>

                                        <svg className="tw-cursor-pointer tw-w-5 tw-h-5 tw-p-1 tw-rounded-2xl tw-hover:bg-blue-500 tw-hover:text-white tw-transition tw-ease-in tw-duration-300" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 172 172" >
                                            <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" >
                                                <path d="M0,172v-172h172v172z" fill="none"></path>
                                                <g fill="#ffffff">
                                                    <path d="M51.6,143.33333h-28.66667v-86h28.66667zM37.2724,45.86667c-7.9292,0 -14.33907,-6.42707 -14.33907,-14.33907c0,-7.912 6.42133,-14.3276 14.33907,-14.3276c7.90053,0 14.3276,6.42707 14.3276,14.3276c0,7.912 -6.42707,14.33907 -14.3276,14.33907zM154.8,143.33333h-27.56013v-41.85333c0,-9.98173 -0.1892,-22.81867 -14.3276,-22.81867c-14.35053,0 -16.55787,10.8704 -16.55787,22.09627v42.57573h-27.5544v-86.06307h26.4536v11.75907h0.37267c3.6808,-6.76533 12.6764,-13.8976 26.0924,-13.8976c27.92133,0 33.08133,17.82493 33.08133,40.99907z"></path>
                                                </g>
                                            </g>
                                        </svg>
                                        <svg className="tw-cursor-pointer tw-w-5 tw-h-5 tw-p-1 tw-rounded-2xl tw-hover:bg-blue-500 tw-hover:text-white tw-transition tw-ease-in tw-duration-300" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" >
                                            <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" >
                                                <path d="M0,172v-172h172v172z" fill="none"></path>
                                                <g fill="#ffffff">
                                                    <path d="M155.04367,28.88883c-5.84083,2.75917 -15.781,7.9335 -20.77617,8.9225c-0.1935,0.05017 -0.35117,0.11467 -0.5375,0.16483c-5.8265,-5.74767 -13.81017,-9.3095 -22.64667,-9.3095c-17.80917,0 -32.25,14.44083 -32.25,32.25c0,0.93883 -0.07883,2.666 0,3.58333c-23.06233,0 -39.904,-12.03283 -52.51017,-27.4985c-1.68417,-2.07833 -3.47583,-0.99617 -3.8485,0.48017c-0.8385,3.33967 -1.12517,8.9225 -1.12517,12.90717c0,10.0405 7.8475,19.90183 20.06667,26.015c-2.25033,0.5805 -4.73,0.99617 -7.31,0.99617c-3.03867,0 -6.536,-0.7955 -9.59617,-2.40083c-1.13233,-0.59483 -3.57617,-0.43 -2.85233,2.46533c2.9025,11.60283 16.1465,19.75133 27.97867,22.1235c-2.6875,1.58383 -8.42083,1.26133 -11.05817,1.26133c-0.97467,0 -4.3645,-0.22933 -6.5575,-0.50167c-1.9995,-0.24367 -5.074,0.27233 -2.50117,4.171c5.5255,8.3635 18.02417,13.61667 28.78133,13.81733c-9.90433,7.76867 -26.101,10.60667 -41.61683,10.60667c-3.139,-0.07167 -2.98133,3.5045 -0.4515,4.83033c11.44517,6.00567 30.19317,9.56033 43.58767,9.56033c53.24833,0 83.51317,-40.58483 83.51317,-78.8405c0,-0.61633 -0.01433,-1.90633 -0.03583,-3.2035c0,-0.129 0.03583,-0.25083 0.03583,-0.37983c0,-0.1935 -0.05733,-0.37983 -0.05733,-0.57333c-0.0215,-0.97467 -0.043,-1.88483 -0.0645,-2.35783c4.22117,-3.04583 10.6855,-8.33483 13.9535,-12.384c1.11083,-1.376 0.215,-3.04583 -1.29717,-2.52267c-3.8915,1.3545 -10.621,3.9775 -14.835,4.47917c8.43517,-5.58283 12.60617,-10.44183 16.1895,-15.83833c1.2255,-1.84183 -0.30817,-3.71233 -2.17867,-2.82367z"></path>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                                <div className="tw-flex tw-flex-col tw-text-sm tw-text-gray-600">
                                    <div className="tw-flex-1 tw-inline-flex">
                                        <svg className="tw-h-5 tw-w-5 tw-mr-2" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_573_1183)">
                                                <path d="M19.166 5.75008H15.3327V3.83341C15.3327 2.76966 14.4798 1.91675 13.416 1.91675H9.58268C8.51893 1.91675 7.66602 2.76966 7.66602 3.83341V5.75008H3.83268C2.76893 5.75008 1.9256 6.603 1.9256 7.66675L1.91602 18.2084C1.91602 19.2722 2.76893 20.1251 3.83268 20.1251H19.166C20.2298 20.1251 21.0827 19.2722 21.0827 18.2084V7.66675C21.0827 6.603 20.2298 5.75008 19.166 5.75008ZM13.416 5.75008H9.58268V3.83341H13.416V5.75008Z" fill="#999999" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_573_1183">
                                                    <rect width="23" height="23" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                        <p className="">Software Engineer</p>
                                    </div>
                                    <div className="tw-flex-1 tw-inline-flex">
                                        <svg className="tw-h-5 tw-w-5 tw-mr-2" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_573_1188)">
                                                <path d="M11.4993 1.91675C7.7906 1.91675 4.79102 4.91633 4.79102 8.62508C4.79102 13.6563 11.4993 21.0834 11.4993 21.0834C11.4993 21.0834 18.2077 13.6563 18.2077 8.62508C18.2077 4.91633 15.2081 1.91675 11.4993 1.91675ZM11.4993 11.0209C10.1768 11.0209 9.10352 9.94758 9.10352 8.62508C9.10352 7.30258 10.1768 6.22925 11.4993 6.22925C12.8218 6.22925 13.8952 7.30258 13.8952 8.62508C13.8952 9.94758 12.8218 11.0209 11.4993 11.0209Z" fill="#999999" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_573_1188">
                                                    <rect width="23" height="23" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                        <p className="">Kuala Lumpur, Malaysia</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Question section */}
                <div className="tw-flex tw-flex-col tw-items-center tw-bg-white tw-px-5 tw-py-4 tw-rounded-xl tw-shadow-md tw-grow tw-w-full tw-h-96">
                    <span className=
                        {
                            "tw-w-full tw-text-3xl tw-font-bold tw-text-center tw-p-2 " + (overallScore >= 70 ? "tw-text-green-500" : overallScore >= 50 ? "tw-text-yellow-500" : "tw-text-red-500")
                        }>
                        {overallScore.toFixed(2)}%
                    </span>
                    <div className="tw-w-full tw-overflow-y-scroll">
                        {currentQuestionLists.map((section, index) => (
                            <QuestionSectionCard
                                questionSection={section}
                                characterIndex={String.fromCharCode(65 + index)}
                            />
                        ))}
                    </div>
                    <button
                        className="tw-w-4/6 tw-bg-red-700 tw-flex tw-items-center tw-justify-center tw-p-2 tw-mt-5"
                        onClick={quitHandle}>
                        <span className="tw-text-white tw-mr-2">Quit</span>
                    </button>
                </div>
            </div>

            {/* main content */}
            <div className="tw-h-full tw-w-3/4 tw-ml-8 tw-bg-white tw-p-5 tw-rounded-xl tw-shadow-md">
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
                        <p>{
                            // highlight keywords in current answer
                            currentQuestionAnswer.match(/\b(\w+)\b/g)?.map((word) => {
                                console.log(word)
                                let isPositive = false;
                                let isNegative = false;

                                currentQuestionLists[activeSectionIndex]?.questionList[
                                    activeQuestionIndex
                                ].positiveKeywords.forEach((keyword) => {
                                    if (word.toLowerCase() === keyword.keyword.toLowerCase()) {
                                        isPositive = true;
                                    }
                                });

                                currentQuestionLists[activeSectionIndex]?.questionList[
                                    activeQuestionIndex
                                ].negativeKeywords.forEach((keyword) => {
                                    if (word.toLowerCase() === keyword.keyword.toLowerCase()) {
                                        isNegative = true;
                                    }
                                });

                                return (
                                    <span
                                        className={
                                            isPositive
                                                ? "tw-bg-green-300"
                                                : isNegative
                                                    ? "tw-bg-red-300"
                                                    : ""
                                        }>
                                        {word + " "}
                                    </span>
                                );
                            }
                            )
                        }</p>
                        <div className="tw-w-full tw-flex tw-justify-end tw-pt-3">
                            {currentCharacterNum + "/ " + currentQuestionLists[activeSectionIndex]?.questionList[activeQuestionIndex].maxCharacterAnswer + " characters"}
                        </div>

                        <div className="tw-flex tw-justify-between">
                            <button
                                className="tw-w-1/3 tw-bg-red-700 tw-flex tw-items-center tw-justify-center tw-p-2 tw-mt-5"
                                onClick={previousHandle}
                                disabled={isFirstQuestion ? true : false}
                            >
                                <svg className="tw-h-5 tw-w-5 tw-text-white" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5541" width="200" height="200"><path d="M1024 448H243.2L601.6 89.6 512 0 0 512l512 512 89.6-89.6L243.2 576H1024v-128z" p-id="5542" fill="#ffffff"></path></svg>
                                <span className="tw-text-white tw-ml-2">Previous Question</span>
                            </button>

                            <button
                                className="tw-w-1/3 tw-bg-red-700 tw-flex tw-items-center tw-justify-center tw-p-2 tw-mt-5"
                                onClick={continueHandle}
                                disabled={isLastQuestion ? true : false}
                            >
                                <span className="tw-text-white tw-mr-2">Next Question</span>
                                <svg className="tw-h-5 tw-w-5 tw-text-white" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5327" width="200" height="200"><path d="M512 0l-89.6 89.6 358.4 358.4H0v128h780.8L422.4 934.4 512 1024l512-512z" p-id="5328" fill="#ffffff"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SkillAssessmentResultPage;
