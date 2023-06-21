import { Request, Response } from "express";
import { SearchRequest } from "../models/types";
import { users } from "../models/usersData";

export const searchHandler = (req: Request, res: Response) => {
  const { email, number }: SearchRequest = req.body;

  // Проверка поля электронной почты
  if (!email) {
    return res.status(422).json({ error: "Email is required" });
  }

  // Проверка поля номера
  if (number && !/^\d{6}$/.test(number)) {
    return res.status(422).json({ error: "Number is invalid" });
  }

  // Имитация задержки в 5 секунд
  setTimeout(() => {
    try {
      const filteredUsers = users.filter((user) => {
        if (number && user.number !== number) {
          return false;
        }
        return true;
      });

      const searchResult = filteredUsers.filter((user) => user.email === email);

      res.json(searchResult);
    } catch (error) {
      res.status(500).json({ error: "An error occurred during the search." });
    }
  }, 5000);
};
