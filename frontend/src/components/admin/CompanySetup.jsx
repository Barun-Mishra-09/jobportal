// import React from 'react'

import { ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  // use the singleCompany from the store
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitEventHandler = async (e) => {
    e.preventDefault();
    // for file we use formData
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/updatecompany/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res?.data?.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  // use useEffect for showing singleCompany data when i go to the CompanySetup
  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      {/* Responsive:- after shadow-violet-200 */}
      <div
        className=" mx-auto my-10 p-6 
      border-2 border-violet-300  rounded-2xl shadow-md shadow-violet-400 w-full max-w-3xl sm:w-full  "
      >
        <form onSubmit={submitEventHandler}>
          {/* Responsive:- after p-5 */}
          <div
            className="flex items-center  gap-4 p-5 lg:flex-col md:flex-row flex-col  sm:flex-col
          md:justify-start lg:justify-start sm:justify-start 
"
          >
            {/* for back button */}
            <div className="relative w-full">
              <Button
                onClick={() => navigate("/admin/companies")}
                variant="outline"
                className="flex items-center gap-2 bg-[#6A38C2]  hover:bg-[#5812d0] hover:text-white text-white font-semibold  mt-4 md:mt-0 lg:absolute lg:top-0 lg:left-0 "
              >
                <ArrowLeft />
                <span>Back</span>
              </Button>
            </div>

            {/* Responsive: after text-lg */}
            <h1 className="font-bold   text-[#F83002]  text-2xl my-5 lg:text-3xl text-center md:text-left w-full md:w-auto sm:text-xl ">
              Company Setup
            </h1>
          </div>

          {/* now for the label and input */}
          {/* Responsive:- after gap-2  */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 ">
            <div>
              <Label className="text-base ml-2">Company Name</Label>
              <input
                type="text"
                name="name"
                placeholder="Enter your company name"
                value={input.name}
                onChange={changeEventHandler}
                className="mt-2 w-full border-2 border-violet-300 focus:border-[#4A38C2] rounded-md p-2 outline-none cursor-pointer"
              />
            </div>
            <div>
              <Label className="text-base ml-2">Description</Label>
              <input
                type="text"
                name="description"
                placeholder="Enter your description"
                value={input.description}
                onChange={changeEventHandler}
                className="mt-2 w-full border-2 border-violet-300 focus:border-[#4A38C2] rounded-md p-2 outline-none cursor-pointer"
              />
            </div>
            <div>
              <Label className="text-base ml-2">Website</Label>
              <input
                type="text"
                name="website"
                placeholder="Enter your website"
                value={input.website}
                onChange={changeEventHandler}
                className="mt-2 w-full border-2 border-violet-300 focus:border-[#4A38C2] rounded-md p-2 outline-none cursor-pointer"
              />
            </div>
            <div>
              <Label className="text-base ml-2">Location</Label>
              <input
                type="text"
                name="location"
                placeholder="Enter your location"
                value={input.location}
                onChange={changeEventHandler}
                className="mt-2 w-full border-2 border-violet-300 focus:border-[#4A38C2] rounded-md p-2 outline-none cursor-pointer"
              />
            </div>
            {/* Responsive:- create classname on written div */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Label className="text-base ml-2">Logo</Label>
              <input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="mt-2 w-full border-2 border-violet-300 focus:border-[#4A38C2] rounded-md p-2 outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* for update button which is a type submit */}
          {loading ? (
            <Button className="mt-4 w-full bg-[#6A38C2] hover:bg-[#5812d0] mb-2 text-gray-100">
              <Loader2 className="mr-2 h-4 w-4 text-gray-100 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className=" mt-4 w-full bg-[#6A38C2] hover:bg-[#5812d0] mb-2"
            >
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
