import React, { Component } from 'react'

export default class Cast extends Component {

    constructor(props) {

        super(props);
        this.state = {
            casts: [],
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            casts: nextProps.cast,
        })
    }
    render() {
        return (
            <div>
                {console.log(this.state.casts)}
                <div>
                    <div className='row container' style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                        {this.state.casts.slice(0, 8).map((cast, index) => {
                            return (
                                <div key={index} className='col-lg-3 col-md-4 col-sm-6' style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                                    <div className='movieLink'>
                                        <img data-toggle="tooltip" data-placement="top" title={cast.name} style={imgBorder} src={cast.profile_path === null ? 'http://via.placeholder.com/185x278' : `https://image.tmdb.org/t/p/w185/${cast.profile_path}`} alt={`${cast.title}`} />
                                        <div className="movieInfo">
                                            <h3>{cast.name}</h3>
                                            <p>{cast.character}  </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

const imgBorder = {
    boxShadow: '0px 0px 9px 2px rgba(255,255,255,0.1)',
}