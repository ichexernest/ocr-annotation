import React from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
const NoticeModal = ({ show, setShow, content, showLoading, nextStep }) => {

  const handleNextStep = () => {
    setShow(false);
    nextStep();

  }
  const handleClose = () => {
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>通知</Modal.Title>
      </Modal.Header>
      <Modal.Body className='m-0 p-5 text-center'>
        {showLoading && <FontAwesomeIcon className="icon" icon={faSpinner} size="4x" spin />}
        {content}
      </Modal.Body>
      <Modal.Footer className="border-0">
        {!showLoading && <Button variant="dark" onClick={() => { handleNextStep() }}>確定</Button>}
      </Modal.Footer>
    </Modal>
  );
}

export default NoticeModal;