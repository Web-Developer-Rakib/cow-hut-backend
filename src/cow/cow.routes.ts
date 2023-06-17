import {
  createCows,
  deleteCow,
  getAllCows,
  getSingleCow,
  updateCow,
} from "./cow.controller";

import express from "express";
const cowRouter = express.Router();

cowRouter.get("/:cowId", getSingleCow);
cowRouter.put("/:cowId", updateCow);
cowRouter.get("/", getAllCows);
cowRouter.post("/create", createCows);
cowRouter.delete("/:cowId", deleteCow);

export default cowRouter;
