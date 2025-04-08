import { useState } from "react";
import { Contact, Mail, Pen } from "lucide-react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
// import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-gray-50 border border-violet-300 rounded-3xl my-5 p-6 sm:p-8 shadow-md shadow-violet-400 overflow-hidden">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4 flex-col md:flex-row text-center md:text-left">
            <Avatar className="w-14 h-14 sm:w-16 sm:h-16">
              <AvatarImage src={user?.profile?.profilePhoto} />
            </Avatar>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#F83002]">
                {user?.fullname}
              </h1>
              <p className="text-gray-600 font-semibold text-sm sm:text-base">
                {user?.profile?.bio}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right text-[#8A2BE2] bg-emerald-200 hover:bg-emerald-400 rounded-md flex items-center gap-2 self-start md:self-auto text-sm sm:text-base"
            variant="outline"
          >
            <Pen size={14} sm:size={16} />
          </Button>
        </div>

        {/* Divider Line for separation */}
        <div className="border-t border-gray-300 mt-8 sm:mt-8 sm:block md:block lg:hidden xl:hidden"></div>

        {/* Contact Info */}
        <div className=" rounded-lg py-3 sm:py-4 px-2 sm:px-3">
          <div className="flex items-center gap-2 sm:gap-3  font-medium text-sm sm:text-base">
            <Mail className="text-[#F83002]" />
            <span className="text-[#1D4ED8] font-semibold hover:underline cursor-pointer break-words">
              {user?.email}
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 mt-2  font-medium text-sm sm:text-base">
            <Contact className="text-[#007FFF]" />
            <span className="text-[#047857] break-words ">
              {user?.phoneNumber || "Not Provided"}
            </span>
          </div>
        </div>

        {/* Skills Section (One Line Scrollable) */}
        <div className="mt-4 sm:mt-5  flex flex-wrap md:flex-nowrap overflow-x-auto items-center gap-2 text-[#F83002] text-sm sm:text-base">
          <h1 className="text-lg font-semibold ">Skills:</h1>

          {user?.profile?.skills.length ? (
            user?.profile.skills.map((item, index) => (
              <Badge
                key={index}
                className="text-[#8A2BE2] hover:text-[#8A2BE2]  border border-[#8A2BE2] bg-violet-100 hover:border-[#8A2BE2] hover:bg-violet-100 px-2 sm:px-3 py-1 text-xs sm:text-sm "
              >
                {item}
              </Badge>
            ))
          ) : (
            <span className="text-gray-500 text-sm sm:text-lg font-semibold">
              No skills added
            </span>
          )}
        </div>

        {/* Resume Section */}
        {/* Responsive: after mt-3 */}
        <div className="mt-3 flex items-center gap-2 text-[#F83002] text-sm sm:text-base">
          <h1 className=" text-lg font-semibold">Resume:</h1>
          {isResume ? (
            <a
              target="_blank"
              href={user?.profile?.resume}
              className="text-[#8A2BE2] hover:underline cursor-pointer break-words lg:text-lg md:text-base sm:text-sm"
            >
              {user?.profile?.resumeOriginalName || " N/A"}
            </a>
          ) : (
            <span className="text-gray-500">No Resume Uploaded</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Table */}
      <div
        className="max-w-4xl mx-auto bg-white rounded-3xl p-4 sm:p-6 md:p-8 lg:my-10
      shadow-md border border-violet-300 shadow-violet-200 overflow-hidden"
      >
        <AppliedJobTable />
      </div>

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
