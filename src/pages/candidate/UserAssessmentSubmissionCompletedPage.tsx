import React from "react";
import UserNavBar from "../../components/UserNavBar.tsx";
import { useNavigate } from "react-router-dom";

function UserAssessmentSubmissionCompletedPage() {
    const navigate = useNavigate();
	const randomImageIndex = Math.floor(Math.random() * 2);

    const backToHome = () => {
        navigate('/home');
    };

	return (
		<div>
			<UserNavBar activeIndex={-1} />
			<div className="main-container flex flex-col justify-center items-center">
				<img
					className="h-1/2"
					src={require(randomImageIndex === 0
						? "../../assets/congratulations-1.png"
						: "../../assets/congratulations-2.png")}
					alt=""></img>
				<span className="w-full font-bold text-2xl text-center mt-5 p-2">
					Thank you for completing the assessment!
				</span>
				<span className="w-full text-center text-lg mt-2">
					You will be notified via email once your results have been finalized.
				</span>
				<span className="w-full text-center text-lg">
					Contact us at talenttap@hilti.com if you have any inquiries.
				</span>
				<button className="flex justify-center items-center bg-red-700 p-2 mt-10 border rounded-md" onClick={backToHome}>
					<span className="text-white text-sm">Back To Home</span>
					<svg
						className={"h-5 w-5 text-white ml-2"}
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
