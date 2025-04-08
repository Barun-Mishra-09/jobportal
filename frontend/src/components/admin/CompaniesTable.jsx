import { Edit2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
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
// import { aw } from "framer-motion/dist/types.d-6pKw1mTI";

// import { setSearchCompanyByText } from "@/redux/companySlice";

import DeleteCompanyModel from "./DeleteCompanyModel";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );

  //  Create a state for the filter company
  const [filterCompany, setFilterCompany] = useState(companies);

  //
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [isDeleteModelOpen, setDeleteModelOpen] = useState(false);

  const navigate = useNavigate();

  // Comments of for new delete logic on DeleteCompanyModel.

  // useEffect(() => {
  //   const filteredCompany =
  //     companies.length >= 0 &&
  //     companies.filter((company) => {
  //       if (!searchCompanyByText) {
  //         return true;
  //       }
  //       return company?.name
  //         ?.toLowerCase()
  //         .includes(searchCompanyByText.toLowerCase());
  //     });
  //   setFilterCompany(filteredCompany);
  // }, [companies, searchCompanyByText]);

  // new useEffect for the DeleteCompanyModel logic
  useEffect(() => {
    const filteredCompany = companies.filter((company) =>
      searchCompanyByText
        ? company.name.toLowerCase().includes(searchCompanyByText.toLowerCase())
        : true
    );
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    // Responsiveness:- after shadow-md
    <div className="max-w-6xl mx-auto bg-gray-50 border border-violet-300 rounded-2xl p-7  shadow-md w-full shadow-violet-400 overflow-hidden ">
      <h1 className="text-xl text-center text-[#f03a11] mb-2 font-bold">
        A List of Your Registered Company
      </h1>

      {/* Table wrapper for Responsiveness make a new div completely with className  */}
      <div className="overflow-x-auto">
        {/* Responsive:- completely new w-ful */}
        <Table className="w-full min-w-max">
          <TableHeader>
            <TableRow className=" border-b-2 border-violet-500 text-base">
              {/* Responsive:- after text add whitespace-nowrap */}
              <TableHead className="text-[#4A38C2] whitespace-nowrap">
                Logo
              </TableHead>
              <TableHead className="text-[#4A38C2] whitespace-nowrap">
                Name
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
            {filterCompany?.map((company) => (
              <TableRow
                key={company.id}
                className=" border-b border-violet-500"
              >
                {/* Use a unique key */}
                <TableCell>
                  {/* Responsive:- Make a new className for avatar completely */}
                  <Avatar className="w-8 h-8 sm:w-12 sm:h-12">
                    <AvatarImage src={company.logo || "default-logo-url"} />
                  </Avatar>
                </TableCell>
                {/* Responsive:- create className whitespace-nowrap */}
                <TableCell className="whitespace-normal sm:whitespace-nowrap truncate max-w-[150px] break-words sm:truncate sm:max-w-[150px] lg:text-base">
                  {company.name}
                </TableCell>
                {/* Dynamically use company name */}
                {/* Responsive:- create className whitespace-nowrap */}
                <TableCell className="whitespace-nowrap lg:text-base">
                  {company.createdAt.split("T")[0]}
                </TableCell>{" "}
                {/* Dynamically use company date */}
                <TableCell className="text-right cursor-pointer ">
                  <Popover>
                    <PopoverTrigger className="p-2 rounded-lg ">
                      <MoreHorizontal />
                    </PopoverTrigger>
                    {/* Responsive:- after bg-gray-100 */}
                    <PopoverContent className="w-32 flex flex-col gap-2 p-2">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-2 cursor-pointer w-full p-2 rounded-lg text-blue-500 hover:text-blue-600 hover:bg-gray-100 hover:text-lg"
                      >
                        <Edit2 className="w-4  " />
                        <span>Edit</span>
                      </div>
                      {/* for the delete button of the companies */}
                      {/* <DeleteIcon />
                       */}

                      <div
                        onClick={() => {
                          setSelectedCompanyId(company?._id);
                          setDeleteModelOpen(true);
                        }}
                        className="flex items-center gap-2 w-full cursor-pointer text-base text-red-500 hover:text-[#f03a11]  hover:text-lg hover:bg-gray-100 p-2 rounded-lg"
                      >
                        <MdDeleteOutline size={20} />
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

      {/* Delete confirmation Model */}
      {isDeleteModelOpen && (
        <DeleteCompanyModel
          companyId={selectedCompanyId}
          isOpen={isDeleteModelOpen}
          onClose={() => setDeleteModelOpen(false)}
        />
      )}
    </div>
  );
};

export default CompaniesTable;
