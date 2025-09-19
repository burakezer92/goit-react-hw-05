import axios from "axios";
import Movie from "../components/Movie/Movie";
import css from "../components/MoviesList/MoviesList.module.css";
import { useState } from "react";

function MoviesList() {
  const api_key =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2QxYWU1YzY0Y2YwNWQyMmQzY2YzN2ViYTY1NjkzYyIsIm5iZiI6MTc1Nzg3NjE0Ni44NDMwMDAyLCJzdWIiOiI2OGM3MGZiMjU5ZDI4N2ExNzljOTAwNGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.YOHC0tMi--eVERcDSW0atrtzukyxmnRrOJ7qDeLMcd8";

  const [moviesList, setMoviesList] = useState([]);
  let movieName = "";
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    const url = `https://api.themoviedb.org/3/search/movie?query=${movieName}`;
    const options = {
      headers: {
        Authorization: "Bearer " + api_key,
      },
    };

    axios
      .get(url, options)
      .then((response) =>
        setMoviesList(JSON.parse(JSON.stringify(response.data.results)))
      )
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  function SearchBar(props) {
    return (
      <header className={css.header}>
        <form className={css.form}>
          <input
            className={css.searchInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
            onChange={props.changeWord}
          />
        </form>
      </header>
    );
  }

  const handleChange =
    ("input",
    (event) => {
      movieName = event.target.value;
    });

  return (
    <>
      <div className="box">
        <SearchBar changeWord={handleChange} />
        <button onClick={handleClick}>Search</button>
      </div>
      {loading ? <p>Loading</p>  : <div className={css.gallery}>
        {moviesList.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster={movie.poster_path}
          />
        ))}
      </div>}
    </>
  );
}

export default MoviesList;
