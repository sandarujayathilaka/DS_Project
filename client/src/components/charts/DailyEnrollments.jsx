import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const generateRandomEnrollments = () => {
  const data = [];
  const today = new Date(); // Get the current date
  const daysInMonth = 30; // Assuming a month with 30 days

  for (let i = 0; i < daysInMonth; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i); // Subtract i days from the current date

    const formattedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    const Enrollments = Math.floor(Math.random() * 6) + 1; // Random enrollments between 1 and 6
    data.push({ date: formattedDate, Enrollments });
  }
  return data.reverse(); // Reverse the array to show the latest date first
};

const DailyEnrollments = () => {
  const data = generateRandomEnrollments();

  return (
    <div className="w-full bg-white shadow-md p-4">
      <h3 className="text-xl text-center my-4 font-semibold font-kanit text-gray-600">
        Daily Enrollments
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="Enrollments" fill="#0E8585" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyEnrollments;
