import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    width: 100%;
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Info = styled.p`
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSizes.m};
    text-align: center;
    padding: 50px 0 10px;
`;

export const CanvasWrapper = styled.div`
    width: 100%;
    height: 100%;
    margin-bottom: 20px;
    position: block;
`;

export const Button = styled.button`
    border-radius: 20px;
    border: none;
    padding: 20px;
    font-size: ${({ theme }) => theme.fontSizes.m};
    width: fit-content;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
`;
