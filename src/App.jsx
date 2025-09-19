import { Link, Route, Routes } from "react-router-dom";
import MoviesList from "./components/MoviesList/MoviesList";
import NotFound from "./components/NotFound/NotFound";
import Movies from "./pages/Movies";
import MovieDetailsPage from "./pages/MovieDetailsPage";

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
      </nav>
      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
