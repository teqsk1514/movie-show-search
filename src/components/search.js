import React, { Component } from 'react';
import '../assets/search.css'

export default class Search extends Component {
    render() {
        return (
            <div style={{ marginBottom: '1rem' }}>
                <form action="">
                    <input className='searchBar' type="text" placeholder='Search tv shows' required />
                </form>
            </div>
        )
    }
}
