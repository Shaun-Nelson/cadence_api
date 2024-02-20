import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

//Components
import NavBar from "../components/NavBar";
import Playlist from "../components/Playlist";

const MyPlaylists = () => {
  const [playlists, setPlaylists] = useState<
    {
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
    }[]
  >([]);

  useEffect(() => {
    const getPlaylists = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/playlists`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();
        console.log(data);
        setPlaylists(data);
      } catch (error) {
        console.error(error);
      }
    };

    getPlaylists();
  }, []);

  return (
    <>
      <NavBar />
      <div className='flex-container-column '>
        {playlists.length > 0 ? (
          playlists.map((playlist, index) => {
            return <Playlist key={index} playlist={playlist} />;
          })
        ) : (
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
    </>
  );
};

export default MyPlaylists;
