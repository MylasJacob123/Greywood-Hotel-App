import React from "react";
import "./loader.css"; 
import { LineWave } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader-container">
      <LineWave
  visible={true}
  height="400"
  width="400"
  color="#4fa94d"
  ariaLabel="line-wave-loading"
  wrapperStyle={{}}
  wrapperClass=""
  firstLineColor=""
  middleLineColor=""
  lastLineColor=""
  />
    </div>
  );
};

export default Loader;
