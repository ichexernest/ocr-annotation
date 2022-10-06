import React, { useState, useCallback, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import { useAPI } from '../annotationContext';
import API from '../../API';

const SpecModal = ({ show, setShow, setActivePageId }) => {
    const { setDispatch } = useAPI();
    const [options, setOptions] = useState([])
    const [inputs, setInputs] = useState({
        OCRModel: '',
        RpaAPID: '',
        SpecName: '',
        SpecDesc: '',
        FormFile: ''
    });

    const fetchRpaAPList = useCallback(async () => {
        try {
            const data = await API.getRpaAPList();
            setOptions(data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        fetchRpaAPList();
    }, [fetchRpaAPList])

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
        console.log(`handle upload :::` + name + file);
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
        //TODO: POST 資料建檔
        //TODO: 預處理 若是pdf則轉檔切分放入
        console.log(`FFFFOOORRRMMMMMMM` + submitData.FormFile);

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
            FormFile: ''
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
                    <FloatingLabel controlId="RpaAPID" label="RpaAPID*" className="mb-3">
                        <Form.Select aria-label="Floating label select example">
                            <option selected disabled hidden value="">請選擇...</option>
                            {options !== [] && options.map((item, index) => (
                                <option key={item.RpaAPID} value={item.RpaAPID}>{item.RpaAPName}</option>
                            ))}
                        </Form.Select>
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
                    <Form.Control className='mb-3' type="file" id="FormFile" onChange={handleUpload} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        取消
                    </Button>
                    <Button variant="primary" type="submit">
                        新建
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default SpecModal;