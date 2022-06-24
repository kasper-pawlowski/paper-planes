import Illustration from 'components/Illustration/Illustration';
import { Title } from 'components/Title';
import React from 'react';
import { Button, Wrapper, Img } from './Home.styles';
import { motion } from 'framer-motion';
import frame1 from 'assets/images/frame1.png';

const Home = () => {
    return (
        <>
            <Wrapper as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Title center>Shake your phone to catch plane</Title>
                <Button secondary>See your planes</Button>
                <Button>+ Create new plane</Button>
            </Wrapper>
            <Img src={frame1} alt="" />
        </>
    );
};

export default Home;
