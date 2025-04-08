import JobIcon from "./JobIcon.jpg";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, Menu, PenBox, User2 } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
// import { Register_icon } from "./register_icon.webp";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isJob = location.pathname === "/jobs";
  const isBrowse = location.pathname === "/browse";
  const isAdminCompanies = location.pathname === "/admin/companies";
  const isAdminJobs = location.pathname === "/admin/jobs";

  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        localStorage.removeItem("user");
        dispatch(setUser(null));
        navigate("/login");
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="sticky top-0 left-0 w-full z-50 bg-white shadow-md px-4 md:px-6 lg:px-6">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        {/* Left Logo Section */}
        <div className="flex items-center gap-2">
          <img
            src={JobIcon}
            alt="icon"
            height={40}
            width={40}
            className="rounded-full"
          />
          <h1 className="text-2xl font-bold cursor-pointer md:text-4xl">
            Job<span className="text-[#F83002]">Spot</span>
          </h1>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu size={24} />
          </Button>
        </div>

        {/* Right Navbar Links */}
        <div
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none transition-all duration-300 ease-in-out ${
            menuOpen ? "block h-screen overflow-y-auto" : "hidden"
          } md:flex md:items-center md:gap-12 p-4 md:p-0`}
        >
          {/* UPDATED HERE: Avatar moved above navigation */}
          <div className="flex flex-col items-start gap-4 md:hidden">
            {user && (
              <Avatar className="cursor-pointer w-10 h-10">
                <AvatarImage
                  src={user?.profile?.profilePhoto}
                  alt="User Avatar"
                />
              </Avatar>
            )}
          </div>

          {/* Navigation Links */}
          <ul className="flex font-medium items-center gap-4 flex-col md:flex-row md:gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li
                  className={
                    isAdminCompanies
                      ? "border-b-4 border-b-[#F83002] text-[#4A38C2] cursor-pointer"
                      : "text-gray-600 cursor-pointer"
                  }
                >
                  <Link
                    to="/admin/companies"
                    onClick={() => setMenuOpen(false)}
                  >
                    Companies
                  </Link>
                </li>
                <li
                  className={
                    isAdminJobs
                      ? "border-b-4 border-b-[#F83002] text-[#4A38C2]"
                      : "text-gray-600"
                  }
                >
                  <Link to="/admin/jobs" onClick={() => setMenuOpen(false)}>
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li
                  className={
                    isHome
                      ? "text-[#4A38C2] border-b-4 border-[#F83002] cursor-pointer"
                      : "text-gray-700 cursor-pointer"
                  }
                >
                  <Link to="/" onClick={() => setMenuOpen(false)}>
                    Home
                  </Link>
                </li>
                <li
                  className={
                    isJob
                      ? "border-b-4 border-b-[#F83002] text-[#4A38C2]"
                      : "text-gray-600"
                  }
                >
                  <Link to="/jobs" onClick={() => setMenuOpen(false)}>
                    Jobs
                  </Link>
                </li>
                <li
                  className={
                    isBrowse
                      ? "border-b-4 border-b-[#F83002] text-[#4A38C2]"
                      : "text-gray-600"
                  }
                >
                  <Link to="/browse" onClick={() => setMenuOpen(false)}>
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* User Authentication Section */}
          {!user ? (
            <div className="flex items-center gap-2 flex-col md:flex-row mt-4 justify-center md:mt-0">
              <Link to="/login">
                <Button
                  variant="outline"
                  className=" text-[#5812d0] text-[15px] border border-[#5812d0] p-2.5 hover:text-[#5812d0] hover:bg-white hover:shadow-md font-medium gap-1 rounded-sm "
                >
                  <CgProfile />
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className=" flex items-center gap-2 bg-[#ff6600] hover:bg-[#ff6600] rounded-sm shadow-md">
                  {/* <img
                    src={Register_icon}
                    height={24}
                    width={24}
                    alt="register_icon"
                    className="text-white "
                  /> */}
                  <PenBox />
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center justify-between gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer w-10 h-10 md:w-12 md:h-12">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="User Avatar"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80 max-w-xs md:left-0 md:right-0">
                  <div className="flex gap-4 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="User Avatar"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>

                  {/* View Profile and Logout */}
                  <div className="flex flex-col my-2 text-gray-600">
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
