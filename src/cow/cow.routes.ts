import {
  createCow,
  deleteCow,
  getAllCows,
  getSingleCow,
  updateCow,
} from "./cow.controller";

import express from "express";
const cowRouter = express.Router();

cowRouter.post("/", createCow);
cowRouter.get("/", getAllCows);
cowRouter.get("/:cowId", getSingleCow);
cowRouter.put("/:cowId", updateCow);
cowRouter.delete("/:cowId", deleteCow);

export default cowRouter;
