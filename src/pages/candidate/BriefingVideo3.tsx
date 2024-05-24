import React from "react";
import { UserNavBar } from "../../components";
import { useNavigate } from "react-router-dom";

const BriefingVideo3 = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/general-question');
    };

    return (
        <>
            <UserNavBar activeIndex={0} />
            <div className="tw-h-screen tw-w-screen tw-flex tw-items-center tw-justify-center tw-px-20">
            <div className="tw-grid tw-grid-cols-2 tw-gap-12">
                <div>
                <div className="tw-font-semibold tw-text-wrap tw-text-5xl tw-leading-relaxed tw-mt-8" style={{marginTop: "-50px"}}>
                    Hilti is a great place to work
                </div>

                <div className="tw-mt-8 tw-text-3xl tw-leading-relaxed">
                   Let us tell you what makes Hilti a great place to work
                </div>
                </div>

                <div className="tw-flex tw-flex-col tw-justify-center tw-items-center" style={{marginTop: "-50px"}}>
                    <video width="620" height="840" controls>
                        <source src={require("../../assets/HILTI3.mp4")} type="video/mp4"/>
                    </video>
                    <button className="tw-w-48 tw-h-12 tw-mx-auto tw-mt-10 tw-bg-red-500 tw-text-white tw-rounded-lg tw-text-lg" onClick={handleRedirect}>
                        Next
                    </button>
                </div>
            </div>
            </div>
        </>
    );
};

export default BriefingVideo3;