import React, { Component } from 'react';
import '../assets/search.css'
import Searchresult from './searchresult';

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            query: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
    }


    handleInputChange = () => {
        this.setState({
            query: this.search.value,
        })
        console.log(this.state.query);

        const key = 'f6e07a62a81edcb5e9fceb3111b4534a';

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${this.state.query}&page=1&include_adult=false`)
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

    handleKeyUp() {
        // document.getElementById('results').className = 'formResults';
        // let val = document.getElementById('searchInput').value;
        // console.log(this.val);
        // if (val === '') {
        //     document.getElementById('results').className = 'noDisplay';
        // }

        // const key = 'f6e07a62a81edcb5e9fceb3111b4534a';

        // fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${val}&page=1&include_adult=false`)
        //     .then(response => {
        //         if (response.status !== 200) {
        //             console.log('Error: ' + response.status);
        //             return;
        //         }

        //         response.json().then(data => {
        //             const results = data.results;
        //             this.setState({ results });
        //         });
        //     })

        //     .catch(err => {
        //         console.log('Fetch Error :-S', err);
        //     })
    }

    render() {
        return (
            <div style={{ marginBottom: '1rem' }}>
                <form onSubmit={this.handleSubmit} id="form">
                    {/* <img src={search} alt="search icon" className="searchIcon" /> */}
                    <input
                        onKeyUp={this.handleKeyUp}
                        // id="searchInput"
                        className="searchBar"
                        type="text"
                        ref={input => this.search = input}
                        onChange={this.handleInputChange}
                        placeholder="Search a movie"
                        required />
                    {/* <p style={{ color: 'wheat' }}>{this.state.query}</p> */}
                    {this.state.results.map((result) => {
                        return (
                            <div style={{ display: 'flex' }}>
                                <div style={{ flex: '1' }}>
                                    <img src={result.poster_path === null ? 'http://via.placeholder.com/92x150' : `https://image.tmdb.org/t/p/w92/${result.poster_path}`} alt={`${result.title}`} />
                                </div>
                                <div style={{ color: 'white', flex: '3' }}>
                                    <div>{result.title}</div>
                                    <div>{result.release_date}</div>
                                </div>
                                <div className="dropdown-divider" style={{ color: 'wheat' }}></div>
                            </div>
                        )
                    })}
                    {/* <Searchresult
                        // id='results'
                        results={this.state.results} /> */}
                </form>
            </div>
        )
    }
}
