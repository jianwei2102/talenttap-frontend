import React from "react";
import { useState } from "react";
import UserNavBar from "../components/UserNavBar.tsx";

function UserFeedbackModal() {
	const [showSatisfactionDropdown, setShowSatisfactionDropdown] = useState(false);
	const [selectedSatisfaction, setSelectedSatisfaction] = useState("Please Select An Option");

	const showSatisfactionDropdownHandle = () => {
		setShowSatisfactionDropdown(showSatisfactionDropdown ? false : true);
	};

	const setSelectedSatisfactionHandle = (selectedValue: string) => {
		setSelectedSatisfaction(selectedValue);
		setShowSatisfactionDropdown(false);
	};

	const submitFeedbackHandle = () => {
		//TODO: submit feedback to db
	}

	return (
		<div className="w-screen h-screen flex flex-col">
			<UserNavBar activeIndex={2} />
			<div className="main-container flex flex-col justify-center items-center">
				<span className="text-2xl font-bold text-center py-5">Feedback for the System</span>
				<div className="w-2/6 flex flex-col justify-center relative">
					<span className="font-bold py-2">General Satisfaction</span>
					<button
						id="dropdownDefaultButton"
						data-dropdown-toggle="dropdown"
						className="w-auto text-black bg-white border border-black rounded-lg text-sm px-5 py-2.5 text-center flex justify-between items-center z-1"
						type="button"
						onClick={showSatisfactionDropdownHandle}>
						{selectedSatisfaction}
						<svg
							className="w-2.5 h-2.5 ms-3"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 10 6">
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m1 1 4 4 4-4"
							/>
						</svg>
					</button>
					<div
						id="dropdown"
						className={
							showSatisfactionDropdown
								? "z-10 absolute bg-white border border-black rounded-lg shadow w-full top-20"
								: "hidden"
						}>
						<ul
						id="feedback-dropdown-list"
							className="py-2 text-sm text-black"
							aria-labelledby="dropdownDefaultButton">
							<li onClick={() => setSelectedSatisfactionHandle("Extremely Satisfied")}>
								Extremely Satisfied
							</li>
							<li onClick={() => setSelectedSatisfactionHandle("Satisfied")}>
								Satisfied
							</li>
							<li onClick={() => setSelectedSatisfactionHandle("Neutral")}>
								Neutral
							</li>
							<li onClick={() => setSelectedSatisfactionHandle("Dissatisifed")}>
								Dissatisfied
							</li>
							<li onClick={() => setSelectedSatisfactionHandle("Extremely Dissatisifed")}>
								Extremely Dissatisfied
							</li>
						</ul>
					</div>
				</div>
				<div className="w-2/6 flex flex-col justify-center z-1 mt-10">
					<span className="font-bold py-2">Description (Optional)</span>
					<textarea className="border border-black rounded-lg p-2 focus:outline-none" rows={5} cols={100} placeholder="We appreciate your honest feedback so that we can improve this system to serve you better in the future!"></textarea>
				</div>
				<button className="bg-red-700 text-white text-center text-lg py-2 px-5 mt-16" onClick={submitFeedbackHandle}>Confirm</button>
			</div>
		</div>
	);
}

export default UserFeedbackModal;
