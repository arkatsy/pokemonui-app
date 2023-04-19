import styles from "./brand.module.css";

export function Brand() {
  return (
    <a href="/">
      <h1 className={styles.brand}>
        <span>Poké</span>mons
      </h1>
    </a>
  );
}
