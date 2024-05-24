import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Alert } from '../../../components/Alert';

interface OverwriteModalProps {
    show: boolean;
    handleClose: () => void;
}

const OverwriteModal: React.FC<OverwriteModalProps> = (props) => {
    let { show, handleClose } = props;

    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    return (
        <Modal show={show} centered backdrop="static" keyboard={false}>
            <Modal.Header>
                <Modal.Title>Overwrite Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="tw-w-full tw-flex tw-flex-col tw-p-3">
                    <span className="tw-text-xl">Score <span className='tw-text-red-700'>*</span></span>
                    <input
                        type="text"
                        className="tw-w-full tw-p-2 tw-border tw-border-black tw-rounded-xl tw-mt-3 focus:tw-outline-none"
                        onChange={(e) => setScore(parseInt(e.target.value))} />

                    <span className="tw-text-xl tw-mt-8">Feedback <span className='tw-text-red-700'>*</span></span>
                    <textarea
							className="tw-w-full tw-p-2 tw-border tw-border-black tw-rounded-xl tw-mt-1 focus:tw-outline-none tw-resize-none tw-mt-3"
							rows={5}
							cols={50}
                            onChange={(e) => setFeedback(e.target.value)}></textarea>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={handleClose}>
                    Cancel
                </button>
                <button className="btn btn-danger" onClick={handleClose}>
                    Overwrite
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default OverwriteModal;