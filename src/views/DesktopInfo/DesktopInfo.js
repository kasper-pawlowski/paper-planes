import React from 'react';
import { Info, Wrapper } from './DesktopInfo.styles';
import { motion } from 'framer-motion';
import Illustration from 'components/Illustration';

const DesktopInfo = () => {
    return (
        <>
            <Wrapper as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Info>Join on your phone</Info>
            </Wrapper>
            <Illustration variant="bottom" />
        </>
    );
};

export default DesktopInfo;
