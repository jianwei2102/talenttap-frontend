import React, { useEffect, useState } from "react";
import { UserNavBar, InterviewStepBar, CVScreening } from "../components";


const Interview = () => {
  const [name, setName] = useState("");
  const [jobFunction, setJobFunction] = useState("");
  const [requirements, setRequirements] = useState("");
  const [endDate, setEndDate] = useState("");
  const [interviewSteps, setInterviewSteps] = useState(1);

  // Campaign data / fetch
  // const fetchCampaign = async () => {
  // }

  useEffect(() => {
    // const campaign = fetchCampaign();
    // setName(campaign.name);
    // setJobFunction(campaign.jobFunction);
    // setRequirements(campaign.requirements);
    // setEndDate(campaign.endDate);

    setName("Linux Administrator");
    setJobFunction(`As a Linux Administrator, you are part of our global Compute & Operating Platforms team, based in Kuala Lumpur (Malaysia). You get to work in an agile Global IT Infrastructure team with focus on Linux Server Operating Systems engineering.\n
    You will be in charge in\n• Maintaining and developing the server operating platform portfolio of Hilti. 
    • Taking advantage of the latest innovations in the field while adhering to the industry best practices and security standards. 
    • Collaborating with other engineers in the team and lead Linux Server engineering activities and take responsibility of its performance.`);
    setRequirements(
      `• Bachelor’s degree in information technology, Computer Science, Engineering, or technical discipline with a CGPA of 3.0 and above. Master’s Degree is an advantage.\n• Minimum 3 years of experience working in Linux Server Operating System engineering.`
    );
    setEndDate("06.01.2024");

    setInterviewSteps(1);
  }, []);

  return (
    <>
      <UserNavBar activeIndex={0} />

      <div className="h-full mx-36 my-24">
        <div className="grid grid-cols-2">
          <div>
            <span className="text-[#D2051E] text-4xl font-bold">{name}</span>
          </div>
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

        {interviewSteps === 1 && (
          <CVScreening/>
        )}
      </div>
    </>
  );
};

export default Interview;
