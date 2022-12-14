import '../styles/App.css';
import React, { Component } from 'react';
import Movies from './Movies';
import MovieDisplay from './MovieDisplay';
import { Route } from 'react-router-dom';
import { getMovies } from '../apiCalls';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      error: '',
      isLoading: false
    }
  }

  componentDidMount = () => {
    this.setState({ isLoading: true })
    getMovies()
      .then(data => this.setState({ movies: data.movies, isLoading: false }))
      .catch(error => {
        this.setState({ error: "ERROR: " + error.message })
      })
  }

  render() {
    return (
      <div className='app'>
        <header className='siteHeader'>
          <h1 className='siteTitle'>🍿 Gomycode Films 🍿</h1>
        </header>
        {this.state.isLoading && <p className='loading'>⏳ Loading...</p>}
        {this.state.error && <p className='error'>{this.state.error}</p>}
        <Route
          exact path="/"     
          render={() => <Movies movies={this.state.movies} />
          }
        />
        <Route
          exact path="/:movieId"
          render={({ match }) => <MovieDisplay id={match.params.movieId} />
          }
        />
      </div>
    )
  }
}

export default App;