import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { forgotPassword } from "../store/slices/authSlice.js";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);

    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(forgotPassword({ email }));
        if (forgotPassword.fulfilled.match(result)) setSent(true);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-paper px-6">
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft mb-2">
                    Account recovery
                </p>
                <h1 className="font-display text-4xl mb-3">Forgot password</h1>
                <p className="font-body text-sm text-ink-soft mb-8">
                    Enter your email and we'll send a link to reset it.
                </p>

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={sent}
                    placeholder="you@example.com"
                    className="w-full border-b border-line focus:border-ink outline-none py-2 mb-8 font-body bg-transparent disabled:opacity-50"
                />

                <button
                    type="submit"
                    disabled={loading || sent}
                    className="w-full bg-ink text-paper py-3 font-mono text-xs uppercase tracking-[0.2em] hover:bg-black disabled:opacity-50 transition-colors"
                >
                    {sent ? "Link sent" : loading ? "Sending..." : "Send reset link"}
                </button>

                <p className="font-body text-sm text-ink-soft mt-6 text-center">
                    <Link to="/login" className="text-ink underline">Back to sign in</Link>
                </p>
            </form>
        </div>
    );
};

export default ForgotPassword;