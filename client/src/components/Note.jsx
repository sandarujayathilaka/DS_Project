import React, { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import axios from 'axios';
import SideSheet from './SideSheet';


export default function Note() {

   const [courses, setCourses] = useState([]);

   useEffect(() => {
     const fetchOrders = async () => {
       try {
         const response = await axios.post(
           "https://udemy.dev/api/learner/getusercourses"
         );
         setCourses(response.data)
         console.log(response.data);
       } catch (error) {
         console.error("Error fetching orders:", error);
       }
     };

     fetchOrders();
   }, []);


  return (
    <>
      <Accordion className="w-[80%] ml-28 mt-10" type="single" collapsible>
        {courses?.map((course, index) => (
          <AccordionItem value={course.courseId}>
            <AccordionTrigger className="text-4xl text-sky-800">
              Course {index + 1} : {course.title}
            </AccordionTrigger>
            <AccordionContent className="text-xl text-blue-950">
              {course.note.split("\n").map((paragraph, index) => (
                <>
                  {paragraph.trim() === "" ? (
                    <>
                      <br />
                    </>
                  ) : (
                    <p key={index}>{paragraph}</p>
                  )}
                </>
              ))}
              <SideSheet courseId={course.courseId} note={course.note} title={course.title}/>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
