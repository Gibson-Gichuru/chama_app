import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./app.css"
import {AuthContextProvider} from "./context/AuthContext";
import { AlertContextProvider } from "./context/AlertProvider"; 
import { DialogContextProvider } from './context/DialogProvider';
import {BrowserRouter as Router} from "react-router-dom";
import { ThemeProvider } from '@mui/material';
import {theme} from "./themes/theme";
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <AuthContextProvider>
          <AlertContextProvider>
            <DialogContextProvider>
              <App/>
            </DialogContextProvider>
          </AlertContextProvider>
        </AuthContextProvider>
      </Router>
    </ThemeProvider>  
  </React.StrictMode>
);

