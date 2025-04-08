import express from "express";
import protectedRoute from "../middlewares/protectedRoute.js";
import {
  getApplicants,
  getAppliedJobs,
  jobApply,
  updateStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

router.route("/jobapply/:id").get(protectedRoute, jobApply);
router.route("/getappliedjobs").get(protectedRoute, getAppliedJobs);
router.route("/:id/getapplicants").get(protectedRoute, getApplicants);
router.route("/status/:id/update").post(protectedRoute, updateStatus);

export default router;
