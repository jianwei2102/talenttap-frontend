import React from 'react';
import QuestionCard from './QuestionCard.tsx';
import { useNavigate } from 'react-router-dom';

const GeneralInterviewDetailPage: React.FC = () => {
    const navigate = useNavigate();

    const data = [
        {
            question: '1. Tell us more about yourself.',
            summary: 'The candidate is an experienced backend developer with over 10 years in the industry.',
            fullTranscript: 'The candidate is an experienced backend developer with over 10 years in the industry. He has worked on multiple projects and has experience in various programming languages. He is a team player and has good communication skills. He is looking for a challenging role where he can utilize his skills and grow as a professional.'
        },
        {
            question: '2. What are your strengths and weaknesses?',
            summary: 'The candidate is good at problem-solving and has excellent communication skills. He is a quick learner and can adapt to new technologies easily. He is also good at time management and can work under pressure. His weakness is that he is a perfectionist and sometimes spends too much time on a task to make it perfect.',
            fullTranscript: 'The candidate is good at problem-solving and has excellent communication skills. He is a quick learner and can adapt to new technologies easily. He is also good at time management and can work under pressure. His weakness is that he is a perfectionist and sometimes spends too much time on a task to make it perfect.'
        },
        {
            question: '3. Why do you want to work for our company?',
            summary: 'The candidate is impressed with the company culture and values. He likes the work environment and the opportunities for growth and development. He believes that his skills and experience are a good fit for the company and that he can contribute positively to the team.',
            fullTranscript: 'The candidate is impressed with the company culture and values. He likes the work environment and the opportunities for growth and development. He believes that his skills and experience are a good fit for the company and that he can contribute positively to the team.'
        },
        {
            question: '4. Where do you see yourself in 5 years?',
            summary: 'The candidate sees himself as a senior developer leading a team of developers. He wants to grow in his career and take on more responsibilities. He wants to be a mentor to junior developers and help them grow in their careers.',
            fullTranscript: 'The candidate sees himself as a senior developer leading a team of developers. He wants to grow in his career and take on more responsibilities. He wants to be a mentor to junior developers and help them grow in their careers.'
        },
        {
            question: '5. What are your salary expectations?',
            summary: 'The candidate is looking for a competitive salary that reflects his skills and experience. He is open to negotiation and is willing to discuss the salary package based on the role and responsibilities.',
            fullTranscript: 'The candidate is looking for a competitive salary that reflects his skills and experience. He is open to negotiation and is willing to discuss the salary package based on the role and responsibilities.'
        }
    ]

    return (
        <div className='tw-min-h-screen tw-h-full tw-w-screen tw-flex tw-justify-between tw-p-10 tw-bg-gray-200'>
            <div className="tw-h-full tw-w-full tw-flex tw-flex-col">

                <div className="tw-h-full">
                    <div className="tw-relative tw-flex tw-flex-col tw-h-full tw-p-6 tw-rounded-2xl tw-bg-white tw-border tw-border-gray-400 tw-shadow tw-shadow-slate-950/5">
                        <div className="tw-inline-flex tw-items-baseline tw-mb-3">
                            <span className="tw-text-slate-900 tw-font-bold tw-text-2xl">General Interview</span>
                        </div>
                        <div className='tw-flex tw-items-center'>
                            <p className="tw-text-slate-900 tw-font-semibold">Overall Score: </p>

                            {/* pill-shaped p */}
                            <p className='tw-rounded-full tw-bg-green-500 text-center tw-ml-3 tw-px-5 tw-py-1'>98 / 100</p>
                        </div>

                    </div>
                </div>

                {
                    data.map((item, index) => (
                        <QuestionCard key={index} question={item.question} summary={item.summary} fullTranscript={item.fullTranscript} />
                    ))
                }

                <div onClick={() => navigate(-1)} className="tw-mt-10 tw-cursor-pointer tw-no-underline tw-w-full tw-inline-flex tw-justify-center tw-whitespace-nowrap tw-rounded-lg tw-bg-red-500 tw-px-3.5 tw-py-2.5 tw-text-sm tw-font-medium tw-text-white tw-shadow-sm tw-shadow-red-950/10 hover:tw-bg-red-600 focus-visible:tw-outline-none focus-visible:tw-ring focus-visible:tw-ring-red-300 tw-transition-colors tw-duration-150">
                    Back
                </div>

            </div>
        </div>
    );
};

export default GeneralInterviewDetailPage;