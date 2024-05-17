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
    <div className="tw-w-full tw-max-w-6xl lg:tw-max-w-screen-2xl tw-h-32 tw-mx-auto tw-px-4">

      {/* Stages */}
      <div className="tw-flex tw-justify-between tw-mt-16 tw-relative">
        {interviews.map(({ sequence, type }) => (
          <div key={sequence} className="tw-relative tw-z-10">

            <div
              className={`tw-w-12 tw-h-12 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-transition-all tw-duration-400 ${activeStep > sequence
                  ? "tw-bg-[#D2051E]"
                  : "tw-bg-white tw-border tw-border-gray-400"
                } `}
            >
              {activeStep > sequence ? (
                <div className="tw-text-xl tw-font-semibold tw-text-white">
                  <FaCheck />
                </div>
              ) : (
                <span className="tw-text-lg">{sequence + 1}</span>
              )}
            </div>

            {activeStep === sequence && (
              <div className="tw-absolute tw--top-7 tw-left-1/2 tw-transform tw--translate-x-1/2">
                <span className="tw-text-md tw-text-nowrap tw-text-[#D2051E]">
                  In progress
                </span>
              </div>
            )}

            <div className="tw-absolute tw-top-16 tw-left-1/2 tw-transform tw--translate-x-1/2">
              <span className="tw-text-md md:tw-text-nowrap">{type}</span>
            </div>
          </div>
        ))}

        <div className="tw-absolute tw-top-1/2 tw-transform tw--translate-y-1/2 tw-left-0 tw-w-full tw-h-1 tw-bg-pink-200"></div>
        <div
          className="tw-absolute tw-top-1/2 tw-transform tw--translate-y-1/2 tw-left-0 tw-h-1 tw-bg-[#D2051E] tw-transition-all tw-duration-400"
          style={{ width }}
        ></div>
      </div>

      {/* Processing Days in between */}
      <div className="tw-flex tw-justify-around">
        {interviews.slice(1).map(({ daysBeforeExpired, sequence }) => (
          <span
            key={sequence}
            className={`tw-text-sm tw-text-gray-700`}
          >
            Around {daysBeforeExpired} days
          </span>
        ),)}
      </div>
    </div>
  );
};

export default InterviewStepBar;
