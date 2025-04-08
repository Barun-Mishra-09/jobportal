import express from "express";
import protectedRoute from "../middlewares/protectedRoute.js";
import {
  deleteJob,
  getAdminJobs,
  getAllJob,
  getJobById,
  jobPost,
  updateJob,
} from "../controllers/job.controller.js";
const router = express.Router();

router.route("/postJob").post(protectedRoute, jobPost);

router.route("/allJob").get(protectedRoute, getAllJob);

router.route("/jobById/:id").get(protectedRoute, getJobById);

// for admin job get job
router.route("/adminJob").get(protectedRoute, getAdminJobs);
// for deleting job by myself code
router.route("/delete/:id").delete(protectedRoute, deleteJob);
// for updating the job by myself code
router.route("/update/:id").put(protectedRoute, updateJob);

export default router;
