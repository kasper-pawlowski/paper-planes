import React from 'react';
import { Title } from 'components/Title';
import { Wrapper } from './Splash.styles';
import plane from 'assets/images/plane-2.png';
import ContinueButton from 'components/ContinueButton/ContinueButton';
import { useCtx } from 'context/Context';
import { motion } from 'framer-motion';
import Illustration from 'components/Illustration';

const Splash = () => {
    const { setStep, visitedBefore } = useCtx();

    return (
        <>
            <Wrapper
                onClick={() => {
                    visitedBefore ? setStep('HOME') : setStep('NEW_PLANE');
                }}
                as={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                <Title>
                    Throw and <br /> catch paper <br /> planes with <br /> people around <br /> the world
                </Title>
                <img src={plane} alt="" />
                <ContinueButton />
            </Wrapper>
            <Illustration variant="bottom" />
        </>
    );
};

export default Splash;
