import { Router } from "express";

const router = Router();

import {
  getUsers,
  createUser,
  deleteUser,
} from "../controllers/users.controller.js";

router.get("/users", getUsers);

router.post("/users", createUser);

router.delete("/users/:id", deleteUser);

export default router;
