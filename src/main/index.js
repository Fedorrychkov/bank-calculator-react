import React, { Component } from 'react';
import './index.css';
import HeaderComponent from '../shared/header';
import { Switch, Route } from 'react-router-dom';
import DebitComponent from './debit';
import CreditComponent from './credit';
import NotFound from '../notfound';

class MainPage extends Component {
    render() {
        return (
            <div>
                <HeaderComponent />
                <main className="wrapper main">
                    <Switch>
                        <Route exact path="/" component={CreditComponent} />
                        <Route exact path="/credit" component={CreditComponent} />
                        <Route exact path="/debit" component={DebitComponent} />
                        <Route component={NotFound} />
                    </Switch>
                </main>
            </div>
        );
    }
}

export default MainPage;
