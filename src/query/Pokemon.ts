import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query {
    pokemon_v2_pokemon(
      limit: 10
      offset: 0
      order_by: { pokemon_species_id: asc }
    ) {
      id
      name
      order
      pokemon_species_id
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
        type_id
      }
    }
  }
`;

export const KOREAN_POKEMONS_NAME = gql`
  query {
    pokemon_v2_languagename_by_pk(id: 13) {
      pokemon_v2_language {
        pokemon_v2_pokemonspeciesnames(
          where: { pokemon_species_id: { _eq: 10 } }
        ) {
          name
        }
        pokemon_v2_typenames(where: { type_id: { _eq: 10 } }) {
          name
        }
      }
    }
  }
`;

// export const POKEMON_DETAIL = gql`
//   query MyQuery {
//     pokemon_v2_pokemon(
//       limit: 10
//       offset: 0
//       order_by: { pokemon_species_id: asc }
//       where: {}
//     ) {
//       id
//       order
//       name
//       pokemon_species_id
//       pokemon_v2_pokemontypes {
//         pokemon_v2_type {
//           name
//           pokemon_v2_typenames(where: { language_id: { _eq: 3 } }) {
//             id
//             language_id
//             name
//             pokemon_v2_language {
//               pokemon_v2_pokemonspeciesnames(
//                 where: { pokemon_species_id: { _eq: 10 } }
//               ) {
//                 name
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;
// export const POKEMON_DETAIL = gql`
//   {
//     pokemon_v2_pokemon(
//       limit: 10
//       offset: 0
//       order_by: { pokemon_species_id: asc }
//     ) {
//       id
//       name
//       order
//       pokemon_species_id
//       pokemon_v2_pokemontypes {
//         pokemon_v2_type {
//           name
//           pokemon_v2_typenames(where: { language_id: { _eq: 3 } }) {
//             id
//             language_id
//             name
//           }
//         }
//         type_id
//       }
//     }
//   }
// `;
