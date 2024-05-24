import React, { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import AdminNavBar from '../../../components/admin/AdminNavBar.tsx';
import { Button, Card, Col, Nav, Row, Tab } from 'react-bootstrap';
import { render } from 'react-dom';
import CustomButton from '../../../components/CustomButton.tsx';
import { GeneralInterviewResultAPI } from '../../../api/generalInterviewResultAPI.ts';
import OverwriteModal from './OverwriteModal.tsx';

const GENERAL_INTERVIEW_ID = 1;
const CANDIDATE_ID = 1;

interface Keyword {
    keyword: string;
    weight: number;
    count: number;
}

interface Question {
    question: string;
    videoUrl: string;
    transcript: string;
    summary: string;
    keywords: Keyword[];
    score: number;
    isOverwritten: boolean;
    overwrittenScore: number;
    overwrittenFeedback: string;
}

const questionsDummy: Question[] = [
    {
        question: 'Tell us about yourself and your professional background.',
        videoUrl: 'https://videos.pexels.com/video-files/5442623/5442623-uhd_3840_2160_25fps.mp4',
        transcript: 'The candidate is a senior software engineer with a specialism in generative AI, and is interested to branch out into the cybersecurity field. The candidate’s strength is the candidate’s sense of responsibility, passion and motivation towards what the candidate does. The candidate’s weakness is the candidate’s lack of experience in the cybersecurity field. The candidate is a quick learner and is willing to put in the effort to learn new things.',
        summary: 'The candidate is a senior software engineer with a specialism in generative AI, interested in branching out into cybersecurity. Strengths include sense of responsibility, passion, and motivation. Weakness is lack of experience in cybersecurity, but is a quick learner and willing to put in the effort to learn new things.',
        keywords: [
            { keyword: 'name', weight: 0.5, count: 1 },
            { keyword: 'Stanford Swiss', weight: 1, count: 1 },
        ],
        score: 80,
        isOverwritten: false,
        overwrittenScore: 0,
        overwrittenFeedback: '',
    },
    {
        question: 'Can you tell us a bit about yourself and your professional background?',
        videoUrl: 'https://videos.pexels.com/video-files/5439086/5439086-uhd_3840_2160_25fps.mp4',
        transcript: 'The candidate has over 10 years of experience in software development, with a focus on backend technologies. They have led several successful projects in fintech and e-commerce sectors.',
        summary: 'Experienced backend developer with over 10 years in the industry.',
        keywords: [
            { keyword: 'software development', weight: 1, count: 2 },
            { keyword: 'backend technologies', weight: 0.8, count: 1 },
        ],
        score: 90,
        isOverwritten: false,
        overwrittenScore: 0,
        overwrittenFeedback: '',
    },
    {
        question: 'Why are you interested in this position?',
        videoUrl: 'https://videos.pexels.com/video-files/5442623/5442623-uhd_3840_2160_25fps.mp4',
        transcript: 'The candidate is passionate about the company’s mission and values, and is eager to contribute to innovative projects that have a significant impact.',
        summary: 'Strong alignment with company mission and enthusiasm for impactful projects.',
        keywords: [
            { keyword: 'mission', weight: 0.7, count: 1 },
            { keyword: 'values', weight: 0.6, count: 1 },
        ],
        score: 100,
        isOverwritten: false,
        overwrittenScore: 0,
        overwrittenFeedback: '',
    },
    {
        question: 'Can you describe a challenging project you worked on and how you handled it?',
        videoUrl: 'https://videos.pexels.com/video-files/5439086/5439086-uhd_3840_2160_25fps.mp4',
        transcript: 'The candidate led a team to develop a scalable microservices architecture for a major e-commerce platform, overcoming significant technical and logistical challenges.',
        summary: 'Led development of scalable microservices architecture.',
        keywords: [
            { keyword: 'microservices', weight: 1, count: 2 },
            { keyword: 'e-commerce', weight: 0.9, count: 1 },
        ],
        score: 50,
        isOverwritten: false,
        overwrittenScore: 0,
        overwrittenFeedback: '',
    },
    {
        question: 'What are your strengths and weaknesses?',
        videoUrl: 'https://videos.pexels.com/video-files/5442623/5442623-uhd_3840_2160_25fps.mp4',
        transcript: 'The candidate’s strengths include strong problem-solving skills and the ability to work well under pressure. Their weakness is sometimes overcommitting to projects, which they are working to improve by better time management.',
        summary: 'Strong problem-solving skills; working on improving time management.',
        keywords: [
            { keyword: 'problem-solving', weight: 0.8, count: 1 },
            { keyword: 'time management', weight: 0.7, count: 1 },
        ],
        score: 40,
        isOverwritten: false,
        overwrittenScore: 0,
        overwrittenFeedback: '',
    },
    {
        question: 'Where do you see yourself in five years?',
        videoUrl: 'https://videos.pexels.com/video-files/5439086/5439086-uhd_3840_2160_25fps.mp4',
        transcript: 'The candidate aims to take on more leadership roles and continue to grow their expertise in AI and machine learning, potentially leading a team of developers in innovative projects.',
        summary: 'Aiming for leadership roles and expertise in AI and ML.',
        keywords: [
            { keyword: 'leadership', weight: 0.9, count: 1 },
            { keyword: 'AI', weight: 0.8, count: 1 },
            { keyword: 'machine learning', weight: 0.7, count: 1 },
        ],
        score: 60,
        isOverwritten: false,
        overwrittenScore: 0,
        overwrittenFeedback: '',
    },
    {
        question: 'How do you handle stress and pressure?',
        videoUrl: 'https://videos.pexels.com/video-files/5442623/5442623-uhd_3840_2160_25fps.mp4',
        transcript: 'The candidate uses a combination of time management techniques and regular physical exercise to manage stress effectively, ensuring they stay productive and maintain work-life balance.',
        summary: 'Uses time management and physical exercise to handle stress.',
        keywords: [
            { keyword: 'time management', weight: 0.7, count: 1 },
            { keyword: 'stress', weight: 0.6, count: 1 },
        ],
        score: 70,
        isOverwritten: false,
        overwrittenScore: 0,
        overwrittenFeedback: '',
    },
    {
        question: 'Can you provide an example of how you handled a difficult situation at work?',
        videoUrl: 'https://videos.pexels.com/video-files/5439086/5439086-uhd_3840_2160_25fps.mp4',
        transcript: 'The candidate resolved a major conflict within the team by facilitating open communication and implementing a structured problem-solving approach, which improved team cohesion and project outcomes.',
        summary: 'Facilitated open communication and structured problem-solving to resolve team conflict.',
        keywords: [
            { keyword: 'conflict resolution', weight: 0.9, count: 1 },
            { keyword: 'team cohesion', weight: 0.7, count: 1 },
        ],
        score: 70,
        isOverwritten: false,
        overwrittenScore: 0,
        overwrittenFeedback: '',
    },
    {
        question: 'What motivates you to perform well?',
        videoUrl: 'https://videos.pexels.com/video-files/5442623/5442623-uhd_3840_2160_25fps.mp4',
        transcript: 'The candidate is driven by a passion for learning and growth, as well as a desire to contribute to meaningful projects that make a positive impact on the organization and its customers.',
        summary: 'Passion for learning and growth; desire to contribute to meaningful projects.',
        keywords: [
            { keyword: 'motivation', weight: 0.8, count: 1 },
            { keyword: 'learning', weight: 0.7, count: 1 },
            { keyword: 'impact', weight: 0.6, count: 1 },
        ],
        score: 35,
        isOverwritten: false,
        overwrittenScore: 0,
        overwrittenFeedback: '',
    },
];

const GeneralInterviewResultPage: React.FC = () => {
    const [showOverwriteModal, setShowOverwriteModal] = useState(false)
    const [isSummaryActive, setIsSummaryActive] = useState(true)
    const [isScoreOverwritten, setIsScoreOverwritten] = useState(false)
    const [questions, setQuestions] = useState<Question[]>(questionsDummy)
    const [index, setIndex] = useState(0)

    useEffect(() => {
        // Fetch data from API
        GeneralInterviewResultAPI.get(GENERAL_INTERVIEW_ID, CANDIDATE_ID).then((response) => {
            console.log(response);
            
        })
    }, [])

    const renderLeftSide = () => {
        return (
            <div className='tw-w-1/3 tw-h-full'>

                {/* Avatar card */}
                {/* <div className="tw-flex tw-flex-col tw-bg-white tw-rounded-xl tw-w-full tw-mb-8">
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
                </div> */}

                {/* Interview Result Card */}
                <Card>
                    <Card.Header className='tw-flex tw-justify-between tw-items-center'>
                        <div className='tw-flex tw-items-center'>
                            <h3>Score</h3>
                            <Button variant="success" disabled className='tw-rounded-full tw-ml-5'>{questions[index].score} / 100</Button>{' '}
                        </div>
                        <Button variant='danger' onClick={() => setShowOverwriteModal(true)}>Overwrite</Button>
                    </Card.Header>
                    <Card.Body>
                        {isScoreOverwritten ?
                            <div>
                                <h5>Feedback</h5>
                                {/* TODO: add actual feedback to here */}
                                <p>{questions[index].overwrittenFeedback}</p>
                            </div>
                            :
                            <>
                                <Card.Title>Keywords</Card.Title>
                                <Card.Text>
                                    <ol>
                                        {questions[index].keywords.map((keyword) => {
                                            return (
                                                <li>"{keyword.keyword}" ({keyword.weight}) - {keyword.count} found</li>
                                            )
                                        })}
                                    </ol>
                                </Card.Text>
                            </>
                        }
                    </Card.Body>
                </Card>

                {/* Question List */}
                <h3 className='tw-my-5'>Interview Questions</h3>
                <ListGroup>
                    {questions.map((question, i) => {
                        return (
                            <ListGroup.Item action onClick={() => setIndex(i)} active={index === i}>{i + 1}. {question.question}</ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </div>

        )
    }

    const renderRightSide = () => {
        return (
            <div className='tw-px-10 tw-w-2/3'>
                <video src={questions[index].videoUrl} className='tw-rounded-lg' controls={true} loop={true} autoPlay={true}></video>
                
                {/* Tabs */}
                <div className='tw-mt-5'>
                    <button onClick={() => setIsSummaryActive(true)} className={
                        "tw-inline-flex tw-items-center tw-h-10 tw-px-4 tw--mb-px tw-text-sm tw-text-center tw-bg-transparent tw-border-b-2 tw-sm:text-base tw-whitespace-nowrap tw-focus:outline-none"
                        + (isSummaryActive ? 'tw-text-red-500 tw-border-red-500' : 'tw-text-gray-700 tw-border-transparent')
                    }>
                        Summary
                    </button>

                    <button onClick={() => setIsSummaryActive(false)} className={
                        "tw-inline-flex tw-items-center tw-h-10 tw-px-4 tw--mb-px tw-text-sm tw-text-center tw-bg-transparent tw-border-b-2 tw-sm:text-base tw-whitespace-nowrap tw-focus:outline-none"
                        + (isSummaryActive ? 'tw-text-gray-700 tw-border-transparent' : 'tw-text-red-500 tw-border-red-500')
                    }>
                        Full Transcript
                    </button>
                </div>

                {/* Content */}
                <div className='tw-mt-5 tw-p-5'>
                    <p>{(isSummaryActive ? questions[index].summary : questions[index].transcript)}</p>
                </div>
            </div>
        )
    }


    return (
        <div className="tw-h-screen tw-w-screen tw-flex tw-flex-col tw-bg-gray-200">
            <AdminNavBar activeIndex={-1} />
            <div className="main-container tw-py-10 tw-px-24 tw-flex">

                {renderLeftSide()}
                {renderRightSide()}

                <OverwriteModal show={showOverwriteModal} handleClose={() => setShowOverwriteModal(false)}></OverwriteModal>

            </div>

        </div>
    );
};

export default GeneralInterviewResultPage;