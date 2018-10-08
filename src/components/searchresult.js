import React, { Component } from 'react'

export default class Searchresult extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.results.title}
            </div>
        )
    }
}
