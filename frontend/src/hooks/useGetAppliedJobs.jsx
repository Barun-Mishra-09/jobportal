import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(
          `
          ${APPLICATION_API_END_POINT}/getappliedjobs`,
          { withCredentials: true }
        );
        console.log(res.data);

        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.application));
          toast.success(res?.data?.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
      }
    };
    fetchAppliedJobs();
  }, [dispatch]);
};

export default useGetAppliedJobs;
