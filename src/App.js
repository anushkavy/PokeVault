import axios from "axios";
import { useEffect, useState } from "react";
import Pokemon from "./Components/Pokemon";

function App() {
  const [data, setData] = useState(null);
  const [currentUrl, setCurrentUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function getPokemonData() {
    const res = await axios.get(currentUrl);
    setData(res.data.results);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    setIsLoading(false);
  }

  useEffect(() => {
    getPokemonData();
  }, [currentUrl]);

  function handleNextClick() {
    setCurrentUrl(nextUrl);
  }

  function handlePrevClick() {
    setCurrentUrl(prevUrl);
  }

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="App">
      <input
        placeholder="Search Pokemon"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="search-input"
      ></input>
      <div className="btns">
        <button className="btn" disabled={!prevUrl} onClick={handlePrevClick}>
          Previous
        </button>
        <button className="btn" disabled={!nextUrl} onClick={handleNextClick}>
          Next
        </button>
      </div>
      <div className="pokemons-div">
        {data
          .filter((pokemon, idx) => {
            return search === ""
              ? pokemon
              : pokemon.name.includes(search.toLowerCase())
              ? pokemon
              : null;
          })
          .map((pokemon, idx) => {
            return <Pokemon key={idx} name={pokemon.name} url={pokemon.url} />;
          })}
      </div>
      <div className="btns">
        <button className="btn" disabled={!prevUrl} onClick={handlePrevClick}>
          Previous
        </button>
        <button className="btn" disabled={!nextUrl} onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
