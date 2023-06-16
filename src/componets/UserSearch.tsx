import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";

interface UserSearchProps {
  onSearch: (email: string, number: string) => void;
}

const UserSearch: React.FC<UserSearchProps> = ({ onSearch }) => {
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(email, number);
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 40 }}>
      <Typography variant="h4" align="center" gutterBottom>
        User Search
      </Typography>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
        <div>
          <TextField
            label="Number"
            type="text"
            inputProps={{ inputMode: "numeric" }}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
        <Button type="submit" variant="contained" fullWidth>
          Search
        </Button>
      </form>
    </Container>
  );
};

export default UserSearch;
