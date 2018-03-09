import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import NotFound from './notfound';
import MainPage from './main';
// import DebitComponent from './main/debit';
// import CreditComponent from './main/credit';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/credit" component={MainPage} />
        <Route exact path="/debit" component={MainPage} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default App;
