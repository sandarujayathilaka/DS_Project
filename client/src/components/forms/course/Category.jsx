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
import axios from "axios";
import toast from "react-hot-toast";
import TextLoader from "@/components/loaders/TextLoader";

const CategorySchema = Yup.object({
  category: Yup.string().required("Category is required"),
});

const categories = [
  { value: "programming", label: "Programming" },
  { value: "web development", label: "Web Development" },
  { value: "mobile development", label: "Mobile Development" },
  { value: "data science", label: "Data Science" },
  { value: "machine learning", label: "Machine Learning" },
  { value: "artificial intelligence", label: "Artificial Intelligence" },
  { value: "networking", label: "Networking" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "game development", label: "Game Development" },
  { value: "cloud computing", label: "Cloud Computing" },
];

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
      axios
        .patch("https://udemy.dev/api/courses/" + courseId, values)
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
            <div className="flex items-center text-green-700">
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
