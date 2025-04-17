import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import FoodDonation from "./pages/FoodDonation";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Navbar from "./components/Navbar/Navbar";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import VolunteerDashboard from "./components/dashboard/VolunteerDashboard";

// Protected Route component
const ProtectedRoute = ({ children, role }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/signin" />;
    }

    if (role && user?.role !== role) {
        return <Navigate to="/signin" />;
    }

    return children;
};

function App() {
    const token = localStorage.getItem("token");
    const { pathname } = window.location;

    return (
        <>
            {!pathname.includes("/signin") &&
                !pathname.includes("/signup") &&
                !pathname.includes("/dashboard") && <Navbar token={token} />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/donation" element={<FoodDonation />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/about" element={<div>About Us Page</div>} />
                <Route path="/work" element={<div>Our Work Page</div>} />
                <Route path="/contact" element={<div>Contact Us Page</div>} />

                <Route
                    path="/admin-dashboard"
                    element={
                        <ProtectedRoute role="admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/volunteer-dashboard"
                    element={
                        <ProtectedRoute role="volunteer">
                            <VolunteerDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Redirect any unknown routes to home */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );
}

export default App;
