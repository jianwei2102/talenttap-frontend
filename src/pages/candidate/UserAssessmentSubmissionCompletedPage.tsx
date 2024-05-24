import React from "react";
import UserNavBar from "../../components/UserNavBar.tsx";
import { useNavigate } from "react-router-dom";

function UserAssessmentSubmissionCompletedPage() {
    const navigate = useNavigate();
	const randomImageIndex = Math.floor(Math.random() * 2);

    const handleButtonClick = () => {
		localStorage.setItem("interview-index", "3");
        navigate('/interview');
    };

	return (
		<div>
			<UserNavBar activeIndex={-1} />
			<div className="main-container tw-flex tw-flex-col tw-justify-center tw-items-center">
				<img
					className="tw-h-1/2"
					src={require(randomImageIndex === 0
						? "../../assets/congratulations-1.png"
						: "../../assets/congratulations-2.png")}
					alt=""></img>
				<span className="tw-w-full tw-font-bold tw-text-2xl tw-text-center tw-mt-5 tw-p-2">
					Thank you for completing the assessment!
				</span>
				<span className="tw-w-full tw-text-center tw-text-lg tw-mt-2">
					You will be notified via email once your results have been finalized.
				</span>
				<span className="tw-w-full tw-text-center tw-text-lg">
					Contact us at talenttap@hilti.com if you have any inquiries.
				</span>
				<button className="tw-flex tw-justify-center tw-items-center tw-bg-red-700 tw-p-2 tw-mt-10 tw-border tw-rounded-md" onClick={handleButtonClick}>
					<span className="tw-text-white tw-text-sm">Back To Home</span>
					<svg
						className={"tw-h-5 w-5 tw-text-white tw-ml-2"}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M14 5l7 7m0 0l-7 7m7-7H3"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}

export default UserAssessmentSubmissionCompletedPage;
