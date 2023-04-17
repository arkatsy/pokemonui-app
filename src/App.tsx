import styles from "./styles/home.module.css";
import { ThemeSwitch } from "./components";
import { usePreviewPokemons } from "./hooks/usePreviewPokemons";
import { useInView } from "react-intersection-observer";
import { Fragment, useEffect, useState } from "react";

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
  const [scrollToTopBtn, setScrollToTopBtn] = useState(false);

  const handleScroll = () => {
    if (+window.scrollY.toFixed(0) > 400) {
      setScrollToTopBtn(true);
    } else {
      setScrollToTopBtn(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

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
            data.pages.map((page, idx) => (
              <Fragment key={idx}>
                {page.data.map((pokemon) => (
                  <div className={styles.pokemonCard} key={pokemon.id}>
                    <h1 className={styles.pokemonTitle}>{pokemon.name}</h1>
                    <img
                      draggable={false}
                      className={styles.pokemonImage}
                      src={pokemon.image}
                      alt={`${pokemon.name} image`}
                    />
                  </div>
                ))}
              </Fragment>
            ))}

          {hasNextPage && (
            <div ref={ref} className={styles.loading}>
              {isFetchingNextPage ? "Loading more..." : "Load More"}
            </div>
          )}
        </main>
      </div>
      {scrollToTopBtn && (
        <button
          onClick={scrollToTop}
          className={styles.scrollToTopBtn}
          aria-label="Scroll to top"
        >
          <ScrollUpIcon />
        </button>
      )}
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

function ScrollUpIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
      />
    </svg>
  );
}

export default App;
