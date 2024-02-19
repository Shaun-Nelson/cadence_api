import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface SearchResult {
  title: string;
  artists: Array<string>;
  duration: string;
  previewUrl: string;
  image: string;
  link: string;
}

const SearchResults = ({ results }: { results: SearchResult[] }) => {
  return (
    <div className='search-results'>
      {results ? (
        results.map((result, index) => (
          <div key={index} className='search-result'>
            <h3>{result.title}</h3>
            <span>{result.artists.join(", ")}</span>
            <span>{result.duration}</span>
            <img src={result.image} alt='album cover' />
            <audio controls>
              <source src={result.previewUrl} type='audio/mpeg' />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))
      ) : (
        <div className='search-result'>
          <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      )}
    </div>
  );
};

export default SearchResults;
