import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import global styles
import App from './App'; // Import main App component

// Create a root element for React 18's concurrent features
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component wrapped in StrictMode
// StrictMode enables additional development checks and warnings
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
