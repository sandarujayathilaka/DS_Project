import React from "react";
import { RotatingSquare } from "react-loader-spinner";

const UploadLoader = () => {
  return (
    <div>
      <RotatingSquare
        visible={true}
        height="100"
        width="100%"
        color="#0E8585"
        ariaLabel="rotating-square-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default UploadLoader;
