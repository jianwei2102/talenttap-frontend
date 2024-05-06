import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FileUploader } from "..";

const PopUpModal = ({ title }) => {
  const [show, setShow] = useState(false);
  const [textLength, setTextLength] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="flex justify-center items-center">
        <button
          className="w-48 h-12 mx-auto mt-10 bg-red-500 text-white rounded-lg text-lg"
          onClick={handleShow}
        >
          {title}
        </button>
      </div>

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

              <div className="mt-4">
                <span className="font-semibold">
                  Highlight why you apply for this job
                </span>
              </div>
              <textarea
                className="w-full border-2 border-gray-300 rounded-md resize-none h-24 p-2"
                onChange={(event) => setTextLength(event.target.value.length)}
              ></textarea>
              <div className="float-right">{textLength} / 300 characters</div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="h-9 w-24 bg-red-500 text-white rounded-md text-lg"
              onClick={handleClose}
            >
              Apply
            </button>
          </Modal.Footer>
        </Modal>
      )}

      {title === "Continue" && (
        <Modal show={show} onHide={handleClose} size="lg" centered>
          <Modal.Body>
            <div className="p-2">
              <div className="flex justify-end items-end">
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => handleClose()}
                ></button>
              </div>
              <div className="flex items-center justify-center font-bold text-3xl mb-3">
                Disclaimer
              </div>
              <div>
                <p>
                  By clicking on the button you are acknowledging that you have
                  read and agreed to the terms and conditions:
                  <br /> <br />
                  • I am over 18 years of age and consent to having my device
                  camera or web cam turned on to record my interview.
                  <br />
                  • I consent to having my video interview footage recorded to
                  be reviewed by AI.
                  <br />
                  • I acknowledge that the final hiring decision will be done
                  manually by humans, and will be partially based on the
                  AI-provided review.
                  <br />• I acknowledge that the video submitted will only be
                  used for the hiring process in HILTI and will not be shared
                  with third parties.
                </p>
                <div className="flex justify-center items-center">

                <button
                  className="w-48 h-12 mx-auto mt-10 bg-red-500 text-white rounded-lg text-lg"
                  onClick={() => handleClose()} // Navigate to interview quesetions
                  >I Undestand</button>
              </div>
                  </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default PopUpModal;
