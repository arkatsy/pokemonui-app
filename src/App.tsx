import styles from "./styles/home.module.css";
import { ThemeSwitch } from "./components";

function App() {
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
          <p>Main App Content</p>
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
