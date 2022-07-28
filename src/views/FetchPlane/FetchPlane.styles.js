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

export const NoPlanes = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 70px;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: 20px;
    padding: 30px;
    width: calc(100% - 60px);

    p {
        font-size: ${({ theme }) => theme.fontSizes.xl};
        text-align: center;
    }
`;

export const CreateNewPlaneButton = styled.button`
    border-radius: 20px;
    border: ${({ theme }) => `2px solid ${theme.colors.primary}`};
    padding: 17px 14px;
    font-size: ${({ theme }) => theme.fontSizes.m};
    width: fit-content;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    white-space: nowrap;
    font-weight: 300;
`;

export const LoadingIcon = styled(AiOutlineLoading3Quarters)`
    animation: ${rotate} 0.8s linear infinite;
    font-size: 15px;
`;
