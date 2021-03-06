import React, { useEffect, useState } from 'react';
import { Title } from 'components/Title';
import { useCtx } from 'context/Context';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BackButton,
    CreateNewPlaneButton,
    Date,
    FetchCountWrapper,
    Li,
    NoPlanes,
    Number,
    NumberAndDate,
    StyledFaPaperPlane,
    StyledRiUserLocationFill,
    Ul,
    Wrapper,
} from './YourPlanes.styles';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import Loader from 'components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { TbArrowBackUp } from 'react-icons/tb';

const YourPlanes = () => {
    const [planes, setPlanes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useCtx();
    const navigate = useNavigate();

    useEffect(() => {
        let unsubscribed = false;

        const q = query(collection(db, 'planes'), where('owner', '==', user), orderBy('timestamp', 'desc'));

        getDocs(q)
            .then((querySnapshot) => {
                if (unsubscribed) return;
                const newPlanesDataArray = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setPlanes(newPlanesDataArray);
                setLoading(false);
            })
            .catch((err) => {
                if (unsubscribed) return;
                console.error('Failed to retrieve data', err);
            });
        return () => (unsubscribed = true);
    }, [user]);

    return loading ? (
        <Loader />
    ) : (
        <AnimatePresence>
            <Wrapper
                as={motion.div}
                initial={{ opacity: 0, y: '100vh' }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: '100vh' }}
                transition={{ type: 'spring', stiffness: 100, duration: 0.15, damping: 15 }}>
                {planes.length ? (
                    <>
                        <Title center>You've made {planes.length} planes</Title>
                        <Ul>
                            {planes.map((plane) => (
                                <Li key={plane.id} to={`/your-planes/${plane.id}`}>
                                    <StyledFaPaperPlane />
                                    <NumberAndDate>
                                        <Number>#{plane.number}</Number>
                                        <Date>Created {plane.creationDate}</Date>
                                    </NumberAndDate>
                                    <FetchCountWrapper>
                                        <p>{plane.fetchCount}</p>
                                        <StyledRiUserLocationFill />
                                    </FetchCountWrapper>
                                </Li>
                            ))}
                        </Ul>
                    </>
                ) : (
                    <NoPlanes>
                        <p>You haven't made any paper planes yet</p>
                        <CreateNewPlaneButton to="/new-plane">+ Create new plane</CreateNewPlaneButton>
                    </NoPlanes>
                )}

                <BackButton
                    onClick={() => navigate(-1)}
                    as={motion.button}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, delay: 0.7 }}>
                    <TbArrowBackUp />
                </BackButton>
            </Wrapper>
        </AnimatePresence>
    );
};

export default YourPlanes;
