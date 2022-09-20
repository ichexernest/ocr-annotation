import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const AnnoInfoModal = ({show,setShow,newAnnotation,setNewAnnotation,annotations,setAnnotations}) => {
    const [inputs, setInputs] = useState({
        areaName: '',
        areaDesc: '',
        title: '',
        titleContent: '',
        wordCount: '',
        isOneLine: '',
        isEng: '',
    });
    const [annoType, setAnnoType] = useState('area');
    const handleTextChange = (event) => {
        const name = event.target.id;
        const value = event.target.value;
        console.log(name, value, event.target)
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleClose = () => {
        setNewAnnotation([]);
        //alert(JSON.stringify(newAnnotation));
        setShow(false);
        setInputs({
            areaName: '',
            areaDesc: '',
            title: '',
            titleContent: '',
            wordCount: '',
            isOneLine: '',
            isEng: '',
        })
        setAnnoType("area")
    };

    const handleSelectType = (e) => {
        setAnnoType(e.target.value);
    }

    const handleCheck = (e) => {
        e.preventDefault()
        let submitData = inputs;
        if (submitData.areaName === '') {
            alert(`未填寫區域名稱`);
            return;
        }
        if (submitData.areaDesc === '') {
            alert(`未填寫區域說明`);
            return;
        }
        if (submitData.title === '') {
            alert(`未填寫標籤欄位`);
            return;
        }
        if (submitData.titleContent === '') {
            alert(`未填寫標籤內容`);
            return;
        }
        submitData.type = annoType;
        submitData.pageNum = 1;
        submitData.specID = "testSpec001";
        submitData.areaID = "testArea001";
        submitData.isOneLine = submitData.isOneLine == "on" ? "Y" : "N";
        submitData.isEng = submitData.isEng == "on" ? "Y" : "N";
        newAnnotation[0] = { ...newAnnotation[0], ...submitData };
        alert(JSON.stringify(newAnnotation));
        annotations.push(...newAnnotation);
        setAnnotations(annotations);
        setNewAnnotation([]);
        //alert(JSON.stringify(annotations));
        setShow(false);
        setInputs({
            areaName: '',
            areaDesc: '',
            title: '',
            titleContent: '',
            wordCount: '',
            isOneLine: '',
            isEng: '',
        })
        setAnnoType("area")
    }

    return (
        <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>新增標註</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleCheck}>
            <Modal.Body className={annoType === "area" ? "bg-light" : "bg-secondary"}>
                <FloatingLabel
                    controlId="type"
                    label="選擇標註類型"
                    className="mb-3"
                    onChange={handleSelectType}>
                    <Form.Select>
                        <option value="area">area</option>
                        <option value="title">title</option>
                    </Form.Select>
                </FloatingLabel>
                <FloatingLabel
                    controlId="areaName"
                    label="區域名稱*"
                    className="mb-3"
                    onChange={handleTextChange}>
                    <Form.Control type="text" placeholder="type areaName" />
                </FloatingLabel>
                <FloatingLabel
                    controlId="areaDesc"
                    label="區域說明*"
                    className="mb-3"
                    onChange={handleTextChange}>
                    <Form.Control type="text" placeholder="type areaDesc" />
                </FloatingLabel>
                <FloatingLabel
                    controlId="title"
                    label="標籤名稱*"
                    className="mb-3"
                    onChange={handleTextChange}>
                    <Form.Control type="text" placeholder="type title" />
                </FloatingLabel>
                <FloatingLabel
                    controlId="titleContent"
                    label="標籤內容*"
                    className="mb-3"
                    onChange={handleTextChange}>
                    <Form.Control type="text" placeholder="type titleContent" />
                </FloatingLabel>
                <FloatingLabel
                    controlId="wordCount"
                    label="字數"
                    className="mb-3"
                    onChange={handleTextChange}>
                    <Form.Control type="text" placeholder="type wordCount" />
                </FloatingLabel>
                <Form.Group className="mb-3">
                    <Form.Check
                        id="isOneLine"
                        label="是否為單行"
                        onChange={handleTextChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check
                        id="isEng"
                        label="是否為英數字"
                        onChange={handleTextChange}
                    />
                </Form.Group>
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

export default AnnoInfoModal;