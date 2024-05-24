import React from 'react';

interface QuestionCardProps {
    question: string;
    summary: string;
    fullTranscript: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, summary, fullTranscript }) => {
    const [showFullTranscript, setShowFullTranscript] = React.useState(false);

    return (
        <div className="tw-h-full tw-mt-8">
            <div className="tw-relative tw-flex tw-flex-col tw-h-full tw-p-6 tw-rounded-2xl tw-bg-white tw-border tw-border-gray-400 tw-shadow tw-shadow-slate-950/5">
                <div className="tw-inline-flex tw-items-baseline tw-mb-3">
                    <span className="tw-text-slate-900 tw-font-bold tw-text-xl">{question}</span>
                </div>

                <p className='tw-underline tw-font-bold'>Summary</p>
                <p>{summary}</p>

                <p onClick={() => setShowFullTranscript(!showFullTranscript)} className='tw-cursor-pointer tw-underline tw-font-bold tw-text-red-600 tw-text-right'>
                    {showFullTranscript ? 'Hide Full Transcript' : 'Show Full Transcript'}
                </p>

                {
                    showFullTranscript && (
                        <div className='tw-mt-5'>
                            <p className='tw-underline tw-font-bold'>Full Transcript</p>
                            <p>{fullTranscript}</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default QuestionCard;