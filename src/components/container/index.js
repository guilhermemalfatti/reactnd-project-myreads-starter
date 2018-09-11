import React, { Component } from 'react'

class Container extends Component {

    render() {
        return (
            <div className="page-container">
                <section id="book_list">
                    <div className="toolbar row">
                        { this.props.children }
                    </div>
                </section>
            </div>
        )
    }
}

export default Container
