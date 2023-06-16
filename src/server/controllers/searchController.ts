import { Request, Response } from "express";
import { SearchRequest } from "../models/types";
import { users } from "../models/usersData";

let searchTimeout: NodeJS.Timeout | null = null;

export const searchHandler = async (req: Request, res: Response) => {
  const { email, number }: SearchRequest = req.body;

  // Проверка полей электронной почты и номера
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (number && !/^\d{6}$/.test(number)) {
    return res.status(400).json({ error: "Number is invalid" });
  }

  // Отменить предыдущий поиск, если он существует
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  try {
    // Имитировать задержку в 5 секунд для поиска
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
    res.status(500).json({ error: "При поиске произошла ошибка." });
  }
};
