import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // Explicit extension for module loader

const rootElement = document.getElementById('root');
if (rootElement) {
  // Clear the server-side loading shell before mounting
  rootElement.innerHTML = '';
  
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}