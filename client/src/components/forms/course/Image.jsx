import { useState } from "react";
import { ImageUp, Pencil } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import toast from "react-hot-toast";
import UploadLoader from "@/components/loaders/UploadLoader";
import api from "@/api/build-client";

const UploadSection = ({ onUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      onUpload(acceptedFiles);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="cursor-pointer rounded-lg border border-dashed bg-slate-200 border-black/20 p-3"
    >
      <input {...getInputProps()} />
      <div className="flex items-center px-2 py-4 gap-[18px] bg-slate-400">
        <ImageUp size={48} />
        <div className="text-white text-xs md:text-sm">
          <p>Click to upload or drag and drop</p>
          <p>SVG, JPG, PNG</p>
        </div>
      </div>
    </div>
  );
};

const Image = ({ initialValue, courseId, refresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const handleUpload = async (files) => {
    setLoading(true);
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "images_preset");

    let cloudinaryApi = `https://api.cloudinary.com/v1_1/djtoyeee2/image/upload`;

    try {
      // Upload image
      const res = await axios.post(cloudinaryApi, data);
      // console.log(res.data);
      // console.log(res.data?.secure_url);

      await api
        .patch("/courses/" + courseId, { image: res.data })
        .then((response) => {
          toast.success("Course image updated successfully");
          setIsEditing(false);
          setLoading(false);
          refresh();
        })
        .catch((error) => {
          console.error(error);
          toast.error(error.response?.data?.error?.message || error.message);
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  return (
    <div className="w-full bg-slate-100 rounded-lg p-5">
      <div className="flex justify-between">
        <span className="font-inter font-semibold text-base text-black/80">
          Course Image
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
          {loading ? (
            <UploadLoader />
          ) : (
            <UploadSection onUpload={handleUpload} />
          )}
        </form>
      ) : (
        <div className="mt-2">
          {initialValue && (
            <img
              src={initialValue}
              alt="course"
              className="w-full object-cover rounded-lg"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Image;
