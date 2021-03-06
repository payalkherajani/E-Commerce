import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { makeServer } from './api/server';
import { Provider } from './contexts/Context';

makeServer()

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

