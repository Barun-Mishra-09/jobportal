// import React from "react";

import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
  // call the useGetAllCompanies hooks here
  useGetAllCompanies();
  // we should use the search and setSearch but here search == input as a state
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div>
      <Navbar />
      {/* Now using the rest of the logic of the companies */}
      {/* Responsive:- after my-10 */}
      <div className="max-w-6xl mx-auto my-10 px-4 w-full">
        {/* Adjusted for better responsiveness aftr my-5 */}
        <div className="flex items-center justify-between my-5 flex-col sm:flex-row gap-4">
          {/* Responsiveness:- after cursor-pointer */}
          <input
            type="text"
            name="text"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
            className=" border-2 border-violet-400 focus:border-[#4A38C2] rounded-md p-2 outline-none cursor-pointer w-full lg:w-1/4 md:w-1/3 sm:w-1/2"
          />
          {/* Responsiveness:- after hover:bg  */}
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="bg-[#6A38C2] hover:bg-[#5812d0] w-full sm:w-auto"
          >
            New Company
          </Button>
        </div>
        {/* use the companiesTable for  showing the companies table */}
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
