import React from 'react';
import { Title } from 'components/Title';
import { useCtx } from 'context/Context';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, CanvasWrapper, Info, Wrapper } from './Plane.styles';
import Canvas from 'components/Canvas';

const Plane = () => {
    const { setStep } = useCtx();

    return (
        <AnimatePresence>
            <Wrapper as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Title center>
                    Send your first <br /> paper plane
                </Title>
                <Info>Click to place stamp</Info>

                <CanvasWrapper>
                    <Canvas />
                </CanvasWrapper>
                <Button>Send your plane</Button>
            </Wrapper>
        </AnimatePresence>
    );
};

export default Plane;
