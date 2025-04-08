import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { JOB_API_END_POINT } from "@/utils/constant";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";

import { setSingleJob } from "@/redux/jobSlice";

const JobSetUp = () => {
  const { companies } = useSelector((store) => store.company);
  const { id: jobId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Fetch existing job data when editing
  useEffect(() => {
    if (!jobId) return;

    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/jobById/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success && res.data.job) {
          dispatch(setSingleJob(res.data.job));
          const job = res.data.job;
          setInput({
            title: job.title || "",
            description: job.description || "",
            requirements: job.requirements ? job.requirements.join(", ") : "",
            salary: job.salary || "",
            location: job.location || "",
            jobType: job.jobType || "",
            experience: job.experienceLevel || "",
            position: job.position || "",
            companyId: job.company || "",
          });
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch job details");
      }
    };

    fetchJob();
  }, [jobId, dispatch]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const submitEventHandler = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      console.log("Updating Job with Data:", input);
      console.log("Job ID:", jobId);

      const res = await axios.put(
        `${JOB_API_END_POINT}/update/${jobId}`,
        input,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Job Updated Successfully");
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-full my-5 px-2 sm:px-4">
        {/* Responsive :- after shadow-violet-400 */}
        <form
          onSubmit={submitEventHandler}
          className="shadow-lg rounded-lg border-2 border-violet-300 shadow-violet-400 w-full max-w-full sm:max-w-lg md:max-w-3xl xl:max-w-3xl  p-4 sm:p-6 md:p-9"
        >
          <div className="flex  sm:gap-6 md:gap-8 ">
            {/* Responsive:- after hover:bg */}
            <Button
              onClick={() => navigate("/admin/jobs")}
              className="text-base text-[white] bg-[#4A38C2] hover:bg-[#5812d0] flex items-center gap-2 w-full  sm:w-auto md:mb-4 sm:mb-3"
            >
              <ArrowLeft />
              Back
            </Button>
          </div>
          <div className=" mt-4 md:mt-3 sm:mt-3 text-center">
            <h1 className="text-center text-[#f03a11] text-2xl font-bold mb-4 ">
              Update Your Job
            </h1>
          </div>
          {/* Responsive:- aftr gap-5 */}
          <div
            className=" gap-5 md:gap-x-6
          grid grid-cols-1 md:grid-cols-2 "
          >
            <div>
              <Label>Title</Label>
              <input
                type="text"
                name="title"
                placeholder="Enter your title"
                value={input.title}
                onChange={changeEventHandler}
                className="mt-2 w-full border-2 border-violet-300 focus:border-[#4A38C2] rounded-md p-2 outline-none cursor-pointer"
              />
            </div>
            <div>
              <Label>Description</Label>
              <input
                type="text"
                name="description"
                placeholder="Enter your description"
                value={input.description}
                onChange={changeEventHandler}
                className="mt-2 w-full border-2 border-violet-300 focus:border-[#4A38C2] rounded-md p-2 outline-none cursor-pointer"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <input
                type="text"
                name="requirements"
                placeholder="Enter your requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="mt-2 w-full border-2 border-violet-300 focus:border-[#4A38C2] rounded-md p-2 outline-none cursor-pointer"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <input
                type="text"
                name="salary"
                placeholder="Enter your salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="mt-2 w-full border-2 border-violet-300 focus:border-[#4A38C2] rounded-md p-2 outline-none cursor-pointer"
              />
            </div>
            <div>
              <Label>Location</Label>
              <input
                type="text"
                name="location"
                placeholder="Enter your location"
                value={input.location}
                onChange={changeEventHandler}
                className="mt-2 w-full border-2 border-violet-300 focus:border-[#4A38C2] rounded-md p-2 outline-none cursor-pointer"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <input
                type="text"
                name="jobType"
                placeholder="Enter your jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="mt-2 w-full border-2 border-violet-300 focus:border-[#4A38C2] rounded-md p-2 outline-none cursor-pointer"
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <input
                type="text"
                name="experience"
                placeholder="Enter your experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="mt-2 w-full border-2 border-violet-300 focus:border-[#4A38C2] rounded-md p-2 outline-none cursor-pointer"
              />
            </div>
            <div>
              <Label>No of Positions</Label>
              <input
                type="number"
                name="position"
                placeholder="Enter your position"
                value={input.position || ""}
                onChange={changeEventHandler}
                className="mt-2 w-full border-2 border-violet-300 focus:border-[#4A38C2] rounded-md p-2 outline-none cursor-pointer"
              />
            </div>
          </div>
          {/* for button Post New Job */}
          {/* Responsive:- after text-gray-100 */}
          {loading ? (
            <Button className="mt-4 w-full bg-[#6A38C2] hover:bg-[#5812d0] mb-2 text-gray-100 sm:w-auto md:w-full">
              <Loader2 className="mr-2 h-4 w-4 text-gray-100 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className=" mt-5  bg-[#6A38C2] hover:bg-[#5812d0] mb-2 w-full "
            >
              Update
            </Button>
          )}
          {companies.length === 0 && (
            <p className="text-sm text-[#F83002] font-bold text-center my-3">
              *Please register a company first, before posting a job
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default JobSetUp;
