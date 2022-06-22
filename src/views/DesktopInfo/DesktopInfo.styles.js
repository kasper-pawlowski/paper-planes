import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Info = styled.div`
    background: rgba(255, 255, 255, 0.58);
    border-radius: 20px;
    padding: 40px;
    font-size: ${({ theme }) => theme.fontSizes.xxl};
`;
