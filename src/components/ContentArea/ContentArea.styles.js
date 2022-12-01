import styled from "styled-components";

export const Wrapper = styled.div`
position: relative;
display: flex;
flex-direction: column;
height: 92vh;
flex: 5;
`;
export const ControlBar = styled.div`
border-bottom: 1px solid var(--lightGrey);
`;
export const Grid = styled.div`
width: 100%;
max-height:  ${props => props.isMain ? "53%" : "40%"};
min-height:  ${props => props.isMain ? "53%" : "40%"};
display: flex;
flex-direction: row;
flex: 1;
justify-content: stretch;
border-bottom: 1px solid var(--lightGrey);
`;
export const ContentList = styled.div`
position: relative;
overflow-y: auto;
width:350px;
border-right: 1px solid var(--lightGrey);
`;
export const DetailInfo = styled.div`
position: relative;
display: flex;
flex-direction: column;
justify-content:space-between;
background: var(--bgColor);
flex: 1;
border-right: 1px solid var(--lightGrey);
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