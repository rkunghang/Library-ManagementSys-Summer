import { useEffect, useState } from "react"; //for handling both add and edit 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addAuthor, updateAuthor, fetchAuthors } from "../store/slices/authorSlice.js";

const AuthorForm = () => {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const [form, setForm] = useState({ name: "", biography: "" });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { authors, loading } = useSelector((state) => state.author);

    useEffect(() => {
        if (isEdit && authors.length === 0) dispatch(fetchAuthors());
    }, [dispatch, isEdit, authors.length]);

    useEffect(() => {
        if (isEdit) {
            const existing = authors.find((a) => a._id === id);
            if (existing) setForm({ name: existing.name, biography: existing.biography || "" });
        }
    }, [isEdit, id, authors]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const action = isEdit ? updateAuthor({ id, data: form }) : addAuthor(form);
        const result = await dispatch(action);
        if (addAuthor.fulfilled.match(result) || updateAuthor.fulfilled.match(result)) {
            navigate("/admin/authors");
        }
    };

    return (
        <div className="max-w-lg px-10 py-14">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft mb-2">Registry</p>
            <h1 className="font-display text-4xl mb-8">{isEdit ? "Edit author" : "Add an author"}</h1>

            <form onSubmit={handleSubmit}>
                <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft">Author name</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-line focus:border-ink outline-none py-2 mb-6 mt-1 font-body bg-transparent"
                />

                <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft">
                    Biography <span className="normal-case">(optional)</span>
                </label>
                <textarea
                    name="biography"
                    value={form.biography}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border-b border-line focus:border-ink outline-none py-2 mb-8 mt-1 font-body bg-transparent resize-none"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-ink text-paper py-3 px-8 font-mono text-xs uppercase tracking-[0.2em] hover:bg-black disabled:opacity-50 transition-colors"
                >
                    {loading ? "Saving..." : isEdit ? "Save changes" : "Add author"}
                </button>
            </form>
        </div>
    );
};

export default AuthorForm;