import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

interface SearchResult {
  title: string;
  artists: Array<string>;
  duration: string;
  previewUrl: string;
  image: string;
  link: string;
}

const SearchResults = ({
  results,
  loading,
}: {
  results: SearchResult[];
  loading: boolean;
}) => {
  const handleLocalSave = () => {
    console.log("Local save");
  };

  const handleSpotfiySave = () => {
    console.log("Spotify save");
  };

  return (
    <div className='search-results'>
      {loading ? (
        // If there are no results, display a spinner
        <div className='flex-container-spinner'>
          <FontAwesomeIcon className='spinner' icon={faSpinner} spin />
        </div>
      ) : (
        // If there are results, display the results in a table
        <div className='flex-container-column'>
          <div className='flex-container-row' id='playlist-buttons'>
            <FontAwesomeIcon
              className='icon-save-playlist-local'
              icon={faFloppyDisk}
              style={{ paddingRight: "15px" }}
              onClick={handleLocalSave}
              title='Save playlist to local user account'
            />
            <FontAwesomeIcon
              className='icon-save-playlist-spotify'
              icon={faSpotify}
              onClick={handleSpotfiySave}
              title='Save playlist to Spotify account'
            />
          </div>
          <table id='table-playlist-results'>
            <tbody>
              <tr>
                <th>Album</th>
                <th>Title</th>
                <th>Artists</th>
                <th>Duration</th>
                <th>Preview</th>
              </tr>
              {results.map((result, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img
                        src={result.image}
                        alt='album cover'
                        height={"50px"}
                      />
                    </td>
                    <td>
                      <a href={result.link} target='_blank' rel='noreferrer'>
                        {result.title}
                      </a>
                    </td>
                    <td>
                      <p>{result.artists.join(", ")}</p>
                    </td>
                    <td>
                      <p>{result.duration}</p>
                    </td>
                    <td>
                      <audio controls>
                        <source src={result.previewUrl} type='audio/mpeg' />
                      </audio>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
