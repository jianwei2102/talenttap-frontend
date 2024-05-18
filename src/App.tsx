import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import SignUp from "./pages/SignUpPage.tsx";
import SignIn from "./pages/SignInPage.tsx";
import UserProfilePage from "./pages/candidate/UserProfilePage.tsx";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage.tsx";
import UserHomePage from "./pages/candidate/UserHomePage.tsx";
import UserFeedbackPage from "./pages/candidate/UserFeedbackPage.tsx";
import UserTechnicalAssessmentQuestionPage from "./pages/candidate/UserTechnicalAssessmentQuestionPage.tsx";
import UserAssessmentSubmissionCompletedPage from "./pages/candidate/UserAssessmentSubmissionCompletedPage.tsx";
import Interview from "./pages/candidate/Interview/Interview.tsx";
import GeneralInterview from "./pages/candidate/GeneralInterview.tsx";
import GeneralQuestion from "./pages/candidate/GeneralQuestion.tsx";
import CampaignListPage from "./pages/admin/CampaignListPage.tsx";
import CreateCampaignPage from "./pages/admin/CreateCampaignPage.tsx";
import TypingAssessmentPage from "./pages/candidate/TypingAssessmentPage.tsx";
import SkillAssessmentResultPage from "./pages/admin/SkillAssessmentResultPage.tsx";
import GeneralInterviewResultPage from "./pages/admin/GeneralInterviewResultPage/GeneralInterviewResultPage.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/login" element={<SignIn/>}/>
                <Route path="/profile" element={<UserProfilePage/>}/>
                <Route path="/home" element={<UserHomePage/>}/>
                <Route path="/feedback" element={<UserFeedbackPage/>}/>
                <Route path="/typing-assessment" element={<TypingAssessmentPage/>}/>
                <Route path="/technical" element={<UserTechnicalAssessmentQuestionPage/>}/>
                <Route path="/submission-completed" element={<UserAssessmentSubmissionCompletedPage/>}/>
                <Route path="/admin" element={<AdminDashboardPage/>}/>
                <Route path="/campaign-list" element={<CampaignListPage/>}/>
                <Route path="/create-campaign" element={<CreateCampaignPage />}/>
                <Route path="/general-interview-result" element={<GeneralInterviewResultPage/>}/>
                <Route path="/skill-assessment-result" element={<SkillAssessmentResultPage/>}/>
                <Route path="/" element={<SignIn/>}/>
                <Route path="/interview" element={<Interview/>}/>
                <Route path="/general-interview" element={<GeneralInterview/>}/>
                <Route path="/general-question" element={<GeneralQuestion/>}/>
            </Routes>
        </Router>
    );
}

export default App;