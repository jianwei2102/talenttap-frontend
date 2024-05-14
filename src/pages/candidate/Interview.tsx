import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserNavBar,
  InterviewStepBar,
  PopUpModal,
  CustomButton,
} from "../../components";
import { CampaignAPI } from "../../api/campaignAPI.ts";
import InterviewData from "../../models/InterviewData.ts";

const CAMPAIGN_ID = 1;

const Interview = () => {
  const navigate = useNavigate();

  // campaign details
  const [name, setName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [requirement, setRequirement] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activeIndex, setActiveIndex] = useState(1);

  // interview details
  const [interviews, setInterviews] = useState<InterviewData[]>([]);

  const fetchCampaign = async () => {
    const response = await CampaignAPI.get(CAMPAIGN_ID);
    const { campaign, generalInterviews, hiringManagerInterviews, skillAssessments } = response;

    console.log('response : ', response);

    setName(campaign.name);
    setJobDescription(campaign.jobDescription);
    setRequirement(campaign.requirement);
    setEndDate(campaign.endDate.split("T")[0]);

    const cvScreening = new InterviewData(0, "", 3, new Date(), new Date(), "Admin", "CV Screening");
    let interviewSteps: InterviewData[] = [cvScreening];

    for (const i of generalInterviews) {
      interviewSteps.push(InterviewData.fromJson(i, "General Interview"));
    }

    for (const i of hiringManagerInterviews) {
      interviewSteps.push(InterviewData.fromJson(i, "Hiring Manager Interview"));
    }

    for (const i of skillAssessments) {
      interviewSteps.push(InterviewData.fromJson(i, "Skill Assessment"));
    }

    interviewSteps.sort((a: InterviewData, b: InterviewData) => a.sequence - b.sequence);
    setInterviews(interviewSteps);
  };

  useEffect(() => {
    (async () => {
      await fetchCampaign();
      setActiveIndex(1); // Modify interview stage
    })();
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

        <InterviewStepBar interviews={interviews} initialActiveStep={activeIndex} />

        {activeIndex === 0 && (
          <>
            <div className="leading-8">
              <span className="text-2xl font-semibold">Overview</span>
              <br />
              {jobDescription.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </div>

            <div className="mt-10 leading-8">
              <span className="text-2xl font-semibold">Requirement</span>
              <br />
              {requirement.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </div>
            <PopUpModal title="Start Application" />
          </>
        )}

        {activeIndex !== 0 && (
          <>
            <div className="leading-8">
              {interviews[activeIndex - 2]?.generalInstruction}
              {/* next step: add constants instructions for all 3 interviews */}
            </div>
            <CustomButton
              title={"Start Interview"}
              customFunction={() => navigate("/general-interview")}
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
