import React from 'react';
import { createRoot } from 'react-dom/client';
import Root from 'views/Root';
import { CtxProvider } from 'context/Context';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <CtxProvider>
            <BrowserRouter>
                <Root />
            </BrowserRouter>
        </CtxProvider>
    </React.StrictMode>
);
