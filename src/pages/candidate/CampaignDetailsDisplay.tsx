import React from "react";
import { useState } from "react";
import UserNavBar from "../../components/UserNavBar.tsx";

function CampaignDetailsDisplay() {
	return (
		<div className="w-screen h-screen flex flex-col">
			<UserNavBar activeIndex={0} />
            <div className="flex justify-between px-3.5 pt-3.5 items-start">
				<span className="text-2xl font-bold text-left text-red-600">Linux Administrator</span>
				<div className="text-x1 text-right text-black-600 pr-20">
					<div className="font-bold">Application Date</div>
					<div>06.01.2024</div>
				</div>
			</div>            
            <div className="main-container w-full flex flex-col pl-3.5 pr-28 pt-10">
				<span className="text-xl font-bold text-left text-black-600 pr-10 pt-40">Overview</span>
				<p className="w-5/6 text-left text-black-600 pr-10 pt-3.5">
					As a Linux Administrator, you are part of our global Compute & Operating Platforms team, based in Kuala Lumpur (Malaysia). You get to work in an agile Global IT Infrastructure team with focus on Linux Server Operating Systems engineering.
				</p>
				<p className="text-left text-black-600 pr-10 pt-3.5">
					You will be in charge in     
				</p>
				<ul className="list-disc list-inside text-left text-black-600 pr-10 pl-3.5">
					<li>maintaining and developing the server operating platform portfolio of Hilti.</li>
					<li>taking advantage of the latest innovations in the field while adhering to the industry best practices and security standards.</li>
					<li>collaborating with other engineers in the team and lead Linux Server engineering activities and take responsibility of its performance.</li>
				</ul>
                <span className="text-xl font-bold text-left text-black-600 pr-10 pt-10">Requirements</span>
                <ul className="list-disc list-inside text-left text-black-600 pr-10 pt-3.5 pl-3.5">
					<li>Bachelor’s degree in information technology, Computer Science, Engineering, or technical discipline with a CGPA of 3.0 and above. Master’s Degree is an advantage.</li>
					<li>Minimum 3 years of experience working in Linux Server Operating System engineering.</li>
				</ul>
                <button className="w-1/4 bg-red-700 text-white text-center text-lg p-2 mt-16 mx-auto">Start Application</button>
            </div>
		</div>
	);
}

export default CampaignDetailsDisplay;