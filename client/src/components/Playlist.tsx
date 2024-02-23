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

const Playlist = ({ playlist }: PlaylistProps) => {
  return (
    <div className='playlist'>
      {playlist.name && (
        <>
          <h2>{playlist.name}</h2>
          <p>{playlist.description}</p>
          <a href={playlist.link} target='_blank' rel='noreferrer'>
            Spotify Playlist
          </a>
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
