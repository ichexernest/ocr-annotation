import React, { useState ,useEffect} from 'react';

import styled from "styled-components";
import classNames from 'classnames';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import SpecModal from './SpecModal';
import OpenModal from './OpenModal';
import MainCanvas from "../components/MainCanvas";
import { useAPI } from "./annotationContext";


const Wrapper = styled(Container)`
background-color:#FFF;
.main{
    background-color: #ccc; 
    height:91vh;
    max-height:91vh;
    overflow:auto;
}
.side{
    background-color: #FFF; 
    height:91vh;
    max-height:91vh;
    overflow:auto;
    border:1px solid #ccc;
}
`;
const SidebarWrapper = styled.div`
position: relative;
display: flex;
overflow-y: auto;
flex-direction: column;
flex: 1;
img {
    width:100%;
    height:100%;
    object-fit: contain;
    }
li{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
}
`;
const AnnotationPage = () => {
    const [activePageId, setActivePageId] = useState(0); //active ocr area
    const [showNew, setShowNew] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const { annotation } = useAPI();
    console.log(`ANNOTATIONPAGE: `+JSON.stringify(annotation))

    useEffect(() => {
        setActivePageId(0)
    }, [annotation]);

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">OCR-Annotation</Navbar.Brand>
                    <Nav className="me-auto">
                        <Button onClick={()=>setShowNew(true)} className="mx-1 btn-light">新增專案</Button>
                        <Button onClick={()=>setShowEdit(true)} className="mx-1 btn-light">開啟專案</Button>
                    </Nav>
                </Container>
            </Navbar>
            <Wrapper fluid>
                <Row>
                    <Col sm={2} className="side">
                        <Sidebar activePageId={activePageId} setActivePageId={setActivePageId} />
                    </Col>
                    <Col sm={10} className="main">
                        <MainCanvas
                            activePageId={activePageId}
                            currentImg={annotation.PageSet[activePageId].FilePath} />
                    </Col>
                </Row>
            </Wrapper>
            <SpecModal
                show={showNew}
                setShow={setShowNew}
                setActivePageId={setActivePageId}
            />
            <OpenModal
                show={showEdit}
                setShow={setShowEdit}
                setActivePageId={setActivePageId}
            />
        </>
    )

}

const Sidebar = ({ setActivePageId, activePageId }) => {
    const { annotation } = useAPI();

    const handleSelectTarget = (i) => {
        setActivePageId(i);
    }
    console.log(`Sidebar  get annotation::: ${JSON.stringify(annotation)}`)
    return (
        <SidebarWrapper>
            <ul>
                {annotation.PageSet &&
                    annotation.PageSet.map((item, index) => {
                        let liClasses = classNames({
                            'active': (activePageId === index) ? true : false,
                        });
                        return (
                            <li key={item.PageNum} className={liClasses} onClick={() => handleSelectTarget(index)} >
                                <img src={item.FilePath} alt={item.PageNum} />
                                頁數: {item.PageNum}
                            </li>)
                    })}
            </ul>
        </SidebarWrapper>
    );
}
export default AnnotationPage;