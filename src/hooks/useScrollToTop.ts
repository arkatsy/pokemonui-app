import { useState, useEffect } from "react";

export const useScrollToTop = () => {
  const [shouldEnableScrollToTop, setShouldEnableScrollToTop] = useState(false);

  const handleScroll = () => {
    if (+window.scrollY.toFixed(0) > 400) {
      setShouldEnableScrollToTop(true);
    } else {
      setShouldEnableScrollToTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return shouldEnableScrollToTop;
};
