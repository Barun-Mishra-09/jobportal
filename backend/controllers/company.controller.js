import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import mongoose from "mongoose";

export const companyRegister = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(401).json({
        message: "Company name is required",
        success: false,
      });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(401).json({
        message: "You can't register same company ",
        success: false,
      });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;

    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "Companies are not found",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// get companies by id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id; // profile/:id is an example of the req.params.id

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company are not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// updateAllCompany information
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    // Additionally add logo as per

    // idhar cloudinary aagega
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url;

    const updateData = { name, description, website, location, logo };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(401).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Comany information updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// By my own company delete
export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid company ID",
        success: false,
      });
    }

    // company find jo is user ki ho
    const company = await Company.findOne({ _id: id, userId: req.id });

    if (!company) {
      return res.status(404).json({
        message: "Company not found or you are not authenticated to delete it",
        success: false,
      });
    }
    await Company.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Company deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
