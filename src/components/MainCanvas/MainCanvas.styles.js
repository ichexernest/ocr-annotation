import styled from "styled-components";
import Container from 'react-bootstrap/Container';

export const Wrapper = styled(Container)`
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
}
`;

export const AnnotationItem = styled.div`
border: 1px solid #aaa;
border-radius: 10px;
padding:10px;
margin:10px;
`;

export const SidebarWrapper = styled.div`
background: #FFF;
position: relative;
display: flex;
overflow-y: auto;
flex-direction: column;
flex: 1;
img {
    width: 100px;
    object-fit: contain;
    }
li{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
}
`;