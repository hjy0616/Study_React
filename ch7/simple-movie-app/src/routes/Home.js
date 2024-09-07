import { useState, useEffect } from 'react';
import Movie from '../components/movie';

const Home = () => {
 const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const getMovies = async() => {
      const res = await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year");
      const json = await res.json();
      setMovies(json.data.movies);
      setLoading(false);
    }
    useEffect(() => {
      getMovies();
    }, []);
  
    return (
      <div>
        <h1>The Movies </h1>
        {loading ? <>IsLoading...</> : <div>
        {movies.map((movie) => (
          <Movie
          key={movie.id}
          id={movie.id}
          medium_cover_image={movie.medium_cover_image}
          title={movie.title}
          url={movie.url}
          summary={movie.summary}
          genres={movie.genres}
          torrents={movie.torrents}
          />
        ))}
          </div>}
        
      </div>
    );
}

export default Home;