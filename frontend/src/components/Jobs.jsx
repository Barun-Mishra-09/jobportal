import Navbar from "./shared/Navbar";
import Job from "./Job";
import FilterCards from "./FilterCards";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Filter, X } from "lucide-react";

const Jobs = ({ job }) => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const query =
      typeof searchedQuery === "string" ? searchedQuery.toLowerCase() : "";

    if (query) {
      const filteredJobs = allJobs.filter((job) => {
        const jobData =
          `${job.title} ${job.description} ${job.location} ${job.salary} ${job.requirements}`.toLowerCase();
        return jobData.includes(query);
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  useEffect(() => {
    if (!user || !user._id) {
      navigate("/login");
    } else if (user?.role === "student") {
      navigate("/jobs");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="max-w-full mx-auto mt-5 px-4">
        {/* Mobile Filter Toggle Button */}
        <div className="flex justify-end sm:hidden">
          <Button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white mb-4"
          >
            {isFilterOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Filter className="w-5 h-5" />
            )}
            {isFilterOpen ? "Close Filters" : "Show Filters"}
          </Button>
        </div>

        {/* Main Layout */}
        <div className="flex gap-5 flex-col md:flex-row">
          {/* Sidebar Filter */}
          <div
            className={`fixed inset-y-0 left-0 bg-white z-50 w-full sm:w-64 md:w-72 lg:w-[22%] max-h-screen h-full shadow-lg transition-transform duration-300 ease-in-out 
            ${isFilterOpen ? "translate-x-0" : "-translate-x-full"} 
            sm:relative sm:h-auto sm:transition-none sm:translate-x-0 overflow-y-auto flex-shrink-0`}
          >
            <FilterCards
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
            />
          </div>

          {/* Job Listings */}
          <div
            className={`flex-1 h-[calc(100vh-5rem)] overflow-y-auto scrollbar-none  bg-white md:bg-whitesm:bg-white lg:bg-gradient-to-br lg:from-white lg:via-blue-50 lg:to-violet-50 ${
              isFilterOpen ? "hidden sm:block" : "block"
            }`}
          >
            {filterJobs.length <= 0 ? (
              <div className="flex justify-center items-center h-full">
                <span className="text-2xl text-[#F83002] font-bold text-center">
                  Oops! No jobs found 😞. Check back soon!
                </span>
              </div>
            ) : (
              // ✅ Improved Grid Responsiveness
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
