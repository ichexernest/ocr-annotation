import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import { useAPI } from "../annotationContext";

const AnnoInfoModal = ({ show, setShow, newAnnotation, setNewAnnotation, activePageId, selectedId }) => {
    const { setDispatch, annotation } = useAPI();
    //let editAnnoList = JSON.parse(JSON.stringify(annotations));
    let submitData = {};
    const [inputs, setInputs] = useState({
        AreaName: '',
        AreaDesc: '',
        Title: '',
        TitleContent: '',
        WordCount: 0,
        IsAnchor: false,
        IsOneLine: false,
        IsEng: false,
    });
    const [annoType, setAnnoType] = useState('area');
    const handleTextChange = (event) => {
        let name, value;
        console.log(event)
        name = event.target.id;
        if (event.target.type === "checkbox") {
            value = event.target.checked;
        } else {
            value = event.target.value;
        }
        console.log(name, value, event.target)
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleClose = () => {
        setNewAnnotation([]);
        //alert(JSON.stringify(newAnnotation));
        setShow(false);
        setInputs({
            AreaName: '',
            AreaDesc: '',
            Title: '',
            TitleContent: '',
            WordCount: 0,
            IsAnchor: false,
            IsOneLine: false,
            IsEng: false,
        })
        setAnnoType("area")
    };

    const handleSelectType = (e) => {
        setAnnoType(e.target.value);
    }

    const handleCheck = (e) => {
        e.preventDefault()
        submitData = inputs;
        //alert(JSON.stringify(submitData));
        if (submitData.AreaName === '') {
            alert(`未填寫區域名稱`);
            return;
        }
        if (submitData.AreaDesc === '') {
            alert(`未填寫區域說明`);
            return;
        }
        if (submitData.Title === '') {
            alert(`未填寫標籤欄位`);
            return;
        }
        if (annoType === "title") {
            if (submitData.TitleContent === '') {
                alert(`未填寫標籤內容`);
                return;
            }
            if (submitData.IsAnchor) {
                // annotations.forEach(item => {
                //     item.IsAnchor = 0;
                // })
                submitData.IsAnchor = 1;
            } else {
                submitData.isAnchor = 0;
            }
        }
        submitData.type = annoType;
        //submitData.PageNum = 1;
        //submitData.specID = "testSpec001";
        submitData.AreaID = "manualID";
        submitData.IsOneLine = submitData.IsOneLine ? 1 : 0;
        submitData.IsEng = submitData.IsEng ? 1 : 0;
        newAnnotation[0] = { ...newAnnotation[0], ...submitData };
        //alert(`COMPARE::::`+JSON.stringify(annotations)+`:::::::`+JSON.stringify(annotations));
        //annotations.push(...newAnnotation);
        //setAnnotations(annotations);
        setDispatch({ type: 'add_new_annotation', newAnnotation: newAnnotation[0], activePageId: activePageId })

        setNewAnnotation([]);
        //alert(JSON.stringify(annotations));
        setShow(false);
        setInputs({
            AreaName: '',
            AreaDesc: '',
            Title: '',
            TitleContent: '',
            WordCount: 0,
            IsAnchor: false,
            IsOneLine: false,
            IsEng: false,
        })
        setAnnoType("area")
    }

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>新增標註</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleCheck}>
                <Modal.Body className="bg-light">
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
                        controlId="AreaName"
                        label="區域名稱*"
                        className="mb-3"
                        onChange={handleTextChange}>
                        <Form.Control type="text" placeholder="type areaName" />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="AreaDesc"
                        label="區域說明*"
                        className="mb-3"
                        onChange={handleTextChange}>
                        <Form.Control type="text" placeholder="type areaDesc" />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="Title"
                        label="標籤名稱*"
                        className="mb-3"
                        onChange={handleTextChange}>
                        <Form.Control type="text" placeholder="type title" />
                    </FloatingLabel>
                    {annoType === "title" &&
                        < FloatingLabel
                            controlId="TitleContent"
                            label="標籤內容*"
                            className="mb-3"
                            onChange={handleTextChange}>
                            <Form.Control type="text" placeholder="type titleContent" />
                        </FloatingLabel>
                    }
                    <FloatingLabel
                        controlId="WordCount"
                        label="字數"
                        className="mb-3"
                        onChange={handleTextChange}>
                        <Form.Control type="text" placeholder="type wordCount" />
                    </FloatingLabel>
                    {annoType === "title" &&
                        <Form.Group className="mb-3">
                            <Form.Check
                                id="IsAnchor"
                                label="是否為錨點(anchor)(勾選此項會將此設為本頁唯一錨點)"
                                onChange={handleTextChange}
                            />
                        </Form.Group>
                    }
                    <Form.Group className="mb-3">
                        <Form.Check
                            id="IsOneLine"
                            label="是否為單行"
                            onChange={handleTextChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check
                            id="IsEng"
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
        </Modal >
    );
}

export default AnnoInfoModal;