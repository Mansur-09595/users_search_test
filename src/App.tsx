import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UserSearch from "./componets/UserSearch";
import Search from "./componets/Search";

const theme = createTheme();

const App = () => {
  const [searchResult, setSearchResult] = useState<{ email: string; number: string }[]>([]);
  const [error, setError] = useState("");

  const handleSearch = async (email: string, number: string) => {
    setError("");

    try {
      const response = await fetch("http://localhost:3001/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, number }),
      });

      if (!response.ok) {
        throw new Error("Поисковый запрос не выполнен");
      }

      const data = await response.json();
      setSearchResult(data);
    } catch (error) {
      setError("При поиске произошла ошибка.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <UserSearch onSearch={handleSearch} />
      <Search searchResult={searchResult} error={error} />
    </ThemeProvider>
  );
};

export default App;
