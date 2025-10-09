// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom'; // <-- Make sure this is imported

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* THIS WRAPPER IS MISSING OR PLACED INCORRECTLY */}
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
