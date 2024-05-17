import React from "react";
import { useState, useEffect } from "react";

interface InterviewDaySlot {
	date: Date;
	timeSlots: string[];
}

interface InterviewDayCardProps {
	interviewDay: InterviewDaySlot;
	index: number;
}

interface InterviewTimeSlotCardProps {
	timeSlot: string;
	index: number;
}

function generateInterviewTimeSlots(): string[] {
	let timeSlotsList = [
		"10:00:00",
		"10:30:00",
		"11:00:00",
		"11:30:00",
		"13:00:00",
		"13:30:00",
		"14:00:00",
		"14:30:00",
		"15:00:00",
		"15:30:00",
	];

	let interviewDayTimeSlots: string[] = [];

	for (let index = 0; index < Math.floor(Math.random() * timeSlotsList.length); index++) {
		let newTimeSlotTime = timeSlotsList[Math.floor(Math.random() * timeSlotsList.length)];
		interviewDayTimeSlots.push(newTimeSlotTime);
	}

	return interviewDayTimeSlots;
}

function convertIntToDayString(num: number): string {
	const dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	return dayList[num];
}

//TODO: Get interviewer names
const interviewerList = ["John Stones", "Devid Bromberg"];

//TODO: Get interview slots (yes its not sorted rn)
// Randomly generate dates (temp)
const interviewSlots: InterviewDaySlot[] = [];

let currentDate = new Date();
for (let index = 0; index < 10; index++) {
	let month = currentDate.getMonth() + 1;
	let day = currentDate.getDate() + index + 1;

	if (day > 30) {
		day = day - 30;
		month++;
	}

	interviewSlots.push({
		date: new Date("2024-" + month + "-" + day),
		timeSlots: generateInterviewTimeSlots(),
	});
}

