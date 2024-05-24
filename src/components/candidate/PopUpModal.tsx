import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FileUploader, CustomButton } from "..";
import HiringManagerInterviewSchedulingModal from "../../pages/candidate/Interview/HiringManagerInterviewSchedulingModal.tsx";

const PopUpModal = ({ title, onClose=()=>{} }) => {
	const [show, setShow] = useState(false);
	const [textLength, setTextLength] = useState(0);
	const [isChecked, setIsChecked] = useState(false);
	const [visa, setVisa] = useState("Yes");
	const [referral, setReferral] = useState("No");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleCheckboxChange = (event) => {
		setIsChecked(event.target.checked);
	};

	return (
		<>
			<CustomButton title={title} customFunction={handleShow} />

			{/* CVSCreening - PopUp Modal */}
			{title === "Start Application" && (
				<Modal centered size="lg" show={show} onHide={handleClose} scrollable={true}>
					<Modal.Header closeButton>
						<Modal.Title>Application Form</Modal.Title>
					</Modal.Header>
					<Modal.Body className="tw-flex tw-flex-col">
						<form className="tw-m-2" action="">

							{/* Resume */}
							<div className="tw-mb-2">
								<span className="tw-font-semibold">Add Resume</span> (*.pdf)
							</div>
							<FileUploader />

							{/* Work Permit/Visa */}
							<div className="tw-mt-4 tw-font-semibold">Do you have the permit to work in Malaysia?</div>
							<div className="tw-flex tw-items-center tw-mt-2">
								<input onChange={(e) => setVisa(e.currentTarget.value)} id="visa-yes" type="radio" name="visa" value="Yes" className="tw-h-4 tw-w-4 tw-border-gray-300 tw-focus:ring-2 tw-focus:ring-blue-300" aria-labelledby="visa-yes" aria-describedby="visa-yes" />
								<label htmlFor="visa-yes" className="tw-text-sm tw-font-medium tw-text-gray-900 tw-ml-2 tw-block">
									Yes
								</label>

								<input onChange={(e) => setVisa(e.currentTarget.value)} id="visa-no" type="radio" name="visa" value="No" className="tw-ml-4 tw-h-4 tw-w-4 tw-border-gray-300 tw-focus:ring-2 tw-focus:ring-blue-300" aria-labelledby="visa-no" aria-describedby="visa-no" />
								<label htmlFor="visa-no" className="tw-text-sm tw-font-medium tw-text-gray-900 tw-ml-2 tw-block">
									No
								</label>
							</div>

							{visa == "No" && (
								<div className="tw-ml-8">
									<div className="tw-mt-4">
										<label htmlFor="visa-name" className="tw-text-sm tw-font-medium tw-text-gray-900 tw-mb-2">
											Work Visa/Permit Name
										</label>
										<input
											type="text"
											name="visa-name"
											id="visa-name"
											className="tw-w-full tw-border-2 tw-border-gray-300 tw-rounded-md tw-p-2"
										/>
									</div>
									<div className="tw-mb-2 tw-mt-4">
										<span className="tw-font-semibold">Add Supporting Documents for Work Visa/Permit</span> (*.pdf)
									</div>
									<FileUploader />
								</div>
							)}

							{/* Referral */}
							<div className="tw-mt-4 tw-font-semibold">Do you know anyone who is currently working in Hilti?</div>
							<div className="tw-flex tw-items-center tw-mt-2">
								<input onChange={(e) => { setReferral(e.currentTarget.value); console.log(e.currentTarget.value) }} id="referral-yes" type="radio" name="referral" value="Yes" className="tw-h-4 tw-w-4 tw-border-gray-300 tw-focus:ring-2 tw-focus:ring-blue-300" aria-labelledby="referral-yes" aria-describedby="referral-yes" />
								<label htmlFor="referral-yes" className="tw-text-sm tw-font-medium tw-text-gray-900 tw-ml-2 tw-block">
									Yes
								</label>

								<input onChange={(e) => { setReferral(e.currentTarget.value); console.log(e.currentTarget.value) }} id="referral-no" type="radio" name="referral" value="No" className="tw-ml-4 tw-h-4 tw-w-4 tw-border-gray-300 tw-focus:ring-2 tw-focus:ring-blue-300" aria-labelledby="referral-no" aria-describedby="referral-no" />
								<label htmlFor="referral-no" className="tw-text-sm tw-font-medium tw-text-gray-900 tw-ml-2 tw-block">
									No
								</label>
							</div>

							{referral == "Yes" && (
								<div className="tw-ml-8">
									<div className="tw-mt-4">
										<label htmlFor="referral-name" className="tw-text-sm tw-font-medium tw-text-gray-900 tw-mb-2">
											Referrer Name
										</label>
										<input
											type="text"
											name="referral-name"
											id="referral-name"
											className="tw-w-full tw-border-2 tw-border-gray-300 tw-rounded-md tw-p-2"
										/>
									</div>
									<div className="mt-4">
										<label htmlFor="referral-email" className="tw-text-sm tw-font-medium tw-text-gray-900 tw-mb-2">
											Referrer Work Email
										</label>
										<input
											type="text"
											name="referral-email"
											id="referral-email"
											className="tw-w-full tw-border-2 tw-border-gray-300 tw-rounded-md tw-p-2"
										/>
									</div>
									<div className="mt-4">
										<label htmlFor="referral-relationship" className="tw-text-sm tw-font-medium tw-text-gray-900 tw-mb-2">
											Relationship
										</label>
										<input
											type="text"
											name="referral-relationship"
											id="referral-relationship"
											className="tw-w-full tw-border-2 tw-border-gray-300 tw-rounded-md tw-p-2"
											placeholder="Parent, Sibling, Friend, etc."
										/>
									</div>
								</div>
							)}

							{/* Why Apply This Job */}
							<div className="tw-mt-8 tw-mb-2 tw-font-semibold">Tell us why would you like to apply for the job (in 500 characters)</div>
							<textarea
								className="tw-w-full tw-border-2 tw-border-gray-300 tw-rounded-md tw-resize-none tw-h-24 tw-p-2"
								onChange={(event) => setTextLength(event.target.value.length)}
								placeholder="Type here..."
								maxLength={500}
							></textarea>
							<div className="tw-float-right">{textLength} / 500 characters</div>

							<div className="tw-w-full tw-mt-5 tw-flex tw-items-start">
								<input className="tw-mt-1 tw-h-full" type="checkbox" checked={isChecked} onChange={handleCheckboxChange}></input>
								<span className="tw-ml-2 tw-text-sm">
									I have read and agreed to the {' '}
									<a href="https://cloudmails-my.sharepoint.com/:w:/g/personal/tp060751_mail_apu_edu_my/EYppO4IvYUlEmmXwNvz5ghkBd3qS3-Ia9_XtJwUgvGVq_Q" className="tw-text-blue-500 tw-hover:underline">
										Hilti recruitment and hiring privacy statement
									</a>
								</span>
							</div>
						</form>
					</Modal.Body>
					<Modal.Footer>
						<button
							className={`tw-h-9 tw-w-24 tw-bg-red-500 tw-text-white tw-rounded-md tw-text-lg ${!isChecked ? 'tw-opacity-50 tw-cursor-not-allowed' : ''}`}
							onClick={() => { handleClose(); onClose(); }}
							disabled={!isChecked}
						>
							Apply
						</button>
					</Modal.Footer>
				</Modal>
			)}

			{/* Disclaimer - PopUp Modal */}
			{title === "Continue" && (
				<Modal show={show} onHide={handleClose} size="lg" centered>
					<Modal.Body>
						<div className="tw-p-2">
							<div className="tw-flex tw-justify-end tw-items-end">
								<button
									type="button"
									className="btn-close"
									aria-label="Close"
									onClick={() => handleClose()}></button>
							</div>
							<div className="tw-flex tw-items-center tw-justify-center tw-font-bold tw-text-3xl tw-mb-3">
								Disclaimer
							</div>
							<div>
								<p>
									By clicking on the button you are acknowledging that you have read and agreed to
									the terms and conditions:
									<br /> <br />
									• I am over 18 years of age and consent to having my device camera or web cam
									turned on to record my interview.
									<br />
									• I consent to having my video interview footage recorded to be reviewed by AI.
									<br />
									• I acknowledge that the final hiring decision will be done manually by humans,
									and will be partially based on the AI-provided review.
									<br />• I acknowledge that the video submitted will only be used for the hiring
									process in HILTI and will not be shared with third parties.
								</p>
								<CustomButton title={"I Understand"} customFunction={() => { handleClose(); onClose() }} />
							</div>
						</div>
					</Modal.Body>
				</Modal>
			)}

			{/* Hiring Manager Interview Scheduling Modal - PopUp Modal */}
			{title === "Schedule Interview" && (
				<Modal centered show={show} onHide={handleClose} scrollable={true}>
					<Modal.Body>
						<div className="tw-flex tw-flex-col">
							<div className="tw-h-[36rem] tw-flex tw-justify-center tw-items-center">
								<HiringManagerInterviewSchedulingModal onClose={handleClose} />
							</div>
						</div>
					</Modal.Body>
				</Modal>
			)}
		</>
	);
};

export default PopUpModal;
