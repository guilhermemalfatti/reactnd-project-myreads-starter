import React, { Component } from 'react';
import * as BooksAPI from '../../BooksAPI';
import { throttle } from 'throttle-debounce';
import Loading from '../loadingSpinner/index';

class CatalogSearch extends Component {
    state = {
        title: 'Search Library',
        value: '',
        loading: true
    }
    search = throttle(200, function (event) {
        this.setState({loading: true});
        BooksAPI.search(event.target.value).then((res)=>{

            if(this.props.onSearch){
                this.setState({loading: false});
                this.props.onSearch(res && res.length > 0 ? res : []);
            }
        });
    });
    handleChange(event) {
        this.setState({value: event.target.value});
        event.persist();
        this.search(event);
    }

    componentDidMount(){
        this.setState({loading: false});
    }
    render() {
        const { title, value, loading }  = this.state
        return (
            <div className="menu-search">
                <div className="catalog-search">
                    <input className="shuffle-search input_field " type="search" value={value} onChange={(event)=>this.handleChange(event)}/>
                    <label className="input_label">
                        <span className="input_label-content">{title}</span>
                        <span className="input_label-search"></span>
                    </label>
                </div>
                {loading ? <Loading /> : null }
            </div>
        )
    }
}

export default CatalogSearch
