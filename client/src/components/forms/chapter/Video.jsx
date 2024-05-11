import { useState } from "react";
import { Pencil, CloudUpload } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import ReactPlayer from "react-player";
import toast from "react-hot-toast";
import UploadLoader from "@/components/loaders/UploadLoader";

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
      "video/*": [".mp4"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="cursor-pointer rounded-lg border border-dashed bg-slate-200 border-black/20 p-3"
    >
      <input {...getInputProps()} />
      <div className="flex items-center px-2 py-4 gap-[18px] bg-slate-400">
        <CloudUpload size={48} />
        <div className="text-white text-xs md:text-sm">
          <p>Click to upload or drag and drop</p>
          <p>MP4, MKV</p>
        </div>
      </div>
    </div>
  );
};

const Video = ({ initialValue, chapterId, courseId, refresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const handleUpload = async (files) => {
    setLoading(true);
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "videos_preset");

    let api = `https://api.cloudinary.com/v1_1/djtoyeee2/video/upload`;

    try {
      // Upload video
      const res = await axios.post(api, data);
      // console.log(res.data);
      // console.log(res.data?.secure_url);

      await axios
        .patch(
          `https://udemy.dev/api/courses/${courseId}/chapters/${chapterId}`,
          { video: res.data }
        )
        .then((response) => {
          toast.success("Chapter video updated successfully");
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
        <span className="font-medium font-sans text-black/80">
          Chapter Video
        </span>
        <span className="cursor-pointer text-sm" onClick={toggleEdit}>
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
          {loading ? (
            <UploadLoader />
          ) : (
            <UploadSection onUpload={handleUpload} />
          )}
        </form>
      ) : (
        <div className="mt-2">
          <ReactPlayer
            url={initialValue}
            controls={true}
            width="100%"
            height="100%"
            config={{
              file: {
                attributes: {
                  onContextMenu: (e) => e.preventDefault(),
                  controlsList: "nodownload",
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Video;
