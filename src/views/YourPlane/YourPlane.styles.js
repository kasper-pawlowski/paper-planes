import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    width: 100%;
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Date = styled.p`
    margin: 10px 0;
`;

export const Img = styled.img`
    margin-top: auto;
    margin-bottom: auto;
`;

export const BackButton = styled.button`
    margin-top: auto;
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
