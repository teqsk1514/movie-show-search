import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Nav from './components/header';
import MovieList from './components/movielist';
import Search from './components/search';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageno: this.props.match.params.pageno,
        }
    }


    render() {
        return (
            <div>
                <div className='container'>
                    <Nav />
                    {/* <Search /> */}
                    <MovieList page={this.state.pageno} />
                    {/* <div>
                        <Link to='/6'>
                            <button>Next</button>
                        </Link>
                    </div> */}
                </div>
            </div >
        )
    }
}
