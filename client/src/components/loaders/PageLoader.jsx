import React from "react";
import { ThreeDots } from "react-loader-spinner";

const PageLoader = () => {
  return (
    <div className="h-screen w-full items-center flex justify-center">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#0E8585"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default PageLoader;
