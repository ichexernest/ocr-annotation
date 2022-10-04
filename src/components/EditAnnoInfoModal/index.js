import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import { useAPI } from "../annotationContext";

const AnnoInfoModal = ({ show, setShow, newAnnotation, setNewAnnotation, annotations, setAnnotations, activePageId ,editItem}) => {
    const { setDispatch } = useAPI();
    //let editAnnoList = JSON.parse(JSON.stringify(annotations));
    //alert(JSON.stringify(editItem))

    const [inputs, setInputs] = useState({
        AreaName: '',
        AreaDesc: '',
        Title: '',
        //TitleContent: '',
        WordCount: '',
        IsOneLine: '',
        IsEng: '',
    });
    const [annoType, setAnnoType] = useState(editItem.type?editItem.type:'area');
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
            AreaName: '',
            AreaDesc: '',
            Title: '',
            TitleContent: '',
            WordCount: '',
            IsOneLine: '',
            IsEng: '',
        })
        setAnnoType("area")
    };

    const handleSelectType = (e) => {
        setAnnoType(e.target.value);
    }

    const handleCheck = (e) => {
        e.preventDefault()
        let submitData = inputs;
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
            if (submitData.IsAnchor === "on") {
                annotations.forEach(item => {
                    item.IsAnchor = 0;
                })
                submitData.IsAnchor = 1;
            } else {
                submitData.isAnchor = 0;
            }
        }
        submitData.type = annoType;
        submitData.PageNum = 1;
        //submitData.specID = "testSpec001";
        submitData.AreaID = "manualID";
        submitData.IsOneLine = submitData.IsOneLine == "on" ? 1 : 0;
        submitData.IsEng = submitData.IsEng == "on" ? 1 : 0;
        newAnnotation[0] = { ...newAnnotation[0], ...submitData };
        //alert(`COMPARE::::`+JSON.stringify(annotations)+`:::::::`+JSON.stringify(annotations));
        annotations.push(...newAnnotation);
        setAnnotations(annotations);
        //setDispatch({ type: 'add_new_annotation', newAnnotation: newAnnotation[0], activePageId:activePageId})

        setNewAnnotation([]);
        //alert(JSON.stringify(annotations));
        setShow(false);
        setInputs({
            AreaName: '',
            AreaDesc: '',
            Title: '',
            //TitleContent: '',
            WordCount: '',
            IsOneLine: '',
            IsEng: '',
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
                        onChange={handleTextChange}
                        >
                        <Form.Control type="text" placeholder="type areaName" value={editItem.AreaName} />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="AreaDesc"
                        label="區域說明*"
                        className="mb-3"
                        onChange={handleTextChange}
                        >
                        <Form.Control type="text" placeholder="type areaDesc" value={editItem.AreaDesc}/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="Title"
                        label="標籤名稱*"
                        className="mb-3"
                        onChange={handleTextChange}
                        >
                        <Form.Control type="text" placeholder="type title" value={editItem.Title}/>
                    </FloatingLabel>
                    {annoType === "title" &&
                        < FloatingLabel
                            controlId="TitleContent"
                            label="標籤內容*"
                            className="mb-3"
                            onChange={handleTextChange}
                            >
                            <Form.Control type="text" placeholder="type titleContent" value={editItem.TitleContent}/>
                        </FloatingLabel>
                    }
                    <FloatingLabel
                        controlId="WordCount"
                        label="字數"
                        className="mb-3"
                        onChange={handleTextChange}>
                        <Form.Control type="text" placeholder="type wordCount" value={editItem.WordCount} />
                    </FloatingLabel>
                    {annoType === "title" &&
                        <Form.Group className="mb-3">
                            <Form.Check
                                defaultChecked={editItem.IsAnchor==1}
                                id="IsAnchor"
                                label="是否為錨點(anchor)(勾選此項會將此設為本頁唯一錨點)"
                                onChange={handleTextChange}
                            />
                        </Form.Group>
                    }
                    <Form.Group className="mb-3">
                        <Form.Check
                            defaultChecked={editItem.IsOneLine==1}
                            id="IsOneLine"
                            label="是否為單行"
                            onChange={handleTextChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check
                            defaultChecked={editItem.IsEng==1}
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