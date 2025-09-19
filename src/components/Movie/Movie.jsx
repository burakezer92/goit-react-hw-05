import css from "./Movie.module.css";
import { Link, Route, Routes } from "react-router-dom";
import MovieReviews from "../MovieReviews/MovieReviews";

function Movie(props) {
  <Routes>
    <Route path="/movies/:movieId" element={<MovieReviews />} />
  </Routes>;
  return (
    <Link to={`/movies/${props.id}`}>
      <div className={css.card}>
        <img src={"https://image.tmdb.org/t/p/w500" + props.poster} />
        <p className={css.title}>{props.title}</p>
      </div>
    </Link>
  );
}

export default Movie;
