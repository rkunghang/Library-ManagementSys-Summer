import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
    const { isAuthenticated, authChecked } = useSelector((state) => state.auth);

    if (!authChecked) {
        return null;
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />; // an already-logged-in user shouldn't be able to revisit /login or /register
    }

    return children;
};

export default GuestRoute;