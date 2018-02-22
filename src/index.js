import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import myclientsApp from './redux/reducers';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// let store = createStore(myclientsApp);
ReactDOM.render(
    <Router>
        <App />
    </Router>, 
    document.getElementById('app')
);
registerServiceWorker();
