import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from "react";

const HomeLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
