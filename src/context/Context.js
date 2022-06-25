import React, { useState, useContext, useRef } from 'react';

const Ctx = React.createContext();

export function useCtx() {
    return useContext(Ctx);
}

export function CtxProvider({ children }) {
    const [step, setStep] = useState('SPLASH_SCREEN');
    const [fileUrl, setFileUrl] = useState(null);
    const canvasRef = useRef(null);
    const [visitedBefore] = useState(window.localStorage.getItem('visited'));
    const [user] = useState(window.localStorage.getItem('user'));
    const [planesCount, setPlanesCount] = useState();

    const value = { step, setStep, fileUrl, setFileUrl, canvasRef, visitedBefore, user, setPlanesCount, planesCount };

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
