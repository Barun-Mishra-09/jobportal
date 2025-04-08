import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import { useEffect } from "react";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useNavigate } from "react-router-dom";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  useEffect(() => {
    if (!user || !user._id) {
      navigate("/login");
    } else if (user?.role === "student") {
      navigate("/browse");
    }
  }, [user, navigate]);
  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-violet-50 ">
      <Navbar />
      <div className="relative min-h-screen  overflow-hidden max-w-7xl mx-auto my-10 px-4 ">
        {/* <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300 opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div> */}
        <h1 className="font-bold text-2xl mb-5 text-[#F83002] text-center">
          Search Result: ("{allJobs.length}")
        </h1>
        {allJobs.length > 0 ? (
          // Responsive Grid Layout
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {allJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        ) : (
          // Centering only the "No Jobs Found" message
          <div className="flex items-center justify-center w-full h-[50vh]">
            <span className="text-xl text-[#F83002] font-bold text-center">
              Oops! No jobs found 😞. Check back soon!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
