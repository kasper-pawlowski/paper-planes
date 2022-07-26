import React, { useEffect, useState } from 'react';
import Illustration from 'components/Illustration';
import { Title } from 'components/Title';
import { Wrapper } from './PlanesCountInfo.styles';
import { motion } from 'framer-motion';
import { useCtx } from 'context/Context';
import Loader from 'components/Loader/Loader';

const PlanesCountInfo = () => {
    const { setStep, planesCount, planesCountInfoVariant } = useCtx();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
        setTimeout(() => {
            setStep('HOME');
        }, 3000);
    }, [setStep]);

    return loading ? (
        <Loader />
    ) : (
        <>
            <Wrapper as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Title center>
                    {planesCountInfoVariant === 'NEW'
                        ? `Your plane is now flying around the world ${
                              planesCount - 1 > 1 ? `with ${planesCount - 1} others` : planesCount - 1 === 1 ? `with ${planesCount - 1} other` : ''
                          }`
                        : planesCountInfoVariant === 'FETCHED'
                        ? `The plane is back flying around the world ${
                              planesCount - 1 > 1 ? `with ${planesCount - 1} others` : planesCount - 1 === 1 ? `with ${planesCount - 1} other` : ''
                          }`
                        : null}
                </Title>
            </Wrapper>
            <Illustration variant="bottom" />
        </>
    );
};

export default PlanesCountInfo;
