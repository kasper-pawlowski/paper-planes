import React from 'react';
import { createRoot } from 'react-dom/client';
import Root from 'views/Root';
import { CtxProvider } from 'context/Context';

createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <CtxProvider>
        <Root />
    </CtxProvider>
    // </React.StrictMode>
);
