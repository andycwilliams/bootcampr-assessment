import express from "express";
import { getHelloWorld } from "../controllers/hello-world.js";
import userRouter from "../controllers/UserController.js";
import emailVerifyRouter from "../controllers/EmailVerifyController.js";

const router = express.Router();

// Hello World!
router.get("/hello-world", getHelloWorld);

router.get("/users/:email", emailVerifyRouter);

router.get("/users", userRouter);
router.get("/users/:id", userRouter);
router.post("/users", userRouter);
router.put("/users/:id", userRouter);
router.delete("/users/:id", userRouter);

export default router;
