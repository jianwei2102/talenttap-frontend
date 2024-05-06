import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FileUploader } from "../";

const CVScreening = () => {
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
          Start Application
        </button>
      </div>

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
    </>
  );
};

export default CVScreening;
