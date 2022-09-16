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
    border:1px solid #ccc;
}
`;

export const AnnotationItem = styled.div`
border: 1px solid #aaa;
border-radius: 10px;
padding:10px;
margin:10px;
`;

export const PageItem = styled.div`
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

export const SidebarWrapper = styled.ul`
background: #ccc;
position: relative;
display: flex;
overflow-y: auto;
border: 1px solid #aaa;
border-radius: 10px;
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