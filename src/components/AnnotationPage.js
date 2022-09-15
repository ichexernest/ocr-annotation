import React, { useState } from 'react';

import ThemeProvider from 'react-bootstrap/ThemeProvider';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import MainCanvas from "../components/MainCanvas";

const initialAnnotations = [
    // {
    //     x: 150,
    //     y: 150,
    //     width: 100,
    //     height: 100,
    //     ux: 150,
    //     uy: 150,
    //     lx: 250,
    //     ly: 250,
    //     name: "title",
    //     id: uuidv1()
    // }
];

const AnnotationPage = () => {
    const [annotations, setAnnotations] = useState(initialAnnotations);
    const [currentImg, setCurrentImg] = useState('https://images.hindustantimes.com/tech/img/2021/12/27/960x540/housing-new-3_1640576691563_1640576720861.jpg');

    const handleNewImage = e => {
        const file = e.target.files[0];
        let fileP = URL.createObjectURL(file)
        setCurrentImg(fileP);
        setAnnotations([]);
        console.log(fileP);
    }


    return (
        <ThemeProvider
            breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
            minBreakpoint="xxs"
        >
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">OCR-Annotation</Navbar.Brand>
                    <Nav className="me-auto">
                        <input name="newImage" type="file" onChange={handleNewImage} />
                    </Nav>
                </Container>
            </Navbar>
            <MainCanvas
                annotations={annotations}
                setAnnotations={setAnnotations}
                currentImg={currentImg} />
        </ThemeProvider>
    )

}

export default AnnotationPage;