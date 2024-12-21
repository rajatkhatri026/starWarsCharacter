// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store'; // Assuming you have a Redux store setup
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider
import App from './App';
import './assets/style/global.css';
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>  {/* Wrap your app with ThemeProvider */}
        <App />
        <ToastContainer />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
