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
    const [annoType, setAnnoType] = useState('area');

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
    }, [editItem]);

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
        setAnnoType("area")
    };

    const handleSelectType = (e) => {
        setAnnoType(e.target.value);
    }

    const handleCheck = (e) => {
        e.preventDefault()
        submitData = inputs;
        const id = uuidv1();
        if (submitData.AreaName === '') {
            alert(`?????????????????????`);
            return;
        }
        if (submitData.AreaDesc === '') {
            alert(`?????????????????????`);
            return;
        }
        if (submitData.Title === '') {
            alert(`?????????????????????`);
            return;
        }
        if (annoType === "title") {
            if (submitData.TitleContent === '') {
                alert(`?????????????????????`);
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
            submitData.PageNum = activePageId+1;
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
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{editItem !== null && editItem !== undefined ? "??????????????????" : "????????????"}</Offcanvas.Title>
            </Offcanvas.Header>
            <Form onSubmit={handleCheck}>
                <Offcanvas.Body className="border-top">
                    <FloatingLabel
                        controlId="type"
                        label="??????????????????"
                        className="mb-3"
                        onChange={handleSelectType}>
                        <Form.Select defaultValue={annoType} disabled={editItem !== null && editItem !== undefined}>
                            <option value="area">????????????</option>
                            <option value="title">????????????</option>
                        </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="AreaName"
                        label="????????????*"
                        className="mb-3"
                        onChange={handleTextChange}>
                        <Form.Control type="text" placeholder="type areaName" defaultValue={editItem !== null && editItem !== undefined ? editItem.AreaName : ""} />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="AreaDesc"
                        label="????????????*"
                        className="mb-3"
                        onChange={handleTextChange}>
                        <Form.Control type="text" placeholder="type areaDesc" defaultValue={editItem !== null && editItem !== undefined ? editItem.AreaDesc : ""} />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="Title"
                        label="????????????*"
                        className="mb-3"
                        onChange={handleTextChange}>
                        <Form.Control type="text" placeholder="type title" defaultValue={editItem !== null && editItem !== undefined ? editItem.Title : ""} />
                    </FloatingLabel>
                    {annoType === "title" &&
                        < FloatingLabel
                            controlId="TitleContent"
                            label="????????????*"
                            className="mb-3"
                            onChange={handleTextChange}>
                            <Form.Control type="text" placeholder="type titleContent" defaultValue={editItem !== null && editItem !== undefined ? editItem.TitleContent : ""} />
                        </FloatingLabel>
                    }
                    <FloatingLabel
                        controlId="WordCount"
                        label="??????"
                        className="mb-3"
                        onChange={handleTextChange}>
                        <Form.Control type="number" placeholder="type wordCount" defaultValue={editItem !== null && editItem !== undefined ? editItem.WordCount : ""} />
                    </FloatingLabel>
                    {annoType === "title" &&
                        <Form.Group className="mb-3">
                            <Form.Check
                                id="IsAnchor"
                                label="???????????????(anchor)(?????????????????????????????????????????????)"
                                onChange={handleTextChange}
                                defaultChecked={editItem !== null && editItem !== undefined ? editItem.IsAnchor : ""}
                            />
                        </Form.Group>
                    }
                    <Form.Group className="mb-3">
                        <Form.Check
                            id="IsOneLine"
                            label="???????????????"
                            onChange={handleTextChange}
                            defaultChecked={editItem !== null && editItem !== undefined ? editItem.IsOneLine : ""}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check
                            id="IsEng"
                            label="??????????????????"
                            onChange={handleTextChange}
                            defaultChecked={editItem !== null && editItem !== undefined ? editItem.IsEng : ""}
                        />
                    </Form.Group>
                </Offcanvas.Body>
                <div className='d-flex justify-content-end'>
                    <Button variant="dark" className='mx-4 px-5' type="submit">
                        ??????
                    </Button>
                </div>
            </Form>
        </Offcanvas >
    );
}

export default AnnoInfoModal;