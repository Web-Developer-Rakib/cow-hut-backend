import {
  createUsers,
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "./user.controller";

import express from "express";
const userRouter = express.Router();

userRouter.get("/:userId", getSingleUser);
userRouter.put("/:userId", updateUser);
userRouter.get("/", getAllUsers);
userRouter.post("/create", createUsers);
userRouter.delete("/:userId", deleteUser);

export default userRouter;
