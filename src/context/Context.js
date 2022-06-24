import React, { useState, useContext, useRef } from 'react';

const Ctx = React.createContext();

export function useCtx() {
    return useContext(Ctx);
}

export function CtxProvider({ children }) {
    const [step, setStep] = useState('SPLASH_SCREEN');
    const [fileUrl, setFileUrl] = useState(null);
    const canvasRef = useRef(null);

    const value = { step, setStep, fileUrl, setFileUrl, canvasRef };

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
