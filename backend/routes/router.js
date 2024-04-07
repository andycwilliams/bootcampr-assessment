import { Router } from "express";
import { getHelloWorld } from "../controllers/hello-world.js";
import userRouter from "../controllers/UserController.js";

const router = Router();

// Hello World!
router.get("/hello-world", getHelloWorld);

router.get("/users", userRouter);

export default router;
