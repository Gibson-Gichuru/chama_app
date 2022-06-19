import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ShadowContextProvider } from './context/ShadowContext';
import { ViewPortContextProvider } from './context/ViewPort';
import { AuthContextProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <NotificationProvider>
          <ShadowContextProvider>
            <ViewPortContextProvider>
              <App />
            </ViewPortContextProvider>
          </ShadowContextProvider>
        </NotificationProvider>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);

