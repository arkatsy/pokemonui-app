import { useQuery } from "@tanstack/react-query";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

const DATA_SLICE = 20;

// Gets the pokemon id from the url
const getPokemonId = (url: string) => {
  const urlParts = url.split("/");
  return urlParts[urlParts.length - 2];
};

type PreviewPokemons = {
  id: string;
  name: string;
  image: string;
}[];

// Fetches all the necessary data for the preview pokemons in the home page
const fetchPreviewPokemons = async () => {
  // `limit` limits the result to n pokemons and `offset` skips the first n pokemons
  const response = await fetch(`${API_URL}?limit=${DATA_SLICE}&offset=0`);
  const data = await response.json();

  // Fetches the data for each pokemon
  const previewPokemons: PreviewPokemons = [];
  for (const pokemon of data.results) {
    const pokemonName = pokemon.name;
    const pokemonUrl = pokemon.url;

    // Could use `useQuery` here to also cache the data better.
    const pokemonDetails = await fetch(pokemonUrl);
    const pokemonDetailsData = await pokemonDetails.json();

    const pokemonId = getPokemonId(pokemonUrl);
    const pokemonImage =
      pokemonDetailsData.sprites.other.dream_world.front_default;

    previewPokemons.push({
      id: pokemonId,
      name: pokemonName,
      image: pokemonImage,
    });
  }

  return previewPokemons;
};

export const usePreviewPokemons = () => {
  return useQuery({
    queryKey: ["pokemons"],
    queryFn: fetchPreviewPokemons,
    staleTime: Infinity,
  });
};
