import React, { useEffect, useRef, useState } from 'react';
import IMG from 'assets/images/icon.jpg';
import styled from 'styled-components';
import { useCtx } from 'context/Context';

const StyledCanvas = styled.canvas`
    width: 377px;
    height: 541px;
`;

const Canvas = ({ prevImg, variant }) => {
    const { canvasRef, isLoading, loading } = useCtx();
    let prevCanvas;
    let stample;
    prevImg && console.log(prevImg);
    const contextRef = useRef(null);

    const baza = (ctx, offsetX, offsetY) => {
        return ctx.drawImage(stample, offsetX - 50, offsetY - 50, 100, 100);
    };

    const LoadPrevImg = () => {
        prevCanvas = new Image();
        prevCanvas.src = prevImg;
        prevCanvas.onload = () => {
            contextRef.current.drawImage(prevCanvas, 0, 0, canvasRef.current.width, canvasRef.current.height);
        };
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const ctx = canvas.getContext('2d');
        contextRef.current = ctx;

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        variant === 'fetch' && LoadPrevImg();
    });

    const placeStample = async ({ nativeEvent }) => {
        const ctx = contextRef.current;
        const canvas = canvasRef.current;
        const { offsetX, offsetY } = nativeEvent;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.fillStyle = '#FFFFFF';
        // ctx.fillRect(0, 0, canvas.width, canvas.height);

        variant === 'fetch' && LoadPrevImg();

        stample = new Image();
        stample.src = IMG;

        stample.onload = () => {
            ctx.drawImage(stample, offsetX - 50, offsetY - 50, 100, 100);
        };
    };

    return <StyledCanvas ref={canvasRef} onClick={placeStample} />;
};

export default Canvas;
