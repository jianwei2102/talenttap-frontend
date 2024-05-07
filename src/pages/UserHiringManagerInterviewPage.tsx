import React from "react";
import { useState, useEffect } from "react";
import UserNavBar from "../components/UserNavBar.tsx";

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
	const dayList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	return dayList[num - 1];
}

//TODO: Get interviewer names
const interviewerList = ["John Stones", "Devid Bromberg"];

//TODO: Get interview slots (yes its not sorted rn)
// Randomly generate dates (temp)
const interviewSlots: InterviewDaySlot[] = [];

let currentDate = new Date();
for (let index = 0; index < 10; index++) {
	let month = currentDate.getMonth();
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

function HiringManagerInterviewPage() {
	// TODO: Check if interviewee already scheduled an interview
	const [isInterviewScheduled, setIsInterviewScheduled] = useState(false);
	const [showInterviewSchedulingModal, setShowInterviewSchedulingModal] = useState(false);
	const [showScheduledInterviewModal, setShowScheduledInterviewModal] = useState(false);
	const [activeInterviewDayCardIndex, setActiveInterviewDayCardIndex] = useState(-1);
	const [interviewDayCardMinIndex, setInterviewDayCardMinIndex] = useState(0);
	const [interviewDayCardMaxIndex, setInterviewDayCardMaxIndex] = useState(4);
	const [interviewTimeSlotIndex, setInterviewTimeSlotIndex] = useState(-1);
	const [selectedInterviewDay, setSelectedInterviewDay] = useState(new Date());

	const openInterviewSchedulingModalHandle = () => {
		setShowInterviewSchedulingModal(true);
	}

	const closeInterviewSchedulingModalHandle = () => {
		setShowInterviewSchedulingModal(false);
	};

	const closeScheduledInterviewModalHandle = () => {
		setShowScheduledInterviewModal(false);
	}

	const InterviewTimeSlotCard = ({ timeSlot, index }: InterviewTimeSlotCardProps) => {
		const clickTimeSlotHandle = () => {
			setInterviewTimeSlotIndex(index);
		};

		return (
			<div
				className={
					index === interviewTimeSlotIndex
						? "bg-red-700 rounded-lg text-white text-center p-2 cursor-pointer"
						: "border border-gray-400 rounded-lg text-red-700 text-center p-2 cursor-pointer"
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
						? "w-20 h-1/2 py-2 flex flex-col justify-between border border-red-700 rounded-xl cursor-pointer"
						: "w-20 h-1/2 py-2 flex flex-col justify-between border border-gray-400 rounded-xl cursor-pointer"
				}
				onClick={clickInterviewDayCardHandle}>
				<span
					className={
						index === activeInterviewDayCardIndex
							? "text-red-700 text-lg text-center"
							: "text-black text-lg text-center"
					}>
					{convertIntToDayString(interviewDay.date.getDay()).substring(0, 3)}
				</span>
				<span
					className={
						index === activeInterviewDayCardIndex
							? "text-red-700 text-lg text-center"
							: "text-black text-lg text-center"
					}>
					{interviewDay.date.getDate()}
				</span>
				<div className="w-full flex justify-center items-center p-1">
					<svg
						className={
							interviewDay.timeSlots.length > 2 ? "h-3 w-3 text-green-700" : "h-3 w-3 text-red-700"
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
								? "text-red-700 text-xs ml-1.5"
								: "text-black text-xs ml-1.5"
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

		setShowInterviewSchedulingModal(false);
		setIsInterviewScheduled(true);
		setShowScheduledInterviewModal(true);

		// TODO: send email
	};

	return (
		<div className="h-screen w-screen flex flex-col">
			<UserNavBar activeIndex={-1} />
			{/* TODO: Add progress bar */}
			{/* TODO: Add position information (best to turn into a component since its repeating from other pages)*/}
			<div className="flex flex-col justify-center items-center">
				<button
					className="bg-red-700 text-white px-5 py-2"
					onClick={openInterviewSchedulingModalHandle}>
					Schedule Interview
				</button>
				<span className="text-gray-500 text-sm px-5 py-2 mt-2">
					The interview can be done within 3 days.
				</span>
			</div>
			<div
				className={
					showInterviewSchedulingModal
						? "modal-backdrop flex justify-center items-center"
						: "hidden"
				}>
				<div className="h-4/6 w-2/6 bg-white rounded-3xl absolute z-100 p-3">
					<div className="w-full flex flex-row-reverse">
						<svg
							className="h-8 w-8 text-black cursor-pointer"
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
					<div className="w-full h-full p-2 flex flex-col">
						<span className="font-bold text-2xl p-2">
							{"30 minute call with " + interviewerList.join(" & ")}
						</span>
						<span className="text-md p-2">
							Let's schedule a quick call to explore how your skills align with HILTI's team goals
							and envision the impact you can make on accelerating our collective success.
						</span>
						<div className="h-1/2 w-full">
							<div className="w-full h-full">
								<div className="h-auto w-full flex justify-between">
									{Array.from({ length: 5 }, (_, i) =>
										i >= interviewDayCardMinIndex && i <= interviewDayCardMaxIndex ? (
											<InterviewDayCard interviewDay={interviewSlots[i]} index={i} />
										) : (
											<div />
										)
									)}
								</div>
								<div className="flex flex-row-reverse items-center mt-2">
									<div className="flex items-center">
										<svg
											className="h-3 w-3 text-black"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round">
											{" "}
											<circle cx="12" cy="12" r="10" /> <polyline points="12 6 12 12 16 14" />
										</svg>
										<span className="text-black text-sm ml-2">30 mins call</span>
									</div>
								</div>
								<div className="w-full hiring-manager-interview-schedule-time-slot-grid mt-4">
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
						<div className="flex justify-center items-center relative bottom-0">
							<button
								className="w-2/6 bg-red-700 text-white text-center p-2"
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
						? "w-screen h-screen absolute bg-gray-500 bg-opacity-30 flex justify-center items-center"
						: "hidden"
				}>
				<div className="h-4/6 w-2/6 bg-white rounded-3xl absolute z-10 p-3 pb-8 flex flex-col items-center">
					<div className="w-full flex flex-row-reverse">
						<svg
							className="h-8 w-8 text-black cursor-pointer"
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
						className="h-16 w-16 text-green-500"
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
					<span className="font-bold text-center text-2xl mt-8">
						Thank you! Your meeting is confirmed.
					</span>
					<div className="hiring-manager-scheduled-interview-modal-grid divide-y divide-gray-400 border rounded-lg border-gray-400 m-5">
						<div className="w-full flex flex-col px-3 py-5">
							<span className="text-left">You are meeting with</span>
							<span className="text-left font-bold text-lg">{interviewerList.join(" & ")}</span>
						</div>
						<div className="w-full flex p-3 items-center justify-between">
							<div className="h-10 w-10 border border-gray-400 rounded-lg p-1.5 flex items-center justify-center">
								<svg
									className="h-full w-full text-black"
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
							<div className="h-full w-full flex items-center justify-between ">
								<span className="h-full w-1/6 text-center font-bold flex items-center justify-center">
									Time
								</span>
								<span className="w-5/6 text-left">{selectedInterviewDay.toString()}</span>
							</div>
						</div>
						<div className="w-full flex p-3 items-center">
							<div className="h-10 w-10 border border-gray-400 rounded-lg p-1.5 flex items-center justify-center">
								<svg
									className="h-full w-full text-black"
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
							<div className="h-full w-full flex items-center justify-between">
								<span className="h-full w-1/6 text-center font-bold flex items-center justify-center">
									Guest
								</span>
								<span className="w-5/6 text-left">someone@gmail.com, another@gmail.com</span>
							</div>
						</div>
						<div className="w-full flex p-3 items-center">
							<div className="h-10 w-10 border border-gray-400 rounded-lg p-1.5 flex items-center justify-center">
								<svg
									className="h-8 w-8 text-black"
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
							<div className="h-full w-full flex items-center justify-between">
								<span className="h-full w-1/6 text-center font-bold flex items-center justify-center">
									Details
								</span>
								<span className="w-5/6 text-left">
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

export default HiringManagerInterviewPage;
