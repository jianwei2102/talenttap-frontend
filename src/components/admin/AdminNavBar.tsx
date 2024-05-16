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
    <div className="w-full h-20 relative fixed flex items-center">
      <div className="h-full w-1/6 flex justify-center items-center">
        <img
          className="h-5/6 w-5/6 object-contain"
          src={require("../../assets/hilti-logo.png")}
          alt="HILTI Logo"></img>
      </div>
      <div className="flex flex-row-reverse items-center h-full w-5/6">
        <div
          className={
            activeIndex === 3
              ? "nav-item nav-item-active mr-20"
              : "nav-item mr-20"
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
