import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../store/slices/authSlice.js";

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(resetPassword({ token, password, confirmPassword }));
        if (resetPassword.fulfilled.match(result)) navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-paper px-6">
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft mb-2">
                    Account recovery
                </p>
                <h1 className="font-display text-4xl mb-8">Set a new password</h1>

                <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft">
                    New password
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border-b border-line focus:border-ink outline-none py-2 mb-6 mt-1 font-body bg-transparent"
                />

                <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft">
                    Confirm password
                </label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full border-b border-line focus:border-ink outline-none py-2 mb-8 mt-1 font-body bg-transparent"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-ink text-paper py-3 font-mono text-xs uppercase tracking-[0.2em] hover:bg-black disabled:opacity-50 transition-colors"
                >
                    {loading ? "Resetting..." : "Reset password"}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;