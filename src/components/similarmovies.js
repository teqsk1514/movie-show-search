import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SimilarMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            mid: '',
        }
        this.getSimilar = this.getSimilar.bind(this);
    }


    getSimilar(ids) {

        const key = <your api key>;
        // const id = this.state.mid;
        console.log(this.state.mid)
        fetch(`https://api.themoviedb.org/3/movie/${ids}/similar?api_key=${key}&language=en-US&page=1`)
            .then(response => {
                if (response.status !== 200) {
                    console.log('Error: ' + response.status);
                    return;
                }
                response.json().then(data => {
                    this.setState({
                        movies: data.results,
                    });
                    console.log(this.state.movies);

                });
            })
            .catch(err => {
                console.log('Error: ' + err);
            })

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            mid: nextProps.movieId,
        })
        // console.log(this.state.mid)
        this.getSimilar(Number(nextProps.movieId));

    }


    render() {
        const simliarmovies = this.state.movies;
        const moviesListSimilar = simliarmovies.map((movie, index) =>
            <div key={index} className='col-lg-3 col-md-4 col-sm-6' style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                <Link className="movieLink" to={`/movie/${movie.id}`}>
                    <img style={imgBorder} src={movie.poster_path === null ? 'http://via.placeholder.com/185x278' : `https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt={`${movie.title}`} />
                    <div className="movieInfo">
                        <h3>{movie.title}</h3>
                        <p>{movie.release_date}  </p>
                    </div>
                </Link>
            </div>
        );
        return (
            < div >
                <div className='row container' style={{ color: '#0074D9', marginTop: '2rem' }}>
                    {this.state.movies.length !== 0 ?
                        <div>
                            <h3>Similar Movies</h3>
                        </div>
                        :
                        <div>
                            <Link to='/'>
                                <button className='btn btn-dark'>
                                    Go to Home!
                            </button>
                            </Link>
                        </div>
                    }
                    {/* {console.log(<this className="state"</this>.movie.id)} */}
                </div>
                <div className='row' style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                    {moviesListSimilar}
                </div>
            </div >
        )
    }
}

const imgBorder = {
    boxShadow: '0px 0px 9px 2px rgba(255,255,255,0.1)',
}
