import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerNewAdmin } from "../store/slices/userSlice.js";

const AddAdmin = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.user);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!avatar) return;

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("password", form.password);
        formData.append("avatar", avatar); // field name here MUST match req.files.avatar on the backend

        const result = await dispatch(registerNewAdmin(formData));
        if (registerNewAdmin.fulfilled.match(result)) navigate("/admin/users");
    };

    return (
        <div className="max-w-lg px-10 py-14">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft mb-2">
                Registry
            </p>
            <h1 className="font-display text-4xl mb-8">Register a new admin</h1>

            <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-5 mb-8">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-paper-dim border border-line flex items-center justify-center shrink-0">
                        {preview ? (
                            <img src={preview} alt="preview" className="w-full h-full object-cover" />
                        ) : (
                            <span className="font-mono text-[10px] text-ink-soft">No photo</span>
                        )}
                    </div>
                    <label className="font-mono text-xs uppercase tracking-[0.15em] border border-line px-4 py-2 cursor-pointer hover:border-ink transition-colors">
                        Upload avatar
                        <input type="file" accept="image/*" onChange={handleFile} required className="hidden" />
                    </label>
                </div>

                <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft">
                    Full name
                </label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-line focus:border-ink outline-none py-2 mb-6 mt-1 font-body bg-transparent"
                />

                <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-line focus:border-ink outline-none py-2 mb-6 mt-1 font-body bg-transparent"
                />

                <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-line focus:border-ink outline-none py-2 mb-8 mt-1 font-body bg-transparent"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-ink text-paper py-3 px-8 font-mono text-xs uppercase tracking-[0.2em] hover:bg-black disabled:opacity-50 transition-colors"
                >
                    {loading ? "Registering..." : "Register admin"}
                </button>
            </form>
        </div>
    );
};

export default AddAdmin;