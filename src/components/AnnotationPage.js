import React, { useState } from 'react';

import styled from "styled-components";
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faHandPaper, faMousePointer } from '@fortawesome/free-solid-svg-icons'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import SpecModal from './SpecModal';
import OpenModal from './OpenModal';
import NoticeModal from './NoticeModal';
import Loading from './Loading';
import MainCanvas from "../components/MainCanvas";
import { useAPI } from "./AnnotationContext";
import API from "./../API";


const Wrapper = styled(Container)`
background-color:#FFF;
.main{
    background-color: #ccc; 
    height:85vh;
    max-height:85vh;
    overflow:hidden;
}
.side{
    background-color: #FFF; 
    height:85vh;
    max-height:85vh;
    overflow:auto;
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
const Init = styled.div`
display:flex;
align-items:center;
justify-content:center;
height:91vh;
`;

const AnnotationPage = () => {
    const [activePageId, setActivePageId] = useState(0); //active ocr area
    const [showSpecModal, setShowSpecModal] = useState(false);
    const [showOpenModal, setShowOpenModal] = useState(false);
    const [showNoticeModal, setShowNoticeModal] = useState(false);
    const [editSpecItem, setEditSpecItem] = useState(null);
    const [annoSwitch, setAnnoSwitch] = useState(false);
    const [showFullLoading, setShowFullLoading] = useState(false);
    const [saveSpinner, setSaveSpinner] = useState(false);
    const [type, setType] = useState("");

    const { annotation, setDispatch } = useAPI();

    const handleSave = () => {
        fetchSaveAllAnnotations();
        // console.log(`HERES SAVE ANNO LIST ::::  ` + JSON.stringify(annotation))
    };
    const fetchSaveAllAnnotations = async () => {
        try {
            setSaveSpinner(true);
            await API.saveAnnotations(annotation)
                .then(res =>API.getSpecSet(annotation.SpecID))
                .then(res =>setDispatch({type: "fetch_success",OCR_SpecSet: JSON.parse(res)}))
            setSaveSpinner(false);
        } catch (error) {
            console.log(error);
            setSaveSpinner(false);
            return;
        }
    };

    const handleNextStep = (type) => {
        if (annotation.SpecID !== "") {
            setType(type);
            setShowNoticeModal(true);
        } else {
            if (type === "spec") openNew();
            else openExist();
        }
    }
    const handleSwitch = () => {
        setAnnoSwitch(!annoSwitch);
    }
    const openExist = () => {
        setShowOpenModal(true);
    }
    const openNew = () => {
        setEditSpecItem(null);
        setShowSpecModal(true)
    }
    const openEdit = () => {
        setEditSpecItem(annotation);
        setShowSpecModal(true)
    }
    return (
        <>
            <Loading show={showFullLoading} />
            <Navbar bg="dark" variant="dark" className='px-4'>
                <Navbar.Brand href="#">OCR-Annotation</Navbar.Brand>
                <Nav className="me-auto">
                    <Button onClick={() => handleNextStep("spec")} className="mx-1 btn-dark">????????????</Button>
                    <Button onClick={() => handleNextStep("open")} className="mx-1 btn-dark">????????????</Button>
                </Nav>
            </Navbar>
            <Wrapper fluid>
                {annotation.SpecID !== "" ?
                    <Row>
                        <div className='d-flex justify-content-start align-items-center bg-white border-bottom'>
                            <h3>{annotation.SpecName}-{annotation.SpecID}</h3>
                            <Button className='mx-1 btn-light' onClick={() => openEdit()}><FontAwesomeIcon className="icon" icon={faGear} /></Button>
                            <Button className='mx-1 btn-dark' onClick={() => handleSave()}>
                                {saveSpinner ? <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                /> : "??????"}</Button>
                            <Button className='mx-1 btn-dark' onClick={() => handleSwitch()} title="??????"><FontAwesomeIcon className="icon" icon={annoSwitch ? faMousePointer : faHandPaper} /></Button>
                        </div>
                        <Col sm={2} className="side border-end">
                            <Sidebar activePageId={activePageId} setActivePageId={setActivePageId} />
                        </Col>
                        <Col sm={10} className="main">
                            <MainCanvas
                                activePageId={activePageId}
                                annoSwitch={annoSwitch} />
                        </Col>
                    </Row> : <Init className='text-secondary text-center'>Welcome to OCR-annotation tool.<br />Open a spec project or create a new one.</Init>}
            </Wrapper>
            <SpecModal
                show={showSpecModal}
                setShow={setShowSpecModal}
                setActivePageId={setActivePageId}
                editSpecItem={editSpecItem}
                setShowFullLoading={setShowFullLoading}
            />
            <OpenModal
                show={showOpenModal}
                setShow={setShowOpenModal}
                setActivePageId={setActivePageId}
                setShowFullLoading={setShowFullLoading}
            />
            {annotation.SpecID !== "" &&
                <NoticeModal
                    show={showNoticeModal}
                    setShow={setShowNoticeModal}
                    content={"????????????????????????????????????????????????????????????????????????"}
                    showLoading={false}
                    nextStep={type === "spec" ? openNew : openExist}
                />}
        </>
    )

}

const Sidebar = ({ setActivePageId, activePageId }) => {
    const { annotation } = useAPI();

    const handleSelectTarget = (i) => {
        setActivePageId(i);
    }
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
                                <img src={item.FileContent} alt={item.PageNum} />
                                ??????: {item.PageNum}
                            </li>)
                    })}
            </ul>
        </SidebarWrapper>
    );
}

export default AnnotationPage;