import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { v1 as uuidv1 } from "uuid";
import { useAPI } from "../annotationContext";

const AnnoInfoModal = ({ show, setShow, newAnnotation, setNewAnnotation, activePageId, editItem }) => {
    const { setDispatch, annotation } = useAPI();
    //let editAnnoList = JSON.parse(JSON.stringify(annotations));
    let submitData = {
        AreaName: '',
        AreaDesc: '',
        Title: '',
        TitleContent: '',
        WordCount: 0,
        IsAnchor: false,
        IsOneLine: false,
        IsEng: false,
    };
    console.log(`EDITITEM:::` + JSON.stringify(editItem))
    const [inputs, setInputs] = useState({
        AreaName: "",
        AreaDesc: "",
        Title: "",
        TitleContent: "",
        WordCount: 0,
        IsAnchor: false,
        IsOneLine: false,
        IsEng: false,
    });
    const [annoType, setAnnoType] = useState('area');

    useEffect(() => {
        setAnnoType(editItem !== null ? editItem.type : "area");
        setInputs(editItem !== null ? {
            AreaName: editItem.AreaName,
            AreaDesc: editItem.AreaDesc,
            Title: editItem.Title,
            TitleContent: editItem.TitleContent,
            WordCount: editItem.WordCount,
            IsAnchor: editItem.IsAnchor,
            IsOneLine: editItem.IsOneLine,
            IsEng: editItem.IsEng,
        } : {
            AreaName: "",
            AreaDesc: "",
            Title: "",
            TitleContent: "",
            WordCount: 0,
            IsAnchor: false,
            IsOneLine: false,
            IsEng: false,
        })
    }, [editItem]);

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
        const id = uuidv1();
        // alert(JSON.stringify(editItem))
        // return;
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
        }
        submitData.type = annoType;
        submitData.AreaID = "manualID";
        submitData.IsOneLine = submitData.IsOneLine;
        submitData.IsEng = submitData.IsEng;

        if (editItem !== null) {
            alert(`here is EDIT pattern ::: edititem:${JSON.stringify(editItem)} & submit data:${JSON.stringify(submitData)} `)
            const editedItem = {...editItem, ...submitData};
            setDispatch({ type: 'add_edit_annotation', annotation: editedItem, activePageId: activePageId })
        } else {
            submitData.id = id;
            alert(`here is CREATENEW pattern ::: newAnnotation:${JSON.stringify(newAnnotation[0])} & submit data:${JSON.stringify(submitData)} `)
            newAnnotation[0] = { ...newAnnotation[0], ...submitData };
            setDispatch({ type: 'add_new_annotation', newAnnotation: newAnnotation[0], activePageId: activePageId })
        }
        setNewAnnotation([]);
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
                        <Form.Select defaultValue={annoType} disabled={editItem!==null}>
                            <option value="area">area</option>
                            <option value="title">title</option>
                        </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="AreaName"
                        label="區域名稱*"
                        className="mb-3"
                        onChange={handleTextChange}>
                        <Form.Control type="text" placeholder="type areaName" defaultValue={editItem !== null ? editItem.AreaName : ""} />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="AreaDesc"
                        label="區域說明*"
                        className="mb-3"
                        onChange={handleTextChange}>
                        <Form.Control type="text" placeholder="type areaDesc" defaultValue={editItem !== null ? editItem.AreaDesc : ""} />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="Title"
                        label="標籤名稱*"
                        className="mb-3"
                        onChange={handleTextChange}>
                        <Form.Control type="text" placeholder="type title" defaultValue={editItem !== null ? editItem.Title : ""} />
                    </FloatingLabel>
                    {annoType === "title" &&
                        < FloatingLabel
                            controlId="TitleContent"
                            label="標籤內容*"
                            className="mb-3"
                            onChange={handleTextChange}>
                            <Form.Control type="text" placeholder="type titleContent" defaultValue={editItem !== null ? editItem.TitleContent : ""} />
                        </FloatingLabel>
                    }
                    <FloatingLabel
                        controlId="WordCount"
                        label="字數"
                        className="mb-3"
                        onChange={handleTextChange}>
                        <Form.Control type="number" placeholder="type wordCount" defaultValue={editItem !== null ? editItem.WordCount : ""} />
                    </FloatingLabel>
                    {annoType === "title" &&
                        <Form.Group className="mb-3">
                            <Form.Check
                                id="IsAnchor"
                                label="是否為錨點(anchor)(勾選此項會將此設為本頁唯一錨點)"
                                onChange={handleTextChange}
                                defaultChecked={editItem !== null ? editItem.IsAnchor : ""}
                            />
                        </Form.Group>
                    }
                    <Form.Group className="mb-3">
                        <Form.Check
                            id="IsOneLine"
                            label="是否為單行"
                            onChange={handleTextChange}
                            defaultChecked={editItem !== null ? editItem.IsOneLine : ""}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check
                            id="IsEng"
                            label="是否為英數字"
                            onChange={handleTextChange}
                            defaultChecked={editItem !== null ? editItem.IsEng : ""}
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