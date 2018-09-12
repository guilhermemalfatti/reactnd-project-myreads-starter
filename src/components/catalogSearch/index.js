import React, { Component } from 'react';
import * as BooksAPI from '../../BooksAPI';

class CatalogSearch extends Component {
    state = {
        title: 'Search Library',
        value: ''
    }
    handleChange(event) {
        this.setState({value: event.target.value})

        BooksAPI.search(event.target.value).then((res)=>{
            if(this.props.onSearch){
                this.props.onSearch(res);
            }
        });

    }
    render() {
        const { title }  = this.state
        return (
            <div className="menu-search">
                <div className="catalog-search">
                    <input className="shuffle-search input_field " type="search" value={this.state.value} onChange={this.handleChange.bind(this)}/>
                    <label className="input_label">
                        <span className="input_label-content">{title}</span>
                        <span className="input_label-search"></span>
                    </label>
                </div>
            </div>
        )
    }
}

export default CatalogSearch
