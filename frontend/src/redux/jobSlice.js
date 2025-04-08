// jobSlice.js
import { createSlice } from "@reduxjs/toolkit";

const loadSavedJobs = () => {
  const savedJobs = localStorage.getItem("savedJobs");
  return savedJobs ? JSON.parse(savedJobs) : [];
};

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs: [],
    searchedQuery: "",
    savedJobs: loadSavedJobs(), // Always an array
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    deleteJobById: (state, action) => {
      state.allJobs = state.allJobs.filter((job) => job._id !== action.payload);
      state.allAdminJobs = state.allAdminJobs.filter(
        (job) => job._id !== action.payload
      );
    },
    saveJob: (state, action) => {
      // Ensure savedJobs is an array before operating
      if (!Array.isArray(state.savedJobs)) {
        state.savedJobs = [];
      }
      if (!state.savedJobs.some((job) => job._id === action.payload._id)) {
        state.savedJobs.push(action.payload);
        localStorage.setItem("savedJobs", JSON.stringify(state.savedJobs));
      }
    },
    unsaveJob: (state, action) => {
      // Ensure savedJobs is an array before filtering
      if (!Array.isArray(state.savedJobs)) {
        state.savedJobs = [];
      }
      state.savedJobs = state.savedJobs.filter(
        (job) => job._id !== action.payload._id
      );
      localStorage.setItem("savedJobs", JSON.stringify(state.savedJobs));
    },
    setSavedJobs: (state, action) => {
      state.savedJobs = Array.isArray(action.payload) ? action.payload : [];
      localStorage.setItem("savedJobs", JSON.stringify(state.savedJobs));
    },
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
  deleteJobById,
  saveJob,
  unsaveJob,
  setSavedJobs,
} = jobSlice.actions;

export default jobSlice.reducer;
