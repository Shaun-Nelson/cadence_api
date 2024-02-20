import { useState, useEffect } from "react";
//Components
import NavBar from "../components/NavBar";

const MyPlaylists = () => {
  const [playlists, setPlaylists] = useState<
    {
      title: string;
      image: string;
      link: string;
      artists: [];
      duration: string;
      previewUrl: string;
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
      <div className='my-playlists'>
        <h1>My Playlists</h1>
        <div className='playlists'>
          {playlists.length > 0 ? (
            playlists.map((playlist, index) => {
              return (
                <div key={index} className='playlist'>
                  <img src={playlist.image} alt='playlist' />
                  <a href={playlist.link} target='_blank' rel='noreferrer'>
                    {playlist.title}
                  </a>
                </div>
              );
            })
          ) : (
            <p>No playlists found</p>
          )}
        </div>

        <div className='playlist-form'>
          <button className='button' onClick={() => window.location.reload()}>
            Refresh
          </button>
        </div>
      </div>
    </>
  );
};

export default MyPlaylists;
