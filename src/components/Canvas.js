import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Rect, Image, Group } from 'react-konva';
import stample from 'assets/images/icon.jpg';
import useImage from 'use-image';
import { useCtx } from 'context/Context';
import stampSound from 'assets/rubber-stamp.mp3';
import Stamp from 'components/Stamp';
import svg from 'assets/images/stamp3.svg';
import { Html } from 'react-konva-utils';
import axios from 'axios';

const Canvas = ({ width, height, PrevCanvas, variant }) => {
    const api = 'https://api.geoapify.com/v1/ipinfo?&apiKey=cba9d4cd0da94613b2b4f45e939cde4a';
    const [position, setPosition] = useState();
    const [dirty, IsDirty] = useState(false);
    const [loading, isLoading] = useState(true);
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
            x: konvaRef.current.pointerPos.x - 60,
            y: konvaRef.current.pointerPos.y - 60,
        };
        setPosition(pos);
    };

    const PlaceStamp = () => {
        return (
            <Html groupProps={{ x: position.x, y: position.y, width: 120, height: 120 }}>
                <Stamp position={position} setPosition={setPosition} />
            </Html>
        );
    };

    return (
        <Stage
            width={width}
            height={height}
            ref={konvaRef}
            onClick={(e) => {
                handleClick();
                IsDirty(true);
            }}
            onTap={() => {
                handleClick();
                IsDirty(true);
            }}>
            <Layer>
                {variant === 'fetch' && <PrevCanvas />}
                {variant === 'new' && <Rect width={window.innerWidth} height={window.innerHeight} fill="white" />}
                {dirty && <PlaceStamp />}
            </Layer>
        </Stage>
    );
};

export default Canvas;
