import React, { Component } from 'react'

export default class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
        }
    }

    componentDidMount() {
        const key = 'f6e07a62a81edcb5e9fceb3111b4534a';

        let todayDate = new Date();
        let today = todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate();
        let oneMonthAgo = (todayDate.getMonth() === 0 ? todayDate.getFullYear() - 1 : todayDate.getFullYear()) + '-' + (todayDate.getMonth() === 0 ? todayDate.getMonth() + 12 : todayDate.getMonth()) + '-' + todayDate.getDate();

        // fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${oneMonthAgo}&primary_release_date.lte=${today}`)
        fetch(`https://api.themoviedb.org/3/discover/tv?api_key=f6e07a62a81edcb5e9fceb3111b4534a&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false`)
            .then(response => {
                if (response.status !== 200) {
                    console.log('Error: ' + response.status);
                    return;
                }

                response.json().then(data => {
                    // const movies = data.results;
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

    render() {
        return (
            <section>
                <h3 style={{ color: 'wheat' }}>
                    <strong>New Release</strong>
                </h3>
                <div className="dropdown-divider" style={{ color: 'wheat' }}></div>
                <div >
                    <div className='row' style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {this.state.movies.map((movie) => {
                            return (
                                <div data-toggle='popover' data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." data-trigger='hover' className='col-lg-3 col-md-4 col-sm-6' style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                                    <img style={imgBorder} src={movie.poster_path === null ? 'http://via.placeholder.com/300x450' : `https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt={`${movie.title}`} />
                                </div>
                            )
                        })}
                    </div>

                </div>
            </section >
        )
    }
}

const imgBorder = {
    boxShadow: '0px 0px 9px 2px rgba(255,255,255,0.1)',
}