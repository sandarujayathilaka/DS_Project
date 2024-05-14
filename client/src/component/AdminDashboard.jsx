"use client"
 
import * as React from "react"
import {
  Card,
  CardFooter,
 
} from "@/components/ui/card"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "./Header"
import axios from 'axios';
import  { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ReactLoading from 'react-loading';
export default function AdminDashboard() {
  const [date, setDate] = React.useState(new Date());
  const [data, setData] = useState({
    instructorCount: 0,
    courseCount: 0,
    studentCount: 0,
    courseImages: []
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

 const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const response = await axios.get("https://udemy.dev/api/adminstatistic");
       
        setData(response.data);
        setIsLoading(false)
      } catch (error) {
        toast.error(error);
     
      }
    };

    fetchDatas();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % data.courseImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [data.courseImages]);

 

  return (
    <Header>
      {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100" >
           
            <ReactLoading type="spinningBubbles" color="#0000FF" height={100} width={50} />
          </div>
        ) : (
    <div className="mt-5 ml-2 mr-2 flex flex-col items-center">
     
      <Button variant={"outline"} className="w-[280px] mb-2 justify-start text-left font-normal">
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date ? format(date, "PPP") : <span>Pick a date</span>}
      </Button>

     
      {data.courseImages && data.courseImages.length > 0 && (
        <Card className="shadow-blue-500 w-3/4  mb-4 flex flex-col justify-center items-center ">
          <img
            src={data.courseImages[currentImageIndex]?.imageUrl}
            alt={data.courseImages[currentImageIndex]?.title}
            className="w-3/4 h-64 mt-4 object-cover rounded-lg mb-4"
          />
          <CardFooter>
            <p className="mr-2">{data.courseImages[currentImageIndex]?.title}</p>
          <Link to={`/view/${data.courseImages[currentImageIndex]?.id}`}>
            <Button >
              View Course
            </Button>
            </Link>
          </CardFooter>
        </Card>
      )}

    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 w-full mb-5">
        <Card className="shadow-blue-500 flex flex-col justify-center items-center">
          <h1 className="mt-5 mb-3 text-lg sm:text-xl">Total Instructor</h1>
          <p className="mb-5 text-xl sm:text-2xl">{data.instructorCount}</p>
          <CardFooter>
          <Link to={`/instructors`}>
            <Button >
              View Instructors
            </Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="shadow-blue-500 flex flex-col justify-center items-center">
          <h1 className="mt-5 mb-3 text-lg sm:text-xl">Total Courses</h1>
          <p className="mb-5 text-xl sm:text-2xl">{data.courseCount}</p>
          <CardFooter>
          <Link to={`/courses`}>
            <Button >
              View Courses
            </Button>
            </Link>
          </CardFooter>
       
        </Card>
        <Card className="shadow-blue-500 flex flex-col justify-center items-center">
          <h1 className="mt-5 mb-3 text-lg sm:text-xl">Total Student</h1>
          <p className="mb-5 text-xl sm:text-2xl">{data.studentCount}</p>
          <CardFooter>
          <Link to={`/students`}>
            <Button >
              View Students
            </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
    )}
    </Header>
  );
}
