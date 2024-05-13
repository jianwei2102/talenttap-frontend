import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FileUploader, CustomButton } from "..";

const PopUpModal = ({ title }) => {
	const [show, setShow] = useState(false);
	const [textLength, setTextLength] = useState(0);
	const [isChecked, setIsChecked] = useState(false);

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
				<Modal centered size="lg" show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Application Form</Modal.Title>
					</Modal.Header>
					<Modal.Body className="flex flex-col">
						<form className="m-2" action="">
							<div>
								<span className="font-semibold">Add Resume</span> (*.pdf)
							</div>
							<FileUploader />

							<div className="mt-4 font-semibold">Highlight why you apply for this job</div>
							<textarea
								className="w-full border-2 border-gray-300 rounded-md resize-none h-24 p-2"
								onChange={(event) => setTextLength(event.target.value.length)}></textarea>
							<div className="float-right">{textLength} / 300 characters</div>
							
							<div className="w-full mt-5 flex items-start">
								<input className="mt-1 h-full" type="checkbox" checked={isChecked} onChange={handleCheckboxChange}></input>
								<span className="ml-2 text-sm">
									I have read and agreed to the {' '}
									<a href="https://cloudmails-my.sharepoint.com/:w:/g/personal/tp060751_mail_apu_edu_my/EYppO4IvYUlEmmXwNvz5ghkBd3qS3-Ia9_XtJwUgvGVq_Q" className="text-blue-500 hover:underline">
										Hilti recruitment and hiring privacy statement
									</a>
								</span>
							</div>
						</form>
					</Modal.Body>
					<Modal.Footer>
						<button
							className={`h-9 w-24 bg-red-500 text-white rounded-md text-lg ${!isChecked ? 'opacity-50 cursor-not-allowed' : ''}`}
							onClick={handleClose}
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
						<div className="p-2">
							<div className="flex justify-end items-end">
								<button
									type="button"
									className="btn-close"
									aria-label="Close"
									onClick={() => handleClose()}></button>
							</div>
							<div className="flex items-center justify-center font-bold text-3xl mb-3">
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
								<CustomButton title={"I Understand"} customFunction={handleClose} />
							</div>
						</div>
					</Modal.Body>
				</Modal>
			)}
		</>
	);
};

export default PopUpModal;
