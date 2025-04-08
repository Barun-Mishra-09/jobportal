import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";

const PostJobs = () => {
  // take company from the store
  const { companies } = useSelector((store) => store.company);

  // take input from the user
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );

    if (selectedCompany) {
      setInput({ ...input, companyId: selectedCompany._id });
    } else {
      console.error("Selected company not found");
    }
  };

  const submitEventHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/postJob`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res?.data?.message);
        // toast.success("New Job Created Successfully");
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
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
              Post Your Job
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
            {companies.length > 0 && (
              <Select
                onValueChange={selectChangeHandler}
                defaultValue={input.companyId}
              >
                {/* Responsive:- w-full */}
                <SelectTrigger className="w-full md:w-80 border-2 border-violet-300 focus:border-[#4A38C2] focus:ring-0  focus:outline-none">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => (
                      <SelectItem
                        key={company._id}
                        value={company.name.toLowerCase()}
                      >
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
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
              Post New Jobs
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

export default PostJobs;
