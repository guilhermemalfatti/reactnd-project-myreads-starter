import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OrderBy extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired
    }
    state ={
        value: ""
    }

    componentDidMount(){
        this.setState({
            value: this.props.value
        })
    }

    /**
     * @description Handle the Select component value change
     * @param {object} event - The event
     */
    handleChange(event){
        this.setState({
            value: event.target.value
        });

        if(this.props.onChange){
            this.props.onChange(event.target.value);
        }
    }


    render() {
        return (
            <div className="small-12 medium-3 columns float-right">
                <select className="sort-options" value={this.state.value}
                                             onChange={this.handleChange.bind(this)}>
                    <option value="" disabled >Sort by</option>
                    <option value="asc" >A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
            </div>
        )
    }
}

export default OrderBy
