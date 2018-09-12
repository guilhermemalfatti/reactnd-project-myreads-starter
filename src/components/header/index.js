import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CatalogSearch from '../catalogSearch/index';

class Header extends Component {

    render() {
        return (
            <header id="header" className="page-header-my-read">
                <div className="page-header-container row">

                <div className="main-logo">
                    <a href="#" className="logo"/>
                </div>

                { this.props.children }
                </div>
            </header>
        )
    }
}

export default Header
