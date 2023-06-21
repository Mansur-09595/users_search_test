import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UserSearch from "./componets/UserSearch";
import Search from "./componets/Search";

const theme = createTheme();

const App = () => {
  const [searchResult, setSearchResult] = useState<{ email: string; number: string }[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const handleSearch = async (email: string, number: string) => {
    setError("");
    setLoading(true);

    if (abortController) {
      abortController.abort(); // Отменить предыдущий запрос
    }

    const controller = new AbortController();
    setAbortController(controller);

    try {
      const response = await fetch("http://localhost:3001/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, number }),
        signal: controller.signal, // Передача сигнала отмены запроса
      });

      if (!response.ok) {
        throw new Error("Поисковый запрос не выполнен");
      }

      const data = await response.json();
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      setError("При поиске произошла ошибка.");
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (abortController) {
        abortController.abort(); // Отменить запрос при размонтировании компонента
      }
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <UserSearch onSearch={handleSearch} />
      <Search searchResult={searchResult} error={error} loading={loading} />
    </ThemeProvider>
  );
};

export default App;
