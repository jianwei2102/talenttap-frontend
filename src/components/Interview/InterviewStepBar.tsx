import React, { useState, useEffect } from "react";

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
  },
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
    <div className="w-full max-w-6xl lg:max-w-screen-2xl h-32 mx-auto px-4">
      <div className="flex justify-between mt-16 relative">
        {steps.map(({ step, label }) => (
          <div key={step} className="relative z-10">
            <div
              className={`w-12 h-12 rounded-full border border-gray-400 ${
                activeStep > step ? "bg-[#D2051E] border-none" : "bg-white"
              } flex justify-center items-center transition-all duration-400`}
            >
              {activeStep > step ? (
                <div className="text-2xl font-semibold text-white">
                  <>✓</>
                </div>
              ) : (
                <span className="text-lg">{step}</span>
              )}
            </div>
            {activeStep === step && (
              <div className="absolute -top-7 left-1/2 transform -translate-x-1/2">
                <span className="text-md text-nowrap text-[#D2051E]">In progress</span>
              </div>
            )}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
              <span className="text-md md:text-nowrap">{label}</span>
            </div>
          </div>
        ))}
        <div className="absolute top-1/2 transform -translate-y-1/2 left-0 w-full h-1 bg-pink-200"></div>
        <div
          className="absolute top-1/2 transform -translate-y-1/2 left-0 h-1 bg-[#D2051E] transition-all duration-400"
          style={{ width }}
        ></div>
      </div>

      {/* <div className="flex justify-between mt-24 mx-[-15px]">
        <button
          onClick={prevStep}
          disabled={activeStep === 1}
          className="rounded px-2 py-1 w-20 text-white bg-purple-700 transition-transform duration-200 active:scale-95 disabled:bg-pink-200 disabled:text-black disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          disabled={activeStep === totalSteps}
          className="rounded px-2 py-1 w-20 text-white bg-purple-700 transition-transform duration-200 active:scale-95 disabled:bg-pink-200 disabled:text-black disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default InterviewStepBar;
