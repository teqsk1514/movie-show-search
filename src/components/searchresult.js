import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/search.css'

export default class Searchresult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            val: true,
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        document.getElementById('results').className = 'noDisplay';
        this.setState({
            val: false,
        })
    }

    render() {
        const link = 'https://image.tmdb.org/t/p/w92';
        return (
            <ul id="results" onClick={this.handleClick}>
                {this.props.results.map((element, index) => {
                    return (
                        <li key={index} onClick={this.handleClick}>
                            <Link to={`/movie/${this.props.results[index].id}`} >
                                <img src={this.props.results[index].poster_path === null ? 'http://via.placeholder.com/300x450' : `${link}${this.props.results[index].poster_path}`} alt={`${this.props.results[index].title} poster`} className="resultPoster" />
                                <div>
                                    <p>{this.props.results[index].title}</p>
                                    <p>{this.props.results[index].release_date}</p>
                                </div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        );
    }
}
