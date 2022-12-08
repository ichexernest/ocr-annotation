import React, { useState, useEffect, useCallback } from 'react';

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import { useAPI } from "../apiContext";
import API from '../../API';

const ResultModal = ({ show, setShow, activeTarget }) => {
    const { setDispatch } = useAPI();

    let submitData = {
        NewResult: '',
        IsEng: false,
        IsError: false,
    };
    const [inputs, setInputs] = useState({
        NewResult: '',
        IsEng: false,
        IsError: false,
    });

    useEffect(() => {
        setInputs(activeTarget !== null && activeTarget !== undefined ? {
            NewResult: activeTarget.NewResult,
            IsEng: activeTarget.IsEng,
            IsError: activeTarget.IsError,
        } : {
            NewResult: '',
            IsEng: false,
            IsError: false,
        })
    }, [activeTarget, show]);

    const handleTextChange = (event) => {
        let name, value;
        name = event.target.id;
        if (event.target.type === "checkbox") {
            value = event.target.checked;
        } else {
            value = event.target.value;
        }
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleClose = () => {
        setShow(false);
        setInputs({
            NewResult: '',
            IsEng: false,
            IsError: false,
        })
    };


    const handleCheck = (e) => {
        e.preventDefault()
        submitData = inputs;

        if (submitData.Title !== '') {
            alert(`標記為錯誤`);
            return;
        }
        //submitData.AreaID = "manualID";

        setDispatch({ type: 'update_results', result: submitData, activeTarget: activeTarget })
        setShow(false);
        setInputs({
            NewResult: '',
            IsEng: false,
            IsError: false,
        })
    }

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>編輯辨識結果</Offcanvas.Title>
            </Offcanvas.Header>
            <Form onSubmit={handleCheck} className="overflow-auto pb-3">
                <Offcanvas.Body className="border-top">
                    <Form.Group className="mb-3">
                        <Form.Check
                            id="IsEng"
                            label="是否為英數字"
                            onChange={handleTextChange}
                            defaultChecked={activeTarget !== null && activeTarget !== undefined ? activeTarget.IsEng : ""}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check
                            id="IsError"
                            label="是否辨識錯誤"
                            onChange={handleTextChange}
                            defaultChecked={activeTarget !== null && activeTarget !== undefined ? activeTarget.IsError : ""}
                        />
                    </Form.Group>
                    <FloatingLabel
                        controlId="NewResult"
                        label="修正結果"
                        className="mb-3"
                        onChange={handleTextChange}>
                        <Form.Control type="text" as="textarea" placeholder="type title" defaultValue={activeTarget !== null && activeTarget !== undefined ? activeTarget.NewResult : ""} />
                    </FloatingLabel>
                </Offcanvas.Body>
                <div className='d-flex justify-content-end'>
                    <Button variant="dark" className='mx-4 px-5' type="submit">
                        確定
                    </Button>
                </div>
            </Form>
        </Offcanvas >
    );
}

export default ResultModal;