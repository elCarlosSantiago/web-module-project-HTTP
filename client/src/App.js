import React, { useEffect, useState } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';

import EditMovieForm from './components/EditMovieForm';
import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';
import AddMovieForm from './components/AddMovieForm';
import DeleteMovieModal from './components/DeleteMovieModal';

import useLocalStorage from './hooks/useLocalStorage';

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useLocalStorage(
    'favoriteMovies',
    []
  );

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/movies')
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (movies) => {
    setMovies(movies);
  };

  const addToFavorites = (movie) => {
    const duplicateMovie = favoriteMovies.find((mov) => movie.id === mov.id);
    if (!duplicateMovie) {
      setFavoriteMovies([...favoriteMovies, movie]);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand">
          <img width="40px" alt="" src="./Lambda-Logo-Red.png" /> HTTP / CRUD
          Module Project
        </span>
      </nav>

      <div className="container">
        <MovieHeader />
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Switch>
            <Route path="/movies/edit/:id">
              <EditMovieForm setMovies={setMovies} movies={movies} />
            </Route>

            <Route exact path="/movies/add">
              <AddMovieForm setMovies={setMovies} />
            </Route>
            <Route path="/movies/delete/:id">
              <DeleteMovieModal deleteMovie={deleteMovie} />
            </Route>
            <Route path="/movies/:id">
              <Movie addToFavorites={addToFavorites} />
            </Route>

            <Route path="/movies">
              <MovieList movies={movies} />
            </Route>

            <Route path="/">
              <Redirect to="/movies" />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
