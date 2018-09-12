import React, { Component } from 'react'
import BookItem from '../bookItem/index'
import './index.css';

class Grid extends Component {


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
