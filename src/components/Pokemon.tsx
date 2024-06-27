"use client";
//https://graphql-pokemon.js.org/introduction/javascript-examples

import { client } from "@/NextProvider";
import { useQuery, gql } from "@apollo/client";
import type { Query } from "@favware/graphql-pokemon";
import { GET_POKEMON, GET_POKEMON_DETAILS } from "@query/Pokemon";

interface GraphQLPokemonResponse<K extends keyof Omit<Query, "__typename">> {
  data: Record<K, Omit<Query[K], "__typename">>;
}

// const Pokemon: React.FC = () => {
//   const { loading, error, data } = useQuery<
//     GraphQLPokemonResponse<"getPokemon">
//   >(GET_POKEMON_DETAILS, {
//     client: client,
//   });

//   if (loading) return "Loading...";
//   if (error) return `Error! ${error.message}`;
//   console.log(data);

//   return <div> 데이터 들어갈 곳!</div>;
// };

// export default Pokemon;
const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`;

const gqlVariables = {
  limit: 30,
  offset: 0,
};

const Pokemon = () => {
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: gqlVariables,
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  console.log("Response from server", data);
  return "Success!";
};
export default Pokemon;
