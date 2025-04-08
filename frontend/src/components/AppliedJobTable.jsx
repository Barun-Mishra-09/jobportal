import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-6xl mx-auto bg-gray-50 border border-violet-300 rounded-3xl my-2 p-5 shadow-violet-400 shadow-md overflow-hidden ">
      <h2 className="text-center text-lg sm:text-xl font-semibold text-[#8A2BE2] mb-4">
        List of Your Applied Jobs
      </h2>
      {/* 
    1. Table
    2. Table Caption
    3. Table Row
    4. Table Head
    5. Table Body 
    */}

      {/* Responsive Table Wrapper we use additional div before Table */}
      <div className="overflow-x-auto">
        <Table className="w-full ">
          <TableHeader>
            <TableRow className="border-b border-[#8A2BE2]  text-sm sm:text-base">
              <TableHead className="text-[#8A2BE2] sm:text-center ">
                Date
              </TableHead>
              <TableHead className="text-[#8A2BE2] sm:text-center">
                Job Role
              </TableHead>
              <TableHead className="text-[#8A2BE2] sm:text-center">
                Company
              </TableHead>
              <TableHead className="text-right text-[#8A2BE2] sm:text-center">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {allAppliedJobs.length == 0 ? (
              <TableRow>
                <TableCell
                  colSpan="4"
                  className="text-center text-red-500 p-4 text-sm sm:text-lg font-semibold"
                >
                  You have not applied for any jobs yet 😔.
                </TableCell>
              </TableRow>
            ) : (
              allAppliedJobs.map((appliedJob) => (
                <TableRow
                  key={appliedJob._id}
                  className=" border-b border-violet-500"
                >
                  <TableCell className="whitespace-nowrap text-xs sm:text-sm lg:text-base sm:text-center">
                    {appliedJob?.createdAt.split("T")[0]}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-xs sm:text-sm lg:text-base sm:text-center">
                    {appliedJob?.job?.title}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-xs sm:text-sm lg:text-base sm:text-center">
                    {appliedJob?.job?.company?.name}
                  </TableCell>
                  <TableCell
                    className="text-right text-[#8A2BE2] sm:text-center "
                    variant="outline"
                  >
                    <Badge
                      className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-lg truncate ${
                        appliedJob?.status === "Accepted"
                          ? "bg-emerald-500 hover:bg-emerald-600 cursor-pointer"
                          : appliedJob?.status === "Rejected"
                          ? "bg-[#F83002] hover:bg-red-600 cursor-pointer"
                          : "bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
                      }`}
                    >
                      {appliedJob.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppliedJobTable;
