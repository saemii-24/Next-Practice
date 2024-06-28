// "use client";
// //https://pokeapi.co/docs/graphql
// //https://graphql-pokeapi.vercel.app/
// // https://beta.pokeapi.co/graphql/console/
// import {
//   GET_POKEMONS,
//   KOREAN_POKEMONS_NAME,
//   POKEMON_DETAIL,
// } from "@/query/Pokemon";
// import { useQuery } from "@apollo/client";

// const Pokemon = () => {
//   const { loading, error, data: pokemon } = useQuery(POKEMON_DETAIL);
//   const { data: pokemon_kr_name } = useQuery(KOREAN_POKEMONS_NAME);

//   if (loading) return "Loading...";
//   if (error) return `Error! ${error.message}`;

//   console.log("Response from server", pokemon);
//   console.log("Response from server", pokemon_kr_name);
//   return "Success!";
// };
// export default Pokemon;
