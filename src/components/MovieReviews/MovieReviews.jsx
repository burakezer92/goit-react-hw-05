import { useEffect, useState } from "react";
import axios from "axios";
import "./MovieReviews.module.css";

function MovieReviews({ movieId }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
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
        setList(JSON.parse(JSON.stringify(response.data.results)))
      )
      .catch((err) => console.error(err));
  }, [movieId]);

  return (
    <div>
      {list.length == 0 ? <p>We don't have any cast for this movie</p> : list.map((element) => (
        <div key={element.id}>
          <p>{element.author}</p>
          <p>{element.content}</p>
        </div>
      ))}
    </div>
  );
}

export default MovieReviews;
