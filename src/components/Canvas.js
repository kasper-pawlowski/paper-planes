import React, { useState, useRef } from 'react';
import { Stage, Layer, Rect, Image } from 'react-konva';
import stample from 'assets/images/icon.jpg';
import useImage from 'use-image';
import { useCtx } from 'context/Context';

const Canvas = ({ width, height, PrevCanvas, variant }) => {
    const [position, setPosition] = useState();
    const [dirty, IsDirty] = useState(false);
    const [loading, isLoading] = useState(true);
    const { konvaRef } = useCtx();

    const handleClick = (e) => {
        const pos = {
            x: konvaRef.current.pointerPos.x - 50,
            y: konvaRef.current.pointerPos.y - 50,
        };
        setPosition(pos);
    };

    const PlaceStample = () => {
        const [image] = useImage(stample);
        return <Image image={image} x={position.x} y={position.y} width={100} height={100} />;
    };

    return (
        <Stage
            width={width}
            height={height}
            ref={konvaRef}
            onClick={() => {
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
                {dirty && <PlaceStample />}
            </Layer>
        </Stage>
    );
};

export default Canvas;
