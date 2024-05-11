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

export default function AdminDashboard() {
  const [progress, setProgress] = React.useState(13)
  const [date, setDate] = React.useState(new Date())

  const [instructors, setInstructors] = useState([
    {
      id:1,
      name: 'John Doe',
      email: 'johndoe@example.com',
    },
    {
      name: 'John',
      email: 'johndoe@example.com',
    },
    {
      name: 'Doe',
      email: 'johndoe@example.com',
    },
    {
      name: 'John Doe',
      email: 'johndoe@example.com',
    },
    {
      name: 'John Doe',
      email: 'johndoe@example.com',
    }
  ]);

  // useEffect(() => {
  //   const fetchRecentInstructors = async () => {
  //     try {
  //       const response = await axios.get('/api/users/recent-instructors');
  //       setInstructors(response.data);
  //     } catch (error) {
  //       console.error('Error fetching recent instructors:', error);
  //     }
  //   };

  //   fetchRecentInstructors();
  // }, []);
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])


  return (
    <div className="mt-5 ml-2 mr-2 flex flex-col items-center">
      {/* First row */}
      <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] mb-2 justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 w-full mb-5">
        <Card className="shadow-blue-500 flex flex-col justify-center items-center">
          <h1 className="mt-5 mb-3 text-lg sm:text-xl">Total Revenue</h1>
          <p className="mb-5 text-xl sm:text-2xl">50000</p>
        </Card>
        <Card className="shadow-blue-500 flex flex-col justify-center items-center">
          <h1 className="mt-5 mb-3 text-lg sm:text-xl">Total Instructor</h1>
          <p className="mb-5 text-xl sm:text-2xl">100</p>
        </Card>
        <Card className="shadow-blue-500 flex flex-col justify-center items-center">
          <h1 className="mt-5 mb-3 text-lg sm:text-xl">Total Courses</h1>
          <p className="mb-5 text-xl sm:text-2xl">50</p>
        </Card>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 w-full mb-5">
        <Card className="shadow-blue-500 flex flex-col justify-center items-center">
          <h1 className="mt-5 mb-3 text-lg sm:text-xl">Total Student</h1>
          <p className="mb-5 text-xl sm:text-2xl">50</p>
        </Card>
        <Card className="shadow-blue-500 flex flex-col justify-center items-center">
          <h1 className="mt-5 mb-3 text-lg sm:text-xl">Total Unpaid Student</h1>
          <p className="mb-5 text-xl sm:text-2xl">10</p>
        </Card>
        <Card className="shadow-blue-500 flex flex-col justify-center items-center">
          <h1 className="mt-5 mb-3 text-lg sm:text-xl">Total Student Engaged</h1>
          <Progress value={progress} className="w-[60%] mb-5" />
        </Card>
      </div>

      {/* Third row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 w-full mb-5">
      <Card className="shadow-blue-500 flex flex-col justify-center items-center">
        <h1 className="mt-5 mb-3 text-lg sm:text-xl text-center">Recent Added Instructors</h1>
        <div className="overflow-x-auto">
          <table className="w-full rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">View</th>
              </tr>
            </thead>
            <tbody>
              {instructors.map((instructor) => (
                <tr key={instructor.id}>
                  <td className="border px-4 py-2">{instructor.name}</td>
                  <td className="border px-4 py-2">{instructor.email}</td>
                  <td className="border px-4 py-2">
                    <img src={showPasswordIcon} className="w-5 h-5 cursor-pointer" alt="view" onClick={() => { window.location.href = `/instructor/${instructor.id}`; }}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-5">
          <Button className="w-full mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => { window.location.href = '/instructor'; }}>
            View All Instructors
          </Button>
        </div>
      </Card>

        <Card className="shadow-blue-500 flex flex-col justify-center items-center">
          <h1 className="mt-5 mb-3 text-lg sm:text-xl">Recent Added Students</h1>
          <p className="mb-5 text-xl sm:text-2xl">50</p>
        </Card>
        <Card className="shadow-blue-500 flex flex-col justify-center items-center">
          <h1 className="mt-5 mb-3 text-lg sm:text-xl">Recent Added Courses</h1>
          <p className="mb-5 text-xl sm:text-2xl">50</p>
        </Card>
      </div>

      {/* Fourth row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 w-full mb-3">
        <Card className="shadow-blue-500 flex flex-col justify-center items-center">
          <h1 className="mt-5 mb-3 text-lg sm:text-xl">Recent Instructor Issues</h1>
          <p className="mb-5 text-xl sm:text-2xl">50</p>
        </Card>
        <Card className="shadow-blue-500 flex flex-col justify-center items-center">
          <h1 className="mt-5 mb-3 text-lg sm:text-xl">Recent Paid Student Issues</h1>
          <p className="mb-5 text-xl sm:text-2xl">50</p>
        </Card>
        <Card className="shadow-blue-500 flex flex-col justify-center items-center">
          <h1 className="mt-5 mb-3 text-lg sm:text-xl">Recent Unpaid Student Issues</h1>
          <p className="mb-5 text-xl sm:text-2xl">50</p>
        </Card>
      </div>
    </div>
  );
  
}
