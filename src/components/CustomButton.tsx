import React from "react";

const CustomButton = ({title, customFunction}) => {
  return (
    <div className="tw-flex tw-justify-center tw-items-center">
      <button
        className="tw-w-48 tw-h-12 tw-mx-auto tw-mt-10 tw-bg-red-500 tw-text-white tw-rounded-lg tw-text-lg"
        onClick={customFunction}
      >
        {title}
      </button>
    </div>
  );
};

export default CustomButton;
