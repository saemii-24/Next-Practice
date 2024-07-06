// export interface pokemonInterface {
//   name: string;
//   pokemon_species_id: number;
//   pokemon_v2_pokemonspecy: object[];
// // }

export interface pokemonInterface {
  name: any;
  pokemon_species_id: any;
  pokemon_v2_pokemonspecy: any;
}
// export interface pokemonInterface {

//     name: string;
//     pokemon_species_id
//     pokemon_v2_pokemonspecy {
//       pokemon_v2_pokemons {
//         pokemon_v2_pokemontypes {
//           pokemon_v2_type {
//             name
//           }
//         }
//         pokemon_v2_pokemonsprites {
//           pokemon_v2_pokemon {
//             pokemon_v2_pokemonsprites {
//               sprites
//             }
//           }
//         }
//       }
//     }
//   }

//   export interface

export type PokemonType = {
  normal: string;
  fighting: string;
  flying: string;
  poison: string;
  ground: string;
  rock: string;
  bug: string;
  ghost: string;
  steel: string;
  fire: string;
  water: string;
  grass: string;
  electric: string;
  psychic: string;
  ice: string;
  dragon: string;
  dark: string;
  fairy: string;
  stellar: string;
  unknown: string;
  shadow: string;
};
