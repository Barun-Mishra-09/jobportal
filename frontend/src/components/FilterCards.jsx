import { useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { X } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    type: "checkbox",
    array: [
      "Delhi",
      "Bangalore",
      "Ramgarh",
      "Kolkata",
      "Pune",
      "Mumbai",
      "Hyderabad",
    ],
  },
  {
    filterType: "Industry",
    type: "checkbox",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Mern Stack Developer",
      "Full Stack Developer",
      "Database Engineer",
      "DevOps Engineer",
      "Cloud Engineer",
      "Ethical Hacker",
      "Data Science",
    ],
  },

  {
    filterType: "Skills",
    type: "radio",
    array: ["Reactjs", "Nodejs", "MongoDB", "SQL", "Python", "C++", "Java"],
  },
];

const FilterCards = ({ isFilterOpen, setIsFilterOpen }) => {
  const [selectedValues, setSelectedValues] = useState({
    Location: [],
    Industry: [],
    Salary: "",
    Skills: "",
  });

  const dispatch = useDispatch();

  const handleCheckboxChange = (filterType, value) => {
    setSelectedValues((prev) => {
      const updatedValues = prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value];
      return { ...prev, [filterType]: updatedValues };
    });
  };

  const handleRadioChange = (filterType, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  useEffect(() => {
    const query = [
      ...selectedValues.Location,
      ...selectedValues.Industry,
      selectedValues.Salary,
      selectedValues.Skills,
    ]
      .filter(Boolean)
      .join(" ");
    dispatch(setSearchedQuery(query));
  }, [selectedValues, dispatch]);

  return (
    <>
      {/* Overlay (for mobile when filter is open) */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={() => setIsFilterOpen(false)}
        ></div>
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed inset-y-0 left-0 bg-white sm:bg-white md:bg-white lg:bg-gradient-to-br lg:from-blue-50 lg:via-pink-50 lg:to-violet-50 z-50 w-[80%] sm:w-64 md:w-72 lg:w-full h-full shadow-lg transition-transform duration-300 ease-in-out 
          sm:relative sm:h-[calc(100vh-5rem)] sm:transition-none sm:translate-x-0 overflow-y-auto border border-gray-200 rounded-r-lg sm:rounded-lg box-border`}
      >
        {/* Close Button (Mobile Only) */}
        <div className="sm:hidden flex justify-end p-3">
          <button onClick={() => setIsFilterOpen(false)}>
            <X className="w-6 h-6 text-red-600" />
          </button>
        </div>

        {/* Title */}
        <div className="p-3 lg:p-4 text-center">
          <h1 className="text-lg sm:text-xl lg:text-3xl font-semibold whitespace-nowrap">
            <span className="text-[#F83002]">Refine</span>
            <span className="text-[#8A2BE2]"> Job Search</span>
          </h1>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 my-3 px-3 lg:px-4 overflow-y-auto max-h-[calc(100vh-12rem)] sm:max-h-[calc(100vh-14rem)] scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
          {filterData.map((data, index) => (
            <div
              key={index}
              className="p-2 lg:p-3 rounded-lg shadow-md border border-[#8A2BE2] from-blue-50 via-pink-50 to-violet-50 box-border text-sm lg:text-lg"
            >
              <h2 className="text-sm lg:text-xl font-semibold text-[#F83002]">
                {data.filterType}
              </h2>

              <div className="mt-1 lg:mt-2 space-y-1 lg:space-y-3">
                {data.type === "checkbox" &&
                  data.array.map((item, idx) => {
                    const checkboxId = `${data.filterType}-${idx}`;
                    return (
                      <div key={idx} className="flex items-center space-x-2">
                        <Checkbox
                          id={checkboxId}
                          checked={selectedValues[data.filterType].includes(
                            item
                          )}
                          onCheckedChange={() =>
                            handleCheckboxChange(data.filterType, item)
                          }
                        />
                        <Label
                          htmlFor={checkboxId}
                          className="text-[#8A2BE2] text-xs lg:text-base flex-1"
                        >
                          {item}
                        </Label>
                      </div>
                    );
                  })}

                {data.type === "radio" && (
                  <RadioGroup
                    value={selectedValues[data.filterType]}
                    onValueChange={(value) =>
                      handleRadioChange(data.filterType, value)
                    }
                    className="flex flex-col"
                  >
                    {data.array.map((item, idx) => {
                      const radioId = `${data.filterType}-${idx}`;
                      return (
                        <div
                          key={idx}
                          className="flex items-center space-x-2 rounded-lg px-1 lg:px-2 py-0.5 lg:py-1 hover:bg-gray-100 transition"
                        >
                          <RadioGroupItem id={radioId} value={item} />
                          <Label
                            htmlFor={radioId}
                            className="text-[#8A2BE2] text-xs lg:text-base flex-1"
                          >
                            {item}
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FilterCards;
