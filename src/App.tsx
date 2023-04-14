import styles from "./styles/home.module.css";
import { ThemeSwitch } from "./components";

function App() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Pokemons</h1>
        <ThemeSwitch />
      </header>
      <main>Main app</main>
    </div>
  );
}

export default App;
