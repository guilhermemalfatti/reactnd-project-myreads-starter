import React, { Component } from 'react';
import OrderBy from '../orderBy/index';
import PropTypes from 'prop-types';

class ListBooks extends Component {
    static propTypes = {
        onChangeOrderBy: PropTypes.func.isRequired
    }
    render() {
        const { onChangeOrderBy }  = this.props;
        return (
            <div className="page-container">
                <section id="book_list">
                    <div className="toolbar row">
                        <OrderBy onChange={onChangeOrderBy}/>
                        { this.props.children }
                    </div>
                </section>
            </div>
        )
    }
}

export default ListBooks
