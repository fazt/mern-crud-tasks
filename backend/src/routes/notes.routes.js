import { Router } from "express";
const router = Router();

import {
  getNotes,
  createNote,
  getNote,
  deleteNote,
  updateNote,
} from "../controllers/notes.controller.js";

router.get("/notes", getNotes);

router.post("/notes", createNote);

router.get("/notes/:id", getNote);

router.delete("/notes/:id", deleteNote);

router.put("/notes/:id", updateNote);

export default router;
