import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import SignUp from "./pages/SignUpPage.tsx";
import SignIn from "./pages/SignInPage.tsx";
import UserProfilePage from "./pages/UserProfilePage.tsx";
import UserHomePage from "./pages/UserHomePage.tsx";
import UserTechnicalAssessmentQuestionPage from "./pages/UserTechnicalAssessmentQuestionPage.tsx";
import UserAssessmentSubmissionCompletedPage from "./pages/UserAssessmentSubmissionCompletedPage.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/login" element={<SignIn/>}/>
                <Route path="/profile" element={<UserProfilePage/>}/>
                <Route path="/home" element={<UserHomePage/>}/>
                <Route path="/technical" element={<UserTechnicalAssessmentQuestionPage/>}/>
                <Route path="/submission-completed" element={<UserAssessmentSubmissionCompletedPage/>}/>
                <Route path="/" element={<SignIn/>}/>
            </Routes>
        </Router>
    );
}

export default App;