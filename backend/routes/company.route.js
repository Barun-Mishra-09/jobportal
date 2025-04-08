import express from "express";

import protectedRoute from "../middlewares/protectedRoute.js";
import {
  companyRegister,
  deleteCompany,
  getCompany,
  getCompanyById,
  updateCompany,
} from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/companyregister").post(protectedRoute, companyRegister);
router.route("/getcompany").get(protectedRoute, getCompany);
router.route("/getcompanybyid/:id").get(protectedRoute, getCompanyById);
router
  .route("/updatecompany/:id")
  .put(protectedRoute, singleUpload, updateCompany);
router.route("/delete/:id").delete(protectedRoute, deleteCompany);

export default router;
