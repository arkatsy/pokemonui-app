import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

const DATA_SLICE = 20;

// Gets the pokemon id from the url
const getPokemonId = (url: string) => {
  const urlParts = url.split("/");
  return Number(urlParts[urlParts.length - 2]);
};

type PreviewPokemon = {
  id: number;
  name: string;
  image: string;
};

type PreviewPokemonList = {
  data: PreviewPokemon[];
  nextPage: number;
  previousPage: number;
};

// Fetches all the necessary data for the preview pokemons in the home page
const fetchPreviewPokemons = async ({ pageParam }: { pageParam: number }) => {
  // `limit` limits the result to n pokemons and `offset` skips the first n pokemons

  // page 0 -> l = 20, o = 0
  // page 1 -> l = 20, o = 20
  // page 2 -> l = 20, o = 40
  // page 3 -> l = 20, o = 60
  // page 4 -> l = 20, o = 80
  // ...
  // page n -> l = 20, o = n * 20
  const response = await fetch(
    `${API_URL}?limit=${DATA_SLICE}&offset=${pageParam * DATA_SLICE}`
  );
  const data = await response.json();

  // Fetches the data for each pokemon
  const previewPokemonList: PreviewPokemonList = {
    data: [],
    nextPage: pageParam + 1,
    previousPage: pageParam - 1,
  };
  for (const pokemon of data.results) {
    const pokemonName = pokemon.name;
    const pokemonUrl = pokemon.url;

    // Could use `useQuery` here to also cache the data better.
    const pokemonDetails = await fetch(pokemonUrl);
    const pokemonDetailsData = await pokemonDetails.json();

    const pokemonId = getPokemonId(pokemonUrl);
    const pokemonImage =
      pokemonDetailsData.sprites.other.dream_world.front_default;

    previewPokemonList.data.push({
      id: pokemonId,
      name: pokemonName,
      image: pokemonImage,
    });
  }

  if (previewPokemonList.data.length < DATA_SLICE)
    previewPokemonList.nextPage = -1;

  return previewPokemonList;
};

export const usePreviewPokemons = () => {
  return useInfiniteQuery({
    queryKey: ["pokemons"],
    queryFn: ({ pageParam = 0 }) => fetchPreviewPokemons({ pageParam }),
    getNextPageParam: (lastPage, pages) => lastPage.nextPage,
    getPreviousPageParam: (firstPage, pages) => firstPage.previousPage,
    staleTime: Infinity,
  });
};
