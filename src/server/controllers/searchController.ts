// controllers/searchController.ts
import { Request, Response } from 'express';
import { SearchRequest } from '../models/types';
import { users } from '../models/usersData';

let searchTimeout: NodeJS.Timeout | null = null;

export const searchHandler = async (req: Request, res: Response) => {
  const { email, number }: SearchRequest = req.body;

  // Validate email and number fields
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  if (number && !/^\d{6}$/.test(number)) {
    return res.status(400).json({ error: 'Number is invalid' });
  }

  // Cancel previous search if exists
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  try {
    // Simulate a delay of 5 seconds for the search
    await new Promise<void>((resolve) => {
      searchTimeout = setTimeout(resolve, 5000);
    });

    const filteredUsers = users.filter((user) => {
      if (email && user.email !== email) {
        return false;
      }

      if (number && user.number !== number) {
        return false;
      }

      return true;
    });

    res.json(filteredUsers);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during the search.' });
  }
};
