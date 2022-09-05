import React, { useState } from 'react';
import styled from "styled-components";
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { } from './MainCanvas.styles';
import { Stage, Layer } from 'react-konva';
import { v1 as uuidv1 } from "uuid";
import ImageFromUrl from "./ImageFormUrl";
import Annotation from "./Annotations";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Wrapper, AnnotationItem, AnnotationItemA } from './MainCanvas.styles';

const initialAnnotations = [
    // {
    //     x: 150,
    //     y: 150,
    //     width: 100,
    //     height: 100,
    //     ulx: 150,
    //     uly: 150,
    //     brx: 250,
    //     bry: 250,
    //     name: "title",
    //     id: uuidv1()
    // }
];


const MainCanvas = () => {

    const [annotations, setAnnotations] = useState(initialAnnotations);
    const [newAnnotation, setNewAnnotation] = useState([]);
    const [text, setText] = useState('');
    const [currentImg, setCurrentImg] = useState('https://images.hindustantimes.com/tech/img/2021/12/27/960x540/housing-new-3_1640576691563_1640576720861.jpg');
    const [selectedId, selectAnnotation] = useState(null);
    const [canvasMeasures, setCanvasMeasures] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setNewAnnotation([]);
        //alert(JSON.stringify(newAnnotation));
        setShow(false);
        setText('');
    };
    const handleCheck = () => {
        newAnnotation[0].name = text;
        //alert(JSON.stringify(newAnnotation));
        annotations.push(...newAnnotation);
        setAnnotations(annotations);
        setNewAnnotation([]);
        //alert(JSON.stringify(annotations));
        setShow(false);
        setText('');
    };
    const handleShow = () => setShow(true);

    const handleImage = () => {
        let imgArr = ["https://0.academia-photos.com/attachment_thumbnails/69872342/mini_magick20210918-2483-14kvsq6.png?1632019048", 'https://images.hindustantimes.com/tech/img/2021/12/27/960x540/housing-new-3_1640576691563_1640576720861.jpg']
        setCurrentImg(currentImg === imgArr[1] ? imgArr[0] : imgArr[1]);
        setAnnotations([]);
    }

    const handleNewImage = e => {
        const file = e.target.files[0];
        let fileP = URL.createObjectURL(file)
        setCurrentImg(fileP);
        setAnnotations([]);
        console.log(fileP);
    }

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
            const id = uuidv1();
            const width = x - sx;
            const height = y - sy;
            const ulx = x < sx ? sx + width : sx;
            const uly = y < sy ? sy + height : sy;
            const name = '';
            const brx = ulx + Math.abs(width);
            const bry = uly + Math.abs(height);
            setNewAnnotation([
                {
                    x: sx,
                    y: sy,
                    width: Math.abs(width),
                    height: Math.abs(height),
                    //計算
                    ulx: ulx,
                    uly: uly,
                    brx: brx,
                    bry: bry,
                    id,
                    name
                }
            ]);
        }
    };

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

    const handleTextChange = (event) => {
        const value = event.target.value;
        setText(value);
    }

    const annotationsToDraw = [...annotations, ...newAnnotation];
    console.log(annotationsToDraw);

    return (
        <ThemeProvider
            breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
            minBreakpoint="xxs"
        >
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">OCR-Annotation</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link >Clear</Nav.Link>
                        <input name="newImage" type="file" onChange={handleNewImage} />
                    </Nav>
                </Container>
            </Navbar>
            <Wrapper>
                <Row>
                    <Col sm={8} className="main">
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
                    <Col sm={4} className="side">{annotations.map((annotation, i) => {
                        if (annotation.id === selectedId) {
                            return (
                                <AnnotationItemA key={i}>
                                    <span>key={i}</span><br />
                                    <span>id={annotation.id}</span><br />
                                    <span>name={annotation.name}</span><br />
                                    <span>ulx={annotation.ulx}</span><br />
                                    <span>uly={annotation.uly}</span><br />
                                    <span>brx={annotation.brx}</span><br />
                                    <span>bry={annotation.bry}</span><br />
                                </AnnotationItemA>
                            );
                        } else {
                            return (
                                <AnnotationItem key={i}>
                                    <span>key={i}</span><br />
                                    <span>id={annotation.id}</span><br />
                                    <span>name={annotation.name}</span><br />
                                    <span>ulx={annotation.ulx}</span><br />
                                    <span>uly={annotation.uly}</span><br />
                                    <span>brx={annotation.brx}</span><br />
                                    <span>bry={annotation.bry}</span><br />
                                </AnnotationItem>
                            );
                        }
                    })}</Col>
                </Row>
            </Wrapper>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>新增標註</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="輸入標記名稱..."
                        className="mb-3"
                        onChange={handleTextChange}
                    >
                        <Form.Control as="textarea" placeholder="Leave a comment here" />
                    </FloatingLabel></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCheck}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </ThemeProvider>
    )
}

export default MainCanvas;