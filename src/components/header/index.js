import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';

class Header extends Component {

    render() {
        return (
            <header id="header" className="page-header-my-read">
                <Route path='/search' render={() => (
                    <div className="arrow-back">
                        <Link to="/" >
                            <i className="fa fa-angle-left fa-3x"></i>
                        </Link>
                    </div>
                )}
                />

                <div className="page-header-container row">

                    <div className="main-logo">
                        <a className="logo">logo</a>
                    </div>

                    { this.props.children }
                </div>
            </header>
        )
    }
}

export default Header
