import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchGenres, deleteGenre } from "../store/slices/genreSlice.js";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";

const GenreList = () => {
    const dispatch = useDispatch();
    const { genres, loading } = useSelector((state) => state.genre);

    useEffect(() => {
        dispatch(fetchGenres());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Delete this genre?")) dispatch(deleteGenre(id));
    };

    return (
        <div className="px-10 py-14">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft mb-2">Registry</p>
                    <h1 className="font-display text-4xl">Genres</h1>
                </div>
                <Link
                    to="/admin/genres/add"
                    className="flex items-center gap-2 border border-ink px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] hover:bg-ink hover:text-paper transition-colors"
                >
                    <FiPlus size={14} /> Add genre
                </Link>
            </div>

            {loading && <p className="font-mono text-sm text-ink-soft">Loading...</p>}
            {!loading && genres.length === 0 && <p className="font-mono text-sm text-ink-soft">No genres yet.</p>}

            <div className="divide-y divide-line border-t border-b border-line">
                {genres.map((genre) => (
                    <div key={genre._id} className="py-4 flex items-center gap-4">
                        <h3 className="font-display text-lg flex-1">{genre.name}</h3>
                        <Link
                            to={`/admin/genres/edit/${genre._id}`}
                            className="border border-line text-ink-soft hover:border-ink hover:text-ink p-2 transition-colors"
                        >
                            <FiEdit2 size={14} />
                        </Link>
                        <button
                            onClick={() => handleDelete(genre._id)}
                            className="border border-line text-ink-soft hover:border-ink hover:text-ink p-2 transition-colors"
                        >
                            <FiTrash2 size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GenreList;