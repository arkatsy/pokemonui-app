import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

type Theme = "light" | "dark";

export function useTheme() {
  const [storageTheme, setStorageTheme] = useLocalStorage<Theme>("theme");
  const [theme, setTheme] = useState<Theme>(storageTheme);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setStorageTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return [theme, toggleTheme] as const;
}
