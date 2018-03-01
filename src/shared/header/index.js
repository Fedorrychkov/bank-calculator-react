import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

class HeaderComponent extends Component {
    render() {
        return (
            <header className="header">
                <div className="header__body wrapper">
                    <div className="logo"><span className="logo__main">My</span>Calculator</div>
                    <nav className="header__nav nav">
                        <ul className="nav__list">
                            <li className="nav__item"><NavLink to="/debit" className="nav__link" activeClassName="nav__link-active">Депозитный</NavLink></li>
                            <li className="nav__item"><NavLink to="/credit" className="nav__link" activeClassName="nav__link-active">Кредитный</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}

export default HeaderComponent;
