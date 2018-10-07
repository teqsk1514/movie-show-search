import React, { Component } from 'react';
import './App.css';
import Nav from './components/header';
import MovieList from './components/movielist';
import Search from './components/search';

class App extends Component {
  render() {
    return (
      <div className='container'>
        <Nav />
        {/* <Search /> */}
        <MovieList />
      </div>
    );
  }
}

export default App;
