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

const AccessSchema = Yup.object({
  access: Yup.string().required("Access level is required"),
});

const categories = [
  { value: "free", label: "Free" },
  { value: "paid", label: "Paid" },
];

const Access = ({ initialValue, chapterId, courseId, refresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const formik = useFormik({
    initialValues: {
      access: initialValue,
    },
    enableReinitialize: true,
    validationSchema: AccessSchema,
    onSubmit: (values) => {
      // console.log(values);
      setLoading(true);
      api
        .patch(`/courses/${courseId}/chapters/${chapterId}`, values)
        .then((response) => {
          toast.success("Chapter access updated successfully");
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
          Chapter Access
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
            id="access"
            name="access"
            onValueChange={(value) => formik.setFieldValue("access", value)}
            defaultValue={formik.values.access}
            className="border-white/10 mb-2"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a access" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((access) => (
                  <SelectItem key={access.value} value={access.value}>
                    {access.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {formik.touched.access && formik.errors.access && (
            <FormError error={formik.errors.access} />
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

export default Access;
