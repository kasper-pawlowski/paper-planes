import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'assets/styles/GlobalStyle';
import { theme } from 'assets/styles/theme';
import { useCtx } from 'context/Context';
import DesktopInfo from './DesktopInfo/DesktopInfo';
import { useMediaQuery } from 'react-responsive';
import { Wrapper } from './Root.styles';
import Splash from './Splash/Splash';
import Plane from './Plane/Plane';
// import { QUERIES } from 'helpers/constants';

const Root = () => {
    const { step } = useCtx();

    const isTabletAndUp = useMediaQuery({
        query: '(min-width: 1224px)',
    });

    const renderSwitch = () => {
        switch (step) {
            case 'SPLASH_SCREEN':
                return <Splash />;
            case 'PLANE':
                return <Plane />;
            case 'THROW_PLANE':
                return <Splash />;
            case 4:
                return <DesktopInfo a />;
            case 'THROW_PLAE':
                return <Splash />;
            default:
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Wrapper>{isTabletAndUp ? <DesktopInfo /> : renderSwitch()}</Wrapper>
        </ThemeProvider>
    );
};

export default Root;
