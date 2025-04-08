// import React from "react";

import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();
  // we should use the search and setSearch but here search == input as a state
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div>
      <Navbar />
      {/* Now using the rest of the logic of the companies */}
      {/* Responsive:- after my-10 */}
      <div className="max-w-6xl mx-auto my-10 px-4">
        {/* Responsive:-  after my-5*/}
        <div className="flex items-center  my-5 flex-col sm:flex-row gap-4 justify-between">
          {/* Responsive:- after cursor-pointer */}
          <input
            type="text"
            name="text"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
            className="mt-2  border-2 border-violet-400 focus:border-[#4A38C2] rounded-md p-2 outline-none cursor-pointer w-full lg:w-1/4 md:w-1/3 sm:w-1/2 "
          />
          {/* Responsive:- after hover:bg */}
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-[#6A38C2] hover:bg-[#5812d0] w-full sm:w-auto"
          >
            New Jobs
          </Button>
        </div>
        {/* use the companiesTable for  showing the companies table */}
        <div className="overflow-x-auto">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
