import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../store/slices/authSlice.js";
import { FiLogOut, FiBook, FiUsers, FiHome } from "react-icons/fi";

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate("/login");
    };

    return (
        <nav className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between flex-wrap gap-4">
            <Link to="/" className="text-xl font-bold flex items-center gap-2">
                <FiBook /> Library System
            </Link>

            <div className="flex items-center gap-6">
                <Link to="/" className="hover:underline flex items-center gap-1">
                    <FiHome /> Home
                </Link>

                {user?.role === "Admin" && (
                    <Link to="/admin/users" className="hover:underline flex items-center gap-1">
                        <FiUsers /> Users
                    </Link>
                )}

                <span className="text-sm bg-blue-700 px-3 py-1 rounded-full">
                    {user?.name} ({user?.role})
                </span>

                <button onClick={handleLogout} className="flex items-center gap-1 hover:underline">
                    <FiLogOut /> Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;