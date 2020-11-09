import React, { useCallback, useRef, useState } from "react";
import usePokemons from "../utils/hooks/usePokemons";

export default function PokemonList() {
  const limit = 20;
  const [page, setPage] = useState(0);

  const { pokemons, loading, hasMore, error } = usePokemons(page, limit);

  const observer: any = useRef();
  const lastPokemonRef = useCallback(
    (node) => {
      if (loading || error) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (hasMore) {
            setPage((prevPage) => prevPage + 1);
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, error]
  );

  return (
    <>
      <div>
        {pokemons && (
          <>
            <ul>
              {pokemons.map((pokemon, i) => (
                <li
                  ref={i === pokemons.length - 1 ? lastPokemonRef : null}
                  key={pokemon}
                >
                  {pokemon}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error."}</div>
    </>
  );
}
