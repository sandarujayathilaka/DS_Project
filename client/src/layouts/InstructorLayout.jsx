import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import React from "react";

const InstructorLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="flex w-full">
        <Sidebar />
        <div className=" w-full">{children}</div>
      </div>
    </div>
  );
};

export default InstructorLayout;
