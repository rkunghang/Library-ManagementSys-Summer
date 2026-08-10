import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllUsers } from "../store/slices/userSlice.js";
import { FiPlus } from "react-icons/fi";

const AdminUsers = () => {
    const dispatch = useDispatch();
    const { users, loading } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    return (
        <div className="px-10 py-14">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft mb-2">
                        Registry
                    </p>
                    <h1 className="font-display text-4xl">Members</h1>
                </div>
                <Link
                    to="/admin/add-admin"
                    className="flex items-center gap-2 border border-ink px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] hover:bg-ink hover:text-paper transition-colors"
                >
                    <FiPlus size={14} /> New admin
                </Link>
            </div>

            {loading && <p className="font-mono text-sm text-ink-soft">Loading...</p>}
            {!loading && users.length === 0 && (
                <p className="font-mono text-sm text-ink-soft">No verified members yet.</p>
            )}

            <div className="divide-y divide-line border-t border-b border-line">
                {users.map((u) => (
                    <div key={u._id} className="py-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-paper-dim border border-line flex items-center justify-center font-mono text-xs text-ink-soft shrink-0">
                            {u.avatar?.url ? (
                                <img src={u.avatar.url} alt={u.name} className="w-full h-full object-cover" />
                            ) : (
                                u.name?.charAt(0).toUpperCase()
                            )}
                        </div>

                        <div className="flex-1">
                            <h3 className="font-display text-lg">{u.name}</h3>
                            <p className="font-mono text-xs text-ink-soft">{u.email}</p>
                        </div>

                        <span
                            className={`font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-1 border ${
                                u.role === "Admin" ? "border-ink text-ink" : "border-line text-ink-soft"
                            }`}
                        >
                            {u.role}
                        </span>

                        <span className="font-mono text-xs text-ink-soft w-28 text-right">
                            {u.borrowedBooks?.length || 0} borrowed
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminUsers;