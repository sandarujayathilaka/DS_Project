import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormError from "../FormError";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";
import TextLoader from "@/components/loaders/TextLoader";

const DescriptionSchema = Yup.object({
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters"),
});
const Description = ({ initialValue, chapterId, courseId, refresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const formik = useFormik({
    initialValues: {
      description: initialValue,
    },
    enableReinitialize: true,
    validationSchema: DescriptionSchema,
    onSubmit: (values) => {
      // console.log(values);
      setLoading(true);
      axios
        .patch(
          `https://udemy.dev/api/courses/${courseId}/chapters/${chapterId}`,
          values
        )
        .then((response) => {
          toast.success("Chapter description updated successfully");
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
          Chapter Description
        </span>
        <span
          className="cursor-pointer text-sm"
          onClick={loading ? null : toggleEdit}
        >
          {isEditing ? (
            <span className="text-gray-700">Cancel</span>
          ) : (
            <div className="flex items-center text-green-700">
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </div>
          )}
        </span>
      </div>

      {isEditing ? (
        <form className="space-y-2 mt-2">
          <Textarea
            id="description"
            name="description"
            placeholder="e.g. 'This chapter is about...'"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description && (
            <FormError error={formik.errors.description} />
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

export default Description;
