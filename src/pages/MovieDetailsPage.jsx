import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieCast from "../components/MovieCast/MovieCast";
import css from "./MovieDetailPage.module.css";
import { lazy, Suspense } from "react";

const MovieReviews = lazy(() =>
  import("../components/MovieReviews/MovieReviews")
);

function MovieDetailsPage() {
  let params = useParams();
  const [movieDetail, setmovieDetail] = useState({});
  const [movieId, setMovieId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reviewsArea, setReviewsArea] = useState(false);
  const [castArea, setCastArea] = useState(false);

  useEffect(() => {
    setMovieId(params.movieId);
    if (movieId != 0) {
      setLoading(true)
      const url = `https://api.themoviedb.org/3/movie/${movieId}`;
      const api_key =
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2QxYWU1YzY0Y2YwNWQyMmQzY2YzN2ViYTY1NjkzYyIsIm5iZiI6MTc1Nzg3NjE0Ni44NDMwMDAyLCJzdWIiOiI2OGM3MGZiMjU5ZDI4N2ExNzljOTAwNGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.YOHC0tMi--eVERcDSW0atrtzukyxmnRrOJ7qDeLMcd8";

      const options = {
        headers: {
          Authorization: "Bearer " + api_key,
        },
      };
      
      axios
        .get(url, options)
        .then((response) =>
          setmovieDetail(JSON.parse(JSON.stringify(response.data)))
        )
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
        console.log(loading)
    }
  }, [movieId]);

  function showReviewsArea() {
    setReviewsArea(true);
  }

  function showCastArea() {
    setCastArea(true);
  }

  return (
    <>
      {loading ? <p>Loading</p> : <div className={css.movieHeader}>
        <img
          src={"https://image.tmdb.org/t/p/w500" + movieDetail.poster_path}
        />
        <div>
          <h1>{movieDetail.original_title}</h1>
          <h3>Overview</h3>
          <p>{movieDetail.overview}</p>
          <h3>Genres</h3>
          {movieDetail.genres &&
            movieDetail.genres.map((genre) => (
              <p key={genre.id}>{genre.name}</p>
            ))}
        </div>
      </div>}

      <button onClick={showReviewsArea}>Reviews</button>
      {reviewsArea && (
        <Suspense fallback={<div>Loading...</div>}>
          <MovieReviews movieId={movieId} />
        </Suspense>
      )}
      <br />
      <button onClick={showCastArea}>Cast</button>
      {castArea && (
        <Suspense fallback={<div>Loading...</div>}>
          <MovieCast movieId={movieId} />
        </Suspense>
      )}
    </>
  );
}

export default MovieDetailsPage;
