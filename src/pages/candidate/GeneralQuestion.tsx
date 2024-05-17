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
    <div className="h-screen w-screen flex items-center justify-center px-20 ">
      <div className="grid grid-cols-2 gap-12">
        <div>
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

          <div className="mt-8">
            <button className="bg-[#D2051E] text-white px-8 py-2 rounded-md" onClick={() => {
              localStorage.setItem("interview-index", "2");
              navigate("/interview")
            }}>
              Next
            </button>
          </div>
        </div>

        <div>
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
