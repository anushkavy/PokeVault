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

  console.log(pokeData);
  const imgUrl = pokeData?.sprites.other["official-artwork"]["front_default"];

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="pokemon-card">
      <h1>{name}</h1>
      <img src={imgUrl} alt={name} />
      <span className="poke-type-badge">{pokeData.types[0].type.name}</span>
      <div className="poke-height-weight">
        <p>{pokeData.height / 10} m</p>
        <p>{pokeData.weight / 10} kgs</p>
      </div>
      <p className="poke-base-exp">
        Base Experience: {pokeData["base_experience"]}
      </p>
      <p style={{ margin: 0 }}>Abilities: </p>
      <div className="poke-abilities">
        {pokeData.abilities.map((ability, idx) => {
          return (
            <div key={idx} className="poke-ability">
              <p>
                {ability.ability.name}{" "}
                {ability["is_hidden"] && <span>(Hidden)</span>}
              </p>
            </div>
          );
        })}
      </div>

      <div className="poke-stats">
        {" "}
        Stats:{" "}
        <div className="poke-stats-div">
          {pokeData.stats.map((stat, idx) => {
            return (
              <div className="poke-stat" key={idx}>
                <span>{stat.stat.name} </span>
                <span>{stat["base_stat"]}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
