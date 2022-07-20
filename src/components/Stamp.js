import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 120px;
    height: 120px;
    background-color: red;
`;

const Stamp = ({ location, setPosition }) => {
    const handleClick = (e) => {
        const pos = {
            x: e.nativeEvent.layerX - 59.5,
            y: e.nativeEvent.layerY - 60,
        };
        setPosition(pos);
    };

    return <Wrapper onClick={(e) => handleClick(e)}>e</Wrapper>;
};

export default Stamp;
