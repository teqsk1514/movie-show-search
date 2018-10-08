import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Search from './search';
import MovieList from './movielist';

export default class Nav extends Component {
    render() {
        return (
            <div style={{ paddingTop: '2rem' }}>
                <div>

                </div>

                <nav className="navbar navbar-light" style={{ backgroundColor: '#222', height: '10vh' }}>
                    <a className="navbar-brand" href="/"><h1 style={{ color: 'teal' }}><strong>Movies</strong></h1></a>
                </nav>
                <div>
                    <Search />
                </div>
                {/* <div>
                    <Link to={"12"}>
                        <button>Next</button>
                    </Link>
                </div> */}
                {/* <div className="dropdown-divider"></div> */}
            </div >
        )
    }
}
