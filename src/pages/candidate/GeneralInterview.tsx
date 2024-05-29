import React from "react";
import { UserNavBar, PopUpModal } from "../../components";
import { useNavigate } from "react-router-dom";

const GeneralInterview = () => {
  const navigate = useNavigate();

  return (
    <>
      <UserNavBar activeIndex={0} />

      <div className="tw-h-full lg:tw-mx-36 lg:tw-my-24 tw-mx-12 tw-my-8">
        <div className="tw-text-[#D2051E] tw-text-4xl tw-font-bold">
          How to get started
        </div>
        <div>
          Here's a quick overview of the general interview process, from start
          to finish.
        </div>

        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 2xl:tw-grid-cols-5 tw-justify-between tw-gap-12  tw-mt-20">
          <div className="tw-bg-gray-300 lg:min-tw-w-64 lg:tw-h-64 2xl:tw-w-72 2xl:min-tw-h-96 tw-px-4 tw-py-5">
            <div className="tw-w-max tw-border-2 tw-border-gray-500 tw-rounded-full tw-px-3 tw-py-3.5 tw-mb-3">
              01
            </div>
            <span>
              Ensure that you have allocated at least one(1) hour for the
              interview. Once started, the interview cannot be paused.
            </span>
          </div>
          <div className="tw-bg-gray-300 lg:min-tw-w-64 lg:tw-h-64 2xl:tw-w-72 2xl:min-tw-h-96 tw-px-4 tw-py-5">
            <div className="tw-w-max tw-border-2 tw-border-gray-500 tw-rounded-full tw-px-3 tw-py-3.5 tw-mb-3 item">
              02
            </div>
            <span>
              Please answer all the questions truthfully to the best of your
              ability.
            </span>
          </div>

          <div className="tw-bg-gray-300 lg:min-tw-w-64 lg:tw-h-64 2xl:tw-w-72 2xl:min-tw-h-96 tw-px-4 tw-py-5">
            <div className="tw-w-max tw-border-2 tw-border-gray-500 tw-rounded-full tw-px-3 tw-py-3.5 tw-mb-3">
              03
            </div>
            <span>
              You have 20 seconds to read the question and think about your
              answer, during which the video recording will be paused.
            </span>
          </div>

          <div className="tw-bg-gray-300 lg:min-tw-w-64 lg:tw-h-64 2xl:tw-w-72 2xl:min-tw-h-96 tw-px-4 tw-py-5">
            <div className="tw-w-max tw-border-2 tw-border-gray-500 tw-rounded-full tw-px-3 tw-py-3.5 tw-mb-3">
              04
            </div>
            <span>
              After 20 seconds, the recording will automatically be resumed, and
              you will be given 10 minutes to answer the question.
            </span>
          </div>

          <div className="tw-bg-gray-300 lg:min-tw-w-64 lg:tw-h-64 2xl:tw-w-72 2xl:min-tw-h-96 tw-px-4 tw-py-5">
            <div className="tw-w-max tw-border-2 tw-border-gray-500 tw-rounded-full tw-px-3 tw-py-3.5 tw-mb-3">
              05
            </div>
            <span>
              Click on the next question button after you have finished
              answering your question.
            </span>
          </div>
        </div>
      </div>

      <PopUpModal title="Continue" onClose={() => navigate("/briefing-video/1")} />
    </>
  );
};

export default GeneralInterview;
