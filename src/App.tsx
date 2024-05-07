import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import SignUp from "./pages/SignUpPage.tsx";
import SignIn from "./pages/SignInPage.tsx";
import UserProfilePage from "./pages/UserProfilePage.tsx";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage.tsx";
import UserHomePage from "./pages/UserHomePage.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/login" element={<SignIn/>}/>
                <Route path="/profile" element={<UserProfilePage/>}/>
                <Route path="/home" element={<UserHomePage/>}/>
                <Route path="/admin" element={<AdminDashboardPage/>}/>
                <Route path="/" element={<SignIn/>}/>
            </Routes>
        </Router>
    );
}

export default App;