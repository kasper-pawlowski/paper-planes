import React, { useEffect } from 'react';
import Illustration from 'components/Illustration';
import { Title } from 'components/Title';
import { Wrapper } from './PlanesCountInfo.styles';
import { motion } from 'framer-motion';
import { useCtx } from 'context/Context';

const PlanesCountInfo = () => {
    const { setStep, planesCount } = useCtx();

    useEffect(() => {
        setTimeout(() => {
            setStep('HOME');
        }, 3000);
    });

    return (
        <>
            <Wrapper as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Title center>Your plane is now flying around the world with {planesCount - 1} others</Title>
            </Wrapper>
            <Illustration variant="bottom" />
        </>
    );
};

export default PlanesCountInfo;
