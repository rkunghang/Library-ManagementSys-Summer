import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addGenre, updateGenre, fetchGenres } from "../store/slices/genreSlice.js";

const GenreForm = () => {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const [name, setName] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { genres, loading } = useSelector((state) => state.genre);

    useEffect(() => {
        if (isEdit && genres.length === 0) dispatch(fetchGenres());
    }, [dispatch, isEdit, genres.length]);

    useEffect(() => {
        if (isEdit) {
            const existing = genres.find((g) => g._id === id);
            if (existing) setName(existing.name);
        }
    }, [isEdit, id, genres]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const action = isEdit ? updateGenre({ id, data: { name } }) : addGenre({ name });
        const result = await dispatch(action);
        if (addGenre.fulfilled.match(result) || updateGenre.fulfilled.match(result)) {
            navigate("/admin/genres");
        }
    };

    return (
        <div className="max-w-lg px-10 py-14">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft mb-2">Registry</p>
            <h1 className="font-display text-4xl mb-8">{isEdit ? "Edit genre" : "Add a genre"}</h1>

            <form onSubmit={handleSubmit}>
                <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft">Genre name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border-b border-line focus:border-ink outline-none py-2 mb-8 mt-1 font-body bg-transparent"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-ink text-paper py-3 px-8 font-mono text-xs uppercase tracking-[0.2em] hover:bg-black disabled:opacity-50 transition-colors"
                >
                    {loading ? "Saving..." : isEdit ? "Save changes" : "Add genre"}
                </button>
            </form>
        </div>
    );
};

export default GenreForm;