import React from "react";
import "./loader.css"; 
import { TailSpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div class="loader-container">
        <TailSpin className="l"
          height="10rem"
          width="10rem"
          color="goldenrod"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
    </div>
  );
};

export default Loader;
