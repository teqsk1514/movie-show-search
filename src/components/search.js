import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/search.css'
// import Searchresult from './searchresult';

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            query: ' ',
            class: '',
            showResults: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.hide = this.hide.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
    }


    handleInputChange = () => {
        this.setState({
            query: this.search.value,
        })
        console.log(this.state.query);

        // document.getElementById('results').className = 'formResults';
        let val = document.getElementById('searchInput').value;

        // if (val === '') {
        //     document.getElementById('results').className = 'noDisplay';
        // }


        const key = 'f6e07a62a81edcb5e9fceb3111b4534a';

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${val}&page=1&include_adult=false`)
            .then(response => {
                if (response.status !== 200) {
                    console.log('Error: ' + response.status);
                    return;
                }

                response.json().then(data => {
                    const results = data.results;
                    this.setState({
                        results
                    });
                    console.log(this.state.results);

                });
            })

            .catch(err => {
                console.log('Fetch Error :-S', err);
            })


    }

    handleClick() {
        this.setState({
            showResults: true,
        });
        // window.location.reload();
    }

    hide() {
        this.setState({
            // class: 'noDisplay',
            showResults: false,
        });
        window.location.reload();
    }

    render() {
        return (
            <div style={{ marginBottom: '1rem' }}>
                <form onSubmit={this.handleSubmit} id="form">
                    {/* <img src={search} alt="search icon" className="searchIcon" /> */}
                    <input
                        id="searchInput"
                        className="searchBar"
                        type="text"
                        ref={input => this.search = input}
                        onKeyUp={this.handleInputChange}
                        placeholder="Search a movie"
                        required
                        onClick={this.handleClick}
                    />
                    {this.state.showResults ?

                        this.state.results.map((result) => {
                            return (
                                <div>
                                    <Link to={`/movie/${result.id}`}>
                                        <div className="row card-hover" onClick={this.hide}>
                                            <div className="col-lg-3 col-md-4 col-sm-2">
                                                <img src={result.poster_path === null ? 'http://via.placeholder.com/92x150' : `https://image.tmdb.org/t/p/w92/${result.poster_path}`} alt={`${result.title}`} />
                                            </div>
                                            <div className="col-lg-9 col-md-8 col-sm-4" style={{ color: 'wheat' }}>
                                                <div className='text-left'>{result.title}</div>
                                                <div className='text-left'>{result.release_date}</div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })

                        :
                        null
                    }

                    {/* <Searchresult results={this.state.results} /> */}
                </form>
            </div>
        )
    }
}
