import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { makeServer } from './api/server';


makeServer()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

