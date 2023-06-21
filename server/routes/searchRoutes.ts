import { Router } from "express";
import { searchHandler } from "../controllers/searchController";

const router = Router();

router.post("/search", searchHandler);

export default router;
