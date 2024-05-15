import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    month: "February",
    Revenue: 3000,
  },
  {
    month: "March",
    Revenue: 2000,
  },
  {
    month: "April",
    Revenue: 2780,
  },
  {
    month: "May",
    Revenue: 1890,
  },
];

const InstructorRevenue = () => {
  return (
    <div className="w-full bg-white shadow-md p-4">
      <h3 className="text-xl text-center my-4 font-semibold font-kanit text-gray-600">
        Monthly Revenue
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="Revenue"
            stroke="#0E8585"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InstructorRevenue;
