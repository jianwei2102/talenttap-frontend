import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserNavBar,
  InterviewStepBar,
  PopUpModal,
  CustomButton,
} from "../../../components/index.js";
import { CampaignAPI } from "../../../api/campaignAPI.ts";
import InterviewData from "../../../models/InterviewData.ts";
import GeneralInterviewInfo from "./GeneralInterviewInfo.tsx";
import SkillAssessmentInfo from "./SkillAssessmentInfo.tsx";
import HiringManagerInterviewInfo from "./HiringManagerInterviewInfo.tsx";

const CAMPAIGN_ID = 1;
const ACTIVE_INDEX = 0;

const Interview = () => {
  const navigate = useNavigate();

  // campaign details
  const [name, setName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [requirement, setRequirement] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

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

    const cvScreening = new InterviewData(0, "", 3 , 7, new Date(), new Date(), "Admin", "CV & Visa Checking");
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
      setActiveIndex(ACTIVE_INDEX); // Modify interview stage
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
              {interviews[activeIndex]?.type == "General Interview" && (
                <>
                  {GeneralInterviewInfo()}
                  <CustomButton
                    title={"Start Interview"}
                    customFunction={() => navigate("/general-interview")}
                  />
                  <p className="text-center mt-2">
                    The Interview can be done within {interviews[activeIndex]?.daysBeforeExpired} days
                  </p>
                </>
              )}

              {interviews[activeIndex]?.type == "Hiring Manager Interview" && (
                <>
                  {HiringManagerInterviewInfo()}
                  <CustomButton
                    title={"Schedule Interview"}
                    customFunction={() => navigate("/hiring-manager-interview-schedule")}
                  />
                  <p className="text-center mt-2">
                    The Interview can be done within {interviews[activeIndex]?.daysBeforeExpired} days
                  </p>
                </>
              )}

              {interviews[activeIndex]?.type == "Skill Assessment" && (
                <>
                  {SkillAssessmentInfo()}
                  <CustomButton
                    title={"Start Assessment"}
                    customFunction={() => navigate("/technical")}
                  />
                  <p className="text-center mt-2">
                    The Interview can be done within {interviews[activeIndex]?.daysBeforeExpired} days
                  </p>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Interview;
