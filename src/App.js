import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
// import HomePage from './app/components/homepage/homepage';
// import Cabinet from './app/components/cabinet/cabinet';
import NotFound from './notfound';
// import Auth from './app/components/auth/auth';
import MainPage from './main';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default App;
