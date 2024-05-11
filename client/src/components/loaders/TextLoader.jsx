import { Bars } from "react-loader-spinner";

const TextLoader = () => {
  return (
    <div>
      <Bars
        height="20"
        width="100%"
        color="#FFFFFF"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default TextLoader;
