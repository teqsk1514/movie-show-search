import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import Nav from './header';
import SimilarMovies from './similarmovies';
import Footer from './footer';
import Cast from './cast';

export default class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {
                genres: [],
                credits: {
                    cast: [],
                    crew: [],
                },
                videos: {
                    results: [],
                },
            },
            showVideo: false,
        }
        this.getMovie = this.getMovie.bind(this);
        this.setVideo = this.setVideo.bind(this);
    }
    getMovie() {
        const key = 'f6e07a62a81edcb5e9fceb3111b4534a';

        fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=${key}&append_to_response=videos%2Ccredits`)
            .then(response => {
                if (response.status !== 200) {
                    console.log('Error: ' + response.status);
                    return;
                }
                response.json().then(movie => {
                    this.setState({
                        movie,
                        // videoUrl: this.state.movie.videos.results[0].key,
                    });
                    // console.log(this.state.movie.videos.results);
                    // console.log(this.state.movie);
                    // console.log(this.state.videoplay);

                });
            })
            .catch(err => {
                console.log('Error: ' + err);
            })

    }

    setVideo() {
        this.setState({
            showVideo: !this.state.showVideo,
        });
    }

    componentDidMount() {
        this.getMovie();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.movie !== this.state.movie) {
            this.getMovie();
            window.location.reload();
        }
    }

    render() {
        return (
            <div className='container'>
                <Nav />

                <div className='row conatiner' style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                    <div className='col-lg-3' style={{ color: 'white', width: '80%', border: '2px sold white' }}>
                        <img style={imgBorder} src={this.state.movie.poster_path === null ? 'http://via.placeholder.com/300x450' : `https://image.tmdb.org/t/p/w300/${this.state.movie.poster_path}`} alt={`${this.state.movie.title}`} />
                    </div>
                    <div className='col-lg-8 offset-md-1' style={{ color: 'white', listStyle: 'none', background: 'transparent' }}>
                        <div style={{ color: '#F9A602' }}>
                            <h1>
                                {this.state.movie.title}
                            </h1>
                        </div>
                        <button onClick={this.setVideo} type="button" className="btn btn-dark">
                            {this.state.showVideo ? 'Hide Tralier' : 'Watch Tralier'}
                        </button>

                        <div className='row' style={{ marginTop: '1rem' }}>
                            {this.state.showVideo ?
                                <div className='col-lg-12 col-md-6'>
                                    {this.state.movie.videos.results.slice(0, 1).map((video, index) => {
                                        return (
                                            <div className='player-wrapper' key={index} onClick={this.setVideo} style={{ color: 'white' }}>
                                                <ReactPlayer
                                                    key={index}
                                                    url={`https://www.youtube.com/watch?v=${video.key}`}
                                                    className='player'
                                                    playing={this.state.videoplay}
                                                    width='100%'
                                                    height='100%'
                                                    controls
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                                :
                                <div>
                                </div>
                            }
                        </div>
                        <li>
                            <span style={{ marginTop: '1rem' }} className="bold">
                                <h3 style={{ color: '#0074D9' }}>
                                    Genres:
                            </h3>
                            </span>
                            {this.state.movie.genres.map((element, index) => {
                                if (index < this.state.movie.genres.length - 1) {
                                    return this.state.movie.genres[index].name + ', '
                                } else {
                                    return this.state.movie.genres[index].name
                                }
                            })}
                        </li>
                        <li>
                            <h3 style={{ color: '#0074D9', marginTop: '1rem' }}>
                                Rating:
                            </h3>
                            {this.state.movie.vote_average} / 10
                        </li>
                        {/* {console.log(this.state.movie.credits.cast)} */}
                        <li>
                            <h3 style={{ color: '#0074D9', marginTop: '1rem' }}>
                                Release Date: <br />
                            </h3>
                            {this.state.movie.release_date}
                        </li>
                        <li>
                            <h3 style={{ color: '#0074D9', marginTop: '1rem' }}>
                                Overview: <br />
                            </h3>
                            {this.state.movie.overview}
                        </li>
                    </div>
                </div>
                <div className='row container' style={{ color: '#0074D9', marginTop: '1rem', marginBottom: '3rem' }}>
                    <h3>Cast</h3>
                    <Cast cast={this.state.movie.credits.cast} />
                </div>
                <div className='row container' style={{ color: 'white', marginTop: '1rem', marginBottom: '3rem' }}>
                    <SimilarMovies movieId={this.state.movie.id} />
                </div>
                <Footer />
            </div>
        )
    }
}


const imgBorder = {
    boxShadow: '0px 0px 9px 2px rgba(255,255,255,0.1)',
}