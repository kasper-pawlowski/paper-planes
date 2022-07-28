import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  *, *::after, *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Rubik', sans-serif;
    color: ${({ theme }) => theme.colors.primary};
    height: 100%;
    background: linear-gradient(180deg, #71C3FF 0%, #E1F3FF 100%);
  }
  
  a, button, input, textarea {
    color: inherit;
    text-decoration: none;
    font-family: 'Rubik', sans-serif;
  }

  button {
    cursor: pointer;
  }
`;
