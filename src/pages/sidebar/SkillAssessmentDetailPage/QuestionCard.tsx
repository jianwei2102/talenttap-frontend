import React from 'react';

interface QuestionCardProps {
    question: string;
    category: string;
    answer: string;
    scorePercentage: number;
}

const QuestionCard: React.FC<QuestionCardProps> = (props) => {
    const { question, category, answer, scorePercentage } = props;

    const [showFullAnswer, setShowFullAnswer] = React.useState(false);

    return (
        <div className="tw-h-full tw-mt-8">
            <div className="tw-relative tw-flex tw-flex-col tw-h-full tw-p-6 tw-rounded-2xl tw-bg-white tw-border tw-border-gray-400 tw-shadow tw-shadow-slate-950/5">
                <div className="tw-inline-flex tw-items-baseline tw-mb-3">
                    <span className="tw-text-slate-900 tw-font-bold tw-text-xl">{question}</span>
                </div>

                <div className='tw-flex tw-items-center'>
                    <p className="tw-text-slate-900 tw-font-semibold">Score: </p>

                    {/* pill-shaped p */}
                    <p className={
                        scorePercentage >= 70 ? 'tw-rounded-full tw-bg-green-500 text-center tw-ml-3 tw-px-5 tw-py-1' :
                            scorePercentage >= 50 ? 'tw-rounded-full tw-bg-yellow-700 text-center tw-ml-3 tw-px-5 tw-py-1' :
                                'tw-rounded-full tw-bg-red-500 text-center tw-ml-3 tw-px-5 tw-py-1'
                    }>
                        {scorePercentage} / 100
                        </p>
                </div>

                <p className='tw-underline tw-font-bold'>Category</p>
                <p>{category}</p>

                <p onClick={() => setShowFullAnswer(!showFullAnswer)} className='tw-cursor-pointer tw-underline tw-font-bold tw-text-red-600 tw-text-right'>
                    {showFullAnswer ? 'Hide Full Answer' : 'Show Full Answer'}
                </p>

                {
                    showFullAnswer && (
                        <div className='tw-mt-5'>
                            <p className='tw-underline tw-font-bold'>Full Answer</p>
                            <p>{answer}</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default QuestionCard;