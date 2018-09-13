import React, { Component } from 'react';
import BookItem from '../bookItem/index';
import PropTypes from 'prop-types';
import './index.css';

class Grid extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateShelf: PropTypes.func.isRequired
    }

    render() {
        const { books, onUpdateShelf }  = this.props
        return (

            <div className="grid-shuffle">
                <ul id="grid" className="row">
                    {books.length > 0 ? books.map((book) => (
                        <BookItem key={book.id} bookInfo={book} onUpdateShelf={onUpdateShelf}/>
                    )) :
                    <p className="emptyShelf">Empty List</p>
                    }
                </ul>
            </div>
        )
    }
}

export default Grid
