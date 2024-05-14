import React, { useState } from "react";
import axios from "axios";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";

export default function SideSheet(props) {
  const [editedNote, setEditedNote] = useState(props.note);

  const handleChange = (event) => {
    setEditedNote(event.target.value);
  };

  const handleClick = async () => {
    try {
      const response = await axios.put("https://udemy.dev/api/learner/note", {
        courseId: props.courseId,
        note: editedNote,
      });
      console.log("Successful:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Sheet>
      <SheetTrigger className="bg-orange-400 rounded-3xl text-lg font-semibold w-28">Edit Note</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{props.title}</SheetTitle>
          <textarea
            className="h-[550px]"
            value={editedNote}
            onChange={handleChange}
          />
          <Button onClick={handleClick}>Save</Button>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
