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
      {/*글자 235자 이상이면 자르기*/}
      <p>{summary.length > 235 ? `${summary.slice(0, 235)}...` : summary}</p>
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
