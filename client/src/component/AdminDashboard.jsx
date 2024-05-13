"use client"
 
import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import axios from 'axios';
import  { useState, useEffect } from 'react';
import showPasswordIcon from '../assets/show.png';
import { Link } from "react-router-dom";
export default function AdminDashboard() {
  const [date, setDate] = React.useState(new Date());
  const [data, setData] = useState({
    instructorCount: 0,
    courseCount: 0,
    studentCount: 0,
    courseImages: []
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
 // const history = useHistory();

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const response = await axios.get("https://udemy.dev/api/adminstatistic");
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching admin statistics:', error);
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

  const handleCourseClick = courseId => {
    history.push(`/course/${courseId}`);
  };

  return (
    <div className="mt-5 ml-2 mr-2 flex flex-col items-center">
      {/* Date selection */}
      <Button variant={"outline"} className="w-[280px] mb-2 justify-start text-left font-normal">
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date ? format(date, "PPP") : <span>Pick a date</span>}
      </Button>

      {/* Course image card */}
      {data.courseImages && data.courseImages.length > 0 && (
        <Card className="shadow-blue-500 w-3/4 mb-4 flex flex-col justify-center items-center">
          <img
            src={data.courseImages[currentImageIndex]?.imageUrl}
            alt={data.courseImages[currentImageIndex]?.title}
            className="w-3/4 mt-4 object-cover rounded-lg mb-4"
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

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 w-full mb-5">
        <Card className="shadow-blue-500 flex flex-col justify-center items-center">
          <h1 className="mt-5 mb-3 text-lg sm:text-xl">Total Instructor</h1>
          <p className="mb-5 text-xl sm:text-2xl">{data.instructorCount}</p>
          <CardFooter>
          <Link to={`/instructor`}>
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
          <Link to={`/course`}>
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
          <Link to={`/student`}>
            <Button >
              View Students
            </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
