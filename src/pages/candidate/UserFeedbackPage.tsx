import React from "react";
import { useState } from "react";
import UserNavBar from "../../components/UserNavBar.tsx";

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
		<div className="tw-w-screen tw-h-screen tw-flex tw-flex-col">
			<UserNavBar activeIndex={2} />
			<div className="main-container tw-flex tw-flex-col tw-justify-center tw-items-center">
				<span className="tw-text-2xl tw-font-bold tw-text-center tw-py-5">Feedback for the System</span>
				<div className="tw-w-2/6 tw-flex tw-flex-col tw-justify-center tw-relative">
					<span className="tw-font-bold tw-py-2">General Satisfaction</span>
					<button
						id="dropdownDefaultButton"
						data-dropdown-toggle="dropdown"
						className="tw-w-auto tw-text-black tw-bg-white tw-border tw-border-black tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-text-center tw-flex tw-justify-between tw-items-center tw-z-1"
						type="button"
						onClick={showSatisfactionDropdownHandle}>
						{selectedSatisfaction}
						<svg
							className="tw-w-2.5 tw-h-2.5 ms-3"
							aria-tw-hidden="true"
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
								? "tw-z-10 tw-absolute tw-bg-white tw-border tw-border-black tw-rounded-lg shadow tw-w-full tw-top-20"
								: "tw-hidden"
						}>
						<ul
						id="feedback-dropdown-list"
							className="tw-py-2 tw-text-sm tw-text-black"
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
				<div className="tw-w-2/6 tw-flex tw-flex-col tw-justify-center tw-z-1 tw-mt-10">
					<span className="tw-font-bold tw-py-2">Description (Optional)</span>
					<textarea className="tw-border tw-border-black tw-rounded-lg tw-p-2 focus:tw-outline-none" rows={5} cols={100} placeholder="We appreciate your honest feedback so that we can improve this system to serve you better in the future!"></textarea>
				</div>
				<button className="tw-bg-red-700 tw-text-white tw-text-center tw-text-lg tw-py-2 tw-px-5 tw-mt-16" onClick={submitFeedbackHandle}>Confirm</button>
			</div>
		</div>
	);
}

export default UserFeedbackModal;
