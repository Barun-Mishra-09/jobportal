import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CreateCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/companyregister`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res?.data?.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 ">
        <div
          className="w-full max-w-2xl 
    bg-white  rounded-xl p-6 md:p-8 shadow-lg shadow-violet-400  border-2 border-violet-300"
        >
          <div className="mb-6 text-center">
            <h1 className="font-bold text-2xl text-[#6A38C2]">
              Your Company Name
            </h1>
            <p className="text-gray-700 text-sm md:text-base">
              What would you like to name your company? You can change this
              later.
            </p>
          </div>

          <div className="mb-4">
            <Label className="text-blue-500 text-lg font-bold">
              Company Name
            </Label>
            <input
              type="text"
              placeholder="Enter your company name"
              onChange={(e) => setCompanyName(e.target.value)}
              className="mt-2 w-full border border-violet-500 focus:ring-2 focus:ring-[#4A38C2] rounded-md p-3 outline-none cursor-pointer"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
            <Button
              onClick={() => navigate("/admin/companies")}
              className="w-full sm:w-auto px-6 py-3 text-[#DC2626] border-[#DC2626] bg-red-100 hover:bg-[#DC2626] hover:text-white text-[15px] font-semibold rounded-lg transition-all"
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={registerNewCompany}
              className="w-full sm:w-auto px-6 py-3 text-[#059669] border-[#059669] bg-green-100 hover:bg-[#46b34b] hover:text-white text-[15px] font-semibold rounded-lg transition-all"
              variant="outline"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;
