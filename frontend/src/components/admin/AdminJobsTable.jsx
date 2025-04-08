import { Edit2, Eye, MoreHorizontal } from "lucide-react";
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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";

import JobDeleteModel from "./JobDeleteModel";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  // For deleting job we use these two useState
  const [selectedJobById, setSelectedJobById] = useState(null);
  const [isDeleteModelOpen, setDeleteModelOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) =>
      searchJobByText
        ? job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            .toLowerCase()
            .includes(searchJobByText.toLowerCase())
        : true
    );
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="max-w-6xl mx-auto bg-gray-50 border border-violet-500 rounded-2xl p-7 shadow-lg shadow-violet-500 w-full">
      <h1 className="text-xl text-center text-[#f03a11] mb-2 font-bold">
        A List of Your Registered Jobs
      </h1>

      <div className="overflow-x-auto">
        <Table className="w-full min-w-max text-sm sm:text-base  ">
          <TableHeader>
            <TableRow className="border-b-2 border-violet-500 text-base">
              <TableHead className="text-[#4A38C2] whitespace-nowrap">
                Company Name
              </TableHead>
              <TableHead className="text-[#4A38C2] whitespace-nowrap">
                Role
              </TableHead>
              <TableHead className="text-[#4A38C2] whitespace-nowrap">
                Date
              </TableHead>
              <TableHead className="text-right text-[#4A38C2] whitespace-nowrap">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filterJobs?.map((job) => (
              <TableRow key={job.id} className="border-b border-violet-500">
                <TableCell className="whitespace-normal sm:whitespace-nowrap truncate max-w-[150px] break-words sm:truncate sm:max-w-[150px] lg:text-base">
                  {job?.company?.name}
                </TableCell>
                <TableCell className="whitespace-nowrap lg:text-base">
                  {job?.title}
                </TableCell>
                <TableCell className="whitespace-nowrap lg:text-base">
                  {job.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger className="p-2 sm:p-1">
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-40 flex flex-col gap-2 p-2">
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}`)}
                        className="flex items-center gap-2 cursor-pointer w-full text-blue-500 hover:text-blue-600 hover:bg-gray-100 p-2 rounded-lg hover:text-lg"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 cursor-pointer w-full p-2 text-base hover:text-lg rounded-lg text-green-500 hover:text-green-600 hover:bg-gray-100"
                      >
                        <Eye className="w-5 h-5 transition-transform duration-200 hover:scale-125" />
                        <span className="transition-all duration-200 hover:text-lg">
                          Applicants
                        </span>
                      </div>
                      {/* Job Delete Button */}
                      <div
                        onClick={() => {
                          setSelectedJobById(job?._id);
                          setDeleteModelOpen(true);
                        }}
                        className="flex items-center gap-2 cursor-pointer w-full text-red-500 hover:text-[#f03a11] hover:text-lg hover:bg-gray-100 p-2 rounded-lg"
                      >
                        <MdDeleteOutline size={21} />
                        <span>Delete</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Model */}
      {isDeleteModelOpen && (
        <JobDeleteModel
          jobId={selectedJobById}
          isOpen={isDeleteModelOpen}
          onClose={() => setDeleteModelOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminJobsTable;
