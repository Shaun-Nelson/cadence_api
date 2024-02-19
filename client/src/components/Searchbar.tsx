import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [playlistLength, setPlaylistLength] = useState(10);
  //   const [results, setResults] = useState([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.preventDefault();

    const data = await fetch(`${import.meta.env.VITE_API_URL}/openai`, {
      method: "POST",
      body: JSON.stringify({ input: search, length: playlistLength }),
      headers: { "Content-Type": "application/json" },
    });

    if (data.ok) {
      const response = await data.json();
      console.log(response);
      //   setResults(response);
    } else {
      console.error("Failed to fetch data");
    }
  };

  return (
    <>
      <div className='flex-container-search'>
        <form className='searchbar'>
          <input
            className='search-input'
            type='text'
            value={search}
            onChange={handleSearch}
            placeholder='Generate a playlist based on your prompt.'
          />
          <FontAwesomeIcon
            className='search-icon'
            icon={faMagnifyingGlass}
            onClick={handleSubmit}
          />
        </form>
        <form className='playlist-length-select'>
          <label>
            Playlist Length:
            <select
              name='length'
              className='playlist-length'
              value={playlistLength}
              onChange={(e) => setPlaylistLength(parseInt(e.target.value))}
            >
              <option value='10'>10</option>
              <option value='20'>20</option>
              <option value='30'>30</option>
              <option value='40'>40</option>
              <option value='50'>50</option>
            </select>
          </label>
        </form>
      </div>
    </>
  );
};

export default Searchbar;
