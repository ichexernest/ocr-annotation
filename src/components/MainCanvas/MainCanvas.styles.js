import styled from "styled-components";
import Container from 'react-bootstrap/Container';

export const Wrapper = styled(Container)`
background-color: #aaaaaa;
border: 2px solid #000000;
.main{
    background-color: #ccc; 
    height:90vh;
    max-height:90vh;
    overflow:auto;
}
.side{
    background-color: #aaa; 
    height:90vh;
    max-height:90vh;
    overflow:auto;
}
`;

export const AnnotationItem = styled.div`
background-color: #FFF;
padding:10px;
margin:10px;
`;

export const AnnotationItemA = styled.div`
background-color: #c2daff;
padding:10px;
margin:10px;
`;