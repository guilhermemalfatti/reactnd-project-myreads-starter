import React, { Component } from 'react'
import Moment from 'moment';
import PropTypes from 'prop-types';
import './index.css';

class BookItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "wantToRead"
          }

        this.handleChange = this.handleChange.bind(this);
    }

    static propTypes = {
        bookInfo: PropTypes.object.isRequired
    }

    componentDidMount(){
        this.setState({value: this.props.bookInfo.shelf ? this.props.bookInfo.shelf : "none"});
    }

    /**
     * @description Handle the Select component value change
     * @param {object} event - The event
     */
    handleChange(event) {
        if(this.props.onUpdateShelf){
            this.props.onUpdateShelf(event, this.state.value, this.props.bookInfo);
        }

        this.setState({value: event.target.value});

    }
    render() {
        const { bookInfo }  = this.props;
        const imgURL = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : null;
        const { value }  = this.state;
        return (
            <li className="book-item small-12 medium-6 columns" >
                <div className="bk-img">
                    <div className="bk-wrapper">
                        <div className="bk-book bk-bookdefault">
                            <div className="bk-front">
                                {imgURL ? <div className="bk-cover image-cover" style={{backgroundImage: `url('${imgURL}')`}}></div>:
                                          <div className="bk-cover" ></div>
                                }
                            </div>
                            <div className="bk-back"></div>
                            <div className="bk-left"></div>
                        </div>
                    </div>
                    </div>
                <div className="item-details">
                    <h3 className="book-item_title">{bookInfo.title}</h3>
                    {bookInfo.authors ? bookInfo.authors.map((author) => (
                        <p key={author} className="author">{author} &bull; {Moment(bookInfo.publishedDate).format('YYYY')}</p>
                    )) : '-' }
                    <p>{bookInfo.description ? bookInfo.description : '-'}</p>
                    <select id={bookInfo.id} className="form-control small-12 medium-3 columns categorySelect"
                            value={this.state.value}
                            onChange={this.handleChange}>
                        <option value="none" disabled>None</option>
                        <option value="undefined" disabled={value === "none" ? true : null}>Remove Book</option>
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
