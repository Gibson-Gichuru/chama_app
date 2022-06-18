import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ShadowContextProvider } from './context/ShadowContext';
import { ViewPortContextProvider } from './context/ViewPort';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ShadowContextProvider>
        <ViewPortContextProvider>
          <App />
        </ViewPortContextProvider>
      </ShadowContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

