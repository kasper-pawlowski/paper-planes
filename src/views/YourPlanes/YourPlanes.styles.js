import styled from 'styled-components';
import { RiCloseLine, RiUserLocationFill } from 'react-icons/ri';
import { FaPaperPlane } from 'react-icons/fa';

export const Wrapper = styled.div`
    width: 100%;
    width: 100%;
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Button = styled.button`
    border-radius: 50%;
    border: none;
    width: 50px;
    height: 50px;
    background-color: ${({ theme }) => theme.colors.primary};
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const StyledRiCloseLine = styled(RiCloseLine)`
    font-size: ${({ theme }) => theme.fontSizes.xl};
    color: ${({ theme }) => theme.colors.white};
`;

export const Ul = styled.ul`
    overflow: auto;
    flex: 1;
    width: 100%;
    margin: 20px 0;
    display: flex;
    flex-direction: column;
`;

export const Li = styled.li`
    display: flex;
    border-bottom: 1px solid #f5f5f570;
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 25px 0;
`;

export const NumberAndDate = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const Number = styled.p`
    font-weight: 500;
    font-size: ${({ theme }) => theme.fontSizes.l};
`;

export const Date = styled.p`
    font-weight: 400;
    font-size: ${({ theme }) => theme.fontSizes.s};
`;

export const StyledFaPaperPlane = styled(FaPaperPlane)`
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSizes.m};
`;

export const FetchCountWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    p {
        font-size: 14px;
        font-weight: 400;
    }
`;

export const StyledRiUserLocationFill = styled(RiUserLocationFill)`
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSizes.l};
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
    width: 100%;

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
