import { Brand, ThemeSwitch } from "@/components";
import styles from "./topbar.module.css";

export function Topbar() {
  return (
    <div className={styles.topbar}>
      <header className={styles.header}>
        <Brand />
        <ThemeSwitch />
      </header>
    </div>
  );
}
