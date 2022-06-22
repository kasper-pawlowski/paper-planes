import styled, { keyframes } from 'styled-components';

const floating = keyframes`
    0% { transform: translate(-50%,  0px); }
    50%  { transform: translate(-50%, 7px); }
    100%   { transform: translate(-50%, -0px); }   
`;

export const Button = styled.p`
    position: absolute;
    bottom: 40%;
    left: 50%;
    transform: translateX(-50%);
    color: ${({ theme }) => theme.colors.grey100};
    font-size: ${({ theme }) => theme.fontSizes.m};
    font-weight: 600;
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    animation: ${floating} 3s ease-in-out infinite;
    text-align: center;
`;
