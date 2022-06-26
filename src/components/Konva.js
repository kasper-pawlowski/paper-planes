import React, { useState, useRef } from 'react';
import { Stage, Layer, Rect, Image } from 'react-konva';
import useImage from 'use-image';

const LionImage = ({ img }) => {
    const [image] = useImage(img);
    return <Image image={image} />;
};

const Konva = ({ w, h, prevImg }) => {
    const [position, setPosition] = useState();
    const [dirty, IsDirty] = useState(false);
    const [loading, isLoading] = useState(true);
    const ref = useRef();

    const handleClick = (e) => {
        const pos = {
            x: ref.current.pointerPos.x - 50,
            y: ref.current.pointerPos.y - 50,
        };
        setPosition(pos);
    };

    let colors = ['red', 'green', 'blue', 'orange', 'yellow'];

    return prevImg ? (
        <Stage
            width={w}
            height={h}
            ref={ref}
            onTap={() => {
                handleClick();
                IsDirty(true);
            }}>
            <Layer>
                <LionImage img={prevImg} />
                {dirty && (
                    <Rect
                        x={position.x}
                        y={position.y}
                        width={100}
                        height={100}
                        fill={colors[Math.floor(Math.random() * colors.length)]}
                        onTap={handleClick}
                    />
                )}
            </Layer>
        </Stage>
    ) : (
        <p>loading</p>
    );
};

export default Konva;
