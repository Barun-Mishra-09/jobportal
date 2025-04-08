import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant.js";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Eye, EyeOff, Loader2 } from "lucide-react";
// import Tick_icon from "/src/components/auth/tick_icon.png";
// import Tick_icon from "./tick_icon.jpg";
import { FaCircleCheck } from "react-icons/fa6";
// import Login_image from "./Login_img.png";
import Image_Register from "./Image_Register.png";
import Google_Logo from "./Google_logo.png";
import GoogleLogin from "./GoogleLogin";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    file: "",
  });

  const [preview, setPreview] = useState(null);

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // For showing red-border on empty input we changes some logic to my login page
  const [errors, setErrors] = useState({});

  // for showing password on conditionally
  const [showPassword, setShowPassword] = useState(false);

  // create a function of validateInputs for showing the text like "Email is required, Password is required"
  const validateInputs = () => {
    let newErrors = {};
    if (!input.fullname.trim()) {
      newErrors.fullname = "FullName is required";
    }

    if (!input.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      newErrors.email = "Enter a valid email (e.g., example@gmail.com)";
    }

    if (!input.password.trim()) {
      newErrors.password = "Password is required";
    } else if (input.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!input.phoneNumber.trim()) {
      newErrors.phoneNumber = "PhoneNumber is required";
    } else if (!/^\d{10}$/.test(input.phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid 10-digit phone number";
    }
    if (!input.role) {
      newErrors.role = "Role is required";
    }

    // For photo validation
    if (!input.file) {
      newErrors.file = "Profile photo is required";
    }
    return newErrors;
  };

  // create a handleBlur function for
  const handleBlur = (e) => {
    const validationErrors = validateInputs();
    if (validationErrors[e.target.name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: validationErrors[e.target.name],
      }));
    }
  };

  // Handle input changes
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
    // For showing errors when user input is empty after clicking on it
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Handle file upload
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput((prevInput) => ({ ...prevInput, file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Logic for the empty input bar
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    dispatch(setUser(null));
    localStorage.removeItem("user");

    if (!input.email || !/\S+@\S+\.\S+/.test(input.email)) {
      toast.error("Invalid email format.");
      return;
    }
    if (input.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success && res.data.user) {
        dispatch(setUser(res.data.user));
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success(res?.data?.message);
        navigate("/");
      } else {
        toast.error(res.data.message || "Signup Failed");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Network error, please try again later.";
      toast.error(errorMessage);

      // Show API error below the password field
      setErrors((prevErrors) => ({ ...prevErrors, password: errorMessage }));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Auto-login user if already authenticated
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 overflow-y-auto ">
        {/* For left sidebar */}
        <div className="hidden lg:flex flex-col w-[38%] p-5 border border-violet-400 rounded-lg shadow-md shadow-violet-400 sticky top-4 overflow-y-auto">
          <img
            src={Image_Register}
            // src={Login_image}
            alt="Job Search"
            className=" w-[180px] mx-auto mt-[-25px]"
          />
          <h3 className="text-2xl font-semibold text-[#4A38C2] mb-2 text-center mt-2">
            On registering , you can
          </h3>

          <div className="flex items-center space-x-2 my-2">
            <div className="w-5 h-5 flex items-center justify-center rounded-full bg-white text-green-500 overflow-hidden">
              <FaCircleCheck className="w-5 h-5 overflow-hidden" />
            </div>
            <p className="text-gray-700 ">
              Build your profile and let recruiters find you
            </p>
          </div>

          <div className="flex items-center space-x-2 my-2">
            <div className="w-5 h-5 flex items-center justify-center rounded-full bg-white text-green-500 overflow-hidden ">
              <FaCircleCheck className="w-5 h-5 overflow-hidden " />
            </div>
            <p className="text-gray-700">
              Get job postings delivered right to your email
            </p>
          </div>

          <div className="flex items-center space-x-2 my-2">
            <div className="w-5 h-5 flex items-center justify-center rounded-full bg-white text-green-500 overflow-hidden">
              <FaCircleCheck className="w-5 h-5 overflow-hidden" />
            </div>
            <p className="text-gray-700">Find a job and grow your career</p>
          </div>
        </div>

        <form
          onSubmit={submitHandler}
          className="w-full lg:w-[55%] border border-[#4A38C2] rounded-xl shadow-md shadow-violet-400 p-6 sm:p-8 md:p-10 lg:p-9 overflow-y-auto max-h-[calc(100vh-32px)] "
        >
          <h1 className="font-bold text-xl sm:text-xl md:text-2xl lg:text-2xl mb-3 text-[#4A38C2] cursor-pointer my-[-15px]">
            Sign up
          </h1>
          <div className="my-2">
            <Label className="mb-2 text-[#4A38C2] text-sm sm:text-sm md:text-base lg:text-base">
              Full Name
            </Label>
            <input
              type="text"
              onChange={changeEventHandler}
              onBlur={handleBlur}
              value={input.fullname}
              name="fullname"
              placeholder="Enter your fullname"
              className={`mt-2 w-full h-10 border-2  rounded-md px-3 py-2 text-sm sm:text-sm md:text-base lg:text-base outline-none cursor-pointer box-border ${
                errors.fullname ? "border-red-500" : "border-gray-300"
              } focus:border-[#4A38C2]`}
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm">{errors.fullname}</p>
            )}
          </div>
          <div className="my-2">
            <Label className="mb-2 text-[#4A38C2] text-sm sm:text-sm md:text-base lg:text-base">
              Email
            </Label>
            <input
              type="email"
              onChange={changeEventHandler}
              onBlur={handleBlur}
              value={input.email}
              name="email"
              placeholder="Enter your email"
              className={`mt-2 w-full h-10 border-2  rounded-md px-3 py-2 text-sm sm:text-sm md:text-base lg:text-base outline-none cursor-pointer box-border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:border-[#4A38C2]`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label className="text-[#5812d0] text-sm sm:text-sm md:text-base lg:text-base">
              Password
            </Label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                onChange={changeEventHandler}
                onBlur={handleBlur}
                value={input.password}
                name="password"
                placeholder="Enter your password"
                className={`mt-2 w-full h-[44px] outline-none border-2 rounded-md px-3 text-sm sm:text-sm md:text-base lg:text-base cursor-pointer box-border ${
                  errors.password ? "border-red-500" : "focus:border-[#4A38C2] "
                }`}
              />

              {/* Now create button for showing eye  */}
              {input.password && (
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-200 transition-all duration-200"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
              {/* For showing text on errors empty */}
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
          </div>
          <div className="my-2">
            <Label className="mb-2 text-[#4A38C2] text-sm sm:text-sm md:text-base lg:text-base">
              Phone Number
            </Label>
            <input
              type="text"
              onChange={changeEventHandler}
              onBlur={handleBlur}
              value={input.phoneNumber}
              name="phoneNumber"
              placeholder="Enter your phone number"
              className={`mt-2 w-full h-10 border-2  rounded-md px-3 py-2 text-sm sm:text-sm md:text-base lg:text-base outline-none cursor-pointer box-border ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              }  "focus:border-[#4A38C2] "`}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">PhoneNumber is required</p>
            )}
          </div>

          {/* Profile Section */}
          <div className="my-2">
            {/* Radio Buttons */}
            <div className="flex items-center gap-4 mb-4">
              <Label className="mt-2 mb-2 text-[#4A38C2] text-sm sm:text-sm md:text-base lg:text-base">
                Select Role
              </Label>
              <RadioGroup className="flex flex-col sm:flex-col md:flex-row lg:flex-row items-start sm:items-start md:items-center lg:items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    id="r1"
                    className="cursor-pointer"
                  />
                  <Label
                    htmlFor="r1"
                    className="text-sm sm:text-sm md:text-base lg:text-base"
                  >
                    Student
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    onBlur={handleBlur}
                    id="r2"
                    className="cursor-pointer"
                  />
                  <Label
                    htmlFor="r2"
                    className="text-sm sm:text-sm md:text-base lg:text-base"
                  >
                    Recruiter
                  </Label>
                </div>
              </RadioGroup>
              {/* Error message on a separate line */}
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}
            </div>

            {/* Profile Label, Image, and Choose File Button in a Single Row */}
            <div className="flex items-center gap-4">
              <Label className="text-[#4A38C2] text-sm sm:text-sm md:text-base lg:text-base">
                Profile
              </Label>
              <div className="flex items-center">
                {preview && (
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="w-16 h-16 rounded-full border-2 border-gray-300 object-cover"
                  />
                )}
              </div>
              <label
                htmlFor="fileInput"
                className="cursor-pointer px-4 py-2 bg-[#4A38C2] text-white rounded-md text-sm"
              >
                Choose Profile
              </label>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={changeFileHandler}
                className="hidden"
              />
            </div>
            {/* Show error message when no profile is selected */}
            {errors.file && (
              <p className="text-red-500 text-sm">{errors.file}</p>
            )}
          </div>

          {loading ? (
            <Button className="mt-4 w-full h-10 bg-[#4A38C2] hover:bg-[#5812d0] mb-2 text-gray-100 text-sm sm:text-sm md:text-base lg:text-base">
              <Loader2 className="mr-2 h-4 w-4 text-gray-100 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="mt-4 w-full h-10 bg-[#4A38C2] hover:bg-[#5812d0] mb-2 text-sm sm:text-sm md:text-base lg:text-base"
            >
              Signup
            </Button>
          )}

          <GoogleLogin />
        </form>
      </div>
    </div>
  );
};

export default Signup;
