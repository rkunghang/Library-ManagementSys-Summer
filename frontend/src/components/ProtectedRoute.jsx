import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, authChecked, user, loading } = useSelector(
        (state) => state.auth
    );

    if (!authChecked || loading) {
        // fetchUser hasn't resolved yet — render nothing rather than redirecting, or a refresh would always briefly bounce a logged-in user to /login
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/" replace />; // logged in, but wrong role (e.g. a regular User hitting an admin-only route)
    }

    return children;
};

export default ProtectedRoute;
