import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import AnimatedCursor from 'react-animated-cursor';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AnimatedCursor
      innerSize={10}
      outerSize={8}
      color='240,122,122'
      outerAlpha={0.4}
      outerScale={5}
    />
    <App />
  </React.StrictMode>
);
