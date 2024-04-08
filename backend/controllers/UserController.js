import { Router } from "express";
import UserModel from "../models/UserModel.js";
import mongoose from "mongoose";

const userRouter = Router();

userRouter.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid user ID" });
    }
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

userRouter.post("/users", async (req, res) => {
  try {
    const userData = req.body;
    const newUser = new UserModel(userData);
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

userRouter.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid user ID" });
    }
    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

userRouter.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid user ID" });
    }
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send({ message: "User successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default userRouter;
