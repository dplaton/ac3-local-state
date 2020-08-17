import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/core/styles';
import {ApolloProvider} from '@apollo/client';

import client from './client';
import App from './App';
import theme from './theme';

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
