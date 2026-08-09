import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { verifyOTP } from "../store/slices/authSlice.js";

const OtpVerification = () => {
    const { email } = useParams();
    const [otp, setOtp] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(verifyOTP({ email, otp }));
        if (verifyOTP.fulfilled.match(result)) navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-paper px-6">
            <form onSubmit={handleSubmit} className="w-full max-w-sm text-center">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft mb-2">
                    Verification
                </p>
                <h1 className="font-display text-4xl mb-3">Check your inbox</h1>
                <p className="font-body text-sm text-ink-soft mb-8">We sent a code to {email}</p>

                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    placeholder="• • • • •"
                    className="w-full border-b border-line focus:border-ink outline-none py-3 mb-8 text-center font-mono text-2xl tracking-[0.4em] bg-transparent"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-ink text-paper py-3 font-mono text-xs uppercase tracking-[0.2em] hover:bg-black disabled:opacity-50 transition-colors"
                >
                    {loading ? "Verifying..." : "Verify"}
                </button>
            </form>
        </div>
    );
};

export default OtpVerification;