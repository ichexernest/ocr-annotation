import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import { v1 as uuidv1 } from "uuid";

import { useAPI } from "../AnnotationContext";

const AnnoInfoModal = ({ show, setShow, newAnnotation, setNewAnnotation, activePageId, editItem }) => {
    const { setDispatch } = useAPI();
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
    const [annoType, setAnnoType] = useState(editItem !== null && editItem !== undefined ? editItem.type : "area");


    useEffect(() => {
        setAnnoType(editItem !== null && editItem !== undefined ? editItem.type : "area");
        setInputs(editItem !== null && editItem !== undefined ? {
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
    }, [editItem,show]);

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
    };

    const handleSelectType = (e) => {
        setAnnoType(e.target.value);
    }

    const handleCheck = (e) => {
        e.preventDefault()
        submitData = inputs;
        const id = uuidv1();
        if (submitData.AreaName === '') {
            alert(`未填寫區域名稱`);
            return;
        }
        // if (submitData.AreaDesc === '') {
        //     alert(`未填寫區域說明`);
        //     return;
        // }
        if (submitData.Title === '') {
            alert(`未填寫標籤欄位`);
            return;
        }
        if (annoType === "title" && submitData.IsAnchor) {
            if (submitData.TitleContent === '') {
                alert(`未填寫標籤內容`);
                return;
            }
        }
        submitData.type = annoType;
        //submitData.AreaID = "manualID";

        if (editItem !== null && editItem !== undefined) {
            const editedItem = { ...editItem, ...submitData };
            setDispatch({ type: 'add_edit_annotation', annotation: editedItem, activePageId: activePageId })
        } else {
            submitData.TempID = id;
            submitData.PageNum = activePageId + 1;
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
    }

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{editItem !== null && editItem !== undefined ? "編輯標註內容" : "新增標註"}</Offcanvas.Title>
            </Offcanvas.Header>
            <Form onSubmit={handleCheck}>
                <Offcanvas.Body className="border-top">
                    <FloatingLabel
                        controlId="type"
                        label="選擇標註類型"
                        className="mb-3"
                        onChange={handleSelectType}>
                        <Form.Select defaultValue={annoType} disabled={editItem !== null && editItem !== undefined}>
                            <option value="area">資料區域</option>
                            <option value="title">特徵區域</option>
                        </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="AreaName"
                        label="區域名稱*"
                        className="mb-3"
                        onChange={handleTextChange}>
                        <Form.Control type="text" placeholder="type areaName" defaultValue={editItem !== null && editItem !== undefined ? editItem.AreaName : ""} />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="AreaDesc"
                        label="區域說明"
                        className="mb-3"
                        onChange={handleTextChange}>
                        <Form.Control type="text" placeholder="type areaDesc" defaultValue={editItem !== null && editItem !== undefined ? editItem.AreaDesc : ""} />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="Title"
                        label="標籤名稱*"
                        className="mb-3"
                        onChange={handleTextChange}>
                        <Form.Control type="text" placeholder="type title" defaultValue={editItem !== null && editItem !== undefined ? editItem.Title : ""} />
                    </FloatingLabel>
                    < FloatingLabel
                        controlId="TitleContent"
                        label="標籤內容(設定為Anchor時必填)"
                        className="mb-3"
                        onChange={handleTextChange}>
                        <Form.Control type="text" placeholder="type titleContent" defaultValue={editItem !== null && editItem !== undefined ? editItem.TitleContent : ""} />
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="WordCount"
                        label="字數"
                        className="mb-3"
                        onChange={handleTextChange}>
                        <Form.Control type="number" placeholder="type wordCount" defaultValue={editItem !== null && editItem !== undefined ? editItem.WordCount : ""} />
                    </FloatingLabel>
                    {annoType === "title" &&
                        <Form.Group className="mb-3">
                            <Form.Check
                                id="IsAnchor"
                                label="是否為錨點(anchor)(勾選此項會將此設為本頁唯一錨點)"
                                onChange={handleTextChange}
                                defaultChecked={editItem !== null && editItem !== undefined ? editItem.IsAnchor : ""}
                            />
                        </Form.Group>
                    }
                    <Form.Group className="mb-3">
                        <Form.Check
                            id="IsOneLine"
                            label="是否為單行"
                            onChange={handleTextChange}
                            defaultChecked={editItem !== null && editItem !== undefined ? editItem.IsOneLine : ""}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check
                            id="IsEng"
                            label="是否為英數字"
                            onChange={handleTextChange}
                            defaultChecked={editItem !== null && editItem !== undefined ? editItem.IsEng : ""}
                        />
                    </Form.Group>
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

export default AnnoInfoModal;