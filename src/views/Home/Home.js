import Illustration from 'components/Illustration';
import { Title } from 'components/Title';
import React from 'react';
import { Button, Wrapper } from './Home.styles';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const setStepToNewPlane = (e) => {
        if (!e) e = window.event;
        e.stopPropagation();
        navigate('/new-plane');
    };

    const setStepToYourPlanes = (e) => {
        if (!e) e = window.event;
        e.stopPropagation();
        navigate('/your-planes');
    };

    return (
        <>
            <Wrapper onClick={() => navigate('/fetch-plane')} as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Title
                    center="true"
                    as={motion.h1}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.5, delay: 0.2 }}>
                    Touch screen to
                </Title>
                <Title
                    center="true"
                    as={motion.h1}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.5, delay: 0.4 }}>
                    catch plane
                </Title>
                <Button onClick={setStepToYourPlanes} secondary>
                    See your planes
                </Button>
                <Button onClick={setStepToNewPlane}> + Create new plane</Button>
            </Wrapper>
            <Illustration variant="center" />
        </>
    );
};

export default Home;
