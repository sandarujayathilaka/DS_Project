import { BarChart, List } from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";

const sidebarItems = [
  {
    name: "Courses",
    icon: List,
    link: "/instructor/courses",
  },
  {
    name: "Insights",
    icon: BarChart,
    link: "/instructor/insights",
  },
];

const Sidebar = () => {
  return (
    <div className="border-r border-black/10 bg-white/10 hidden md:flex min-w-[250px] min-h-screen">
      <ul className="w-full">
        {sidebarItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.link}
              className={({ isActive }) =>
                isActive
                  ? "text-main border-r-4 border-main bg-main/10 flex"
                  : "hover:bg-black/10 flex"
              }
            >
              <div className="flex items-center p-4">
                <item.icon className="h-6 w-6 mr-4" />
                {item.name}
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
