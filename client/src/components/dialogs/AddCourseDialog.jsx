import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormError from "../forms/FormError";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const TitleSchema = Yup.object({
  title: Yup.string()
    .required("Course name is required")
    .min(10, "Course name name must be at least 10 characters")
    .max(100, "Course name must not exceed 100 characters"),
});

const AddCourseDialog = ({ trigger }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: TitleSchema,
    onSubmit: (values) => {
      console.log(values);
      setLoading(true);
      axios
        .post("https://udemy.dev/api/courses", values)
        .then((response) => {
          console.log(response.data);
          setLoading(false);
          navigate("/instructor/course/" + response.data.id);
          handleCloseDialog();
        })
        .catch((error) => {
          console.error(error);
          toast.error(error.response?.data?.error?.message || error.message);
          setLoading(false);
        });
    },
  });

  const handleCloseDialog = () => {
    // Close the dialog by clicking the close button
    const closeButton = document.getElementById("auth-dialog-close");
    if (closeButton) closeButton.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[560px] bg-white/90">
        <DialogHeader className="text-left">
          <DialogTitle>Name your course</DialogTitle>
          <DialogDescription>
            What would you like to name your course? Don&apos;t worry, you can
            change this later.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-2 mt-2">
          <Input
            id="title"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
            className="border-white/10 mb-2"
          />
          {formik.touched.title && formik.errors.title && (
            <FormError error={formik.errors.title} />
          )}
        </form>
        <DialogFooter>
          <Button type="submit" onClick={formik.handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>

      {/* Close trigger */}
      <DialogClose className="hidden" id="auth-dialog-close" />
    </Dialog>
  );
};

export default AddCourseDialog;
