import express from "express";
import { deleteUser, updateUser } from "../Controllers/UserController.js";
import { middleware } from "../Middleware/Middleware.js";

const router = express.Router();

router.put("/update/:id",middleware,updateUser);
router.delete("/delete/:id",middleware,deleteUser);

export default router;