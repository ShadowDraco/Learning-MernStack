import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Add the fortnite stat tracker to the page
import FortniteStatTracker from './Components/FortniteStats';

import reportWebVitals from './reportWebVitals';
<div className="0"></div>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <App />

    <FortniteStatTracker />

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
