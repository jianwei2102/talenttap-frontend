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
import CreateCampaignTemplatePage from "./pages/admin/CreateCampaignTemplatePage.tsx";
import CandidateProfilePage from "./pages/admin/CandidateProfilePage.tsx";
import CampaignProcessResultsPage from "./pages/admin/CampaignProcessResultsPage.tsx";
import TypingAssessmentPage from "./pages/candidate/TypingAssessmentPage.tsx";
import SkillAssessmentResultPage from "./pages/admin/SkillAssessmentResultPage.tsx";
import GeneralInterviewResultPage from "./pages/admin/GeneralInterviewResultPage/GeneralInterviewResultPage.tsx";
import CandidateSummaryPage from "./pages/sidebar/CandidateSummaryPage/CandidateSummaryPage.tsx";
import GeneralInterviewDetailPage from "./pages/sidebar/GeneralInterviewDetailPage/GeneralInterviewDetailPage.tsx";
import SkillAssessmentDetailPage from "./pages/sidebar/SkillAssessmentDetailPage/SkillAssessmentDetailPage.tsx";
import BriefingVideo1 from "./pages/candidate/BriefingVideo1.tsx";
import BriefingVideo2 from "./pages/candidate/BriefingVideo2.tsx";
import BriefingVideo3 from "./pages/candidate/BriefingVideo3.tsx";
import LLM from "./pages/LLMPage.tsx"

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
                <Route path="/create-campaign/1" element={<CreateCampaignTemplatePage />}/>
                <Route path="/general-interview-result" element={<GeneralInterviewResultPage/>}/>
                <Route path="/skill-assessment-result" element={<SkillAssessmentResultPage/>}/>
                <Route path="/candidate-profile" element={<CandidateProfilePage />}/>
                <Route path="/campaign-process-results" element={<CampaignProcessResultsPage/>} />
                <Route path="/" element={<SignIn/>}/>
                <Route path="/interview" element={<Interview/>}/>
                <Route path="/general-interview" element={<GeneralInterview/>}/>
                <Route path="/general-question" element={<GeneralQuestion/>}/>

                {/* Sidebar */}
                <Route path="/candidate-summary" element={<CandidateSummaryPage/>}/>
                <Route path="/general-interview-detail" element={<GeneralInterviewDetailPage/>}/>
                <Route path="/skill-assessment-detail" element={<SkillAssessmentDetailPage/>}/>
                <Route path="/briefing-video/1" element={<BriefingVideo1/>}/>
                <Route path="/briefing-video/2" element={<BriefingVideo2/>}/>
                <Route path="/briefing-video/3" element={<BriefingVideo3/>}/>
                <Route path="/llm" element={<LLM/>}/>
            </Routes>
        </Router>
    );
}

export default App;