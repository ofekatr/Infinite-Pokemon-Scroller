import { useEffect, useState } from "react";

import PokemonAPI from "../../api/pokemon";

export default function usePokemons(page, limit) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getPokemon = async () =>
      PokemonAPI.get(`/?offset=${page * limit}&limit=${limit}`)
        .then((res) => {
          setPokemons(
            (prevPokemons) =>
              [
                ...prevPokemons,
                ...res.data.results.map(({name}) => name),
              ] as never[]
          );
          setLoading(false);
          setHasMore(res.data.results.length > 0);
        })
        .catch((e) => {
          setError(true);
        });
    getPokemon();
  }, [page, limit]);

  return { pokemons, loading, hasMore, error };
}
