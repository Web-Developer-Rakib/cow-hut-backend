import {
  createCow,
  deleteCow,
  getAllCows,
  getSingleCow,
  updateCow,
} from "./cow.controller";

import express from "express";
const cowRouter = express.Router();

cowRouter.post("/create-cow", createCow);
cowRouter.get("/:cowId", getSingleCow);
cowRouter.put("/:cowId", updateCow);
cowRouter.get("/", getAllCows);
cowRouter.delete("/:cowId", deleteCow);

export default cowRouter;
