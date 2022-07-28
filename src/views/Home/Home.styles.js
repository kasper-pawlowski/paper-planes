import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
`;

export const Button = styled.button`
    border-radius: 20px;
    border: ${({ theme }) => `2px solid ${theme.colors.primary}`};
    padding: 17px 14px;
    font-size: ${({ theme }) => theme.fontSizes.m};
    width: fit-content;
    background-color: ${({ theme, secondary }) => (secondary ? 'transparent' : theme.colors.primary)};
    color: ${({ theme, secondary }) => (secondary ? theme.colors.primary : theme.colors.white)};
    margin-top: ${({ secondary }) => (secondary ? 'auto' : '20px')};
`;
