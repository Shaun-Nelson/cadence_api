import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

//Components
import PlaylistResults from "./PlaylistResults";
import PlaylistButtons from "./PlaylistButtons";

interface SearchResult {
  results: {
    image: string;
    link: string;
    title: string;
    artists: string[];
    duration: string;
    previewUrl: string;
  }[];
  loading: boolean;
}

const SearchResults = ({ results, loading }: SearchResult) => {
  return (
    <div className='search-results'>
      {!loading ? (
        <div className='flex-container-column'>
          <PlaylistButtons results={results} />
          <PlaylistResults results={results} />
        </div>
      ) : (
        <div className='flex-container-spinner'>
          <FontAwesomeIcon icon={faSpinner} spin size='3x' />
        </div>
      )}
    </div>
  );
};

export default SearchResults;
