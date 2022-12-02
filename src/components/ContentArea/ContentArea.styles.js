import styled from "styled-components";

export const Wrapper = styled.div`
position: relative;
display: flex;
flex-direction: column;
height: 100vh;
flex: 5;
`;
export const Grid = styled.div`
width: 100%;
max-height: 50%;
min-height: 50%;
display: flex;
flex-direction: row;
flex: 1;
justify-content: stretch;
`;
export const ContentList = styled.div`
position: relative;
overflow-y: auto;
width:350px;
`;
export const DetailInfo = styled.div`
position: relative;
display: flex;
flex-direction: column;
justify-content:space-between;
background: var(--bgColor);
flex: 1;
`;
export const InfoContent = styled.div`
display: flex;
padding:10px;
flex-direction: column;
max-height:300px;
overflow-y: auto;
background: var(--bgColor);
`;
export const CheckContent = styled.div`
display: flex;
padding:5px 10px;
flex-direction: column;
`;