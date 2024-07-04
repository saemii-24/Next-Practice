import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query MyQuery {
    pokemon_v2_pokemonspeciesname(
      order_by: { pokemon_species_id: asc }
      where: { language_id: { _eq: 3 } }
      limit: 10
      offset: 0
    ) {
      name
      pokemon_species_id
      pokemon_v2_pokemonspecy {
        pokemon_v2_pokemons {
          pokemon_v2_pokemontypes {
            pokemon_v2_type {
              name
            }
          }
          pokemon_v2_pokemonsprites {
            pokemon_v2_pokemon {
              pokemon_v2_pokemonsprites {
                sprites
              }
            }
          }
        }
      }
    }
  }
`;

export const typeLanguage = {
  normal: "노말",
  fighting: "격투",
  flying: "비행",
  poison: "독",
  ground: "땅",
  rock: "바위",
  bug: "벌레",
  ghost: "고스트",
  steel: "강철",
  fire: "불꽃",
  water: "물",
  grass: "풀",
  electric: "전기",
  psychic: "에스퍼",
  ice: "얼음",
  dragon: "드래곤",
  dark: "악",
  fairy: "페어리",
  stellar: "스텔라",
  unknown: "???",
  shadow: "다크",
};
