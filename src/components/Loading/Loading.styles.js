import styled from "styled-components";

export const LoadingBg = styled.div`
position: fixed;
top: 0; left: 0; z-index: 999;
width: 100vw; height: 100vh;
background: rgba(0, 0, 0, 0.7);
transition: opacity 0.2s;
`;
export const LoadingContent = styled.div`
position: absolute;
top:50%;
left: 50%;
transform: translate(-50%, -50%);
`;