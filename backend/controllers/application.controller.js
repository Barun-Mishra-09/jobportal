import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const jobApply = async (req, res) => {
  try {
    const userId = req.id; // loggedIn userId
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(401).json({
        message: "Job is required",
        success: true,
      });
    }

    // check if the user already applied for the job
    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (alreadyApplied) {
      return res.status(401).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    // check if the jobs existed or not
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    // Create a new Application for the new applicant
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    // job mai application ki id daalna hai
    job.application.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Job applied successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id; // loggedIn userid

    // .sort({createdAt: -1}) iska jo chahiye wo sorted order mai ho accending order mai

    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: true,
      });
    }

    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// admin dekhega kitna user ne apply kiya hai
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "application",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
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

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(401).json({
        message: "status is required",
        success: false,
      });
    }

    // find the application by applicationId
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    // update the status
    application.status = status;
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
