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

      if (localStorage.getItem("interview-index") === null) {
        localStorage.setItem("interview-index", activeIndex.toString());
      }
      const i = parseInt(localStorage.getItem("interview-index") || activeIndex.toString());

      setActiveIndex(i); // Modify interview stage
    })();
  }, []);

  return (
    <>
      <UserNavBar activeIndex={0} />
      
      <div className="tw-h-full tw-mx-12 tw-my-8 tw-lg:mx-36 tw-lg:my-24">
        <div className="tw-flex tw-flex-row tw-justify-between">
          <div className="tw-text-[#D2051E] tw-text-4xl tw-font-bold">{name}</div>
          <div className="tw-flex tw-flex-col tw-justify-end tw-items-end">
            <div className="tw-text-right tw-text-xl tw-font-semibold">
              Application Due Date
            </div>
            <div>{endDate}</div>
          </div>
        </div>

        <InterviewStepBar interviews={interviews} initialActiveStep={activeIndex} />

        {activeIndex === 0 && (
          <>
            <div className="tw-leading-8">
              <span className="tw-text-2xl tw-font-semibold">Overview</span>
              <br />
              {jobDescription.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </div>

            <div className="tw-mt-10 tw-leading-8">
              <span className="tw-text-2xl tw-font-semibold">Requirement</span>
              <br />
              {requirement.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </div>
            <PopUpModal title="Start Application" onClose={() => {setActiveIndex(1)}} />
          </>
        )}

        {activeIndex !== 0 && (
          <>
            <div className="tw-leading-8">
              {interviews[activeIndex]?.type == "General Interview" && (
                <>
                  {GeneralInterviewInfo()}
                  <CustomButton
                    title={"Start Interview"}
                    customFunction={() => navigate("/general-interview")}
                  />
                  <p className="tw-text-center tw-mt-2">
                    The Interview can be done within {interviews[activeIndex]?.daysBeforeExpired} days
                  </p>
                </>
              )}

              {interviews[activeIndex]?.type == "Hiring Manager Interview" && (
                <>
                  {HiringManagerInterviewInfo()}
                  <PopUpModal title={"Schedule Interview"} />
                  <p className="tw-text-center tw-mt-2">
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
                  <p className="tw-text-center tw-mt-2">
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
