"use client";
//https://pokeapi.co/docs/graphql
//https://graphql-pokeapi.vercel.app/
// https://beta.pokeapi.co/graphql/console/
import { GET_POKEMONS, KOREAN_POKEMONS } from "@/query/Pokemon";
import { useQuery } from "@apollo/client";

const Pokemon = () => {
  const { loading, error, data: pokemon } = useQuery(GET_POKEMONS);
  const { data: pokemon_kr } = useQuery(KOREAN_POKEMONS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  console.log("Response from server", pokemon);
  console.log("Response from server", pokemon_kr);
  return "Success!";
};
export default Pokemon;
