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


export default function AdminDashboard() {
  const [progress, setProgress] = React.useState(13)
  const [date, setDate] = React.useState(new Date())


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
          <h1 className="mt-5 mb-3 text-lg sm:text-xl">Recent Added Instructors</h1>
          <p className="mb-5 text-xl sm:text-2xl">50</p>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 w-full">
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
