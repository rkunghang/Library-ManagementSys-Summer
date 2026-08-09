import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { fetchUser } from "./store/slices/authSlice.js";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import GuestRoute from "./components/GuestRoute.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import Register from "./pages/Register.jsx";
import OtpVerification from "./pages/OtpVerification.jsx";
import Login from "./pages/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import UpdatePassword from "./pages/UpdatePassword.jsx";
import Home from "./pages/Home.jsx";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    return (
        <>
            <Routes>
                <Route path="/" element={<ProtectedRoute><MainLayout><Home /></MainLayout></ProtectedRoute>} />
                <Route path="/account" element={<ProtectedRoute><MainLayout><UpdatePassword /></MainLayout></ProtectedRoute>} />
                <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
                <Route path="/otp-verification/:email" element={<GuestRoute><OtpVerification /></GuestRoute>} />
                <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
                <Route path="/forgot-password" element={<GuestRoute><ForgotPassword /></GuestRoute>} />
                <Route path="/reset-password/:token" element={<GuestRoute><ResetPassword /></GuestRoute>} />
            </Routes>
            <Toaster
                toastOptions={{
                    style: {
                        background: "#111111",
                        color: "#faf9f6",
                        fontFamily: "IBM Plex Mono, monospace",
                        fontSize: "13px",
                        borderRadius: "0px",
                    },
                }}
            />
        </>
    );
};

export default App;