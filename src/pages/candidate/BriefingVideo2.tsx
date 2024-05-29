import React from "react";
import { UserNavBar } from "../../components";
import { useNavigate } from "react-router-dom";
import ReactPlayer from 'react-player'

const BriefingVideo2 = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/briefing-video/3');
    };

    return (
        <>
            <UserNavBar activeIndex={0} />
            <div className="tw-h-screen tw-w-screen tw-flex tw-items-center tw-justify-center tw-px-20">
            <div className="tw-grid tw-grid-cols-2 tw-gap-12">
                <div>
                <div className="tw-font-semibold tw-text-wrap tw-text-5xl tw-leading-relaxed tw-mt-8" style={{marginTop: "-50px"}}>
                    Hilti is headquartered at Switzerland
                </div>

                <div className="tw-mt-8 tw-text-3xl tw-leading-relaxed">
                    Join us as we take you on a tour of life at Hilti headquarters in this video.
                </div>
                </div>

                <div className="tw-flex tw-flex-col tw-justify-center tw-items-center" style={{marginTop: "-50px"}}>
                    <ReactPlayer
                        className='react-player' 
                        url={"https://briefing-video.s3.amazonaws.com/HILTI2.mp4"}
                        width='100%'
                        height='100%'
                        controls              
                    />
                    <button className="tw-w-48 tw-h-12 tw-mx-auto tw-mt-10 tw-bg-red-500 tw-text-white tw-rounded-lg tw-text-lg" onClick={handleRedirect}>
                        Next
                    </button>
                </div>
            </div>
            </div>
        </>
    );
};

export default BriefingVideo2;