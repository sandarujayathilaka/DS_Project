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
import { useFormik } from "formik";
import * as Yup from "yup";
import FormError from "../forms/FormError";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const TitleSchema = Yup.object({
  title: Yup.string()
    .required("Chapter name is required")
    .min(5, "Chapter name name must be at least 5 characters")
    .max(50, "Chapter name must not exceed 50 characters"),
});

const AddChapterDialog = ({ trigger, courseId, refresh }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: TitleSchema,
    onSubmit: (values) => {
      // console.log(values);
      setLoading(true);
      axios
        .post(`https://udemy.dev/api/courses/${courseId}/chapters/`, values)
        .then((response) => {
          console.log(response.data);
          setLoading(false);
          refresh();
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
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader className="text-left">
          <DialogTitle>Name your chapter</DialogTitle>
          <DialogDescription>
            What would you like to name your chapter? Don&apos;t worry, you can
            change this later.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-2 mt-2">
          <Input
            id="title"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
            className="border-white/10 bg-black/10 mb-2"
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

export default AddChapterDialog;
