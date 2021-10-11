import { Router } from "express";
import { getUsers, signin, signup } from "../controllers/auth.controller";

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/users', getUsers);


export default router;