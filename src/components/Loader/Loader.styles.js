import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
    0%{transform: rotate(0deg)};
    0%{transform: rotate(-360deg)};
`;

export const Wrapper = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Img = styled.img`
    animation: ${rotate} 0.8s linear infinite;
`;
