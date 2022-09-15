import React, { useState } from 'react';

import { Stage, Layer } from 'react-konva';
import { v1 as uuidv1 } from "uuid";
import classNames from 'classnames';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import ImageFromUrl from "../ImageFormUrl";
import Annotation from "../Annotation";

import { Wrapper, AnnotationItem, SidebarWrapper } from './MainCanvas.styles';

const MainCanvas = ({ annotations, setAnnotations, currentImg }) => {
    const [selectedId, selectAnnotation] = useState(null);
    const [canvasMeasures, setCanvasMeasures] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const [show, setShow] = useState(false);
    const [text, setText] = useState('');
    const [newAnnotation, setNewAnnotation] = useState([]);
    const [validated, setValidated] = useState(false);
    const [inputs, setInputs] = useState({
        areaName: '',
        areaDesc: '',
        title: '',
        titleContent: '',
        wordCount: '',
        isOneLine: '',
        isEng: '',
    });
    const handleMouseDown = event => {
        if (selectedId === null && newAnnotation.length === 0) {
            const { x, y } = event.target.getStage().getPointerPosition();
            const id = uuidv1();
            setNewAnnotation([{ x, y, width: 0, height: 0, id }]);
        }
    };

    const handleMouseMove = event => {
        if (selectedId === null && newAnnotation.length === 1) {
            const sx = newAnnotation[0].x;
            const sy = newAnnotation[0].y;
            const { x, y } = event.target.getStage().getPointerPosition();
            Math.max(x, canvasMeasures.width);
            Math.max(y, canvasMeasures.height);
            const width = x - sx;
            const height = y - sy;
            const ux = x < sx ? sx + width : sx;
            const uy = y < sy ? sy + height : sy;
            const lx = ux + Math.abs(width);
            const ly = uy + Math.abs(height);
            const id = uuidv1();
            const name = '';
            setNewAnnotation([
                {
                    x: sx,
                    y: sy,
                    width: Math.abs(width),
                    height: Math.abs(height),
                    //計算
                    ux: ux,
                    uy: uy,
                    lx: lx,
                    ly: ly,
                    id,
                    name
                }
            ]);
        }
    };
    const handleShow = () => setShow(true);

    const handleMouseUp = () => {
        if (selectedId === null && newAnnotation.length === 1) {
            // alert(JSON.stringify(newAnnotation));
            handleShow();
        } else {
            //改變已存在之標註
            //            alert(`exsssssiiiiiiiit` +JSON.stringify(annotations));
        }
    };

    const handleMouseEnter = event => {
        event.target.getStage().container().style.cursor = "crosshair";
    };

    const handleKeyDown = event => {
        if (event.keyCode === 8 || event.keyCode === 46) {
            if (selectedId !== null) {
                const newAnnotations = annotations.filter(
                    annotation => annotation.id !== selectedId
                );
                setAnnotations(newAnnotations);
            }
        }
    };

    // const handleTextChange = (event) => {
    //     const value = event.target.value;
    //     setText(value);
    // };

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
        setText('');
    };
    // const handleCheck = (event) => {
    //     const form = event.currentTarget;
    //     if (form.checkValidity() === false) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //     } else {
    //         newAnnotation[0].name = text;
    //         //alert(JSON.stringify(newAnnotation));
    //         annotations.push(...newAnnotation);
    //         setAnnotations(annotations);
    //         setNewAnnotation([]);
    //         //alert(JSON.stringify(annotations));
    //         setShow(false);
    //         setText('');
    //     }
    //     setValidated(true);
    // };

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
        newAnnotation[0].areaName = submitData.areaName;
        newAnnotation[0].areaDesc = submitData.areaDesc;
        newAnnotation[0].title = submitData.title;
        newAnnotation[0].titleContent = submitData.titleContent;
        newAnnotation[0].wordCount = submitData.wordCount;
        newAnnotation[0].isOneLine = submitData.isOneLine == "on" ? "Y" : "N";
        newAnnotation[0].isEng = submitData.isEng == "on" ? "Y" : "N";
        alert(JSON.stringify(newAnnotation));
        annotations.push(...newAnnotation);
        setAnnotations(annotations);
        setNewAnnotation([]);
        //alert(JSON.stringify(annotations));
        setShow(false);
        setText('');
    }

    const annotationsToDraw = [...annotations, ...newAnnotation];
    return (
        <>
            <Wrapper fluid>
                <Row>
                    <Col sm={2} className="side">
                        <Sidebar currentImg={currentImg} />
                    </Col>
                    <Col sm={7} className="main">
                        <div tabIndex={1} onKeyDown={handleKeyDown}>
                            <Stage
                                width={canvasMeasures.width}
                                height={canvasMeasures.height}
                                onMouseEnter={handleMouseEnter}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                            >
                                <Layer>
                                    <ImageFromUrl
                                        setCanvasMeasures={setCanvasMeasures}
                                        imageUrl={currentImg}
                                        onMouseDown={() => {
                                            // deselect when clicked on empty area
                                            selectAnnotation(null);
                                        }}
                                    />
                                    {annotationsToDraw.map((annotation, i) => {
                                        return (
                                            <Annotation
                                                key={i}
                                                shapeProps={annotation}
                                                isSelected={annotation.id === selectedId}
                                                onSelect={() => {
                                                    selectAnnotation(annotation.id);
                                                }}
                                                onChange={newAttrs => {
                                                    const rects = annotations.slice();
                                                    rects[i] = newAttrs;
                                                    setAnnotations(rects);
                                                }}
                                            />
                                        );
                                    })}
                                </Layer>
                            </Stage>
                        </div></Col>
                    <Col sm={3} className="side">
                        <ul>
                            {annotations.map((annotation, i) => {
                                let itemClasses = classNames({
                                    'active': (annotation.id === selectedId) ? true : false,
                                });
                                return (
                                    <AnnotationItem key={i} className={itemClasses}>
                                        <span>id={annotation.id}</span><br />
                                        <span>區域名稱: {annotation.areaName}</span><br />
                                        <span>區域說明: {annotation.areaDesc}</span><br />
                                        <span>標籤名稱: {annotation.title}</span><br />
                                        <span>標籤內容: {annotation.titleContent}</span><br />
                                        <span>ux: {annotation.ux}</span><br />
                                        <span>uy: {annotation.uy}</span><br />
                                        <span>lx: {annotation.lx}</span><br />
                                        <span>ly: {annotation.ly}</span><br />
                                        <span>是否為單行: {annotation.isOneLine}</span><br />
                                        <span>是否為英數字: {annotation.isEng}</span><br />
                                        <span>字數: {annotation.wordCount}</span><br />
                                    </AnnotationItem>
                                );
                            })}
                        </ul>
                    </Col>
                </Row>
            </Wrapper>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>新增標註</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleCheck}>
                    <Modal.Body>
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
        </>

    )
}

const Sidebar = ({ currentImg }) => {
    // const { rotateList } = useAPI();

    // const handleSelectTarget = (i) => {
    //     setActivePageId(i);
    // }
    //console.log(`getRotateList: ` + rotateList)
    return (
        <SidebarWrapper>
            <li>
                <img src={currentImg} /> 頁數: 1
            </li>
        </SidebarWrapper>
    );
}

export default MainCanvas;