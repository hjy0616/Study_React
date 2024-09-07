import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Detail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const getDetailMovie = async () => {
    const res = await fetch(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
    );
    const json = await res.json();
    console.log(json);
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getDetailMovie();
  }, []);

  return (
    <>
      <h1>Detail</h1>
      <div>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <img src={movie.medium_cover_image} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>{movie.description_full}</p>
          </>
        )}
      </div>
    </>
  );
};

export default Detail;
