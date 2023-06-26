import express from "express";
import { createAdmin, loginAdmin } from "./admin.controller";
const adminRouter = express.Router();

adminRouter.post("/create-admin", createAdmin);
adminRouter.post("/login", loginAdmin);

export default adminRouter;
