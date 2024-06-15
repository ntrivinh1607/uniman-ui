import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Assuming App.js is your main React component
import './index.css'; // Assuming you have a CSS file for global styles

// Find the div with id='root' in your index.html
const container = document.getElementById('root');
// Create a root for your application
const root = createRoot(container); // createRoot(container!) if you're using TypeScript
// Render your app component to the root
root.render(<App />);