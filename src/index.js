import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./app.css"
import {AuthContextProvider} from "./context/AuthContext";
import { DialogContextProvider } from './context/DialogProvider';
import {BrowserRouter as Router} from "react-router-dom";
import {QueryClientProvider, QueryClient} from "react-query";
import { ThemeProvider } from '@mui/material';
import {theme} from "./themes/theme";

import {Provider} from "react-redux";

import store from "./redux/store"
const root = ReactDOM.createRoot(document.getElementById('root'));

const client = new queryClient()

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <AuthContextProvider>
          <Provider store= {store}>
            <QueryClientProvider client={client}>
              <DialogContextProvider>
                <App/>
              </DialogContextProvider>
            </QueryClientProvider>
          </Provider>
        </AuthContextProvider>
      </Router>
    </ThemeProvider>  
  </React.StrictMode>
);

