import React, { useState } from 'react';
import styled from "styled-components";
import ThemeProvider from 'react-bootstrap/ThemeProvider';
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


const Wrapper = styled(Container)`
background-color: #aaaaaa;
`;

const initialAnnotations = [
    {
        x: 10,
        y: 10,
        width: 100,
        height: 100,
        ulx:10,
        uly:10,
        brx:110,
        bry:110,
        name:"title",
        id: uuidv1()
    },
    {
        x: 150,
        y: 150,
        width: 100,
        height: 100,
        ulx:150,
        uly:150,
        brx:250,
        bry:250,
        name:"subject",
        id: uuidv1()
    }
];


const MainCanvas = () => {

    const [annotations, setAnnotations] = useState(initialAnnotations);
    const [newAnnotation, setNewAnnotation] = useState([]);
    const [text, setText] = useState('');
    const [selectedId, selectAnnotation] = useState(null);
    const [canvasMeasures, setCanvasMeasures] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setNewAnnotation([]);
        alert(JSON.stringify(newAnnotation));
        setShow(false);
        setText('');
    };
    const handleCheck = () => {
        newAnnotation[0].name = text;
        alert(JSON.stringify(newAnnotation));
        annotations.push(...newAnnotation);
        setAnnotations(annotations);
        setNewAnnotation([]);
        alert(JSON.stringify(annotations));
        setShow(false);
        setText('');
    };
    const handleShow = () => setShow(true);


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
            const name = '';
            setNewAnnotation([
                {
                    x: sx,
                    y: sy,
                    width: x - sx,
                    height: y - sy,
                    //計算
                    ulx:sx,
                    uly:sy,
                    brx:x,
                    bry:y,
                    id,
                    name
                }
            ]);
        }
    };

    const handleMouseUp = () => {
        if (selectedId === null && newAnnotation.length === 1) {
            handleShow();
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
                        <Nav.Link >Undo</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Wrapper>
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
                                imageUrl="https://0.academia-photos.com/attachment_thumbnails/69872342/mini_magick20210918-2483-14kvsq6.png?1632019048"
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
                </div>
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
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </ThemeProvider>
    )
}

export default MainCanvas;