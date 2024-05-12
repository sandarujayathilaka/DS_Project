import { Button } from "@/components/ui/button";
import InstructorLayout from "@/layouts/InstructorLayout";
import React from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";

const Insights = () => {
  const navigate = useNavigate();
  return (
    <InstructorLayout>
      <Button className="bg-main" onClick={() => navigate("/videos")}>
        Create New Insight
      </Button>
    </InstructorLayout>
  );
};

export default Insights;
