import React from "react";

const CustomButton = ({title, customFunction}) => {
  return (
    <div className="flex justify-center items-center">
      <button
        className="w-48 h-12 mx-auto mt-10 bg-red-500 text-white rounded-lg text-lg"
        onClick={customFunction}
      >
        {title}
      </button>
    </div>
  );
};

export default CustomButton;
