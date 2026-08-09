import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../store/slices/authSlice.js";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(loginUser({ email, password }));
        if (loginUser.fulfilled.match(result)) navigate("/");
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-paper">
            <div className="flex items-center justify-center px-8 py-16">
                <form onSubmit={handleSubmit} className="w-full max-w-sm">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft mb-2">
                        Member access
                    </p>
                    <h1 className="font-display text-4xl mb-8">Sign in</h1>

                    <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border-b border-line focus:border-ink outline-none py-2 mb-6 mt-1 font-body bg-transparent"
                    />

                    <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full border-b border-line focus:border-ink outline-none py-2 mb-3 mt-1 font-body bg-transparent"
                    />

                    <div className="text-right mb-8">
                        <Link to="/forgot-password" className="font-mono text-xs text-ink-soft hover:text-ink underline">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-ink text-paper py-3 font-mono text-xs uppercase tracking-[0.2em] hover:bg-black disabled:opacity-50 transition-colors"
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>

                    <p className="font-body text-sm text-ink-soft mt-6 text-center">
                        New here? <Link to="/register" className="text-ink underline">Create an account</Link>
                    </p>
                </form>
            </div>

            <div className="hidden lg:flex flex-col justify-center bg-ink text-paper px-16">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper-soft mb-4">
                    Est. records, kept well
                </p>
                <h2 className="font-display text-4xl leading-tight mb-6">
                    A ledger for every book that's ever left the shelf.
                </h2>
                <p className="font-body text-paper-soft leading-relaxed max-w-md">
                    Track what's borrowed, what's due, and what's waiting to be read next —
                    all in one place built for the people who run the stacks.
                </p>
            </div>
        </div>
    );
};

export default Login;