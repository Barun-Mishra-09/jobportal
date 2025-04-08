import express from "express";
import {
  getAllSavedJobs,
  googleLogin,
  Login,
  Logout,
  Register,
  savedAllJobs,
  updateProfile,
} from "../controllers/user.controller.js";
import protectedRoute from "../middlewares/protectedRoute.js";
import { multiUpload, singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload, Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);

router
  .route("/profile/update")
  .post(protectedRoute, multiUpload, updateProfile);
router.route("/jobs/save/:id").put(protectedRoute, savedAllJobs);
router.route("/jobs/getallsavedjobs").get(protectedRoute, getAllSavedJobs);

// for googleApi
router.route("/google").get(googleLogin); // ✅ FIXED

export default router;
