import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import SignUp from "./components/SignUp.tsx";
import SignIn from "./components/SignIn.tsx";
import UserProfilePage from "./components/UserProfilePage.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/login" element={<SignIn/>}/>
                <Route path="/profile" element={<UserProfilePage/>}/>
                <Route path="/" element={<SignIn/>}/>
            </Routes>
        </Router>
    );
}

export default App;