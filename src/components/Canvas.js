import React, { useEffect, useRef, useState } from 'react';
import IMG from 'assets/images/icon.jpg';
import styled from 'styled-components';
import { useCtx } from 'context/Context';

const StyledCanvas = styled.canvas`
    width: 100%;
    height: 100%;
`;

const Canvas = () => {
    const { step, canvasRef } = useCtx();
    const contextRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const ctx = canvas.getContext('2d');
        contextRef.current = ctx;

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    let base_image = '';

    function placeStample({ nativeEvent }) {
        const ctx = contextRef.current;
        const canvas = canvasRef.current;
        const { offsetX, offsetY } = nativeEvent;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        base_image = new Image();
        base_image.src = IMG;

        base_image.onload = function () {
            ctx.drawImage(base_image, offsetX - 50, offsetY - 50, 100, 100);
        };
    }

    return <StyledCanvas ref={canvasRef} onClick={placeStample} />;
};

export default Canvas;
