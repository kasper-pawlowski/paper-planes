import React from 'react';
import loader from 'assets/images/load-white.png';
import { Wrapper, Img } from './Loader.styles';

const Loader = () => {
    return (
        <Wrapper>
            <Img src={loader} alt="" />
        </Wrapper>
    );
};

export default Loader;
