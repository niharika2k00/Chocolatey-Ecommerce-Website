import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from './store.js';
import './bootstrap.min.css';
import './index.css';
/* import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css'; */
import App from './App';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <Provider store={Store} >
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();

// ROUTER :  npm i react-router-dom react-router-bootstrap  
// REACT : npx create-react-app lool --template cra-template-pwa