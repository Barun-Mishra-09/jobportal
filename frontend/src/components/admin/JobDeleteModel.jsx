// import React from 'react'

import { deleteJobById } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

const JobDeleteModel = ({ isOpen, onClose, jobId }) => {
  const dispatch = useDispatch();
  const deleteJobHandler = async () => {
    try {
      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(deleteJobById(jobId));
        toast.success(res?.data?.message);
        onClose(); // clost the model
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.messages);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>

          <p className="text-gray-600">
            Do you really want to delete this job?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteJobHandler}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobDeleteModel;
