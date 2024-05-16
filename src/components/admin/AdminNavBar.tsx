import "../../App.css";
import React from "react";
import { useNavigate } from "react-router-dom";

interface UserNavBarProps {
  activeIndex: number;
}

const AdminNavBar = ({ activeIndex }: UserNavBarProps) => {
  const navigate = useNavigate();

  const goToDashboardPage = () => {
    navigate("/admin");
    activeIndex = 0;
  };

  const goToCampaignListPage = () => {
    navigate("/campaign-list");
    activeIndex = 1;
  };

  const goToReportsPage = () => {
    // navigate("/feedback");
    activeIndex = 2;
  };

  const goToLoginPage = () => {
    navigate("/login");
    activeIndex = 3;
  };

  return (
    <div className="tw-w-full tw-h-20 tw-relative tw-fixed tw-flex tw-items-center">
      <div className="tw-h-full tw-w-1/6 tw-flex tw-justify-center tw-items-center">
        <img
          className="tw-h-5/6 tw-w-5/6 tw-object-contain"
          src={require("../../assets/hilti-logo.png")}
          alt="HILTI Logo"></img>
      </div>
      <div className="tw-flex tw-flex-row-reverse tw-items-center tw-h-full tw-w-5/6">
        <div
          className={
            activeIndex === 3
              ? "nav-item nav-item-active tw-mr-20"
              : "nav-item tw-mr-20"
          } onClick={goToLoginPage}>
          Logout
        </div>
        <div
          className={
            activeIndex === 2 ? "nav-item nav-item-active" : "nav-item"
          } onClick={goToReportsPage}>
          Reports
        </div>
        <div
          className={
            activeIndex === 1 ? "nav-item nav-item-active" : "nav-item"
          } onClick={goToCampaignListPage}>
          Campaign
        </div>
        <div
          className={
            activeIndex === 0 ? "nav-item nav-item-active" : "nav-item"
          } onClick={goToDashboardPage}>
          Dashboard
        </div>
      </div>
    </div>
  );
};

export default AdminNavBar;
