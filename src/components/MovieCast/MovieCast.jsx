import { useEffect, useState } from "react";
import axios from "axios";
import css from "./MovieCast.module.css";

function MovieCast({ movieId }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
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
        setList(JSON.parse(JSON.stringify(response.data.cast)))
      )
      .catch((err) => console.error(err));
  }, [movieId]);

  return (
    <div  className={css.box}>
      {list.length == 0 ? <p>We don't have any reviews for this movie</p> : list.map((element) => (
        <div key={element.id}>
          <img className={css.card} src={"https://image.tmdb.org/t/p/w500" + element.profile_path} />
          <p>{element.name}</p>
        </div>
      ))
      }
      
    </div>
  );
}

export default MovieCast;
