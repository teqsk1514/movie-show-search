import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './home';
import Movie from './components/movie';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* <Route path={'/movie/:id'} component={Movie} /> */}
          <Route exact path={'/:pageno'} component={Home} />
          <Route exact path={'/'} component={Home} />
          <Route exact path={'/movie/:id'} component={Movie} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
