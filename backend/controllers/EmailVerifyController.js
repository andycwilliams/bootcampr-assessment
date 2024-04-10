import { Router } from "express";
import UserModel from "../models/UserModel.js";

const emailVerifyRouter = Router();

emailVerifyRouter.get("/users/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default emailVerifyRouter;
