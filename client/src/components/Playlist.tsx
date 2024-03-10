import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// USE A MODAL TO CONFIRM DELETION

interface PlaylistProps {
  playlist: {
    name: string;
    description: string;
    tracks: {
      title: string;
      image: string;
      link: string;
      artists: [];
      duration: string;
      previewUrl: string;
    }[];
    link: string;
    username: string;
  };
}

type TrackType = {
  title: string;
  image: string;
  link: string;
  artists: [];
  duration: string;
  previewUrl: string;
};

interface PlaylistProps {
  playlist: {
    name: string;
    description: string;
    tracks: {
      title: string;
      image: string;
      link: string;
      artists: [];
      duration: string;
      previewUrl: string;
    }[];
    link: string;
    username: string;
  };
  handlePlaylistDelete: (name: string) => void;
}

const Playlist = ({ playlist, handlePlaylistDelete }: PlaylistProps) => {
  return (
    <div className='playlist'>
      {playlist.name && (
        <>
          <h2>{playlist.name}</h2>
          <p>{playlist.description}</p>
          <a href={playlist.link} target='_blank' rel='noreferrer'>
            Spotify Playlist
          </a>
          <FontAwesomeIcon
            onClick={() => handlePlaylistDelete(playlist.name)}
            icon={faTrash}
          />
        </>
      )}
      <table id='table-playlist-results'>
        <tbody>
          <tr>
            <th>Album</th>
            <th>Title</th>
            <th>Artists</th>
            <th>Duration</th>
            <th>Preview</th>
          </tr>
          {playlist.tracks.map((track: TrackType, index: number) => {
            return (
              <tr key={index}>
                <td>
                  <img src={track.image} alt='album cover' height={"50px"} />
                </td>
                <td>
                  <a href={track.link} target='_blank' rel='noreferrer'>
                    {track.title}
                  </a>
                </td>
                <td>
                  <p>{track.artists.join(", ")}</p>
                </td>
                <td>
                  <p>{track.duration}</p>
                </td>
                <td>
                  <audio controls>
                    <source src={track.previewUrl} type='audio/mpeg' />
                  </audio>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <hr />
    </div>
  );
};

export default Playlist;
