import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ReactComponent as Illustration1 } from 'assets/images/illustration1.svg';
import { ReactComponent as Illustration2 } from 'assets/images/illustration2.svg';

const rotate = keyframes`
    0%{transform: rotate(0deg)}
    100%{transform: rotate(360deg)}
`;

export const StickBottom = styled(Illustration1)`
    position: fixed;
    bottom: 0;
    height: 200px;
    z-index: -1;

    #earth {
        animation: ${rotate} 50s infinite linear;
        transform-box: fill-box;
        transform-origin: center center;
    }
`;

export const StickCenter = styled(Illustration2)`
    position: fixed;
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Illustration = ({ variant }) => {
    return variant === 'bottom' ? <StickBottom /> : variant === 'center' ? <StickCenter /> : null;
};

export default Illustration;
