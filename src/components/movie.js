import React, { Component } from 'react';
import ReactPlayer from 'react-player'
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
                },
                videos: {
                    results: [],
                },
            },
            videoplay: false,
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
                    // console.log(this.state.movie.videos.results[0].key);
                    console.log(this.state.movie);
                    console.log(this.state.videoUrl);

                });



            })
            .catch(err => {
                console.log('Error: ' + err);
            })

    }

    setVideo() {
        this.setState({
            videoplay: false
        });
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

                <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#exampleModalCenter">
                    Watch Tralier
                </button>

                {/* <!-- Modal --> */}
                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content" style={{ background: 'transparent' }}>
                            <div class="modal-body">
                                {this.state.movie.videos.results.slice(0, 1).map((video, index) => {
                                    return (
                                        <div onClick={this.setVideo} style={{ color: 'white' }}>
                                            <ReactPlayer key={index} url={`https://www.youtube.com/watch?v=${video.key}`} playing={this.state.videoplay} controls />
                                        </div>

                                    )
                                })}
                                {this.state.videoplay}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row container' style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                    <div className='col-lg-9' style={{ color: 'white' }}>
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
                    <div className='col-lg-3' style={{ color: 'white' }}>
                        <img style={imgBorder} src={this.state.movie.poster_path === null ? 'http://via.placeholder.com/300x450' : `https://image.tmdb.org/t/p/w185/${this.state.movie.poster_path}`} alt={`${this.state.movie.title}`} />
                    </div>
                </div>
                {/* <div className='row'>
                    {this.state.movie.videos.results.slice(0, 1).map((video, index) => {
                        return (
                            <div style={{ color: 'white' }}>
                                {console.log(video.key)}
                                <ReactPlayer key={index} url={`https://www.youtube.com/watch?v=${video.key}`} playing={false} controls />
                            </div>

                        )
                    })}
                </div> */}
            </div>
        )
    }
}


const imgBorder = {
    boxShadow: '0px 0px 9px 2px rgba(255,255,255,0.1)',
}