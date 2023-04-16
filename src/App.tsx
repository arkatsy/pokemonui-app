import styles from "./styles/home.module.css";
import { ThemeSwitch } from "./components";
import { usePreviewPokemons } from "./hooks/usePreviewPokemons";

function App() {
  const { data, isLoading, isError } = usePreviewPokemons();

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <header className={styles.header}>
          <Brand />
          <ThemeSwitch />
        </header>
      </div>
      <div className={styles.mainContainer}>
        <main className={styles.mainContent}>
          {data &&
            data.map((pokemon) => (
              <div className={styles.pokemonCard} key={pokemon.id}>
                <h1 className={styles.pokemonTitle}>{pokemon.name}</h1>
                <div>
                  <img
                    draggable={false}
                    className={styles.pokemonImage}
                    src={pokemon.image}
                    alt={`${pokemon.name} image`}
                  />
                </div>
              </div>
            ))}
        </main>
      </div>
    </div>
  );
}

function Brand() {
  return (
    <a href="/">
      <h1>
        <span>Poké</span>mons
      </h1>
    </a>
  );
}

export default App;
