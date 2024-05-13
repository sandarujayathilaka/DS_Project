import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"


const AddCourse = () => {
    const { toast } = useToast();
    const [courseData, setCourseData] = useState({
        c_name: '',
        c_category: '',
        c_description: '',
        c_code:'',
        instructor: '',
        videos: [{ title: '', url: '' }]
    });

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (name === 'title' || name === 'url') {
            const updatedVideos = [...courseData.videos];
            updatedVideos[index][name] = value;
            setCourseData({ ...courseData, videos: updatedVideos });
        } else {
            setCourseData({ ...courseData, [name]: value });
        }
    };

    const handleAddVideo = () => {
        setCourseData({
            ...courseData,
            videos: [...courseData.videos, { title: '', url: '' }]
        });
    };

    const handleRemoveVideo = (index) => {
        const updatedVideos = [...courseData.videos];
        updatedVideos.splice(index, 1); // Remove the video at the specified index
        setCourseData({ ...courseData, videos: updatedVideos });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(courseData); // You can send this data to your backend API
        
        try {
            const response = await axios.post('http://localhost:8080/cou/addCou', {
                c_name: courseData.c_name,
                c_category: courseData.c_category,
                c_code: courseData.c_code,
                c_description: courseData.c_description,
                instructor: courseData.instructor,
                videos: courseData.videos,
                status:'Pending'
            });
            if(response){
                toast({
                    description: "Course added successfully.",
                  })
            }
              
         
          } catch (err) {
            if (!err?.response) {
              toast.error("No Server Response");
              toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "No Server Response."
                
              })
            } else if (err.response?.status === 400) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Please fill all fields.",
                })
              }  else if (err.response?.status === 402) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "This course already exists.",
                })
              } else{
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Internal server error.",
                })
              }
        };
    }
    return (
        <div className='flex items-center justify-center min-h-screen bg-blue-200'>
            <div className='bg-white p-8 rounded shadow-md w-96 mt-2 mb-2'>
                <h2 className='text-xl font-bold mb-4'>Add Course</h2>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <label>
                        Course code:
                        <input
                            type="text"
                            name="c_code"
                            value={courseData.c_code}
                            onChange={handleChange}
                            required
                            className='border border-gray-300 rounded-md p-2 w-full'
                        />
                    </label>
                    <label>
                        Course Name:
                        <input
                            type="text"
                            name="c_name"
                            value={courseData.c_name}
                            onChange={handleChange}
                            required
                            className='border border-gray-300 rounded-md p-2 w-full'
                        />
                    </label>
                    <label>
                        Category:
                        <input
                            type="text"
                            name="c_category"
                            value={courseData.c_category}
                            onChange={handleChange}
                            required
                            className='border border-gray-300 rounded-md p-2 w-full'
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            name="c_description"
                            value={courseData.c_description}
                            onChange={handleChange}
                            required
                            className='border border-gray-300 rounded-md p-2 w-full h-24'
                        />
                    </label>
                    <label>
                        Instructor:
                        <input
                            type="text"
                            name="instructor"
                            value={courseData.instructor}
                            onChange={handleChange}
                            required
                            className='border border-gray-300 rounded-md p-2 w-full'
                        />
                    </label>

                    <h3>Videos</h3>
                    {courseData.videos.map((video, index) => (
                        <div key={index} className='space-y-2'>
                            <label>
                                Video Title:
                                <input
                                    type="text"
                                    name="title"
                                    value={video.title}
                                    onChange={(e) => handleChange(e, index)}
                                    required
                                    className='border border-gray-300 rounded-md p-2 w-full'
                                />
                            </label>
                            <label>
                                Video URL:
                                <input
                                    type="text"
                                    name="url"
                                    value={video.url}
                                    onChange={(e) => handleChange(e, index)}
                                    required
                                    className='border border-gray-300 rounded-md p-2 w-full'
                                />
                            </label>
                            <button
                                type="button"
                                onClick={() => handleRemoveVideo(index)}
                                className='text-red-500 hover:text-red-700'
                            >
                                Remove Video
                            </button>
                        </div>
                    ))}

                    <button type="button" onClick={handleAddVideo} className='bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 mr-2'>
                        Add Video
                    </button>
                    <button type="submit" className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500'>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCourse;
