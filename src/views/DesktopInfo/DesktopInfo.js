import React from 'react';
import { Info, Wrapper } from './DesktopInfo.styles';
import { motion } from 'framer-motion';
import Illustration from 'components/Illustration/Illustration';

const DesktopInfo = () => {
    return (
        <>
            <Wrapper as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Info>Join on your phone</Info>
            </Wrapper>
            <Illustration />
        </>
    );
};

export default DesktopInfo;
