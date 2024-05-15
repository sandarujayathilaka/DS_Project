import React, { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import axios from 'axios';
import SideSheet from './SideSheet';
import api from "@/api/build-client";



export default function Note() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/learner/getusercourses");
        setCourses(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Accordion className="w-[80%] ml-28 mt-10" type="single" collapsible>
        {courses?.map((course, index) => (
          <AccordionItem value={course.courseId}>
            <AccordionTrigger className="text-2xl text-sky-800">
              Course {index + 1} : {course.title}
            </AccordionTrigger>
            <AccordionContent className="text-xl text-blue-950">
              {course.note.trim() === "" ? ( // Check if note is empty
                <p>No Notes Included</p>
              ) : (
                course.note
                  .split("\n")
                  .map((paragraph, index) => (
                    <React.Fragment key={index}>
                      {paragraph.trim() === "" ? <br /> : <p>{paragraph}</p>}
                    </React.Fragment>
                  ))
              )}
              <SideSheet
                courseId={course.courseId}
                note={course.note}
                title={course.title}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
