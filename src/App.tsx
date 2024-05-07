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

import Interview from "./pages/Interview.tsx";
import GeneralInterview from "./pages/GeneralInterview.tsx";
import GeneralQuestion from "./pages/GeneralQuestion.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/login" element={<SignIn/>}/>
                <Route path="/profile" element={<UserProfilePage/>}/>
                <Route path="/home" element={<UserHomePage/>}/>
                <Route path="/" element={<SignIn/>}/>
                <Route path="/interview" element={<Interview/>}/>
                <Route path="/general-interview" element={<GeneralInterview/>}/>
                <Route path="/general-question" element={<GeneralQuestion/>}/>
            </Routes>
        </Router>
    );
}

export default App;