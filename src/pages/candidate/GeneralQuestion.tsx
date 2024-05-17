import React, { useState, useEffect } from "react";
import { Recorder } from "../../components";
import { getSpecific } from "../../models/generalQuestions.js"
import { useNavigate } from "react-router-dom";

interface Question {
  question: string,
  hint: string,
  recordingTimeSeconds: number,
  readingTimeSeconds: number
}

const GeneralQuestion = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([])
  const [questionNo, setQuestionNo] = useState(1);
  const [question, setQuestion] = useState("");
  const [hint, setHint] = useState("");

  const fetchData = async () => {
    const question = await getSpecific(1);
    setQuestionNo(question.id);
    setQuestion(question.question);
    setHint(question.hint);
  };

  useEffect(() => {
    fetchData();

  }, []);

  return (
    <div className="tw-h-screen tw-w-screen tw-flex tw-items-center tw-justify-center tw-px-20 ">
      <div className="tw-grid tw-grid-cols-2 tw-gap-12">
        <div>
          <div className="tw-text-[#D2051E] tw-text-4xl">Question {questionNo}</div>
          <div className="tw-font-semibold tw-text-wrap tw-text-5xl tw-leading-relaxed tw-mt-8">
            {question}
          </div>

          <div className="tw-mt-8 tw-text-3xl tw-leading-relaxed">
            {hint.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </div>

          <div className="tw-mt-8">
            <button className="tw-bg-[#D2051E] tw-text-white tw-px-8 tw-py-2 tw-rounded-md" onClick={() => {
              localStorage.setItem("interview-index", "2");
              navigate("/interview")
            }}>
              Next
            </button>
          </div>
        </div>

        <div>
          <div className="tw-grid tw-grid-cols-2">
            <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-xl">
              Time for Reading:
              <span className="tw-font-semibold">20 seconds</span>
            </div>
            <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-xl">
              Time for Answering:
              <span className="tw-font-semibold">10 minutes</span>
            </div>
          </div>

          <div className="tw-mt-8" style={{ height: "36rem" }}>
            <Recorder />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralQuestion;
