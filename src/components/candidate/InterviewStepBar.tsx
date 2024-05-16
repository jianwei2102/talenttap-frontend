import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import InterviewData from "../../models/InterviewData";

type Props = {
  interviews?: InterviewData[];
  initialActiveStep?: number;
};

const InterviewStepBar = ({ interviews = [], initialActiveStep = 1 }: Props) => {
  const [activeStep, setActiveStep] = useState(initialActiveStep);

  useEffect(() => {
    if (initialActiveStep !== null) {
      setActiveStep(initialActiveStep);
    }
  }, [initialActiveStep]);

  const totalSteps = interviews.length;

  const width = `${(100 / (totalSteps - 1)) * (activeStep)}%`;

  return (
    <div className="w-full max-w-6xl lg:max-w-screen-2xl h-32 mx-auto px-4">

      {/* Stages */}
      <div className="flex justify-between mt-16 relative">
        {interviews.map(({ sequence, type }) => (
          <div key={sequence} className="relative z-10">

            <div
              className={`w-12 h-12 rounded-full flex justify-center items-center transition-all duration-400 ${activeStep > sequence
                  ? "bg-[#D2051E]"
                  : "bg-white border border-gray-400"
                } `}
            >
              {activeStep > sequence ? (
                <div className="text-xl font-semibold text-white">
                  <FaCheck />
                </div>
              ) : (
                <span className="text-lg">{sequence + 1}</span>
              )}
            </div>

            {activeStep === sequence && (
              <div className="absolute -top-7 left-1/2 transform -translate-x-1/2">
                <span className="text-md text-nowrap text-[#D2051E]">
                  In progress
                </span>
              </div>
            )}

            <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
              <span className="text-md md:text-nowrap">{type}</span>
            </div>
          </div>
        ))}

        <div className="absolute top-1/2 transform -translate-y-1/2 left-0 w-full h-1 bg-pink-200"></div>
        <div
          className="absolute top-1/2 transform -translate-y-1/2 left-0 h-1 bg-[#D2051E] transition-all duration-400"
          style={{ width }}
        ></div>
      </div>

      {/* Processing Days in between */}
      <div className="flex justify-around">
        {interviews.slice(1).map(({ daysBeforeExpired, sequence }) => (
          <span
            key={sequence}
            className={`text-sm text-gray-700`}
          >
            Around {daysBeforeExpired} days
          </span>
        ),)}
      </div>
    </div>
  );
};

export default InterviewStepBar;
