import styles from "./pokemonCard.module.css";

interface Pokemon {
  name: string;
  id: number;
  image: string;
  types: {
    name: string;
    image: {
      default: string;
    };
  }[];
}

type PokemonCardProps = {
  pokemon: Pokemon;
};

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className={styles.pokemonCard} key={pokemon.id}>
      <div className={styles.pokemonInfo}>
        <h1 className={styles.pokemonTitle}>{pokemon.name}</h1>
        <div className={styles.pokemonType}>
          {pokemon.types.map((type, idx) => (
            <img
              className={styles.pokemonType}
              key={idx}
              src={type.image.default}
              alt={type.name}
            />
          ))}
        </div>
      </div>
      <img
        draggable={false}
        className={styles.pokemonImage}
        src={pokemon.image}
        alt={`${pokemon.name} image`}
      />
    </div>
  );
}
