import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormError from "../FormError";
import { useState } from "react";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import TextLoader from "@/components/loaders/TextLoader";
import api from "@/api/build-client";

const TitleSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(10, "Title must be at least 10 characters")
    .max(100, "Title must not exceed 100 characters"),
});

const Title = ({ initialValue, courseId, refresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const formik = useFormik({
    initialValues: {
      title: initialValue,
    },
    enableReinitialize: true,
    validationSchema: TitleSchema,
    onSubmit: (values) => {
      // console.log(values);
      setLoading(true);
      api
        .patch("/courses/" + courseId, values)
        .then((response) => {
          toast.success("Course title updated successfully");
          setIsEditing(false);
          setLoading(false);
          refresh();
        })
        .catch((error) => {
          console.error(error);
          toast.error(error.response?.data?.error?.message || error.message);
          setLoading(false);
        });
    },
  });

  return (
    <div className="w-full bg-slate-100 rounded-lg p-5">
      <div className="flex justify-between">
        <span className="font-inter font-semibold text-base text-black/80">
          Course Title
        </span>
        <span
          className="cursor-pointer text-sm"
          onClick={loading ? null : toggleEdit}
        >
          {isEditing ? (
            <span className="text-gray-700">Cancel</span>
          ) : (
            <div className="flex items-center text-main">
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </div>
          )}
        </span>
      </div>

      {isEditing ? (
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
          <Button
            type="submit"
            onClick={formik.handleSubmit}
            disabled={loading}
          >
            {loading ? <TextLoader /> : "Save"}
          </Button>
        </form>
      ) : (
        <div className="mt-2">{initialValue}</div>
      )}
    </div>
  );
};

export default Title;
