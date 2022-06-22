import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'views/Root';
import { CtxProvider } from 'context/Context';

ReactDOM.render(
    <CtxProvider>
        <Root />
    </CtxProvider>,
    document.getElementById('root')
);
