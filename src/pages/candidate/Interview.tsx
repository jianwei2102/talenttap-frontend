import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserNavBar,
  InterviewStepBar,
  PopUpModal,
  CustomButton,
} from "../../components";
import {getSpecific} from "../../models/campaigns.js"

interface Campaign {
  name: string;
  jobFunction: string;
  positionType:string;
  location:string;
  createdBy:string;
  jobDescription:string;
  image:string;
  requirement:string;
  headcount: number;
  startDate: Date;
  endDate: Date;
  workFlexibility: string;
  department: string;
  expertise: string;
}

const Interview = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [jobFunction, setJobFunction] = useState("");
  const [requirements, setRequirements] = useState("");
  const [endDate, setEndDate] = useState("");
  const [interviewSteps, setInterviewSteps] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const campaign = await getSpecific(2);
      setName(campaign.name);
      setJobFunction(campaign.jobDescription);
      setRequirements(campaign.requirement);
      setEndDate(campaign.endDate);
    };
    fetchData();
    setInterviewSteps(1); // Modify interview stage
  }, []);

  return (
    <>
      <UserNavBar activeIndex={0} />

      <div className="h-full mx-12 my-8 lg:mx-36 lg:my-24">
        <div className="flex flex-row justify-between">
          <div className="text-[#D2051E] text-4xl font-bold">{name}</div>
          <div className="flex flex-col justify-end items-end">
            <div className="text-right text-xl font-semibold">
              Application Due Date
            </div>
            <div>{endDate}</div>
          </div>
        </div>

        <InterviewStepBar initialActiveStep={interviewSteps} />

        <div className="leading-8">
          <span className="text-2xl font-semibold">Overview</span>
          <br />
          {jobFunction.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </div>

        <div className="mt-10 leading-8">
          <span className="text-2xl font-semibold">Requirements</span>
          <br />
          {requirements.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </div>

        {/* Check for interview stage instead of steps */}
        {interviewSteps === 1 && <PopUpModal title="Start Application" />}

        {interviewSteps === 2 && (
          <>
            <CustomButton
              title={"Start Interview"}
              customFunction={() => navigate("/general-interview")}
            />
            <p className="text-center mt-2">
              The Interview can be done within 3 days
            </p>
          </>
        )}

        {interviewSteps === 3 && (
          <>
            <CustomButton
              title={"Start Interview"}
              customFunction={() => navigate("/technical")}
            />
            <p className="text-center mt-2">
              The Interview can be done within 3 days
            </p>
          </>
        )}

        {interviewSteps === 4 && (
          <>
            <CustomButton
              title={"Schedule Interview"}
              customFunction={() => {}}
            />
            <p className="text-center mt-2">
              The Interview can be done within 3 days
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default Interview;
