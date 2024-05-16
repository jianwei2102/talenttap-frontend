import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";

type Step = {
  label: string;
  step: number;
};

const steps: Step[] = [
  {
    label: "CV Screening",
    step: 1,
  },
  {
    label: "General Interview",
    step: 2,
  },
  {
    label: "Technical Interview",
    step: 3,
  },
  {
    label: "Hiring Manager Interview",
    step: 4,
  },
  {
    label: "Decision Making",
    step: 5,
  }
];

const InterviewStepBar = ({ initialActiveStep = 1 }) => {
  const [activeStep, setActiveStep] = useState(initialActiveStep);

  useEffect(() => {
    if (initialActiveStep !== null) {
      setActiveStep(initialActiveStep);
    }
  }, [initialActiveStep]);

  //   const nextStep = () => {
  //     setActiveStep(activeStep + 1);
  //   };

  //   const prevStep = () => {
  //     setActiveStep(activeStep - 1);
  //   };

  const totalSteps = steps.length;

  const width = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`;

  return (
    <div className="tw-w-full max-tw-w-6xl lg:max-tw-w-screen-2xl tw-h-32 tw-mx-auto tw-px-4">
      <div className="tw-flex tw-justify-between tw-mt-16 tw-relative">
        {steps.map(({ step, label }) => (
          <div key={step} className="tw-relative tw-z-10">
            <div
              className={`tw-w-12 tw-h-12 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-transition-all tw-duration-400 ${
                activeStep > step
                  ? "tw-bg-[#D2051E]"
                  : "tw-bg-white tw-border tw-border-gray-400"
              } `}
            >
              {activeStep > step ? (
                <div className="tw-text-xl tw-font-semibold tw-text-white">
                  <FaCheck />
                </div>
              ) : (
                <span className="tw-text-lg">{step}</span>
              )}
            </div>

            {activeStep === step && (
              <div className="tw-absolute tw-top-7 tw-left-1/2 tw-transform tw--translate-x-1/2">
                <span className="tw-text-md tw-text-nowrap tw-text-[#D2051E]">
                  In progress
                </span>
              </div>
            )}

            <div className="tw-absolute tw-top-16 tw-left-1/2 tw-transform tw--translate-x-1/2">
              <span className="tw-text-md md:tw-text-nowrap">{label}</span>
            </div>
          </div>
        ))}

        <div className="tw-absolute tw-top-1/2 tw-transform tw--translate-y-1/2 tw-left-0 tw-w-full tw-h-1 tw-bg-pink-200"></div>
        <div
          className="tw-absolute tw-top-1/2 tw-transform tw--translate-y-1/2 tw-left-0 tw-h-1 tw-bg-[#D2051E] tw-transition-all tw-duration-400"
          style={{ width }}
        ></div>
      </div>

      {/* Test next and previous buttons */}
      {/*
      <div className="tw-flex tw-justify-between tw-mt-24 tw-mx-[-15px]">
        <button
          onClick={prevStep}
          disabled={activeStep === 1}
          className="tw-rounded tw-px-2 tw-py-1 tw-w-20 tw-text-white tw-bg-purple-700 transition-transform duration-200 active:scale-95 disabled:tw-bg-pink-200 disabled:tw-text-black disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          disabled={activeStep === totalSteps}
          className="tw-rounded tw-px-2 tw-py-1 tw-w-20 tw-text-white tw-bg-purple-700 transition-transform duration-200 active:scale-95 disabled:tw-bg-pink-200 disabled:tw-text-black disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default InterviewStepBar;
