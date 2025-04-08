import { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <motion.div
      className="relative overflow-hidden text-center py-12 px-4 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Blurred Background Blobs */}
      {/* <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300 opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div> */}

      <motion.div
        className="flex flex-col gap-8 my-10 max-w-4xl mx-auto relative z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
      >
        {/* Tagline */}
        <motion.span
          className="mx-auto px-4 py-2 text-[#FF6700] bg-white bg-opacity-90 rounded-full cursor-pointer shadow-md text-sm md:text-base font-medium"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring" }}
        >
          🚀 No. 1 Job Finding Website in India
        </motion.span>

        {/* Heading */}
        <motion.h1
          className="md:text-5xl font-bold text-3xl sm:text-4xl leading-tight tracking-tight"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-[#8A2BE2]"
          >
            Dream,
          </motion.span>{" "}
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-[#007FFF]"
          >
            Discover,
          </motion.span>{" "}
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-[#00A86B]"
          >
            Land
          </motion.span>{" "}
          <motion.span whileHover={{ rotate: 10 }} className="text-[#FF7F50]">
            &
          </motion.span>
          <br />
          <span>
            Your <span className="text-[#FF007F]">Dream Job</span> is Just a{" "}
            <motion.span
              className="text-[#F83002]"
              whileHover={{ scale: 1.1, color: "#DC2626" }}
            >
              Click Away
            </motion.span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-[#F83002] bg-white bg-opacity-80 mx-auto px-6 py-3 rounded-full shadow-xl cursor-pointer text-sm sm:text-base md:text-lg max-w-fit whitespace-nowrap backdrop-blur"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          ✨ Endless opportunities await! Your dream job is just a search
          away—start your journey today.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          className="flex shadow-xl border border-gray-300 pl-3 rounded-full items-center gap-3 mx-auto w-full sm:w-3/4 md:w-[70%] backdrop-blur-md bg-white bg-opacity-80 mt-5"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full pl-4 py-2.5 bg-transparent text-sm md:text-base placeholder:text-gray-500"
          />
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={searchJobHandler}
                  className="rounded-r-full bg-[#8A2BE2] hover:bg-[#5812d0] px-4 py-3"
                >
                  <Search className="h-6 w-6 text-white" />
                </Button>
              </TooltipTrigger>
              {query.trim() !== "" && (
                <TooltipContent className="bg-[#5812d0] text-white px-3 py-2 rounded-lg shadow-md">
                  🎯 Your next big opportunity is just a search away!
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
