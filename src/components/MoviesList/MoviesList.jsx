import axios from "axios";
import Movie from "../Movie/Movie";
import css from "./MoviesList.module.css";
import { useEffect, useState } from "react";

function MoviesList() {
const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
  const api_key =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2QxYWU1YzY0Y2YwNWQyMmQzY2YzN2ViYTY1NjkzYyIsIm5iZiI6MTc1Nzg3NjE0Ni44NDMwMDAyLCJzdWIiOiI2OGM3MGZiMjU5ZDI4N2ExNzljOTAwNGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.YOHC0tMi--eVERcDSW0atrtzukyxmnRrOJ7qDeLMcd8";

  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    

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
    .catch((err) => console.error(err));
},[])

  return (
    <div className={css.gallery}>
      {moviesList.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id}
          title={movie.title}
          poster={movie.poster_path}
        />
      ))}
    </div>
  );
}

export default MoviesList;
