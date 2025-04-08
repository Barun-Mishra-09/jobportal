import { useSelector } from "react-redux";
import JobCards from "./JobCards";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    // Resonsive :- after px-3
    <div className="max-w-7xl mx-auto my-9 px-3 sm:px-4">
      <h1 className="text-2xl sm:text-3xl  md:text-4xl font-bold ml-1 text-left">
        <span className="text-[#F83002]">Explore</span>{" "}
        <span className="text-[#8A2BE2]">Top Jobs</span>
      </h1>

      <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 my-6">
        {allJobs.length > 0 ? (
          allJobs.slice(0, 6).map((job) => <JobCards key={job._id} job={job} />)
        ) : (
          <span className="col-span-full text-center text-gray-500 text-sm sm:text-base">
            No Jobs Available Now
          </span>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
