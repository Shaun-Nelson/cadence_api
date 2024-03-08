import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Key } from "react";

interface ResultType {
  image: string;
  title: string;
  link: string;
  artists: string[];
  duration: string;
  previewUrl: string;
}

const PlaylistResults = () => {
  const { results } = useSelector((state: RootState) => state.results);

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
            {results.map(
              (result: ResultType, index: Key | null | undefined) => {
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
              }
            )}
          </tbody>
        </table>
      )}
    </>
  );
};

export default PlaylistResults;
