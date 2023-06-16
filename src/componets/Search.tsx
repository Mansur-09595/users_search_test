import React from 'react';
import { Typography, Container  } from '@mui/material';

interface SearchResult {
  email: string;
  number: string;
}

interface SearchProps {
  searchResult: SearchResult[];
  error: string;
}

const Search: React.FC<SearchProps> = ({ searchResult, error }) => {
  const formatNumber = (number: string) => {
    return number.replace(/(\d{2})(?=\d)/g, '$1-'); // Add hyphens every two digits
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>

        {error && <Typography color="error">{error}</Typography>}
        {searchResult.length > 0 && (
          <div>
            <Typography variant="h6" gutterBottom>
              Search Result:
            </Typography>
            <ul>
              {searchResult.map((user, index) => (
                <li key={index}>
                  Email: {user.email}, Number: {formatNumber(user.number)}
                </li>
              ))}
            </ul>
          </div>
        )}
    </Container>
  );
};

export default Search;
