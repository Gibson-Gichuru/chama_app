import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./app.css"
import {BrowserRouter as Router} from "react-router-dom";
import {QueryClientProvider, QueryClient} from "react-query";
import { ThemeProvider } from '@mui/material';
import {theme} from "./themes/theme";

import {Provider} from "react-redux";

import store from "./redux/store"
const root = ReactDOM.createRoot(document.getElementById('root'));

const client = new QueryClient()

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <Provider store= {store}>
          <QueryClientProvider client={client}>
              <App/>
          </QueryClientProvider>
        </Provider>
      </Router>
    </ThemeProvider>  
  </React.StrictMode>
);

