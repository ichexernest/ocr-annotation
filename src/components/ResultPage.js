import styled from "styled-components";
import React, { useState, createContext } from "react";
import classNames from 'classnames';
import ContentArea from "./ContentArea";
import { CaseContextProvider, useAPI } from "./apiContext";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import API from "./../API";



//import testImg from '../img/t1.png';

const Wrapper = styled(Container)`
background-color:#FFF;
.main{
    background-color: #ccc; 
    height:85vh;
    max-height:85vh;
    overflow:hidden;
    padding:0;
}
.side{
    background-color: #FFF; 
    height:85vh;
    max-height:85vh;
    overflow:auto;
    padding:0;
}
`;

const SidebarWrapper = styled.div`
background: var(--bgColor);
position: relative;
display: flex;
overflow-y: auto;
flex-direction: column;
flex: 1;
border-right: 1px solid var(--lightGrey);
img {
    width: 200px;
    height: 200px;
    object-fit: contain;
    }
li{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
}
`;

export const CaseContext = createContext({});
const ResultPage = () => {
    const [activePageId, setActivePageId] = useState(0); //active ocr area

    return (
        <CaseContextProvider>
            <Wrapper fluid>
                <Row>
                    <ControlBar activePageId={activePageId} />
                    <Col sm={2} className="side border-end">
                        <Sidebar activePageId={activePageId} setActivePageId={setActivePageId} />
                    </Col>
                    <Col sm={10} className="main">
                        <ContentArea activePageId={activePageId} />
                    </Col>
                </Row>
            </Wrapper>
        </CaseContextProvider>
    );
}

const Sidebar = ({ setActivePageId, activePageId }) => {
    const { pages } = useAPI();

    const handleSelectTarget = (i) => {
        setActivePageId(i);
    }

    return (
        <SidebarWrapper>
            <ul>
                {pages.PageSet &&
                    pages.PageSet.map((item, index) => {
                        let liClasses = classNames({
                            'active': (activePageId === index) ? true : false,
                        });
                        return (
                            <li key={item.PageNum} className={liClasses} onClick={() => handleSelectTarget(index)} >
                                <img src={item.ImageData} alt={item.PageNum} />
                                頁數: {item.PageNum}
                            </li>)
                    })}
            </ul>
        </SidebarWrapper>
    );
}

const ControlBar = ({ activePageId }) => {
    const { pages, setDispatch } = useAPI();
    const [saveSpinner, setSaveSpinner] = useState(false);

    const handleSave = () => {
        fetchSaveAllResults();
    };

    const fetchSaveAllResults = async () => {
        try {
            setSaveSpinner(true);
            await API.saveResults(pages)
                .then(res => API.getResultPageSet(pages.ProcID))
                .then(res => setDispatch({ type: "fetch_success", OCR_SpecSet: JSON.parse(res) }))
            setSaveSpinner(false);
            
        } catch (error) {
            console.log(error);
            setSaveSpinner(false);
            return;
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-start border-bottom">
            <h3>{`${pages.ProcID} `}</h3>
            <Button className='mx-1 btn-dark' onClick={() => handleSave()}>
                {saveSpinner ? <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                /> : "儲存"}</Button>
        </div>
    );
}

export default ResultPage;
