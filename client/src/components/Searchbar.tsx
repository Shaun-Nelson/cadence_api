import { useState } from "react";
import { useDispatch } from "react-redux";
import { setResults } from "../slices/resultsSlice";
import { useGetAiDataMutation } from "../slices/thirdPartyApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

//Components
import SearchResults from "./SearchResults";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [playlistLength, setPlaylistLength] = useState(10);

  const dispatch = useDispatch();

  const [getAiData, { isLoading }] = useGetAiDataMutation();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await getAiData({
        input: search,
        length: playlistLength,
      }).unwrap();
      dispatch(setResults(res));
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = async () => {
    try {
      const res = await getAiData({
        input: search,
        length: playlistLength,
      }).unwrap();
      dispatch(setResults(res));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className='flex-container-search'>
        <form className='searchbar' onSubmit={handleSubmit}>
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
            onClick={handleClick}
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
      <SearchResults loading={isLoading} />
    </>
  );
};

export default Searchbar;
