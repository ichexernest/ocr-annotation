import React, { useState } from 'react';

import styled from "styled-components";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';



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

const CheckPage = () => {

    return (
        <>
            <Wrapper fluid>
                    <>
                        <div className='d-flex justify-content-start align-items-center bg-white border-bottom'>
                            <h3>--</h3>
                            <Button className="mx-1 btn-dark">開啟專案</Button>
                        </div>
                        <Init className='text-secondary text-center'>Welcome to OCR result page.<br />Open a spec project to check out.</Init>
                    </>
                
            </Wrapper>
        </>
    )

}

export default CheckPage;