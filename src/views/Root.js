import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'assets/styles/GlobalStyle';
import { theme } from 'assets/styles/theme';
import { useCtx } from 'context/Context';
import { DesktopWrapper } from './DesktopWrapper/DesktopWrapper';
import { useMediaQuery } from 'react-responsive';
import { Wrapper } from './Root.styles';
import Splash from './Splash/Splash';
import NewPlane from './NewPlane/NewPlane';
import Home from './Home/Home';
import { AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import FetchPlane from './FetchPlane/FetchPlane';
import YourPlanes from './YourPlanes/YourPlanes';
import { db } from '../firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { Routes, Route } from 'react-router-dom';

const Root = () => {
    const { visitedBefore, setPlanesCount, user } = useCtx();

    const isTabletAndUp = useMediaQuery({
        query: '(min-width: 1224px)',
    });

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

    const lockScreen = async () => {
        await document.body.requestFullscreen();
        await window.screen.orientation.lock('portrait-primary');
    };

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <AnimatePresence>
                <Wrapper onClick={!isTabletAndUp ? lockScreen : undefined}>
                    {isTabletAndUp ? (
                        <DesktopWrapper>
                            <Routes>
                                <Route path="/splash" element={<Splash />} />
                                <Route path="/" element={<Home />} />
                                <Route path="/new-plane" element={<NewPlane />} />
                                <Route path="/fetch-plane" element={<FetchPlane />} />

                                <Route path="/your-planes" element={<YourPlanes />} />
                            </Routes>
                        </DesktopWrapper>
                    ) : (
                        <Routes>
                            <Route path="/splash" element={<Splash />} />
                            <Route path="/" element={<Home />} />
                            <Route path="/new-plane" element={<NewPlane />} />
                            <Route path="/fetch-plane" element={<FetchPlane />} />

                            <Route path="/your-planes" element={<YourPlanes />} />
                        </Routes>
                    )}
                </Wrapper>
            </AnimatePresence>
        </ThemeProvider>
    );
};

export default Root;
