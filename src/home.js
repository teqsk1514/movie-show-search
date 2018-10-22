import React, { Component } from 'react';
// import { Link, Redirect } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import Nav from './components/header';
import MovieList from './components/movielist';
// import Search from './components/search';
import Footer from './components/footer';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageno: this.props.match.params.pageno ? this.props.match.params.pageno : 1,
        }
    }


    render() {
        return (
            <div>
                <div className='container'>
                    <Nav />
                    {/* <Fade bottom> */}
                    <MovieList page={this.state.pageno} />
                    {/* </Fade> */}
                    <Footer />
                </div>
            </div >
        )
    }
}
