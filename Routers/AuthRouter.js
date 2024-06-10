import express from "express";
import { google, login, registerUser } from "../Controllers/AuthController.js";

const router = express.Router();

router.post('/registeruser',registerUser);
router.post('/loginuser',login);
router.post('/google',google);



export default router;