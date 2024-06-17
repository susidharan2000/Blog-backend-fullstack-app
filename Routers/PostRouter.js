import express from "express";
import { createPost, getAllPosts } from "../Controllers/PostController.js";
import { middleware } from "../Middleware/Middleware.js";

const router = express.Router();

router.post('/createpost',middleware,createPost);
router.get('/getallpost',getAllPosts);

export default router;