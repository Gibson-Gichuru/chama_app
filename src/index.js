import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./app.css"
import {AuthContextProvider} from "./context/AuthContext";
import { AlertContextProvider } from "./context/AlertProvider"; 
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AlertContextProvider>
        <App/>
      </AlertContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

