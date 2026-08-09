import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../store/slices/authSlice.js";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(registerUser({ name, email, password }));
        if (registerUser.fulfilled.match(result)) navigate(`/otp-verification/${email}`);
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-paper">
            <div className="flex items-center justify-center px-8 py-16">
                <form onSubmit={handleSubmit} className="w-full max-w-sm">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft mb-2">
                        New member
                    </p>
                    <h1 className="font-display text-4xl mb-8">Register</h1>

                    <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft">
                        Full name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full border-b border-line focus:border-ink outline-none py-2 mb-6 mt-1 font-body bg-transparent"
                    />

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
                        className="w-full border-b border-line focus:border-ink outline-none py-2 mb-8 mt-1 font-body bg-transparent"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-ink text-paper py-3 font-mono text-xs uppercase tracking-[0.2em] hover:bg-black disabled:opacity-50 transition-colors"
                    >
                        {loading ? "Registering..." : "Create account"}
                    </button>

                    <p className="font-body text-sm text-ink-soft mt-6 text-center">
                        Already a member? <Link to="/login" className="text-ink underline">Sign in</Link>
                    </p>
                </form>
            </div>

            <div className="hidden lg:flex flex-col justify-center bg-ink text-paper px-16">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper-soft mb-4">
                    Open to all readers
                </p>
                <h2 className="font-display text-4xl leading-tight mb-6">
                    Borrowing starts with a library card — this is yours.
                </h2>
                <p className="font-body text-paper-soft leading-relaxed max-w-md">
                    Register once, verify your email, and you're free to borrow from the
                    full catalog. No paperwork, no queues.
                </p>
            </div>
        </div>
    );
};

export default Register;