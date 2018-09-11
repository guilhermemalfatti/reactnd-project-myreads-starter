import React, { Component } from 'react'
import Moment from 'moment';
import './index.css';
class BookItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "wantToRead"
          }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.setState({value: this.props.bookInfo.shelf});
    }
    handleChange(event) {


        if(this.props.onUpdateShelf){
            this.props.onUpdateShelf(event, this.state.value);
        }

        this.setState({value: event.target.value});

    }
    render() {
        const { bookInfo, onUpdateShelf }  = this.props
        return (
            <li className="book-item small-12 medium-6 columns" >
                <div className="bk-img">
                    <div className="bk-wrapper">
                        <div className="bk-book bk-bookdefault">
                            <div className="bk-front">
                                <div className="bk-cover" style={{backgroundImage: `url('${bookInfo.imageLinks.thumbnail}')`}}></div>
                            </div>
                            <div className="bk-back"></div>
                            <div className="bk-left"></div>
                        </div>
                    </div>
                    </div>
                <div className="item-details">
                    <h3 className="book-item_title">{bookInfo.title}</h3>
                    {bookInfo.authors.map((author) => (
                        <p key={author} className="author">{author} &bull; {Moment(bookInfo.publishedDate).format('YYYY')}</p>
                    ))}
                    <p>{bookInfo.description}</p>
                    <select id={bookInfo.id} className="form-control small-12 medium-3 columns categorySelect"
                            value={this.state.value}
                            onChange={this.handleChange}>
                        <option value="wantToRead">Want to Read</option>
                        <option value="currentlyReading">Reading</option>
                        <option value="read">Read</option>
                    </select>
                </div>
            </li>
        )
    }
}

export default BookItem
