import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store.tsx";
import UserNavBar from "../../components/UserNavBar.tsx";

function UserProfilePage() {
	const user = useSelector((state: RootState) => state.users.user);
	const email = useSelector((state: RootState) => state.users.email);

	return (
		<div className="tw-h-screen tw-w-screen tw-absolute tw-flex tw-flex-col">
			<UserNavBar activeIndex={1} />
			<div className="main-container tw-relative tw-flex tw-flex-col tw-items-center tw-p-10 tw-overflow-auto">
				<div className="tw-w-3/4 tw-h-auto shadow-lg overflow-visible">
					<div className="tw-w-full tw-h-20 tw-relative">
						<img
							className="tw-h-full tw-w-full tw-absolute tw-object-cover tw-z-0"
							src={require("../../assets/wave-background.png")}
							alt="Background"></img>
						<div className="tw-h-full tw-w-full tw-absolute tw-flex tw-justify-between tw-z-10">
							<div className="tw-z-10 tw-flex tw-flex-col tw-ml-10 tw-justify-center">
								<span className="tw-text-white tw-font-bold tw-text-3xl">Profile</span>
								<span className="tw-text-white tw-text-xl">Settings for your personal profile</span>
							</div>
							<div className="tw-z-10 tw-flex tw-items-center tw-mr-10">
								<button id="save-button" className="tw-bg-white tw-border tw-rounded-sm tw-p-2">
									<span className="tw-text-red-800">Save Changes</span>
								</button>
							</div>
						</div>
					</div>
					<div className="tw-w-full tw-pt-5 tw-pb-5 tw-relative tw-flex tw-flex-col tw-justify-center">
						<div className="tw-pl-10 tw-pr-10 tw-pt-5 tw-pb-5">
							<span className="tw-text-lg tw-text-black">Full Name</span>
							<input
								id="full-name-input"
								className="tw-w-full tw-h-10 tw-p-2 tw-border tw-border-black tw-rounded tw-mt-1.5"
								type="text"
								placeholder={user !== null ? user : ""}></input>
						</div>
						<div className="tw-pl-10 tw-pr-10 tw-pt-5 tw-pb-5">
							<span className="tw-text-lg tw-text-black">Email Address</span>
							<input
								id="email-input"
								className="tw-w-full tw-h-10 tw-p-2 tw-border tw-border-black tw-rounded tw-mt-1.5"
								type="text"
								placeholder={email !== null ? email : ""}></input>
						</div>
						<div className="tw-flex tw-justify-between">
							<div className="tw-w-full block tw-flex tw-flex-col tw-pl-10 tw-pr-10 tw-pt-5 tw-pb-5">
								<span className="tw-text-lg tw-text-black">Contact Number</span>
								<input
									id="contact-number-input"
									className="tw-w-full tw-h-10 tw-p-2 tw-border tw-border-black tw-rounded tw-mt-1.5"
									type="text"></input>
							</div>
							<div className="tw-w-full block tw-flex tw-flex-col tw-pl-10 tw-pr-10 tw-pt-5 tw-pb-5">
								<span className="tw-text-lg tw-text-black">Location</span>
								<input
									id="location-input"
									className="tw-w-full tw-h-10 tw-p-2 tw-border tw-border-black tw-rounded tw-mt-1.5"
									type="text"></input>
							</div>
						</div>
					</div>
				</div>
				<div className="tw-w-3/4 shadow-lg tw-mt-10">
					<div className="tw-w-full tw-h-20 tw-relative">
						<img
							className="tw-h-full tw-w-full tw-absolute tw-object-cover tw-z-0"
							src={require("../../assets/wave-background.png")}
							alt="Background"></img>
						<div className="tw-h-full tw-w-full tw-absolute tw-flex tw-justify-between tw-z-10">
							<div className="tw-z-10 tw-flex tw-flex-col tw-ml-10 tw-justify-center">
								<span className="tw-text-white tw-font-bold tw-text-3xl">Danger Zone</span>
								<span className="tw-text-white tw-text-xl">Delete user account</span>
							</div>
						</div>
					</div>
					<div className="tw-flex tw-flex-col tw-pt-5 tw-pb-5 tw-pl-10 tw-pr-10">
						<span className="tw-text-left">By deleting your account you will lose all your data</span>
						<button
							id="deleteAccountButton"
							className="tw-w-1/4 tw-bg-red-700 tw-border tw-rounded-sm tw-p-2 tw-mt-2">
							<span className="tw-text-white">Request account deletion</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserProfilePage;
