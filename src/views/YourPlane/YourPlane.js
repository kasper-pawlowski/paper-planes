import React, { useEffect, useState } from 'react';
import { Wrapper, BackButton, Date, Img } from './YourPlane.styles';
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import Loader from 'components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TbArrowBackUp } from 'react-icons/tb';
import { Title } from 'components/Title';

const YourPlane = () => {
    const [loading, setLoading] = useState(true);
    const [plane, setPlane] = useState();
    let { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        getDoc(doc(db, 'planes', id))
            .then((doc) => {
                if (doc.exists) {
                    setPlane(doc.data());
                    setLoading(false);
                } else {
                    console.log('No such document!');
                }
            })
            .catch((error) => {
                console.log('Error getting document:', error);
            });
    }, [id]);

    return loading ? (
        <Loader />
    ) : (
        <Wrapper>
            <Title>#{plane?.number}</Title>
            <Date>{plane?.creationDate}</Date>
            <p>
                {plane?.fetchCount > 1
                    ? `Your plane has \n been caught ${plane?.fetchCount} times`
                    : plane?.fetchCount === 1
                    ? `Your plane has \n been caught ${plane?.fetchCount} time`
                    : `Your plane hasn't \n been caught yet`}
            </p>
            <Img src={plane?.canvas} alt="" />
            <BackButton
                onClick={() => navigate(-1)}
                as={motion.button}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}>
                <TbArrowBackUp />
            </BackButton>
        </Wrapper>
    );
};

export default YourPlane;
