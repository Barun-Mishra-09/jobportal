import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    resume: user?.profile?.resume || null,
    profilePhoto: user?.profile?.profilePhoto || null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const { name, files } = e.target;
    if (files?.[0]) {
      setInput((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    if (input.resume) {
      formData.append("resume", input.resume);
    }
    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="w-[100vw] sm:w-[85vw] md:w-[70vw] lg:w-[800px] max-h-screen overflow-y-auto p-0 bg-transparent shadow-none"
          onInteractOutside={() => setOpen(false)}
        >
          <div className="bg-white p-8 rounded-xl border-2 border-[#4A38C2] shadow-2xl w-full">
            <DialogHeader>
              <DialogTitle className="text-lg text-center font-semibold">
                Update Profile
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={SubmitHandler}>
              <div className="grid gap-5 pt-3 pb-5">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="fullname"
                    className="text-right text-[#4A38C2] text-sm sm:text-base"
                  >
                    Fullname
                  </Label>
                  <input
                    type="text"
                    name="fullname"
                    value={input.fullname}
                    onChange={changeEventHandler}
                    className="col-span-3 w-full border-2 focus:border-[#4A38C2] rounded-md p-2 text-sm sm:text-base outline-none cursor-pointer"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="email"
                    className="text-right text-[#4A38C2] text-sm sm:text-base"
                  >
                    Email
                  </Label>
                  <input
                    type="email"
                    name="email"
                    value={input.email}
                    onChange={changeEventHandler}
                    className="col-span-3 w-full border-2 focus:border-[#4A38C2] rounded-md p-2 text-sm sm:text-base outline-none cursor-pointer"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="phoneNumber"
                    className="text-right text-[#4A38C2] text-sm sm:text-base"
                  >
                    PhoneNumber
                  </Label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={input.phoneNumber}
                    onChange={changeEventHandler}
                    className="col-span-3 w-full border-2 focus:border-[#4A38C2] rounded-md p-2 text-sm sm:text-base outline-none cursor-pointer"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="bio"
                    className="text-right text-[#4A38C2] text-sm sm:text-base"
                  >
                    Bio
                  </Label>
                  <input
                    type="text"
                    name="bio"
                    value={input.bio}
                    onChange={changeEventHandler}
                    className="col-span-3 w-full border-2 focus:border-[#4A38C2] rounded-md p-2 text-sm sm:text-base outline-none cursor-pointer"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="skills"
                    className="text-right text-[#4A38C2] text-sm sm:text-base"
                  >
                    Skills
                  </Label>
                  <input
                    type="text"
                    name="skills"
                    value={input.skills}
                    onChange={changeEventHandler}
                    className="col-span-3 w-full border-2 focus:border-[#4A38C2] rounded-md p-2 text-sm sm:text-base outline-none cursor-pointer"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="photo"
                    className="text-right text-[#4A38C2] text-sm sm:text-base"
                  >
                    Profile Photo
                  </Label>
                  <input
                    type="file"
                    name="profilePhoto"
                    accept="image/*"
                    onChange={fileChangeHandler}
                    className="col-span-3 w-full border-2 focus:border-[#4A38C2] rounded-md p-2 text-sm sm:text-base outline-none cursor-pointer"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="resume"
                    className="text-right text-[#4A38C2] text-sm sm:text-base"
                  >
                    Resume
                  </Label>
                  <input
                    type="file"
                    name="resume"
                    accept="application/pdf"
                    onChange={fileChangeHandler}
                    className="col-span-3 w-full border-2 focus:border-[#4A38C2] rounded-md p-2 text-sm sm:text-base outline-none cursor-pointer"
                  />
                </div>
              </div>
              <DialogFooter>
                {loading ? (
                  <Button className="w-full bg-[#4A38C2] hover:bg-[#5812d0] text-gray-100 py-2 text-sm sm:text-base">
                    <Loader2 className="mr-2 h-4 w-4 text-gray-100 animate-spin" />
                    Please Wait
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full bg-[#4A38C2] hover:bg-[#5812d0] py-2 text-sm sm:text-base"
                  >
                    Update Profile
                  </Button>
                )}
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
