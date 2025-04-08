import { CheckCircle, MoreHorizontal, XCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const shortListedStatus = [
  {
    label: "Accepted",
    icon: <CheckCircle className="text-green-500 " />,
    labelColor: "text-green-500 ",
  },
  {
    label: "Rejected",
    icon: <XCircle className="text-red-500 " />,
    labelColor: "text-red-500 ",
  },
];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  // create a function for the accept and reject the job
  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status: status.label },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="max-w-6xl mx-auto bg-gray-50 border-2 border-violet-300 rounded-2xl p-7 shadow-md w-full shadow-violet-400 overflow-hidden">
      <h1 className="text-center font-bold text-[#F83002] mb-4 text-lg sm:text-xl md:text-2xl">
        A List of Recent Applied Applicants
      </h1>

      {/* Wrap the table into div i.e create new div for the table and className also*/}
      <div className="overflow-x-auto w-full">
        {/*Create new className for table  */}
        <Table className="min-w-[600px] w-full text-sm md:text-base">
          <TableHeader>
            <TableRow className="border-b border-[#8A2BE2]">
              <TableHead className="text-[#4A38C2] whitespace-nowrap lg:text-base sm:text-sm">
                FullName
              </TableHead>
              <TableHead className="text-[#4A38C2] whitespace-nowrap lg:text-base sm:text-sm">
                Email
              </TableHead>
              <TableHead className="text-[#4A38C2] whitespace-nowrap lg:text-base sm:text-sm">
                Contact
              </TableHead>
              <TableHead className="text-[#4A38C2] whitespace-nowrap lg:text-base sm:text-sm">
                Resume
              </TableHead>
              <TableHead className="text-[#4A38C2] whitespace-nowrap lg:text-base sm:text-sm">
                Date
              </TableHead>
              <TableHead className="text-right text-[#4A38C2] whitespace-nowrap lg:text-base sm:text-sm">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          {/* now use the content of the above head so we use body
           */}
          <TableBody>
            {/* Check if applicants are available and safely map over the array */}
            {applicants &&
            applicants.application &&
            applicants.application.length > 0 ? (
              applicants.application.map((item) => (
                // create a className assign it on TableRow
                <TableRow key={item.id} className="border-b border-violet-500">
                  <TableCell className="whitespace-nowrap text-xs sm:text-sm md:text-base">
                    {item?.applicant?.fullname}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-xs sm:text-sm md:text-base">
                    {item?.applicant?.email}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-xs sm:text-sm md:text-base">
                    {item?.applicant?.phoneNumber}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-xs sm:text-sm md:text-base">
                    {item?.applicant?.profile?.resume ? (
                      <a
                        className="text-blue-700 underline break-words"
                        href={item?.applicant?.profile?.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item?.applicant?.profile?.resumeOriginalName}
                      </a>
                    ) : (
                      <span className="text-[#F83002] font-semibold">NA</span>
                    )}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-xs sm:text-sm md:text-base">
                    {item?.createdAt?.split("T")[0]}
                  </TableCell>

                  <TableCell className="text-right  ">
                    <Popover>
                      {/* make a className on PopoverTrigger */}
                      <PopoverTrigger className="p-2 rounded-lg focus:outline-none">
                        <MoreHorizontal className="w-5 h-5 md:w-6 md:h-6" />
                      </PopoverTrigger>
                      <PopoverContent className="w-36  flex flex-col gap-2 p-2 text-xs sm:text-sm md:text-base">
                        {shortListedStatus.map((status, index) => (
                          <div
                            onClick={() => statusHandler(status, item?._id)}
                            key={index}
                            className="flex items-center w-full  cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                          >
                            <span className="mr-2">{status.icon}</span>
                            <span className={status.labelColor}>
                              {status.label}
                            </span>
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-red-500 text-lg"
                >
                  No applicants found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ApplicantsTable;
