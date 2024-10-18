import axios from "axios";
import { useState, useEffect } from "react";

export default function Pokemon({ name, url }) {
  const [pokeData, setPokeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getPokemon() {
    const res = await axios.get(url);
    setPokeData(res.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getPokemon();
  }, [url]);

  const imgUrl = pokeData?.sprites.other["official-artwork"]["front_default"];

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="pokemon-card">
      <h1>{name}</h1>
      <img src={imgUrl} alt={name} />
    </div>
  );
}