function HiringManagerInterviewSchedulingModal() {
	// TODO: Check if interviewee already scheduled an interview
	const [isInterviewScheduled, setIsInterviewScheduled] = useState(false);
	// const [showInterviewSchedulingModal, setShowInterviewSchedulingModal] = useState(true);
	const [showScheduledInterviewModal, setShowScheduledInterviewModal] = useState(false);
	const [activeInterviewDayCardIndex, setActiveInterviewDayCardIndex] = useState(-1);
	const [interviewDayCardMinIndex, setInterviewDayCardMinIndex] = useState(0);
	const [interviewDayCardMaxIndex, setInterviewDayCardMaxIndex] = useState(4);
	const [interviewTimeSlotIndex, setInterviewTimeSlotIndex] = useState(-1);
	const [selectedInterviewDay, setSelectedInterviewDay] = useState(new Date());

	const closeScheduledInterviewModalHandle = () => {
		setShowScheduledInterviewModal(false);
	};

	const InterviewTimeSlotCard = ({ timeSlot, index }: InterviewTimeSlotCardProps) => {
		const clickTimeSlotHandle = () => {
			setInterviewTimeSlotIndex(index);
		};

		return (
			<div
				className={
					index === interviewTimeSlotIndex
						? "tw-bg-red-700 tw-rounded-lg tw-text-white tw-text-center tw-p-2 tw-cursor-pointer"
						: "tw-border tw-border-gray-400 tw-rounded-lg tw-text-red-700 tw-text-center tw-p-2 tw-cursor-pointer"
				}
				onClick={clickTimeSlotHandle}>
				{timeSlot}
			</div>
		);
	};

	const InterviewDayCard = ({ interviewDay, index }: InterviewDayCardProps) => {
		const clickInterviewDayCardHandle = () => {
			setActiveInterviewDayCardIndex(index);
			setSelectedInterviewDay(interviewSlots[index].date);
			setInterviewTimeSlotIndex(-1);
		};

		return (
			<div
				className={
					index === activeInterviewDayCardIndex
						? "tw-w-20 tw-h-1/2 tw-py-2 tw-flex tw-flex-col tw-justify-between tw-border tw-border-red-700 tw-rounded-xl tw-cursor-pointer"
						: "tw-w-20 tw-h-1/2 tw-py-2 tw-flex tw-flex-col tw-justify-between tw-border tw-border-gray-400 tw-rounded-xl tw-cursor-pointer"
				}
				onClick={clickInterviewDayCardHandle}>
				<span
					className={
						index === activeInterviewDayCardIndex
							? "tw-text-red-700 tw-text-lg tw-text-center"
							: "tw-text-black tw-text-lg tw-text-center"
					}>
					{convertIntToDayString(interviewDay.date.getDay()).substring(0, 3)}
				</span>
				<span
					className={
						index === activeInterviewDayCardIndex
							? "tw-text-red-700 tw-text-lg tw-text-center"
							: "tw-text-black tw-text-lg tw-text-center"
					}>
					{interviewDay.date.getDate()}
				</span>
				<div className="tw-w-full tw-flex tw-justify-center tw-items-center tw-p-1">
					<svg
						className={
							interviewDay.timeSlots.length > 2 ? "tw-h-3 tw-w-3 tw-text-green-700" : "tw-h-3 tw-w-3 tw-text-red-700"
						}
						viewBox="0 0 24 24"
						fill="currentColor"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round">
						{" "}
						<circle cx="12" cy="12" r="10" />
					</svg>
					<span
						className={
							index === activeInterviewDayCardIndex
								? "tw-text-red-700 tw-text-xs tw-ml-1.5"
								: "tw-text-black tw-text-xs tw-ml-1.5"
						}>
						{interviewDay.timeSlots.length + " slots"}
					</span>
				</div>
			</div>
		);
	};

	const scheduleInterviewHandle = () => {
		let scheduledInterviewTime =
			interviewSlots[activeInterviewDayCardIndex].timeSlots[interviewTimeSlotIndex];

		// Convert the time slots from string to Date
		let hours = scheduledInterviewTime.substring(0, 2);
		let minutes = scheduledInterviewTime.substring(3, 5);
		console.log(hours);
		console.log(minutes);

		// Set the selected schedule
		let scheduledDate = interviewSlots[activeInterviewDayCardIndex].date;
		scheduledDate.setHours(Number(hours));
		scheduledDate.setMinutes(Number(minutes));

		setIsInterviewScheduled(true);
		setShowScheduledInterviewModal(true);

		// TODO: send email
	};

	return (
		<div className="tw-h-screen tw-w-screen tw-flex tw-flex-col">
			<UserNavBar activeIndex={-1} />
			{/* TODO: Add progress bar */}
			{/* TODO: Add position information (best to turn into a component since its repeating from other pages)*/}
			<div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
				<button
					className="tw-bg-red-700 tw-text-white tw-px-5 tw-py-2"
					onClick={openInterviewSchedulingModalHandle}>
					Schedule Interview
				</button>
				<span className="tw-text-gray-500 tw-text-sm tw-px-5 tw-py-2 tw-mt-2">
					The interview can be done within 3 days.
				</span>
			</div>
			<div
				className={
					showInterviewSchedulingModal
						? "modal-backdrop tw-flex tw-justify-center tw-items-center"
						: "tw-hidden"
				}>
				<div className="tw-h-4/6 tw-w-2/6 tw-bg-white tw-rounded-3xl tw-absolute tw-z-100 tw-p-3">
					<div className="tw-w-full tw-flex tw-flex-row-reverse">
						<svg
							className="tw-h-8 tw-w-8 tw-text-black tw-cursor-pointer"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							onClick={closeInterviewSchedulingModalHandle}>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</div>
					<div className="tw-w-full tw-h-full tw-p-2 tw-flex tw-flex-col">
						<span className="tw-font-bold tw-text-2xl tw-p-2">
							{"30 minute call with " + interviewerList.join(" & ")}
						</span>
						<span className="tw-text-md tw-p-2">
							Let's schedule a quick call to explore how your skills align with HILTI's team goals
							and envision the impact you can make on accelerating our collective success.
						</span>
						<div className="tw-h-1/2 tw-w-full">
							<div className="tw-w-full tw-h-full">
								<div className="tw-h-auto tw-w-full tw-flex tw-justify-between">
									{Array.from({ length: 5 }, (_, i) =>
										i >= interviewDayCardMinIndex && i <= interviewDayCardMaxIndex ? (
											<InterviewDayCard interviewDay={interviewSlots[i]} index={i} />
										) : (
											<div />
										)
									)}
								</div>
								<div className="tw-flex tw-flex-row-reverse tw-items-center tw-mt-2">
									<div className="tw-flex tw-items-center">
										<svg
											className="tw-h-3 tw-w-3 tw-text-black"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round">
											{" "}
											<circle cx="12" cy="12" r="10" /> <polyline points="12 6 12 12 16 14" />
										</svg>
										<span className="tw-text-black tw-text-sm tw-ml-2">30 mins call</span>
									</div>
								</div>
								<div className="tw-w-full hiring-manager-interview-schedule-time-slot-grid tw-mt-4">
									{activeInterviewDayCardIndex === -1 ? (
										<div />
									) : (
										interviewSlots[activeInterviewDayCardIndex].timeSlots.map((slot, index) => (
											<InterviewTimeSlotCard timeSlot={slot} index={index} />
										))
									)}
								</div>
							</div>
						</div>
						<div className="tw-flex tw-justify-center tw-items-center tw-relative tw-bottom-0">
							<button
								className="tw-w-2/6 tw-bg-red-700 tw-text-white tw-text-center tw-p-2"
								onClick={scheduleInterviewHandle}
								disabled={
									activeInterviewDayCardIndex !== -1 && interviewTimeSlotIndex !== -1 ? false : true
								}>
								Schedule
							</button>
						</div>
					</div>
				</div>
			</div>
			<div
				className={
					showScheduledInterviewModal
						? "tw-w-screen tw-h-screen tw-absolute tw-bg-gray-500 tw-bg-opacity-30 tw-flex tw-justify-center tw-items-center"
						: "tw-hidden"
				}>
				<div className="tw-h-4/6 tw-w-2/6 tw-bg-white tw-rounded-3xl tw-absolute tw-z-10 tw-p-3 tw-pb-8 tw-flex tw-flex-col tw-items-center">
					<div className="tw-w-full tw-flex tw-flex-row-reverse">
						<svg
							className="tw-h-8 tw-w-8 tw-text-black tw-cursor-pointer"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							onClick={closeScheduledInterviewModalHandle}>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</div>
					<svg
						className="tw-h-16 tw-w-16 tw-text-green-500"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round">
						{" "}
						<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />{" "}
						<polyline points="22 4 12 14.01 9 11.01" />
					</svg>
					<span className="tw-font-bold tw-text-center tw-text-2xl tw-mt-8">
						Thank you! Your meeting is confirmed.
					</span>
					<div className="hiring-manager-scheduled-interview-modal-grid divide-y divide-gray-400 tw-border tw-rounded-lg tw-border-gray-400 tw-m-5">
						<div className="tw-w-full tw-flex tw-flex-col tw-px-3 tw-py-5">
							<span className="tw-text-left">You are meeting with</span>
							<span className="tw-text-left tw-font-bold tw-text-lg">{interviewerList.join(" & ")}</span>
						</div>
						<div className="tw-w-full tw-flex tw-p-3 tw-items-center tw-justify-between">
							<div className="tw-h-10 tw-w-10 tw-border tw-border-gray-400 tw-rounded-lg tw-p-1.5 tw-flex tw-items-center tw-justify-center">
								<svg
									className="tw-h-full tw-w-full tw-text-black"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round">
									{" "}
									<circle cx="12" cy="12" r="10" /> <polyline points="12 6 12 12 16 14" />
								</svg>
							</div>
							<div className="tw-h-full tw-w-full tw-flex tw-items-center tw-justify-between ">
								<span className="tw-h-full tw-w-1/6 tw-text-center tw-font-bold tw-flex tw-items-center tw-justify-center">
									Time
								</span>
								<span className="tw-w-5/6 tw-text-left">{selectedInterviewDay.toString()}</span>
							</div>
						</div>
						<div className="tw-w-full tw-flex tw-p-3 tw-items-center">
							<div className="tw-h-10 tw-w-10 tw-border tw-border-gray-400 tw-rounded-lg tw-p-1.5 tw-flex tw-items-center tw-justify-center">
								<svg
									className="tw-h-full tw-w-full tw-text-black"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round">
									{" "}
									<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />{" "}
									<circle cx="9" cy="7" r="4" /> <path d="M23 21v-2a4 4 0 0 0-3-3.87" />{" "}
									<path d="M16 3.13a4 4 0 0 1 0 7.75" />
								</svg>
							</div>
							<div className="tw-h-full tw-w-full tw-flex tw-items-center tw-justify-between">
								<span className="tw-h-full tw-w-1/6 tw-text-center tw-font-bold tw-flex tw-items-center tw-justify-center">
									Guest
								</span>
								<span className="tw-w-5/6 tw-text-left">someone@gmail.com, another@gmail.com</span>
							</div>
						</div>
						<div className="tw-w-full tw-flex tw-p-3 tw-items-center">
							<div className="tw-h-10 tw-w-10 tw-border tw-border-gray-400 tw-rounded-lg tw-p-1.5 tw-flex tw-items-center tw-justify-center">
								<svg
									className="tw-h-8 tw-w-8 tw-text-black"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M4 6h16M4 10h16M4 14h16M4 18h16"
									/>
								</svg>
							</div>
							<div className="tw-h-full tw-w-full tw-flex tw-items-center tw-justify-between">
								<span className="tw-h-full tw-w-1/6 tw-text-center tw-font-bold tw-flex tw-items-center tw-justify-center">
									Details
								</span>
								<span className="tw-w-5/6 tw-text-left">
									The booking details has been sent to your email!
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HiringManagerInterviewSchedulingModal;
