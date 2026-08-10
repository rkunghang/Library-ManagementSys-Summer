import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { addBook, editBook, fetchSingleBook } from "../store/slices/bookSlice.js";
import { fetchAuthors } from "../store/slices/authorSlice.js";
import { fetchGenres } from "../store/slices/genreSlice.js";

const AddBook = () => { //Also handlesboth add and edit
    const { id } = useParams();
    const isEdit = Boolean(id);

    const [form, setForm] = useState({ title: "", author: "", genre: "", description: "", price: "", quantity: "" });
    const [coverImage, setCoverImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [formError, setFormError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, activeBook } = useSelector((state) => state.book);
    const { authors } = useSelector((state) => state.author);
    const { genres } = useSelector((state) => state.genre);

    useEffect(() => {
        dispatch(fetchAuthors());
        dispatch(fetchGenres());
        if (isEdit) dispatch(fetchSingleBook(id));
    }, [dispatch, isEdit, id]);

    useEffect(() => {
        if (isEdit && activeBook && activeBook._id === id) {
            setForm({
                title: activeBook.title,
                author: activeBook.author?._id || "",
                genre: activeBook.genre?._id || "",
                description: activeBook.description || "",
                price: activeBook.price || "",
                quantity: activeBook.quantity,
            });
            setPreview(activeBook.coverImage?.url || null);
        }
    }, [isEdit, activeBook, id]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError("");

        if (Number(form.quantity) < 0) {
            setFormError("Stock quantity cannot be negative.");
            return;
        }
        if (!isEdit && !coverImage) {
            setFormError("A cover image is required.");
            return;
        }

        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("author", form.author);
        formData.append("genre", form.genre);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("quantity", form.quantity);
        if (coverImage) formData.append("coverImage", coverImage);

        const action = isEdit ? editBook({ id, formData }) : addBook(formData);
        const result = await dispatch(action);

        if (addBook.fulfilled.match(result) || editBook.fulfilled.match(result)) {
            navigate("/");
        }
    };

    const noAuthorsOrGenres = authors.length === 0 || genres.length === 0;

    return (
        <div className="max-w-lg px-10 py-14">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft mb-2">Cataloging</p>
            <h1 className="font-display text-4xl mb-8">{isEdit ? "Edit title" : "Add a title"}</h1>

            {noAuthorsOrGenres && (
                <p className="font-mono text-xs text-red-600 mb-6 border border-red-600 px-4 py-3">
                    You need at least one <Link to="/admin/authors/add" className="underline">author</Link> and one{" "}
                    <Link to="/admin/genres/add" className="underline">genre</Link> before adding a book.
                </p>
            )}

            {formError && (
                <p className="font-mono text-xs text-red-600 mb-6 border border-red-600 px-4 py-3">{formError}</p>
            )}

            <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-5 mb-8">
                    <div className="w-20 h-24 bg-paper-dim border border-line flex items-center justify-center shrink-0 overflow-hidden">
                        {preview ? (
                            <img src={preview} alt="preview" className="w-full h-full object-cover" />
                        ) : (
                            <span className="font-mono text-[10px] text-ink-soft text-center px-1">No cover</span>
                        )}
                    </div>
                    <label className="font-mono text-xs uppercase tracking-[0.15em] border border-line px-4 py-2 cursor-pointer hover:border-ink transition-colors">
                        {isEdit ? "Replace cover" : "Upload cover"}
                        <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
                    </label>
                </div>

                <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft">Title</label>
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-line focus:border-ink outline-none py-2 mb-6 mt-1 font-body bg-transparent"
                />

                <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft">Author</label>
                <select
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-line focus:border-ink outline-none py-2 mb-6 mt-1 font-body bg-transparent"
                >
                    <option value="" disabled>Select an author</option>
                    {authors.map((a) => (
                        <option key={a._id} value={a._id}>{a.name}</option>
                    ))}
                </select>

                <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft">Genre</label>
                <select
                    name="genre"
                    value={form.genre}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-line focus:border-ink outline-none py-2 mb-6 mt-1 font-body bg-transparent"
                >
                    <option value="" disabled>Select a genre</option>
                    {genres.map((g) => (
                        <option key={g._id} value={g._id}>{g.name}</option>
                    ))}
                </select>

                <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft">Description</label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border-b border-line focus:border-ink outline-none py-2 mb-6 mt-1 font-body bg-transparent resize-none"
                />

                <div className="grid grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft">
                            Price <span className="normal-case">(optional)</span>
                        </label>
                        <input
                            type="number"
                            name="price"
                            step="0.01"
                            min="0"
                            value={form.price}
                            onChange={handleChange}
                            className="w-full border-b border-line focus:border-ink outline-none py-2 mt-1 font-body bg-transparent"
                        />
                    </div>
                    <div>
                        <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft">Stock quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            min="0"
                            value={form.quantity}
                            onChange={handleChange}
                            required
                            className="w-full border-b border-line focus:border-ink outline-none py-2 mt-1 font-body bg-transparent"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading || noAuthorsOrGenres}
                    className="bg-ink text-paper py-3 px-8 font-mono text-xs uppercase tracking-[0.2em] hover:bg-black disabled:opacity-50 transition-colors"
                >
                    {loading ? "Saving..." : isEdit ? "Save changes" : "Add to catalog"}
                </button>
            </form>
        </div>
    );
};

export default AddBook;