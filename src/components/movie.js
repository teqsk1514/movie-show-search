import React, { Component } from 'react'
import Nav from './header';

export default class Movie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: {
                genres: [],
                credits: {
                    cast: [],
                    crew: [],
                }
            },
        }
        this.getMovie = this.getMovie.bind(this);
    }
    getMovie() {
        const key = 'f6e07a62a81edcb5e9fceb3111b4534a';

        fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=${key}&append_to_response=credits`)
            .then(response => {
                if (response.status !== 200) {
                    console.log('Error: ' + response.status);
                    return;
                }
                response.json().then(movie => {
                    this.setState({
                        movie,
                    });
                    console.log(this.state.movie);
                });



            })
            .catch(err => {
                console.log('Error: ' + err);
            })

    }

    componentDidMount() {
        this.getMovie();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.movie !== this.state.movie) {
            this.getMovie();
        }
    }

    render() {
        return (
            <div className='container'>
                <Nav />
                <div style={{ display: 'flex' }}>
                    <div style={{ color: 'white', flex: 3 }}>
                        <li><span className="bold">Genres: </span> {this.state.movie.genres.map((element, index) => {
                            if (index < this.state.movie.genres.length - 1) {
                                return this.state.movie.genres[index].name + ', '
                            } else {
                                return this.state.movie.genres[index].name
                            }
                        })}
                        </li>
                        {console.log(this.state.movie.credits)}
                        <li>
                            {this.state.movie.release_date}
                        </li>
                        <li>
                            {this.state.movie.overview}
                        </li>
                        <li>
                            Rating:{this.state.movie.vote_average}
                        </li>
                        <li><span className="bold">Cast: </span> {this.state.movie.credits.cast.slice(0, 10).map((element, index) => {
                            return (
                                this.state.movie.credits.cast[index].name
                            )
                        })}
                        </li>
                    </div>
                    <div style={{ color: 'white', flex: 1 }}>
                        <img style={imgBorder} src={this.state.movie.poster_path === null ? 'http://via.placeholder.com/300x450' : `https://image.tmdb.org/t/p/w300/${this.state.movie.poster_path}`} alt={`${this.state.movie.title}`} />
                    </div>
                </div>
            </div>
        )
    }
}


const imgBorder = {
    boxShadow: '0px 0px 9px 2px rgba(255,255,255,0.1)',
}