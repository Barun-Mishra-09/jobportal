import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Login_image from "/src/components/auth/login_image.png";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for showing red-border on empty input we changes some logic to my login page
  const [errors, setErrors] = useState({});

  // for password we use showPassword
  const [showPassword, setShowPassword] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    // For showing errors when user input is empty after clicking on it
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  };

  // create a function of validateInputs for showing the text like "Email is required, Password is required"
  const validateInputs = () => {
    let newErrors = {};
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

    if (!input.role.trim()) {
      newErrors.role = "Role is required";
    }
    return newErrors;
  };

  const handleBlur = (e) => {
    const validationErrors = validateInputs();
    if (validationErrors[e.target.name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: validationErrors[e.target.name],
      }));
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

    if (!input.email || !/\S+@\S+\.\S+/.test(input.email)) {
      toast.error("Invalid email format.");
      return;
    }
    if (input.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      toast.error(errorMessage);

      // show API errors below the password field
      setErrors((prevErrors) => ({ ...prevErrors, password: errorMessage }));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center  min-h-screen bg-gray-100  px-4 sm:px-6 lg:px-5">
        {/* create new div and classname for leftside bar */}
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl max-w-4xl   w-full fixed">
          {/* Left sidebar */}
          <div className=" hidden md:flex flex-col  p-10  bg-gray-50 min-h-[500px] shadow-md shadow-violet-300 relative">
            <h2 className="text-2xl font-bold text-[#4A38C2] text-left ">
              New to JobSpot?
            </h2>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>✔ One-click apply using JobSpot profile.</li>
              <li>✔ Get relevant job recommendations.</li>
              <li>✔ Showcase your profile to top companies.</li>
              <li>✔ Track application status on applied jobs.</li>
            </ul>

            <Link
              to="/signup"
              className="mt-6 inline-block p-2  text-[#4A38C2] border border-[#4A38C2] rounded-lg hover:bg-[#4A38C2] hover:text-white text-center font-semibold"
            >
              Register for Free
            </Link>
            <div className="absolute bottom-2 right-2">
              <img
                src={Login_image}
                alt="Professional using JobSpot"
                className="h-[140px] w-auto rounded-lg"
              />
            </div>
          </div>

          {/* Right side bar (Login Form) */}
          <div className="lg:w-[63%] bg-white p-10 rounded-2xl border border-violet-300 shadow-md shadow-violet-600">
            <form onSubmit={submitHandler} className="my-4">
              <h1 className="font-bold text-xl sm:text-xl md:text-2xl lg:text-2xl mb-3 text-[#4A38C2] cursor-pointer">
                Login
              </h1>

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
                  className={`mt-2 w-full h-12 border-2  rounded-md px-3  text-sm sm:text-sm md:text-base lg:text-base outline-none cursor-pointer box-border ${
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
                    className={`mt-2 w-full h-12 outline-none border-2 rounded-md px-3 text-sm sm:text-sm md:text-base lg:text-base cursor-pointer box-border ${
                      errors.password
                        ? "border-red-500"
                        : "focus:border-[#4A38C2] "
                    }`}
                  />
                  {input.password && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-200 transition-all duration-200"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  )}
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>
              </div>

              {/* for radio button */}
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
                  Login
                </Button>
              )}

              {/* calling the GoogleLogin.jsx file here */}
              <GoogleLogin />

              <div className="flex items-center justify-center mt-5">
                <span className="text-gray-700 font-medium text-sm sm:text-sm md:text-base lg:text-base">
                  Do not have an account?
                  <Link to="/signup" className="text-blue-600 underline ml-2">
                    Signup
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
