import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../store/slices/authSlice.js";

const UpdatePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(updatePassword({ currentPassword, newPassword, confirmNewPassword }));
        if (updatePassword.fulfilled.match(result)) {
            setCurrentPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
        }
    };

    return (
        <div className="max-w-sm px-10 py-14">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft mb-2">
                Account
            </p>
            <h1 className="font-display text-4xl mb-8">Update password</h1>

            <form onSubmit={handleSubmit}>
                <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft">
                    Current password
                </label>
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="w-full border-b border-line focus:border-ink outline-none py-2 mb-6 mt-1 font-body bg-transparent"
                />

                <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft">
                    New password
                </label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full border-b border-line focus:border-ink outline-none py-2 mb-6 mt-1 font-body bg-transparent"
                />

                <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft">
                    Confirm new password
                </label>
                <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                    className="w-full border-b border-line focus:border-ink outline-none py-2 mb-8 mt-1 font-body bg-transparent"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-ink text-paper py-3 px-8 font-mono text-xs uppercase tracking-[0.2em] hover:bg-black disabled:opacity-50 transition-colors"
                >
                    {loading ? "Updating..." : "Update password"}
                </button>
            </form>
        </div>
    );
};

export default UpdatePassword;