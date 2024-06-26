"use client";
//https://graphql-pokemon.js.org/introduction/javascript-examples

import { client } from "@/NextProvider";
import { useQuery, gql } from "@apollo/client";
import type { Query } from "@favware/graphql-pokemon";

interface GraphQLPokemonResponse<K extends keyof Omit<Query, "__typename">> {
  data: Record<K, Omit<Query[K], "__typename">>;
}

const GET_POKEMON_DETAILS = gql`
  {
    getPokemon(pokemon: dragonite) {
      sprite
      num
      species
      color
    }
  }
`;

const Pokemon: React.FC = () => {
  const { loading, error, data } = useQuery<
    GraphQLPokemonResponse<"getPokemon">
  >(GET_POKEMON_DETAILS, {
    client: client,
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return <div> 데이터 들어갈 곳! </div>;
};

export default Pokemon;
