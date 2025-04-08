import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";

const JobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/description/${job._id}`)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.3 }}
      className="p-5 rounded-2xl shadow-lg bg-gradient-to-r from-[#e0e7ff] to-[#c7d8fe]  border border-gray-200 
      cursor-pointer hover:shadow-2xl transition-all duration-300 w-full max-w-sm 
      sm:max-w-md lg:max-w-lg mx-auto"
    >
      {/* Company Name & Location */}
      <div>
        <h1 className="font-semibold text-lg sm:text-xl md:text-2xl text-[#6D28D9] truncate">
          {job?.company?.name}
        </h1>
        <p className="text-sm sm:text-base md:text-lg font-semibold text-[#1E90FF]">
          India
        </p>
      </div>

      {/* Job Title & Description */}
      <div>
        <h1
          className="font-bold text-lg sm:text-xl md:text-2xl my-2 bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] 
                        text-transparent bg-clip-text animate-gradient"
        >
          {job?.title}
        </h1>
        <p className="text-sm sm:text-base md:text-base text-gray-600 line-clamp-2">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 my-3 flex-wrap justify-center md:justify-start">
        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
          <Badge
            className="text-[#DC2626] border-[#DC2626] bg-red-100 max-w-fit truncate cursor-pointer 
                      text-sm sm:text-sm md:text-base hover:bg-red-200 transition-all duration-300"
            variant="outline"
          >
            {job?.position} Positions
          </Badge>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
          <Badge
            className="text-[#059669] border-[#059669] bg-green-100 max-w-fit truncate text-sm sm:text-sm 
                      md:text-base hover:bg-green-200 transition-all duration-300"
            variant="outline"
          >
            {job?.jobType}
          </Badge>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
          <Badge
            className="text-[#8A2BE2] border-[#8A2BE2] bg-violet-100 max-w-fit truncate text-sm sm:text-sm 
                      md:text-base hover:bg-violet-200 transition-all duration-300"
            variant="outline"
          >
            {job?.salary} LPA
          </Badge>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default JobCards;
