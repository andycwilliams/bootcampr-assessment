import { Router } from "express";
import UserModel from "../models/UserModel.js";

const router = Router();

// router.post("/users", async (req, res) => {});

router.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// router.get("/users/:id", async (req, res) => {});

// router.patch("/users/:id", async (req, res) => {});

// router.delete("/users/:id", async (req, res) => {});

export default router;
