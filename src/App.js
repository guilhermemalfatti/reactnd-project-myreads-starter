import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    key: 2
  }

  handleSelect(key) {
    alert(`selected ${key}`);
    this.setState({ key });
  }

  render() {
    return (
      <div className="main clearfix">

          <header id="header" className="page-header">
            <div className="page-header-container row">

              <div className="main-logo">
                <a href="#" className="logo"/>
              </div>

              <div className="menu-search">
                <div className="catalog-search">
                  <input className="shuffle-search input_field " type="search" autocomplete="off" value="" maxlength="128" id="input-search" />
                  <label className="input_label" for="input-search">
                    <span className="input_label-content">Search Library</span>
                    <span className="input_label-search"></span>
                  </label>
                </div>
              </div>

              <div className="page-container">

                <section id="book_list">

                  <div className="toolbar row">
                    <div className="filter-options small-12 medium-9 columns">
                      <a href="#" className="filter-item active" >All Categories</a>
                      <a href="#" className="filter-item" >Fantasy</a>
                      <a href="#" className="filter-item" >Sci-Fi</a>
                    </div>

                    <div className="small-12 medium-3 columns">
                      <select className="sort-options">
                      <option value="" disabled selected>Sort by</option>
                      <option value="" >Featured</option>
                      <option value="title">Alphabetical</option>
                      <option value="date-created">Published</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid-shuffle">
                    <ul id="grid" className="row">
                      <li className="book-item small-12 medium-6 columns" >
                        <div className="bk-img">
                          <div className="bk-wrapper">
                            <div className="bk-book bk-bookdefault">
                              <div className="bk-front">
                                <div className="bk-cover" style={{backgroundImage: `url('http://interactivejoe.com/book-viewer/assets/images/bk_2-small.jpg')`}}></div>
                              </div>
                              <div className="bk-back"></div>
                              <div className="bk-left"></div>
                            </div>
                          </div>
                        </div>
                        <div className="item-details">
                          <h3 className="book-item_title">The Catcher in the Rye</h3>
                          <p className="author">by J.D. Salinger &bull; 1951</p>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus nisi, eget pulvinar in, molestie et arcu.</p>
                          <a href="#" className="button ">Details</a>
                        </div>
                      </li>
                      <li className="book-item small-12 medium-6 columns" >
                        <div className="bk-img">
                          <div className="bk-wrapper">
                            <div className="bk-book bk-bookdefault">
                              <div className="bk-front">
                                <div className="bk-cover" style={{backgroundImage: `url('http://interactivejoe.com/book-viewer/assets/images/bk_2-small.jpg')`}}></div>
                              </div>
                              <div className="bk-back"></div>
                              <div className="bk-left"></div>
                            </div>
                          </div>
                        </div>
                        <div className="item-details">
                          <h3 className="book-item_title">The Catcher in the Rye</h3>
                          <p className="author">by J.D. Salinger &bull; 1951</p>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus nisi, eget pulvinar in, molestie et arcu.</p>
                          <a href="#" className="button ">Details</a>
                        </div>
                      </li>

                    </ul>
                  </div>

                </section>

                </div>
            </div>
          </header>




        </div>
    )
  }
}

export default BooksApp
