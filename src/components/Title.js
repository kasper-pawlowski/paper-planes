import styled from 'styled-components';

export const Title = styled.h1`
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    text-align: ${({ center }) => (center ? 'center' : 'left')};
`;
