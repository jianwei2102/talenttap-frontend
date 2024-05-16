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
            <div className="h-screen w-screen flex items-center justify-center px-20 ">
            <div className="grid grid-cols-2 gap-12">
                <div>
                <div className="font-semibold text-wrap text-5xl leading-relaxed mt-8" style={{marginTop: "-50px"}}>
                    Hilti is a great place to work
                </div>

                <div className="mt-8 text-3xl leading-relaxed">
                   Let us tell you what makes Hilti a great place to work
                </div>
                </div>

                <div className="flex flex-col justify-center items-center" style={{marginTop: "-50px"}}>
                    <video width="620" height="840" controls>
                        <source src={require("../../assets/HILTI3.mp4")} type="video/mp4"/>
                    </video>
                    <button className="w-48 h-12 mx-auto mt-10 bg-red-500 text-white rounded-lg text-lg" onClick={handleRedirect}>
                        Next
                    </button>
                </div>
            </div>
            </div>
        </>
    );
};

export default BriefingVideo3;