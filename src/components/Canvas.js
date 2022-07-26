import React, { useState, useEffect } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { useCtx } from 'context/Context';
import stampSound from 'assets/rubber-stamp.mp3';
import Stamp from 'components/Stamp';
import axios from 'axios';
import Loader from './Loader/Loader';

const Canvas = ({ width, height, variant, plane }) => {
    const api = 'https://api.geoapify.com/v1/ipinfo?&apiKey=cba9d4cd0da94613b2b4f45e939cde4a';
    const [loading, setLoading] = useState(true);
    const { konvaRef, PrevCanvas } = useCtx();
    const sound = new Audio(stampSound);
    const [location, setLocation] = useState();
    const [stamp, setStamp] = useState();

    useEffect(() => {
        axios.get(api).then(({ data }) => {
            const { country, state } = data;
            setLocation({
                country: country.name,
                isoCode: country.iso_code,
                state: state.name,
            });
        });
        setLoading(false);
    }, []);

    const handleClick = () => {
        sound.play();
        setStamp(<Stamp x={konvaRef.current.pointerPos.x} y={konvaRef.current.pointerPos.y} location={location} />);
    };

    return loading ? (
        <Loader />
    ) : (
        <Stage
            width={width}
            height={height}
            ref={konvaRef}
            onClick={() => {
                handleClick();
            }}
            onTap={() => {
                handleClick();
            }}>
            <Layer>
                {variant === 'fetch' && <PrevCanvas plane={plane} />}
                {variant === 'new' && <Rect width={window.innerWidth} height={window.innerHeight} fill="white" />}
                {stamp && stamp}
            </Layer>
        </Stage>
    );
};

export default Canvas;
