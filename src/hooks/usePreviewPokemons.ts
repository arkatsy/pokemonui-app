import { useInfiniteQuery } from "@tanstack/react-query";

// TODO: Abstract some of the api logic to a custom fetcher
const API_URL = "https://pokeapi.co/api/v2/pokemon";

const DATA_SLICE = 20;

const getPokemonId = (url: string) => {
  const urlParts = url.split("/");
  return Number(urlParts[urlParts.length - 2]);
};

type PreviewPokemon = {
  id: number;
  name: string;
  image: string;
  types: {
    name: string;
    image: {
      default: string;
    };
  }[];
};

type PreviewPokemonList = {
  data: PreviewPokemon[];
  nextPage: number;
  previousPage: number;
};

// Fetches all the necessary pokemon data for the home page
const fetchPreviewPokemons = async ({ pageParam }: { pageParam: number }) => {
  // page n -> limit = DATA_SLICE, o = page * DATA_SLICE
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

    //NOTE: Could use `useQuery` here to also cache the data better.
    const pokemonDetails = await fetch(pokemonUrl);
    const pokemonDetailsData = await pokemonDetails.json();

    const pokemonId = getPokemonId(pokemonUrl);
    const pokemonImage =
      pokemonDetailsData.sprites.other.dream_world.front_default;

    const pokemonTypes = [];
    for (const type of pokemonDetailsData.types) {
      // TODO: cache the images
      pokemonTypes.push({
        name: type.type.name,
        image: await import(`../assets/png/${type.type.name}.png`),
      });
    }

    previewPokemonList.data.push({
      id: pokemonId,
      name: pokemonName,
      image: pokemonImage,
      types: pokemonTypes,
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
    getNextPageParam: (currentPage) => currentPage.nextPage,
    getPreviousPageParam: (currentPage) => currentPage.previousPage,
    staleTime: Infinity,
  });
};
