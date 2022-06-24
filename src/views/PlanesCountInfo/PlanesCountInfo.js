import Illustration from 'components/Illustration/Illustration';
import { Title } from 'components/Title';
import React, { useEffect, useState } from 'react';
import { Wrapper } from './PlanesCountInfo.styles';
import { motion } from 'framer-motion';
import { db } from '../../firebase';
import { doc, collection, query, where, onSnapshot } from 'firebase/firestore';
import { useCtx } from 'context/Context';

const PlanesCountInfo = () => {
    const [planesCount, setPlanesCount] = useState();
    const { setStep } = useCtx();

    const planesRef = collection(db, 'planes');
    useEffect(() => {
        const q = query(planesRef);
        const unsub = onSnapshot(q, (querySnapshot) => {
            setPlanesCount(querySnapshot.size);
        });
        setTimeout(() => {
            setStep('HOME');
        }, 3000);
    });

    return (
        <>
            <Wrapper as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Title center>Your plane is now flying around the world with {planesCount} others</Title>
            </Wrapper>
            <Illustration />
        </>
    );
};

export default PlanesCountInfo;
