import React from "react";

const Navbar = ({ title }) => {
  return (
    <div className="px-4 py-6 border-b border-black/10 font-inter text-xl font-semibold">
      {title}
    </div>
  );
};

export default Navbar;
