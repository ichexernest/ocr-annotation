import React, { useState, useEffect, useCallback } from 'react';

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import { useAPI } from "../apiContext";
import { useRecord } from "../EditRecordContext";
import API from '../../API';

const ResultModal = ({ show, setShow, activeTarget, activePageIndex }) => {
    const { setDispatch } = useAPI();
    const { setRecordDispatch } = useRecord();

    let submitData = {
        AreaID: '',
        NewResult: '',
        IsEng: false,
        ProcStatus: 10,
    };
    const [inputs, setInputs] = useState({
        NewResult: '',
        IsEng: false,
        IsError: false,
    });

    //console.log(`activeTarget:::: ` + JSON.stringify(activeTarget));

    useEffect(() => {
        setInputs(activeTarget !== null && activeTarget !== undefined ? {
            NewResult: activeTarget.NewResult,
            IsEng: activeTarget.IsEng,
            IsError: activeTarget.ProcStatus === 51 ? true : false,
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
        e.preventDefault();
        if (inputs.NewResult !== '' && !inputs.IsError) {
            alert(`若要輸入修正內容請將項目標記為錯誤`);
            return;
        }
        submitData.NewResult = inputs.NewResult;
        submitData.IsEng = inputs.IsEng;
        submitData.ProcStatus = inputs.IsError === true ? 51 : 20;
        submitData.AreaID = activeTarget.AreaID;
        const updateTarget = { ...activeTarget, ...submitData };
        console.log(`updateTarget:::: ` + JSON.stringify(updateTarget));
        setDispatch({ type: 'update_results', activeTarget: updateTarget, activePageIndex: activePageIndex })
        setRecordDispatch({ type: 'update_record', submitData: submitData })
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
                    <FloatingLabel
                        controlId="NewResult"
                        label="原辨識結果"
                        className="mb-3">
                        <Form.Control type="text" as="textarea" rows={8} cols={10} readOnly disabled defaultValue={activeTarget !== null && activeTarget !== undefined ? activeTarget.ResultData : ""} />
                    </FloatingLabel> 
                    <Form.Group className="mb-3">
                        <Form.Check
                            id="IsEng"
                            label="是否為英數字"
                            onChange={handleTextChange}
                            defaultChecked={activeTarget !== null && activeTarget !== undefined ? activeTarget.IsEng : false}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check
                            id="IsError"
                            label="是否辨識錯誤"
                            onChange={handleTextChange}
                            defaultChecked={activeTarget == null || activeTarget == undefined ? false : activeTarget.ProcStatus === 51 ? true : false}
                        />
                    </Form.Group>
                    <FloatingLabel
                        controlId="NewResult"
                        label="修正結果"
                        className="mb-3"
                        onChange={handleTextChange}>
                        <Form.Control type="text" as="textarea" rows={5} placeholder="type" defaultValue={activeTarget !== null && activeTarget !== undefined ? activeTarget.NewResult : ""} />
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