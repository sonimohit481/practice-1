import React from "react";
import { Dna } from "react-loader-spinner";

const Spinner = ({ message }) => {
  return (
    <div className=" flex flex-col h-full w-full justify-center items-center">
      <Dna
        type="Circle"
        color="#00bff"
        height={300}
        width={1000}
        className=" m-5"
      />
      <p className=" text-2xl text-center p-5 md:text-4xl">{message}</p>
    </div>
  );
};

export default Spinner;
