import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'assets/styles/GlobalStyle';
import { theme } from 'assets/styles/theme';
import { useCtx } from 'context/Context';
import DesktopInfo from './DesktopInfo/DesktopInfo';
import { useMediaQuery } from 'react-responsive';
import { Wrapper } from './Root.styles';
import Splash from './Splash/Splash';
import NewPlane from './NewPlane/NewPlane';
import PlanesCountInfo from './PlanesCountInfo/PlanesCountInfo';
import Home from './Home/Home';
// import { QUERIES } from 'helpers/constants';
import { AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import FetchPlane from './FetchPlane/FetchPlane';
import YourPlanes from './YourPlanes/YourPlanes';
import { db } from '../firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';

const Root = () => {
    const { step, visitedBefore, setPlanesCount, user } = useCtx();

    const isTabletAndUp = useMediaQuery({
        query: '(min-width: 1224px)',
    });

    const renderSwitch = () => {
        switch (step) {
            case 'SPLASH_SCREEN':
                return <Splash />;
            case 'HOME':
                return <Home />;
            case 'NEW_PLANE':
                return <NewPlane />;
            case 'FETCH_PLANE':
                return <FetchPlane />;
            case 'PLANES_COUNT_INFO':
                return <PlanesCountInfo />;
            case 'YOUR_PLANES':
                return <YourPlanes />;
            default:
        }
    };

    useEffect(() => {
        window.localStorage.setItem('visited', '1');
        !user && window.localStorage.setItem('user', uuidv4());
    }, [user, visitedBefore]);

    useEffect(() => {
        const q = query(collection(db, 'planes'));
        const unsub = onSnapshot(q, (querySnapshot) => {
            setPlanesCount(querySnapshot.size);
        });
    }, [setPlanesCount]);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <AnimatePresence>
                <Wrapper>{isTabletAndUp ? <DesktopInfo /> : renderSwitch()}</Wrapper>
            </AnimatePresence>
        </ThemeProvider>
    );
};

export default Root;
