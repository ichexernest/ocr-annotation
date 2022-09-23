import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import { useAPI } from '../annotationContext';

const SpecModal = ({ show, setShow,setActivePageId}) => {
    const { setDispatch } = useAPI();
    const [inputs, setInputs] = useState({
        OCRModel: '',
        RpaAPID: '',
        SpecName: '',
        SpecDesc: '',
        FormFile:''
    });

    const handleTextChange = (event) => {
        const name = event.target.id;
        const value = event.target.value;
        console.log(name, value, event.target)
        setInputs(values => ({ ...values, [name]: value }))
    }


    //TODO test the form grab
    const handleUpload = (e) => {
        const name = e.target.id;
        const file = e.target.files[0];
        console.log(`handle upload :::` + name+file);
        setInputs(values => ({ ...values, [name]: file }))
    }

    const handleClose = () => {
        setShow(false);
    };

    const handleCheck = (e) => {
        e.preventDefault()
        let submitData = inputs;
        if (submitData.OCRModel === '') {
            alert(`未填寫OCR模型`);
            return;
        }
        if (submitData.RpaAPID === '') {
            alert(`未填寫RpaAPID`);
            return;
        }
        if (submitData.SpecName === '') {
            alert(`未填寫規格名稱`);
            return;
        }
        if (submitData.SpecDesc === '') {
            alert(`未填寫規格說明`);
            return;
        }
        //TODO: 預處理 若是pdf則轉檔切分放入
        console.log(`FFFFOOORRRMMMMMMM`+submitData.FormFile);

        setDispatch({
            type: "new_specInfo",
            submitData: submitData,
        })
        setActivePageId(0);
        setShow(false);
        setInputs({
            OCRModel: '',
            RpaAPID: '',
            SpecName: '',
            SpecDesc: '',
            FormFile:''
        })
    }

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>新增專案</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleCheck}>
                <Modal.Body>
                    <FloatingLabel
                        controlId="OCRModel"
                        label="OCR模型*"
                        className="mb-3"
                        onChange={handleTextChange}>
                        <Form.Control type="text" placeholder="type OCRModel" />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="RpaAPID"
                        label="RpaAPID*"
                        className="mb-3"
                        onChange={handleTextChange}>
                        <Form.Control type="text" placeholder="type RpaAPID" />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="SpecName"
                        label="規格名稱*"
                        className="mb-3"
                        onChange={handleTextChange}>
                        <Form.Control type="text" placeholder="type SpecName" />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="SpecDesc"
                        label="規格說明*"
                        className="mb-3"
                        onChange={handleTextChange}>
                        <Form.Control type="text" placeholder="type SpecDesc" />
                    </FloatingLabel>
                    <hr />
                        <Form.Label>選擇檔案</Form.Label>
                        <Form.Control className='mb-3' type="file" id="FormFile" onChange={handleUpload}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        取消
                    </Button>
                    <Button variant="primary" type="submit">
                        儲存
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default SpecModal;