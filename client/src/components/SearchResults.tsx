import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

interface SearchResult {
  results: {
    title: string;
    image: string;
    link: string;
    artists: [];
    duration: string;
    previewUrl: string;
  }[];
}

const SearchResults = ({ results }: SearchResult) => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");

  const handleLocalSave = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/playlists`,
        {
          method: "POST",
          body: JSON.stringify({ results, playlistName, playlistDescription }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSpotfiySave = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/login/spotify`,
        {
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        window.location.href = data.url;
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='search-results'>
      {results.length > 0 ? (
        // If there are results, display the results in a table
        <div className='flex-container-column'>
          <div className='flex-container-row' id='playlist-buttons'>
            <form className='playlist-form'>
              <input
                type='text'
                placeholder='Playlist Name'
                required
                name={playlistName}
                id='playlistName'
                onChange={(e) => setPlaylistName(e.target.value)}
              />
              <input
                type='text'
                placeholder='Playlist Description'
                name={playlistDescription}
                id='playlistDescription'
                onChange={(e) => setPlaylistDescription(e.target.value)}
              />
            </form>
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
      ) : (
        // If there are no results, display a spinner
        <div className='flex-container-spinner'>
          <FontAwesomeIcon
            className='spinner'
            icon={faSpinner}
            spin
            size='3x'
          />
        </div>
      )}
    </div>
  );
};

export default SearchResults;
