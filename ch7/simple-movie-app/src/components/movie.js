import { Link } from "react-router-dom";

const Movie = ({
  medium_cover_image,
  title,
  id,
  summary,
  genres,
  torrents,
}) => {
  return (
    <div>
      <img src={medium_cover_image} alt={title} />
      <h2>
        <Link to={`/movie/${id}`}>{title}</Link>
      </h2>
      <p>{summary}</p>
      <ul>
        {genres.map((genre) => (
          <li key={genre}>{genre}</li>
        ))}
        {torrents.map((torrent, index) => (
          <div key={index}>
            <a href={torrent.url}>Download{index}</a>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Movie;
