import React, { Component } from 'react'

class Header extends Component {

  render() {
    return (
        <header id="header" className="page-header-my-read">
            <div className="page-header-container row">

            <div className="main-logo">
                <a href="#" className="logo"/>
            </div>

            {/* <div className="menu-search">
                <div className="catalog-search">
                <input className="shuffle-search input_field " type="search" autocomplete="off" value="" maxlength="128" id="input-search" />
                <label className="input_label" for="input-search">
                    <span className="input_label-content">Search Libraryk</span>
                    <span className="input_label-search"></span>
                </label>
                </div>
            </div> */}

            </div>
        </header>
    )
  }
}

export default Header
