import { useEffect } from "react";
import Navbar from "./shared/Navbar";
import { Button } from "../components/ui/button";
import Job from "../components/Job";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setSavedJobs } from "@/redux/jobSlice";
import { ArrowLeft } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const SavePost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedJobs = useSelector((state) => state.job.savedJobs || []);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        console.log(
          "Fetching saved jobs from:",
          `${USER_API_END_POINT}/jobs/getallsavedjobs`
        );
        const res = await axios.get(
          `${USER_API_END_POINT}/jobs/getallsavedjobs`,
          { withCredentials: true }
        );

        console.log("API Response:", res.data);

        if (res.data.success && Array.isArray(res.data.savedJobs)) {
          dispatch(setSavedJobs(res.data.savedJobs));
          toast.success("Saved jobs loaded successfully!");
        } else {
          console.log("No saved jobs found or invalid data:", res.data);
          dispatch(setSavedJobs([]));
          toast.info("No saved jobs available.");
        }
      } catch (error) {
        console.error(
          "Error fetching saved jobs:",
          error.response?.data || error.message
        );
        toast.error(
          error?.response?.data?.message || "Failed to load saved jobs"
        );
        dispatch(setSavedJobs([]));
      }
    };

    fetchSavedJobs();
  }, [dispatch]);

  console.log("Current savedJobs in Redux:", savedJobs);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-3xl text-[#F83002] text-center mb-6">
          Your Saved Jobs : ({savedJobs.length})
        </h1>

        {savedJobs.length !== 0 && (
          <div className="flex items-center md:justify-center lg:justify-start lg:ml-14 sm:justify-center">
            <Button
              onClick={() => navigate("/jobs")}
              className="my-4 bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center "
            >
              <ArrowLeft className="h-5 w-5" />
              Back
            </Button>
          </div>
        )}
        {savedJobs.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="text-2xl text-blue-500 font-bold">
              No saved jobs found 😟.
            </p>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => navigate("/jobs")}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Browse Jobs
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-700 text-white px-2 py-2 rounded-lg shadow-md">
                  👈🏻 Want to back to jobs section ?
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs.map((savedJob) => (
              <Job key={savedJob._id} job={savedJob} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavePost;
