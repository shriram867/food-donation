import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import FoodDonation from "./pages/FoodDonation";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Navbar from "./components/Navbar/Navbar";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import VolunteerDashboard from "./components/dashboard/VolunteerDashboard";
import DonorDashboard from './components/dashboard/DonorDashboard.jsx';
import './App.css';

// Protected Route component
const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user) {
        return <Navigate to="/signin" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

function App() {
    const token = localStorage.getItem("token");
    const { pathname } = window.location;

    return (
        <div className="app">
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
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/volunteer-dashboard"
                    element={
                        <ProtectedRoute allowedRoles={['volunteer']}>
                            <VolunteerDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/donor-dashboard"
                    element={
                        <ProtectedRoute allowedRoles={['donor']}>
                            <DonorDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Redirect any unknown routes to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
}

export default App;
