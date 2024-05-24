import React, { useState } from 'react';
import RatingReview from '../../../components/RatingReview.tsx';
import StarIcon from '@mui/icons-material/Star';

interface HiringManagerInterviewCardProps {
    num: number;
}

const HiringManagerInterviewCard: React.FC<HiringManagerInterviewCardProps> = (props) => {
    // Implement the component logic here
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="tw-h-full tw-mt-8">
            <div className="tw-relative tw-flex tw-flex-col tw-h-full tw-p-6 tw-rounded-2xl tw-bg-white tw-border tw-border-gray-400 tw-shadow tw-shadow-slate-950/5">
                <div className="tw-mb-5">
                    <div className="tw-inline-flex tw-items-baseline tw-mb-3">
                        <span className="tw-text-slate-900 tw-font-bold tw-text-2xl">{props.num}. Hiring Manager Interview</span>
                    </div>
                    <div className='tw-flex tw-mb-1 tw-items-center'>
                        <p className="tw-text-slate-900 tw-font-semibold tw-mr-5">Score: </p>

                        <div className="tw-flex tw-items-center tw-mb-2">
                            <StarIcon className='tw-text-yellow-600' ></StarIcon>
                            <span className="tw-text-slate-500 tw-font-semibold tw-text-sm tw-ml-2">4.0</span>
                        </div>

                        <div className="tw-flex tw-items-center tw-mb-3 tw-ml-3">
                            <button
                                className="tw-text-slate-900 tw-font-semibold tw-text-sm tw-underline tw-cursor-pointer"
                                onClick={() => setShowDetails(!showDetails)}
                            >
                                {showDetails ? 'Hide Details' : 'Show Details'}
                            </button>
                        </div>
                    </div>

                    {/* Details */}
                    {showDetails && (
                        <>
                            <div className="tw-mb-5 tw-flex tw-items-center">
                                <div className='tw-text-md tw-text-slate-500 tw-mb-2 tw-text-justify tw-font-semibold tw-w-2/3'>Background & Experience</div>
                                <div className="tw-flex tw-items-center tw-mb-2">
                                    <StarIcon className='tw-text-yellow-600' ></StarIcon>
                                    <span className="tw-text-slate-500 tw-font-semibold tw-text-sm tw-ml-2">4.5</span>
                                </div>
                            </div>
                            <div className="tw-mb-5 tw-flex tw-items-center">
                                <div className='tw-text-md tw-text-slate-500 tw-mb-2 tw-text-justify tw-font-semibold tw-w-2/3'>Technical Skills</div>
                                <div className="tw-flex tw-items-center tw-mb-2">
                                    <StarIcon className='tw-text-yellow-600' ></StarIcon>
                                    <span className="tw-text-slate-500 tw-font-semibold tw-text-sm tw-ml-2">4.0</span>
                                </div>
                            </div>
                            <div className="tw-mb-5 tw-flex tw-items-center">
                                <div className='tw-text-md tw-text-slate-500 tw-mb-2 tw-text-justify tw-font-semibold tw-w-2/3'>Interpersonal Skills</div>
                                <div className="tw-flex tw-items-center tw-mb-2">
                                    <StarIcon className='tw-text-yellow-600' ></StarIcon>
                                    <span className="tw-text-slate-500 tw-font-semibold tw-text-sm tw-ml-2">3.0</span>
                                </div>
                            </div>
                            <div className="tw-mb-5 tw-flex tw-items-center">
                                <div className='tw-text-md tw-text-slate-500 tw-mb-2 tw-text-justify tw-font-semibold tw-w-2/3'>Overall Fit</div>
                                <div className="tw-flex tw-items-center tw-mb-2">
                                    <StarIcon className='tw-text-yellow-600' ></StarIcon>
                                    <span className="tw-text-slate-500 tw-font-semibold tw-text-sm tw-ml-2">4.5</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className='tw-text-md tw-text-slate-500 tw-mb-2 tw-text-justify tw-font-semibold tw-underline'>Reviews</div>
                <div className="tw-text-sm tw-text-slate-500 tw-mb-5 tw-text-justify">The candidate would be a perfect fit in the team with her friendly and outgoing nature. She appears to be very confident, which is a crucial trait to have as a member of my team.</div>

            </div>
        </div>
    );
};

export default HiringManagerInterviewCard;