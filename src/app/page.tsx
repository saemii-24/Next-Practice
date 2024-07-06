"use client";
// import Pokemon from "@/components/Pokemon";

import Card from "@/components/Card";
import Header from "@/components/Header";
import { header } from "@/props/props";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "@/query/Pokemon";
import { pokemonInterface } from "@/types/type";

const arr = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Home() {
  const { loading, error, data, fetchMore } = useQuery(GET_POKEMONS, {
    variables: {
      offset: 0,
      limit: 10,
      languageId: 3,
    },
  });

  const [pokemons, setPokemons] = useState<null | pokemonInterface[]>(null);

  useEffect(() => {
    if (data) {
      setPokemons(data.pokemon_v2_pokemonspeciesname);
    }
  }, [data]);

  return (
    <>
      <Header text={header.root} />
      <main className="mt-20 flex justify-center items-center">
        <div className="container grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {pokemons?.map((pokemon: any, i: number) => {
            return (
              <React.Fragment key={i}>
                <Card pokemon={pokemon} />
              </React.Fragment>
            );
          })}
        </div>
      </main>
    </>
  );
}
