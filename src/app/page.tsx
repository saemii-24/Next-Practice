"use client";
// import Pokemon from "@/components/Pokemon";

import Card from "@/components/Card";
import Header from "@/components/Header";
import { header } from "@/props/props";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "@/query/Pokemon";
import { pokemonInterface } from "@/types/type";
import { useInView } from "react-intersection-observer";
import { useSession } from "next-auth/react";

const limit = 10;
export default function Home() {
  let [offset, setOffset] = useState<number>(0);

  const { loading, error, data, fetchMore } = useQuery(GET_POKEMONS, {
    variables: {
      offset,
      limit,
    },
  });

  const [pokemons, setPokemons] = useState<null | pokemonInterface[]>(null);

  useEffect(() => {
    if (data) {
      setPokemons(data.pokemon_v2_pokemonspeciesname);
    }
  }, [data]);

  const [ref, inView] = useInView();

  const { data: session } = useSession();
  console.log(session);

  useEffect(() => {
    if (inView) {
      setOffset((prev) => prev + limit);
      fetchMore({
        variables: {
          limit: limit,
          offset: offset,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult;
          }
          return {
            pokemon_v2_pokemonspeciesname: [
              ...previousResult.pokemon_v2_pokemonspeciesname,
              ...fetchMoreResult.pokemon_v2_pokemonspeciesname,
            ],
          };
        },
      });
    }
    console.log(data);
  }, [inView]);
  if (loading) {
    return <h1>로딩중!</h1>;
  }

  return (
    <>
      <Header text={header.root} />
      <main className="my-20 flex justify-center items-center">
        <div className="container grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {pokemons?.map((pokemon: any, i: number) => {
            return (
              <React.Fragment key={i}>
                <Card pokemon={pokemon} />
              </React.Fragment>
            );
          })}
          {/* <div ref={ref} className="w-full h-10 bg-blue-400"></div> */}
        </div>
      </main>
    </>
  );
}
