import styled, { keyframes } from 'styled-components';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { TbArrowBackUp } from 'react-icons/tb';
import { Link } from 'react-router-dom';

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

export const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 20px;
`;

export const BackLink = styled(Link)`
    height: 60px;
    width: 60px;
    border-radius: 20px;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({ theme }) => theme.fontSizes.l};
    background-color: transparent;
`;

export const BackIcon = styled(TbArrowBackUp)``;

export const Button = styled.button`
    border-radius: 20px;
    border: none;
    font-size: ${({ theme }) => theme.fontSizes.m};
    flex: 1;
    height: 60px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
`;

export const LoadingIcon = styled(AiOutlineLoading3Quarters)`
    animation: ${rotate} 0.8s linear infinite;
    font-size: 15px;
`;
