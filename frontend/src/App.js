import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./pages/Home/home";
import Signup from "./pages/signup/signup";
import React from "react";
import Login from "./pages/login/login";
import ResetPassword from "./pages/resetPassword/resetPassword";
import Services from "./pages/services/services";
import Clean from "./pages/cleaning/clean";
import Transform from "./pages/transforming/transform";
import Dashboard from "./pages/dashboarding/dashboard";
import UserProfile from "./pages/userProfile/userProfile";
import UploadPage from "./pages/uploadFile/uploadFile";
import EditProfile from "./pages/userProfile/editProfile";
import LandingPage from "./pages/LandingPage/LandingPage";
import Admin from "./pages/admin/admin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/reset_password" element={<ResetPassword />} />
        <Route exact path="/services" element={<Services />} />
        <Route exact path="/clean" element={<Clean />} />
        <Route exact path="/transform" element={<Transform />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/user_profile" element={<UserProfile />} />
        <Route exact path="/upload" element={<UploadPage />} />
        <Route exact path="/edit_profile" element={<EditProfile />} />
        <Route exact path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
