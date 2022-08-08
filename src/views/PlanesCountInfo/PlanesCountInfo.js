import React, { useEffect, useState } from 'react';
import Illustration from 'components/Illustration';
import { Title } from 'components/Title';
import { Wrapper } from './PlanesCountInfo.styles';
import { motion } from 'framer-motion';
import Loader from 'components/Loader/Loader';
import { useCtx } from 'context/Context';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';

const PlanesCountInfo = () => {
    const [loading, setLoading] = useState(true);
    const { planesCount } = useCtx();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(false);
        setTimeout(() => {
            navigate('/');
        }, 3000);
    }, [navigate, planesCount]);

    return loading ? (
        <Loader />
    ) : location.state !== null ? (
        <>
            <Wrapper as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Title center>
                    {location.state === 'new-plane'
                        ? `Your plane is now flying around the world ${
                              planesCount - 1 > 1 ? `with ${planesCount - 1} others` : planesCount - 1 === 1 ? `with ${planesCount - 1} other` : ''
                          }`
                        : location.state === 'fetch-plane'
                        ? `The plane is back flying around the world ${
                              planesCount - 1 > 1 ? `with ${planesCount - 1} others` : planesCount - 1 === 1 ? `with ${planesCount - 1} other` : ''
                          }`
                        : null}
                </Title>
            </Wrapper>
            <Illustration variant="bottom" />
        </>
    ) : (
        <Navigate to="/" replace />
    );
};

export default PlanesCountInfo;
