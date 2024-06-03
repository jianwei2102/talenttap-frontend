import "../../App.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BriefcaseIcon, PeopleTwoIcon, GridIcon } from "../../assets";
import CommandBar from "../CommandBar.tsx";

interface UserNavBarProps {
  activeIndex: number;
}

const AdminNavBar = ({ activeIndex }: UserNavBarProps) => {
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState(5);
  const [isShowingNotificationModal, setIsShowingNotificationModal] = useState(false);
  const [isShowingCommandBarModal, setIsShowingCommandBarModal] = useState(false);

  // Notification data
  const notificationData = [
    {
      type: "Campaign Notification",
      subject: "Account Managers Msia 2024",
      message: "campaign created.",
      duration: "Now",
      isRead: false,
    },
    {
      type: "Candidate Notification",
      subject: "Albraham Muhammad",
      message:
        "scheduled an interview in the Hiring Manager Interview 1 in the ASEAN Software Engineer 2024 campaign.",
      duration: "35 minutes ago",
      isRead: false,
    },
    {
      type: "Candidate Notification",
      subject: "Jonah Jonash",
      message: "applied for the ASEAN Software Engineer 2024 campaign.",
      duration: "1 hour ago",
      isRead: false,
    },
    {
      type: "Candidate Notification",
      subject: "Kim Joon Eon",
      message:
        "completed the General Interview 1 component in the ASEAN Software Engineer 2024 campaign.",
      duration: "1 hour ago",
      isRead: false,
    },
    {
      type: "Candidate Notification",
      subject: "Jane Doe",
      message: "applied for the ASEAN Software Engineer 2024 campaign.",
      duration: "3 hours ago",
      isRead: false,
    },
    {
      type: "Campaign Notification",
      subject: "ASEAN Software Engineer 2024",
      message: "campaign created.",
      duration: "1 day ago",
      isRead: true,
    },
  ];

  const goToDashboardPage = () => {
    navigate("/admin");
    activeIndex = 0;
  };

  const goToCampaignListPage = () => {
    navigate("/campaign-list");
    activeIndex = 1;
  };

  const goToNotificationsPage = () => {
    setIsShowingNotificationModal(true);
    activeIndex = 2;
  };

  const goToLoginPage = () => {
    navigate("/login");
    activeIndex = 3;
  };

  const clickFn = (isOpen: boolean) => {
    setIsShowingCommandBarModal(isOpen);
    return isOpen;
  }

  return (
    <div className="tw-w-full tw-h-20 tw-relative tw-fixed tw-flex tw-items-center tw-bg-transparent">
      <div className="tw-h-full tw-w-1/6 tw-flex tw-justify-center tw-items-center">
        <img
          className="tw-h-4/6 tw-w-4/6 tw-object-contain"
          src={require("../../assets/hilti-logo.png")}
          alt="HILTI Logo"></img>
      </div>
      <div className="tw-flex tw-flex-row-reverse tw-items-center tw-h-full tw-w-5/6">
        <div
          className={activeIndex === 3 ? "nav-item nav-item-active tw-mr-20" : "nav-item tw-mr-20"}
          onClick={goToLoginPage}>
          Logout
        </div>
        <div
          className={`${activeIndex === 2 ? "nav-item-active" : ""} nav-item tw-flex`}
          onClick={goToNotificationsPage}>
          Notifications
          <span className="tw-inline-flex tw-items-center tw-justify-center tw-w-fit tw-h-4 tw-ms-1 tw-text-xs tw-font-semibold tw-text-white tw-bg-red-700 tw-rounded-full tw-p-1 tw-relative tw-top-[-5px]">
            {notificationCount >= 100 ? "99+" : notificationCount}
          </span>
        </div>
        <div
          className={activeIndex === 1 ? "nav-item nav-item-active" : "nav-item"}
          onClick={goToCampaignListPage}>
          Campaign
        </div>
        <div
          className={activeIndex === 0 ? "nav-item nav-item-active" : "nav-item"}
          onClick={goToDashboardPage}>
          Dashboard
        </div>
      </div>
      <div
        className={
          isShowingNotificationModal
            ? "tw-w-screen tw-h-[100vh] tw-absolute tw-z-1 tw-top-0 tw-flex tw-justify-end"
            : "tw-hidden"
        }
        onClick={() => setIsShowingNotificationModal(false)}>
        <div className="tw-w-2/6 tw-h-fit tw-max-h-[25rem] tw-relative tw-top-[4rem] tw-z-10 tw-right-0 tw-mx-10 tw-rounded-xl tw-bg-white tw-shadow tw-text-black tw-p-3 tw-flex tw-flex-col tw-overflow-auto">
          {notificationData.map((notification, index) => (
            <div
              className={`${
                notification.isRead ? "tw-bg-white" : "tw-bg-gray-100"
              } tw-rounded-xl tw-p-5 tw-flex tw-mb-5 tw-relative`}>
              <div className="tw-h-5 tw-text-black tw-mr-5">
                {notification.type === "Campaign Notification" ? (
                  <BriefcaseIcon />
                ) : (
                  <PeopleTwoIcon />
                )}
              </div>
              <span><span className="tw-font-bold">{notification.subject}</span>{" " + notification.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminNavBar;
