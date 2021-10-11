import { Router } from "express";
import { protect } from "../controllers/auth.controller";
import { createPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post.controller";

const router = Router();

router.route('/').get(protect, getPosts).post(createPost);
router.route('/:id').get(getPost).patch(updatePost).delete(deletePost);

export default router;




