import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import FormError from "../FormError";
import { useState } from "react";
import { Pencil } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import TextLoader from "@/components/loaders/TextLoader";
import api from "@/api/build-client";
import { categories } from "@/constants/categories";

const CategorySchema = Yup.object({
  category: Yup.string().required("Category is required"),
});

const Category = ({ initialValue, courseId, refresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const formik = useFormik({
    initialValues: {
      category: initialValue,
    },
    enableReinitialize: true,
    validationSchema: CategorySchema,
    onSubmit: (values) => {
      // console.log(values);
      setLoading(true);
      api
        .patch("/courses/" + courseId, values)
        .then((response) => {
          toast.success("Course category updated successfully");
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
          Course Category
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
          <Select
            id="category"
            name="category"
            onValueChange={(value) => formik.setFieldValue("category", value)}
            defaultValue={formik.values.category}
            className="border-white/10 mb-2"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {formik.touched.category && formik.errors.category && (
            <FormError error={formik.errors.category} />
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
        <div className="mt-2 capitalize">{initialValue}</div>
      )}
    </div>
  );
};

export default Category;
