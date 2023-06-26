import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "./user.controller";

import express from "express";
const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:userId", getSingleUser);
userRouter.put("/:userId", updateUser);
userRouter.delete("/:userId", deleteUser);

export default userRouter;
