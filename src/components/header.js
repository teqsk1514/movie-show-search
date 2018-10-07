import React, { Component } from 'react'
import Search from './search';

export default class Nav extends Component {
    render() {
        return (
            <div style={{ paddingTop: '2rem' }}>
                <div>

                </div>

                <nav className="navbar navbar-light" style={{ backgroundColor: '#222', height: '10vh' }}>
                    <a className="navbar-brand" href="/"><h1 style={{ color: 'teal' }}><strong>Tv Shows</strong></h1></a>
                </nav>
                <div>
                    <Search />
                </div>
                <div className="dropdown-divider"></div>
            </div >
        )
    }
}
