import React from "react";
import { CirclePlay, Lock } from "lucide-react";

const Sidebar = ({ chapters, selectedChapter, setSelectedChapter }) => {
  console.log(chapters);
  console.log(selectedChapter);
  return (
    <div className="border-r border-black/10 bg-white/10 hidden md:flex min-w-[300px] min-h-screen">
      <ul className="w-full">
        {chapters.map((item, index) => (
          <li key={index}>
            <div
              className={`flex items-center cursor-pointer max-w-[300px] p-4 ${
                selectedChapter._id === item._id
                  ? "text-main border-r-4 border-main bg-main/10 flex"
                  : "hover:bg-black/10 flex text-black/70"
              }`}
              onClick={() => setSelectedChapter(item)}
            >
              {item.access === "free" ? (
                <CirclePlay className="h-6 w-6 mr-4" />
              ) : (
                <Lock className="h-6 w-6 mr-4" />
              )}
              <span className="truncate">{item.title}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
