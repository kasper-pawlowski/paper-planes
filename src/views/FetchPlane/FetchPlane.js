import React, { useEffect, useState } from 'react';
import { Title } from 'components/Title';
import { useCtx } from 'context/Context';
import { motion } from 'framer-motion';
import { Button, CanvasWrapper, Info, Wrapper } from './FetchPlane.styles';
import Canvas from 'components/Canvas';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { db } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import { collection, query, where, getDocs, QuerySnapshot } from 'firebase/firestore';

const FetchPlane = () => {
    const [plane, setPlane] = useState();
    const { planesCount } = useCtx();

    const getRandomPlane = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    useEffect(() => {
        let unsubscribed = false;

        const q = query(collection(db, 'planes'), where('number', '==', getRandomPlane(1, planesCount)));

        getDocs(q)
            .then((querySnapshot) => {
                if (unsubscribed) return;
                const newPlane = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setPlane(...newPlane);
            })
            .catch((err) => {
                if (unsubscribed) return;
                console.error('Failed to retrieve data', err);
            });
        return () => (unsubscribed = true);
    }, [planesCount]);

    return (
        <Wrapper as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Title center>Send paper plane</Title>
            <Info>Click to place stamp</Info>
            <CanvasWrapper>
                <Canvas prevImg={plane?.canvas} />
            </CanvasWrapper>
            <Button>Throw plane</Button>
        </Wrapper>
    );
};

export default FetchPlane;
