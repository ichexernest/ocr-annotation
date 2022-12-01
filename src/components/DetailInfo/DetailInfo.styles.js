import styled from "styled-components";

export const Wrapper = styled.div`
position: relative;
display: flex;
flex-direction: column;
justify-content:space-between;
background: var(--bgColor);
flex: 1;
border-right: 1px solid var(--lightGrey);
`;
export const Info= styled.div`
display: flex;
padding:10px;
flex-direction: column;
max-height:300px;
overflow-y: auto;
background: var(--bgColor);
`;
export const ContentList = styled.div`
position: relative;
overflow-y: auto;
width:350px;
border-right: 1px solid var(--lightGrey);
`;