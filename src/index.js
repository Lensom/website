import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'components/App';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Projects from 'pages/projects';
import Contact from 'pages/contact';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
