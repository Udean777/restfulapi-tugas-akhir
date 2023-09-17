import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  login,
} from "./userController.js";
import express from "express";
import { verifyToken } from "../../auth/tokenValidation.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.patch("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.post("/login", login);

export default router;
