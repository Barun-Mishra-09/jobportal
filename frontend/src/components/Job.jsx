import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { saveJob, unsaveJob } from "@/redux/jobSlice";
import { motion } from "framer-motion";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedJobs = useSelector((state) => state.job.savedJobs || []);
  const [isSaved, setIsSaved] = useState(false);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (24 * 60 * 60 * 1000));
  };

  useEffect(() => {
    if (Array.isArray(savedJobs)) {
      const saved = savedJobs.some((savedJob) => savedJob?._id === job?._id);
      setIsSaved(saved);
    } else {
      setIsSaved(false);
    }
  }, [savedJobs, job]);

  const bookmarkHandler = async () => {
    if (!job?._id) {
      toast.error("Invalid job ID");
      return;
    }

    try {
      const res = await axios.put(
        `${USER_API_END_POINT}/jobs/save/${job._id}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(
          res?.data?.message ||
            (isSaved ? "Job unsaved successfully" : "Job saved successfully")
        );

        if (isSaved) {
          dispatch(unsaveJob(job));
        } else {
          dispatch(saveJob(job));
        }

        setIsSaved((prev) => !prev);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to save job");
    }
  };

  const saveAndNavigateHandler = async () => {
    if (!job?._id) {
      toast.error("Invalid job ID");
      return;
    }

    try {
      const res = await axios.put(
        `${USER_API_END_POINT}/jobs/save/${job._id}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res?.data?.message || "Job saved successfully");

        if (!isSaved) {
          dispatch(saveJob(job));
          setIsSaved(true);
          navigate("/jobs/save");
        } else {
          toast.info("Job is already saved!");
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to save job");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 3, scale: 1 }}
      whileHover={{
        scale: 1.0001,
        boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
      }}
      transition={{ duration: 0.2 }}
      className="p-3 sm:p-4 lg:p-5 rounded-lg bg-gradient-to-br from-blue-50 via-pink-50 to-violet-50 w-full border border-violet-400 mb-2 lg:mb-2 md:mb-2 sm:mb-2"
    >
      {/* Days Ago and Bookmark */}
      <div className="flex items-center justify-between">
        <p className="font-medium text-sm md:text-base lg:text-base text-gray-600">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  onClick={bookmarkHandler}
                  variant="outline"
                  size="icon"
                  className={`rounded-full w-9 h-9 ${
                    isSaved
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-500 hover:text-white"
                  }`}
                >
                  {isSaved ? (
                    <BookmarkCheck className="w-5 h-5" />
                  ) : (
                    <Bookmark className="w-5 h-5" />
                  )}
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent className="bg-blue-600 text-white px-3 py-2 rounded-lg shadow-md text-sm font-medium">
              {isSaved ? "✅ Job Saved!" : "🔖 Save this job to your bookmarks"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Company Logo and Info */}
      <div className="flex items-center gap-3 my-2">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button className="p-3" variant="outline" size="icon">
            <Avatar>
              <AvatarImage
                src={job?.company?.logo}
                className="w-10 h-10 object-contain"
              />
            </Avatar>
          </Button>
        </motion.div>
        <div>
          <h1 className="font-bold text-base sm:text-xl md:text-2xl text-[#6D28D9]">
            {job?.company?.name}
          </h1>
          <p className="font-semibold text-sm sm:text-base md:text-lg text-[#F83002]">
            India
          </p>
        </div>
      </div>

      {/* Job Title and Description */}
      <div>
        <h1 className="font-bold text-lg sm:text-xl md:text-2xl my-2 text-[#2563EB]">
          {job?.title}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 line-clamp-2">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-5 my-3 flex-wrap ">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Badge
            className="text-[#DC2626] border-[#DC2626] bg-red-100 cursor-pointer text-sm sm:text-sm "
            variant="outline"
          >
            {job?.position} Positions
          </Badge>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
          <Badge
            className="text-[#2563EB] border-[#1E90FF] bg-blue-100 cursor-pointer text-sm"
            variant="outline"
          >
            {job?.jobType}
          </Badge>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Badge
            className="text-[#8A2BE2] border-[#8A2BE2] bg-purple-100 cursor-pointer text-sm"
            variant="outline"
          >
            {job?.salary} LPA
          </Badge>
        </motion.div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 py-1">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  onClick={() => navigate(`/description/${job?._id}`)}
                  variant="outline"
                  className="text-gray-950 border-emerald-500 bg-emerald-100 hover:bg-green-500 hover:text-white text-sm px-4 py-2 w-full sm:w-auto"
                >
                  Details
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent className="bg-emerald-500 text-white px-3 py-2 rounded-lg shadow-lg text-sm">
              💡 Curious? Learn more about this role!
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  onClick={saveAndNavigateHandler}
                  className={`${
                    isSaved ? "bg-[#5812d0]" : "bg-[#8A2BE2]"
                  } hover:bg-[#5812d0] w-full sm:w-auto lg:w-auto md:w-full text-sm px-3 py-2 text-center`}
                >
                  {isSaved ? "Saved!" : "Save for Later"}
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent className="bg-[#6B21A8] text-white px-3 py-2 rounded-lg shadow-md text-sm">
              {isSaved
                ? "✅ Job already saved!"
                : "⭐ Want to save this job for later? Click to bookmark!"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </motion.div>
  );
};

export default Job;
