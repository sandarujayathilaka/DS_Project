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
import api from "@/api/build-client";
import toast from "react-hot-toast";


export default function SideSheet(props) {
  const [editedNote, setEditedNote] = useState(props.note);

  const handleChange = (event) => {
    setEditedNote(event.target.value);
  };

  const handleClick = async () => {
    try {
      const response = await api.put("/learner/note", {
        courseId: props.courseId,
        note: editedNote,
      });
      toast.success("Note updated successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Sheet>
      <SheetTrigger className="bg-orange-400 rounded-3xl text-lg font-semibold w-28 mt-5">Edit Note</SheetTrigger>
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
