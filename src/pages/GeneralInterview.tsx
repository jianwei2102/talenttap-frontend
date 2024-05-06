import React from "react";
import { UserNavBar, PopUpModal } from "../components";

const GeneralInterview = () => {
  return (
    <>
      <UserNavBar activeIndex={0} />

      <div className="h-full lg:mx-36 lg:my-24 mx-12 my-8">
        <div className="text-[#D2051E] text-4xl font-bold">
          How to get started
        </div>
        <div>
          Here's a quick overview of the general interview process, from start
          to finish.
        </div>

        <div className="flex flex-row justify-between gap-8 mt-16">
          <div className="bg-gray-300 w-72 h-96 px-4 py-5">
            <div className="w-max border-2 border-gray-500 rounded-full px-3 py-3.5 mb-3">
              01
            </div>
            <span>
              Ensure that you have allocated at least one(1) hour for the
              interview. Once started, the interview cannot be paused.
            </span>
          </div>
          <div className="bg-gray-300 w-72 h-96 px-4 py-5">
            <div className="w-max border-2 border-gray-500 rounded-full px-3 py-3.5 mb-3">
              02
            </div>
            <span>
              Please answer all the questions truthfully to the best of your
              ability.
            </span>
          </div>

          <div className="bg-gray-300 w-72 h-96 px-4 py-5">
            <div className="w-max border-2 border-gray-500 rounded-full px-3 py-3.5 mb-3">
              03
            </div>
            <span>
              You have 20 seconds to read the question and think about your
              answer, during which the video recording will be paused.
            </span>
          </div>

          <div className="bg-gray-300 w-72 h-96 px-4 py-5">
            <div className="w-max border-2 border-gray-500 rounded-full px-3 py-3.5 mb-3">
              04
            </div>
            <span>
              After 20 seconds, the recording will automatically be resumed, and
              you will be given 10 minutes to answer the question.
            </span>
          </div>

          <div className="bg-gray-300 w-72 h-96 px-4 py-5">
            <div className="w-max border-2 border-gray-500 rounded-full px-3 py-3.5 mb-3">
              05
            </div>
            <span>
              Click on the next question button after you have finished
              answering your question.
            </span>
          </div>
        </div>
      </div>

      <PopUpModal title="Continue" />
    </>
  );
};

export default GeneralInterview;
