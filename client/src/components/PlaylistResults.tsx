type Result = {
  image: string;
  link: string;
  title: string;
  artists: string[];
  duration: string;
  previewUrl: string;
};

type PlaylistResultsProps = {
  results: Result[];
};

const PlaylistResults: React.FC<PlaylistResultsProps> = ({ results }) => {
  return (
    <>
      {results.length > 0 && (
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
                    <img src={result.image} alt='album cover' height={"50px"} />
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
      )}
    </>
  );
};

export default PlaylistResults;
