import React, { useState, useContext, useRef } from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

const Ctx = React.createContext();

export function useCtx() {
    return useContext(Ctx);
}

export function CtxProvider({ children }) {
    const [step, setStep] = useState('SPLASH_SCREEN');
    const canvasRef = useRef(null);
    const konvaRef = useRef();
    const [visitedBefore] = useState(window.localStorage.getItem('visited'));
    const [user] = useState(window.localStorage.getItem('user'));
    const [planesCount, setPlanesCount] = useState();
    const [planesCountInfoVariant, setPlanesCountInfoVariant] = useState();

    const PrevCanvas = ({ plane }) => {
        const [image] = useImage(plane?.canvas, 'Anonymous');
        return <Image image={image} />;
    };

    const value = {
        step,
        setStep,
        canvasRef,
        visitedBefore,
        user,
        setPlanesCount,
        planesCount,
        konvaRef,
        planesCountInfoVariant,
        setPlanesCountInfoVariant,
        PrevCanvas,
    };

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
