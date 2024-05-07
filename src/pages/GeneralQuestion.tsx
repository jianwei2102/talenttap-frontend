import React, { useState, useEffect } from "react";
import { Recorder } from "../components";

const GeneralQuestion = () => {
  const [questionNo, setQuestionNo] = useState(1);
  const [question, setQuestion] = useState("");
  const [hint, setHint] = useState("");

  useEffect(() => {
    setQuestionNo(1);
    setQuestion(
      "Demonstrate your understanding on using xyz technology to implement abc solution in a project regarding the qwerty problem."
    );
    setHint(
      "Here’s some things to consider: \n• Why should xyz technology be used? \n• How would abc be implemented?"
    );
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center px-20 ">
      <div className="grid grid-cols-2 gap-12">
        <div className="">
          <div className="text-[#D2051E] text-4xl">Question {questionNo}</div>
          <div className="font-semibold text-wrap text-5xl leading-relaxed mt-8">
            {question}
          </div>

          <div className="mt-8 text-3xl leading-relaxed">
            {hint.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </div>
        </div>

        <div className="">
          <div className="grid grid-cols-2">
            <div className="flex flex-col justify-center items-center text-xl">
              Time for Reading:
              <span className="font-semibold">20 seconds</span>
            </div>
            <div className="flex flex-col justify-center items-center text-xl">
              Time for Answering:
              <span className="font-semibold">10 minutes</span>
            </div>
          </div>
          <div className="mt-8" style={{ height: "36rem" }}>
            <Recorder />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralQuestion;
