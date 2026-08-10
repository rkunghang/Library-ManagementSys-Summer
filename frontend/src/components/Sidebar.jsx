import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../store/slices/authSlice.js";
import { FiLogOut, FiHome, FiUsers, FiUser, FiPlusSquare, FiClipboard, FiBookOpen, FiGrid, FiFeather, FiTag } from "react-icons/fi";

const Sidebar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate("/login");
    };

    const items = [{ to: "/", label: "Home", icon: FiHome }];

    if (user?.role === "Admin") {
        items.push({ to: "/admin/dashboard", label: "Dashboard", icon: FiGrid });
        items.push({ to: "/admin/add-book", label: "Add Book", icon: FiPlusSquare });
        items.push({ to: "/admin/authors", label: "Authors", icon: FiFeather });
        items.push({ to: "/admin/genres", label: "Genres", icon: FiTag });
        items.push({ to: "/admin/borrow-records", label: "Records", icon: FiClipboard });
        items.push({ to: "/admin/users", label: "Members", icon: FiUsers });
    } else {
        items.push({ to: "/my-books", label: "My Books", icon: FiBookOpen });
    }

    items.push({ to: "/account", label: "Account", icon: FiUser });

    return (
        <aside className="fixed left-0 top-0 h-screen w-60 bg-ink text-paper flex flex-col justify-between z-40 overflow-y-auto">
            <div>
                <div className="px-6 py-8 border-b border-line-dark">
                    <span className="font-display text-2xl tracking-tight">Stacks</span>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-soft mt-1">Library System</p>
                </div>

                <nav className="mt-6">
                    {items.map(({ to, label, icon: Icon }) => {
                        const active = location.pathname === to;
                        return (
                            <Link
                                key={to}
                                to={to}
                                className={`flex items-center gap-3 px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] border-l-2 transition-colors ${
                                    active ? "border-paper text-paper bg-white/5" : "border-transparent text-paper-soft hover:text-paper hover:bg-white/5"
                                }`}
                            >
                                <Icon size={14} />
                                {label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="px-6 py-6 border-t border-line-dark">
                <p className="font-mono text-[11px] text-paper-soft truncate">{user?.email}</p>
                <p className="font-display text-sm mb-3">{user?.name}</p>
                <button onClick={handleLogout} className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-paper-soft hover:text-paper transition-colors">
                    <FiLogOut size={14} /> Sign out
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;