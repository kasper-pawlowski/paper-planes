import React, { useState, useEffect } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { useCtx } from 'context/Context';
import stampSound from 'assets/rubber-stamp.mp3';
import Stamp from 'components/Stamp';
import axios from 'axios';

const Canvas = ({ width, height, PrevCanvas, variant }) => {
    const api = 'https://api.geoapify.com/v1/ipinfo?&apiKey=cba9d4cd0da94613b2b4f45e939cde4a';
    const [position, setPosition] = useState();
    const [isClicked, setClicked] = useState(false);
    const { konvaRef } = useCtx();
    const sound = new Audio(stampSound);
    const [location, setLocation] = useState();

    useEffect(() => {
        axios.get(api).then(({ data }) => {
            const { country, state } = data;
            setLocation({
                country: country.name,
                isoCode: country.iso_code,
                state: state.name,
            });
        });
    }, [setLocation]);

    const handleClick = () => {
        const pos = {
            x: konvaRef.current.pointerPos.x,
            y: konvaRef.current.pointerPos.y,
        };
        setPosition(pos);
    };

    const PlaceStamp = () => {
        sound.play();
        return <Stamp position={position} location={location} />;
    };

    return (
        <Stage
            width={width}
            height={height}
            ref={konvaRef}
            onClick={() => {
                handleClick();
                setClicked(true);
            }}
            onTap={() => {
                handleClick();
                setClicked(true);
            }}>
            <Layer>
                {variant === 'fetch' && <PrevCanvas />}
                {variant === 'new' && <Rect width={window.innerWidth} height={window.innerHeight} fill="white" />}
                {isClicked && <PlaceStamp />}
            </Layer>
        </Stage>
    );
};

export default Canvas;
