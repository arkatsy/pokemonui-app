import { Fragment } from "react";
import styles from "./homeSkeletonsGrid.module.css";

const SKELETONS = 20;

export function HomeSkeletonsGrid() {
  return (
    <Fragment>
      {Array.from({ length: SKELETONS }, (_, i) => (
        <div key={i} className={styles.skeleton}></div>
      ))}
    </Fragment>
  );
}
