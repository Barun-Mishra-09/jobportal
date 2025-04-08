import { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
// import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();

  // Use useSelector to get applicants from the store
  const { applicants } = useSelector((state) => state.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/getapplicants`,
          {
            withCredentials: true,
          }
        );

        dispatch(setAllApplicants(res.data.job)); // Dispatch applicants to the Redux store
        // toast.success(res?.data?.message);
      } catch (error) {
        console.log(error);
        // toast.error(error?.response?.data?.message);
      }
    };
    fetchAllApplicants();
  }, [params.id, dispatch]); // Added dependencies to rerun effect if needed

  return (
    <div>
      <Navbar />
      {/* Responsive:- after mx-auto */}
      <div className="max-w-6xl mx-auto p-2 sm:p-4">
        {/* Title with Responsive Font Size */}
        {/* Responsive :- after mb-3*/}
        <h1 className=" text-[#F83002] font-bold mb-3 sm:mb-5 text-center sm:text-left text-lg sm:text-xl md:text-2xl  ">
          Total Applicants:-
          <span className="text-[#F83002]">
            {applicants?.application?.length}
          </span>
        </h1>
        {/* Table Wrapper for Responsiveness */}
        {/* Create a div for wrapping Applicants table */}
        <div>
          <ApplicantsTable />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
