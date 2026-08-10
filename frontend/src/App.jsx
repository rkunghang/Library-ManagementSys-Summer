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
import BookView from "./pages/BookView.jsx";
import AddBook from "./pages/AddBook.jsx";
import AuthorList from "./pages/AuthorList.jsx";
import AuthorForm from "./pages/AuthorForm.jsx";
import GenreList from "./pages/GenreList.jsx";
import GenreForm from "./pages/GenreForm.jsx";
import MyBorrowedBooks from "./pages/MyBorrowedBooks.jsx";
import AdminBorrowRecords from "./pages/AdminBorrowRecords.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";
import AddAdmin from "./pages/AddAdmin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import NotFound from "./pages/NotFound.jsx";


const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    return (
        <>
            <Routes>
                <Route path="/" element={<ProtectedRoute><MainLayout><Home /></MainLayout></ProtectedRoute>} />
                <Route path="/book/:id" element={<ProtectedRoute><MainLayout><BookView /></MainLayout></ProtectedRoute>} />
                <Route path="/account" element={<ProtectedRoute><MainLayout><UpdatePassword /></MainLayout></ProtectedRoute>} />

                <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["Admin"]}><MainLayout><AdminDashboard /></MainLayout></ProtectedRoute>} />
                <Route path="/admin/add-book" element={<ProtectedRoute allowedRoles={["Admin"]}><MainLayout><AddBook /></MainLayout></ProtectedRoute>} />
                <Route path="/admin/edit-book/:id" element={<ProtectedRoute allowedRoles={["Admin"]}><MainLayout><AddBook /></MainLayout></ProtectedRoute>} />
                <Route path="/admin/authors" element={<ProtectedRoute allowedRoles={["Admin"]}><MainLayout><AuthorList /></MainLayout></ProtectedRoute>} />
                <Route path="/admin/authors/add" element={<ProtectedRoute allowedRoles={["Admin"]}><MainLayout><AuthorForm /></MainLayout></ProtectedRoute>} />
                <Route path="/admin/authors/edit/:id" element={<ProtectedRoute allowedRoles={["Admin"]}><MainLayout><AuthorForm /></MainLayout></ProtectedRoute>} />
                <Route path="/admin/genres" element={<ProtectedRoute allowedRoles={["Admin"]}><MainLayout><GenreList /></MainLayout></ProtectedRoute>} />
                <Route path="/admin/genres/add" element={<ProtectedRoute allowedRoles={["Admin"]}><MainLayout><GenreForm /></MainLayout></ProtectedRoute>} />
                <Route path="/admin/genres/edit/:id" element={<ProtectedRoute allowedRoles={["Admin"]}><MainLayout><GenreForm /></MainLayout></ProtectedRoute>} />
                <Route path="/admin/borrow-records" element={<ProtectedRoute allowedRoles={["Admin"]}><MainLayout><AdminBorrowRecords /></MainLayout></ProtectedRoute>} />
                <Route path="/admin/users" element={<ProtectedRoute allowedRoles={["Admin"]}><MainLayout><AdminUsers /></MainLayout></ProtectedRoute>} />
                <Route path="/admin/add-admin" element={<ProtectedRoute allowedRoles={["Admin"]}><MainLayout><AddAdmin /></MainLayout></ProtectedRoute>} />

                <Route path="/my-books" element={<ProtectedRoute><MainLayout><MyBorrowedBooks /></MainLayout></ProtectedRoute>} />

                <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
                <Route path="/otp-verification/:email" element={<GuestRoute><OtpVerification /></GuestRoute>} />
                <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
                <Route path="/forgot-password" element={<GuestRoute><ForgotPassword /></GuestRoute>} />
                <Route path="/reset-password/:token" element={<GuestRoute><ResetPassword /></GuestRoute>} />

                <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster
                toastOptions={{
                    style: { background: "#111111", color: "#faf9f6", fontFamily: "IBM Plex Mono, monospace", fontSize: "13px", borderRadius: "0px" },
                }}
            />
        </>
    );
};

export default App;