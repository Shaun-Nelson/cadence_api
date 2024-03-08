import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useCreatePlaylistMutation } from "../slices/playlistApiSlice";
import { RootState } from "../store";

const PlaylistButtons = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { results } = useSelector((state: RootState) => state.results);
  const [createPlaylist, { isError }] = useCreatePlaylistMutation();

  const handleLocalSave = async () => {
    try {
      await createPlaylist({
        name: playlistName,
        description: playlistDescription,
        tracks: results,
      });

      if (isError) {
        setError("Please log in to save playlist.");
      } else {
        setSuccess("Playlist saved!");
        setError("");
      }
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
    <>
      {results.length > 0 && (
        <div className='flex-container-column'>
          {error && <span className='error-message'>{error}</span>}
          {success && <span className='success-message'>{success}</span>}
          <div id='playlist-buttons'>
            <form className='playlist-form' style={{ paddingRight: "15px" }}>
              <input
                type='text'
                placeholder='Playlist Name'
                required
                name={playlistName}
                id='playlistName'
                style={{ paddingRight: "5px" }}
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
              className={
                error
                  ? "icon-save-playlist-local-error"
                  : "icon-save-playlist-local"
              }
              icon={faFloppyDisk}
              style={{ paddingRight: "15px" }}
              onClick={handleLocalSave}
              title='Save playlist to local user account'
            />
            <FontAwesomeIcon
              className={
                error
                  ? "icon-save-playlist-spotify-error"
                  : "icon-save-playlist-spotify"
              }
              icon={faSpotify}
              onClick={handleSpotfiySave}
              title='Save playlist to Spotify account'
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PlaylistButtons;
