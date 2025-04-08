import { Job } from "../models/job.model.js";

// Admin job create i.e Post kiya hai
export const jobPost = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const userId = req.id; // userId == loggedInUserId

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Some fields are missing , so fill it and try again later...",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "New Job Created Successfully ",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Students find all the job
export const getAllJob = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    // $options: "i" == case sensitive na ho like capital likhe ya small dono mai work kare search ke liye
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    // Here we will use .populate method for showing the company all detail's
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Students find the job by the JobId
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    // yaha pe populat use hoga
    const job = await Job.findById(jobId).populate({
      path: "application",
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Admin kitne job create kiya hai abhi tak
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;

    // jaha bhi populate use hoga
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      createdAt: -1,
    });

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// user ka id == req.id
// postId = req.params;

// fetch karne ka

// Self code start from here
// for deleting my job
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedJobs = await Job.findByIdAndDelete(id);

    if (!deletedJobs) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // now job successfully deleted
    res.json({
      message: "Job deleted Successully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

import mongoose from "mongoose";

export const updateJob = async (req, res) => {
  try {
    // Extract jobId from request params
    const { id } = req.params;

    // Check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Job ID",
        success: false,
      });
    }

    // Extract updated fields from request body
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    // Find the job by ID
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    // Update job fields
    job.title = title || job.title;
    job.description = description || job.description;
    job.requirements = requirements
      ? requirements.split(",")
      : job.requirements;
    job.salary = salary ? Number(salary) : job.salary;
    job.location = location || job.location;
    job.jobType = jobType || job.jobType;
    job.experienceLevel = experience || job.experienceLevel;
    job.position = position || job.position;
    job.company = companyId || job.company;

    // Save updated job
    await job.save();

    return res.status(200).json({
      message: "Job Updated Successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.error("Update Job Error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
