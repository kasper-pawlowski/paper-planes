import styled, { keyframes } from 'styled-components';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const rotate = keyframes`
    0%{transform: rotate(0deg)};
    0%{transform: rotate(-360deg)};
`;

export const Wrapper = styled.div`
    width: 100%;
    width: 100%;
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

export const Info = styled.p`
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSizes.m};
    text-align: center;
    padding-bottom: 10px;
`;

export const CanvasWrapper = styled.div`
    width: 350px;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

export const Button = styled.button`
    border-radius: 20px;
    border: none;
    padding: 20px;
    font-size: ${({ theme }) => theme.fontSizes.m};
    width: 180px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
`;

export const LoadingIcon = styled(AiOutlineLoading3Quarters)`
    animation: ${rotate} 0.8s linear infinite;
    font-size: 15px;
`;
