import React, { useState } from 'react';

import ThemeProvider from 'react-bootstrap/ThemeProvider';
import styled from "styled-components";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MainCanvas from "../components/MainCanvas";

const Wrapper = styled(Container)`
background-color:#FFF;
.main{
    background-color: #ccc; 
    height:93vh;
    max-height:93vh;
    overflow:auto;
}
.side{
    background-color: #FFF; 
    height:93vh;
    max-height:93vh;
    overflow:auto;
    border:1px solid #ccc;
}
`;
const PageItem = styled.div`
border: 1px solid #aaa;
border-radius: 10px;
padding:10px;
margin:10px;
display: flex;
flex-direction: column;
align-items:center;
justify-content:center;
img {
    width: 100px;
    object-fit: contain;
    }
`;

const AnnotationPage = () => {
    const [annotations, setAnnotations] = useState([]);
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
            <Wrapper fluid>
                <Row>
                    <Col sm={2} className="side">
                        <Sidebar currentImg={currentImg} />
                    </Col>
                    <Col sm={10} className="main">
                        <MainCanvas
                            annotations={annotations}
                            setAnnotations={setAnnotations}
                            currentImg={currentImg} />
                    </Col>
                </Row>
            </Wrapper>
        </ThemeProvider>
    )

}

const Sidebar = ({ currentImg }) => {
    return (
        <ul>
            <PageItem>
                <img src={currentImg} /> 頁數: 1
            </PageItem>
            <PageItem>
                <img src={currentImg} /> 頁數: 1
            </PageItem>
            <PageItem>
                <img src={currentImg} /> 頁數: 1
            </PageItem>
            <PageItem>
                <img src={currentImg} /> 頁數: 1
            </PageItem>
        </ul>
    );
}
export default AnnotationPage;