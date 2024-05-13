import React from "react";
import { Oval } from "react-loader-spinner";

const TableLoader = () => {
  return (
    <div>
      <Oval
        visible={true}
        height="40"
        width="100%"
        color="#333"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default TableLoader;
