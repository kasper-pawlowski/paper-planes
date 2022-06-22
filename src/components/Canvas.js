import React, { useEffect, useRef } from 'react';

const Canvas = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;

        canvas.style.width = '100%';
        canvas.style.height = '100%';

        const ctx = canvas.getContext('2d');
        contextRef.current = ctx;

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    return <canvas ref={canvasRef} />;
};

export default Canvas;
