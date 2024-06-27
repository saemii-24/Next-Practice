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
      }
    }
  }
`;

export const KOREAN_POKEMONS = gql`
  query {
    pokemon_v2_languagename_by_pk(id: 13) {
      pokemon_v2_language {
        pokemon_v2_pokemonspeciesnames(offset: 0, limit: 10) {
          name
          pokemon_species_id
        }
      }
    }
  }
`;
