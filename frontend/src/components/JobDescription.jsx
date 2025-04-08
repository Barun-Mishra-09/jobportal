import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";

const JobDescription = () => {
  // .some function says that agar usme kuch bhi exist karti hai to wo true return karega

  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  // const navigate = useNavigate();

  const isInitiallyApplied =
    singleJob?.application?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  // function for apply now job
  const applyNowJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/jobapply/${jobId}`,
        { withCredentials: true }
      );
      // console.log(res.data);

      if (res.data.success) {
        setIsApplied(true); // update the local state
        const updatedSingleJob = {
          ...singleJob,
          application: [...singleJob.application, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/jobById/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          // use the setIsApplied state here
          setIsApplied(
            res.data.job.application.some(
              (application) => application.applicant === user?._id
            )
          ); // Ensure the state is in sync witht the fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-11 bg-gray-50 p-6 shadow-md rounded-lg">
      {/* Responsive: after md:justify-between */}
      <div className="flex items-center md:justify-between flex-col md:flex-row text-center md:text-left ">
        <div>
          <h1 className="text-3xl font-bold text-[#2563EB]">
            {singleJob?.title}
          </h1>

          {/* Responsive: after my-3 */}
          <div className="flex items-center gap-2 my-3 flex-wrap justify-center md:justify-start">
            {/* Responsive: after cursor-pointer */}
            <Badge
              className="text-[#DC2626] border-[#DC2626] bg-red-100 cursor-pointer text-sm md:text-sm"
              variant="outline"
            >
              {singleJob?.position} Positions
            </Badge>
            <Badge
              className="text-[#2563EB] border-[#1E90FF] bg-blue-100 cursor-pointer text-sm md:text-sm"
              variant="outline"
            >
              {singleJob?.jobType}
            </Badge>
            <Badge
              className="text-[#8A2BE2] border-[#8A2BE2] bg-purple-100 cursor-pointer text-sm md:text-sm"
              variant="outline"
            >
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        {/* Responsive: after rounded-lg first */}
        <Button
          onClick={isApplied ? null : applyNowJobHandler}
          disabled={isApplied}
          className={`rounded-lg w-full md:w-auto ${
            isApplied
              ? "bg-[#8A2BE2] hover:bg-[#5812d0] cursor-not-allowed"
              : "text-gray-950 border border-emerald-500 bg-emerald-100 hover:bg-green-500 hover:text-white"
          }`}
        >
          {isApplied ? "  Already Applied" : "Apply now"}
        </Button>
      </div>

      <h1 className="font-medium text-2xl text-[#5812d0] border-b-2 border-b-red-400 mb-4  py-5">
        Job Description
      </h1>

      {/* Responsive : after text-475569 */}
      <div className="text-[#475569] text-sm md:text-base">
        <h1 className="font-semibold text-lg my-1 text-[#2563EB]">
          Role:
          <span className="text-base text-[#DC2626] px-1">
            {singleJob?.title}
          </span>
        </h1>
        <h1 className="font-semibold text-lg my-1 text-[#2563EB]">
          Location:
          <span className="text-base text-[#9333EA] px-1">
            {" "}
            {singleJob?.location}
          </span>
        </h1>
        <h1 className="font-semibold text-lg my-1 text-[#2563EB]">
          Description:
          <span className="text-base text-[#475569] px-1">
            {" "}
            {singleJob?.description}
          </span>
        </h1>
        <h1 className="font-semibold text-lg my-1 text-[#2563EB]">
          Experience:
          <span className="text-base text-[#9333EA] px-2">
            {singleJob?.experienceLevel} yr
          </span>
        </h1>
        <h1 className="font-semibold text-lg my-1 text-[#2563EB]">
          Salary:
          <span className="text-base text-[#F59E0B] px-1">
            {" "}
            {singleJob?.salary} LPA
          </span>
        </h1>
        <h1 className="font-semibold text-lg my-1 text-[#2563EB]">
          Total Applicants:
          <span className="text-base text-[#9333EA] px-1">
            {" "}
            {singleJob?.application?.length}
          </span>
        </h1>
        <h1 className="font-semibold text-lg my-1 text-[#2563EB]">
          Posted Date:
          <span className="text-base text-[#DC2626] px-1">
            {" "}
            {singleJob?.createdAt.split("T")[0]}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
