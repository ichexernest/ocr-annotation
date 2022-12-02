import styled from "styled-components";

export const Wrapper = styled.div`
background-color: var(--bgMaskColor);
overflow:hidden;
display:flex;
flex-direction:column;
height:100%;
flex: 4;
`;

export const Canvas = styled.canvas`
background-color: var(--bgMaskColor);
border: 5px;
width: 100%;
height: 100%;
border-color: var(--lightGrey);
`;      