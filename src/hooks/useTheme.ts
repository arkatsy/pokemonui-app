import { useState, useEffect } from "react";

type Theme = "light" | "dark";

const getThemeFromLocalStorage = (): Theme => {
  const theme = localStorage.getItem("theme");
  if (theme === "light" || theme === "dark") {
    return theme;
  }
  return "light";
};

const setThemeToLocalStorage = (theme: Theme) => {
  localStorage.setItem("theme", theme);
};

export function useTheme() {
  const storageTheme = getThemeFromLocalStorage();
  const [theme, setTheme] = useState<Theme>(storageTheme);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setThemeToLocalStorage(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return [theme, toggleTheme] as const;
}
