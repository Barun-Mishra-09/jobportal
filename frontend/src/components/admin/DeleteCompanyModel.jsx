// import React from 'react'

import { deletedCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
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

const DeleteCompanyModel = ({ isOpen, onClose, companyId }) => {
  const dispatch = useDispatch();

  const deleteCompanyHandler = async () => {
    try {
      const res = await axios.delete(
        `${COMPANY_API_END_POINT}/delete/${companyId}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(deletedCompany(companyId));
        toast.success(res?.data?.message);
        onClose(); // close model
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
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
            Do you really want to delete this company?
          </p>
          <DialogFooter className="flex justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteCompanyHandler}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteCompanyModel;
