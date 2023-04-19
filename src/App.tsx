import styles from "@/styles/home.module.css";
import {
  ScrollToTopBtn,
  Topbar,
  PokemonCard,
  HomeSkeletonsGrid,
} from "@/components";
import { usePreviewPokemons, useScrollToTop } from "@/hooks";
import { useInView } from "react-intersection-observer";
import { Fragment, useEffect } from "react";

function App() {
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = usePreviewPokemons();
  const { ref, inView } = useInView();
  const shouldScrollToTop = useScrollToTop();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className={styles.page}>
      <Topbar />
      <div className={styles.mainContainer}>
        <main className={styles.mainContent}>
          {status === "loading" && <HomeSkeletonsGrid />}
          {status === "success" &&
            data.pages.map((page, idx) => (
              <Fragment key={idx}>
                {page.data.map((pokemon) => (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
              </Fragment>
            ))}

          {shouldScrollToTop && <ScrollToTopBtn />}

          {hasNextPage && (
            <div ref={ref} className={styles.loading}>
              {/* TODO: Add loading spinner  */}
              {isFetchingNextPage ? <p>Loading more... </p> : null}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
