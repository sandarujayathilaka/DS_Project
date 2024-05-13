import DailyEnrollments from "@/components/charts/DailyEnrollments";
import InstructorRevenue from "@/components/charts/InstructorRevenue";
import InstructorLayout from "@/layouts/InstructorLayout";
import React from "react";

const InsightCard = ({ title, value }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <h3 className="text-xl font-semibold font-kanit text-gray-600">
        {title}
      </h3>
      <h1 className="text-3xl font-semibold text-main">{value}</h1>
    </div>
  );
};

const Insights = () => {
  return (
    <InstructorLayout>
      <div className="p-4">
        <h1 className="font-ubunutu text-4xl font-bold mb-8 text-gray-800">
          Insights
        </h1>
        <div className="grid sm:grid-cols-3 gap-4">
          <InsightCard title="Total Courses" value="4" />
          <InsightCard title="Total Students" value="16" />
          <InsightCard title="Total Revenue" value="$9670" />
        </div>

        <div className="mt-8 space-y-4">
          <InstructorRevenue />
          <DailyEnrollments />
        </div>
      </div>
    </InstructorLayout>
  );
};

export default Insights;
