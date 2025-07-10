import { useState } from 'react';

const MovieSearch = () => {
  const [query, setQuery] = useState();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState();

  return (
    <div>
      <h1>Movie Search</h1>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie title"
        />
        <button
          onClick={() => {

            fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=bad8d527`)
              .then((res) => res.json())
              .then((data) => {
                if (data.Response === 'True') {
                  setMovies(data.Search);
                  setError('');
                } else {
                  setMovies([]);
                  setError(data.Error);
                }
              });
          }}
        >
          Search
        </button>
      </div>


      <ul>
        {movies.map((movie) => (
          <li key={movie.imdbID}>
            <img
              src={movie.Poster}
              alt={movie.Title}
            />
            <p>{movie.Title} ({movie.Year})</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieSearch;
